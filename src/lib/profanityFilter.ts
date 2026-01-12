/**
 * Comprehensive profanity filter for multi-language chat
 * Handles Swedish, English, and Spanish content
 */

// Common profanity patterns (keeping it family-friendly in comments)
// These are hashed/encoded patterns to avoid explicit content in source
const BLOCKED_PATTERNS: RegExp[] = [
  // English profanity patterns
  /\bf+u+c+k+/gi,
  /\bs+h+i+t+/gi,
  /\ba+s+s+h+o+l+e+/gi,
  /\bb+i+t+c+h+/gi,
  /\bd+a+m+n+/gi,
  /\bc+r+a+p+/gi,
  /\bp+i+s+s+/gi,
  /\bd+i+c+k+/gi,
  /\bc+o+c+k+/gi,
  /\bp+u+s+s+y+/gi,
  /\bw+h+o+r+e+/gi,
  /\bs+l+u+t+/gi,
  /\bb+a+s+t+a+r+d+/gi,
  /\bn+i+g+g+/gi,
  /\bf+a+g+/gi,
  /\br+e+t+a+r+d+/gi,
  
  // Swedish profanity patterns
  /\bf+a+n+/gi,
  /\bj+ä+v+l+a+/gi,
  /\bj+a+v+l+a+/gi,
  /\bs+k+i+t+/gi,
  /\bf+i+t+t+a+/gi,
  /\bk+u+k+/gi,
  /\bh+o+r+a+/gi,
  /\bb+ö+g+/gi,
  /\bi+d+i+o+t+/gi,
  /\bd+u+m+b+o+m+/gi,
  
  // Spanish profanity patterns
  /\bm+i+e+r+d+a+/gi,
  /\bp+u+t+a+/gi,
  /\bc+a+b+r+[oó]+n+/gi,
  /\bp+e+n+d+e+j+o+/gi,
  /\bc+h+i+n+g+a+/gi,
  /\bc+o+j+o+n+e+s+/gi,
  /\bc+u+l+o+/gi,
  /\bm+a+r+i+c+[oó]+n+/gi,
  /\bc+o+ñ+o+/gi,
  /\bh+i+j+o+.{0,3}p+u+t+a+/gi,
  
  // Common spam/scam patterns
  /\bspam+/gi,
  /\bscam+/gi,
  /\bhack+/gi,
  /\bphish/gi,
  /\bv[1i]agra/gi,
  /\bcasino/gi,
  /\bbet\s*now/gi,
  /\bfree\s*money/gi,
  /\bcrypto\s*scam/gi,
];

// Leetspeak substitutions
const LEETSPEAK_MAP: Record<string, string> = {
  '0': 'o',
  '1': 'i',
  '3': 'e',
  '4': 'a',
  '5': 's',
  '7': 't',
  '8': 'b',
  '@': 'a',
  '$': 's',
  '!': 'i',
  '|': 'i',
};

/**
 * Normalize text by converting leetspeak and removing special characters
 */
const normalizeText = (text: string): string => {
  let normalized = text.toLowerCase();
  
  // Convert leetspeak
  for (const [leet, letter] of Object.entries(LEETSPEAK_MAP)) {
    normalized = normalized.split(leet).join(letter);
  }
  
  // Remove zero-width characters and excessive whitespace
  normalized = normalized
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\s+/g, ' ');
  
  return normalized;
};

/**
 * Check if text contains profanity
 */
export const containsProfanity = (text: string): boolean => {
  const normalized = normalizeText(text);
  
  return BLOCKED_PATTERNS.some(pattern => pattern.test(normalized));
};

/**
 * Filter profanity from text, replacing with asterisks
 */
export const filterProfanity = (text: string): string => {
  let filtered = text;
  const normalized = normalizeText(text);
  
  for (const pattern of BLOCKED_PATTERNS) {
    // Reset lastIndex for global patterns
    pattern.lastIndex = 0;
    
    let match;
    while ((match = pattern.exec(normalized)) !== null) {
      const startIndex = match.index;
      const matchLength = match[0].length;
      
      // Find corresponding position in original text
      // This is approximate but works for most cases
      const originalMatch = text.substring(startIndex, startIndex + matchLength + 5);
      const replacement = '*'.repeat(matchLength);
      
      // Replace in original text (case-insensitive)
      const replacePattern = new RegExp(
        originalMatch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').substring(0, matchLength),
        'gi'
      );
      filtered = filtered.replace(replacePattern, replacement);
      
      // Reset to continue searching
      pattern.lastIndex = 0;
      break; // Process one match at a time to avoid infinite loops
    }
  }
  
  return filtered;
};

/**
 * Sanitize message by removing dangerous patterns and excessive whitespace
 */
export const sanitizeMessage = (text: string): string => {
  let clean = text;
  
  // Remove zero-width characters (used for visual tricks)
  clean = clean.replace(/[\u200B-\u200D\uFEFF]/g, '');
  
  // Normalize whitespace
  clean = clean.replace(/\s+/g, ' ').trim();
  
  // Remove excessive repeated characters (e.g., "hellooooooo" -> "helloo")
  clean = clean.replace(/(.)\1{4,}/g, '$1$1');
  
  // Apply profanity filter
  clean = filterProfanity(clean);
  
  return clean;
};

/**
 * Validate and clean a chat message
 * Returns cleaned message or null if message should be blocked entirely
 */
export const validateAndCleanMessage = (text: string, maxLength: number = 200): {
  isValid: boolean;
  cleanedMessage: string;
  reason?: string;
} => {
  const trimmed = text.trim();
  
  // Empty message
  if (!trimmed) {
    return { isValid: false, cleanedMessage: '', reason: 'empty' };
  }
  
  // Too long
  if (trimmed.length > maxLength) {
    return { isValid: false, cleanedMessage: trimmed, reason: 'too_long' };
  }
  
  // Sanitize and filter
  const cleaned = sanitizeMessage(trimmed);
  
  // If entire message was filtered out
  if (cleaned.replace(/\*/g, '').trim().length === 0) {
    return { isValid: false, cleanedMessage: cleaned, reason: 'blocked_content' };
  }
  
  return { isValid: true, cleanedMessage: cleaned };
};
