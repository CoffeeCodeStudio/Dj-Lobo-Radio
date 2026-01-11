import { useEffect, useRef } from "react";
import djLoboImage from "@/assets/dj-lobo-real.jpg";
import { Music, Headphones, Zap } from "lucide-react";

const AboutSection = () => {
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

  const stats = [
    { value: "20+", label: "Years", ariaLabel: "Över 20 års erfarenhet" },
    { value: "5K+", label: "Vinyl", ariaLabel: "Över 5000 vinylskivor" },
    { value: "100K+", label: "Listeners", ariaLabel: "Över 100 000 lyssnare" },
  ];

  const features = [
    {
      icon: Music,
      title: "80-talshits",
      description: "Synth-pop, rock och discoklassiker",
      gradient: "icon-gradient-pink",
    },
    {
      icon: Headphones,
      title: "90-talsfavoriter",
      description: "Eurodance, grunge och R&B",
      gradient: "icon-gradient-cyan",
    },
    {
      icon: Zap,
      title: "Live varje vecka",
      description: "Färska mixes och specialshower",
      gradient: "icon-gradient-purple",
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="py-16 sm:py-24 px-4 sm:px-6 relative"
      aria-labelledby="about-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          {/* Left Column - Text */}
          <div className="scroll-reveal">
            <h2 
              id="about-title"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-neon-gradient mb-6 sm:mb-8"
            >
              OM DJ LOBO
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-4 leading-relaxed">
              DJ Lobo är en passionerad DJ med rötter i 80- och 90-talets gyllene
              musikera. Med sin unika blandning av klassiska hits och nostalgi skapar
              han en oförglömlig atmosfär.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              Oavsett om det är synth-pop, eurodance eller rock - DJ Lobo tar dig på
              en resa genom de bästa låtarna från förr, direkt till ditt vardagsrum.
            </p>

            {/* Stats */}
            <dl className="flex gap-8 sm:gap-12 mt-6 sm:mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center scroll-reveal">
                  <dt className="sr-only">{stat.ariaLabel}</dt>
                  <dd>
                    <div className="font-display text-3xl sm:text-4xl font-bold text-neon-gradient">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-xs sm:text-sm mt-1">
                      {stat.label}
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right Column - Image and Features */}
          <div className="space-y-4 sm:space-y-6">
            {/* DJ Image */}
            <div className="scroll-reveal glass-card overflow-hidden">
              <img
                src={djLoboImage}
                alt="DJ Lobo vid Pioneer DJ-mixerbord under ett live-event"
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>

            {/* Feature Cards */}
            <ul className="grid grid-cols-3 gap-2 sm:gap-4" role="list">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="scroll-reveal glass-card p-3 sm:p-4 text-center"
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${feature.gradient} flex items-center justify-center mx-auto mb-2 sm:mb-3`}
                    aria-hidden="true"
                  >
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-xs sm:text-sm mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-[10px] sm:text-xs">
                    {feature.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
