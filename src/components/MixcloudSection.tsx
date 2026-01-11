import { useEffect, useRef } from "react";

const MIXCLOUD_USER = "DjLobo75";

const MixcloudSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".scroll-reveal").forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("revealed");
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="mixcloud" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-neon-gradient mb-4 italic">
            MIXCLOUD
          </h2>
          <p className="text-muted-foreground text-lg">
            Lyssna på tidigare shower och mixes
          </p>
        </div>

        {/* Mixcloud Embed */}
        <div className="scroll-reveal glass-card p-4 overflow-hidden">
          <iframe
            width="100%"
            height="400"
            src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&dark=1&feed=%2F${MIXCLOUD_USER}%2F`}
            frameBorder="0"
            allow="autoplay"
            className="rounded-lg"
            title="DJ Lobo Mixcloud"
          ></iframe>
        </div>

        {/* Link to full profile */}
        <div className="text-center mt-6 scroll-reveal">
          <a
            href={`https://www.mixcloud.com/${MIXCLOUD_USER}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card px-8 py-3 font-display font-bold tracking-wider hover:bg-muted/50 transition-all hover:scale-105 inline-block"
          >
            SE ALLA MIXES PÅ MIXCLOUD
          </a>
        </div>
      </div>
    </section>
  );
};

export default MixcloudSection;
