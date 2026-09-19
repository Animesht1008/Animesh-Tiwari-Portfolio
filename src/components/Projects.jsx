import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Authentic Project Data based on Animesh's real work and internships
const projectsData = [
  {
    title: "BRAHMO – Clinical AI System",
    category: "Full-Stack AI Platform",
    description: "Structured-prompt clinical AI platform with deterministic validation guards over Groq LLM outputs, cutting FCP by 40%.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "LLM"],
    match: "99%",
    episode: "S01 E01",
    github: "https://github.com/Animesht1008/Brahmo-India-Clinical",
    demo: "https://brahmo-india-clinical.vercel.app/"
  },
  {
    title: "Fashion Intel",
    category: "AI Brand-Intelligence Agent",
    description: "Full-stack news monitoring agent with a self-healing Zod validation layer, eliminating 100% of LLM parse failures.",
    tags: ["Node.js", "Express.js", "LLM Integration", "Zod"],
    match: "98%",
    episode: "S01 E02",
    github: "https://github.com/Animesht1008/FashionIntel",
    demo: "https://fashionintel.onrender.com/"
  },
  {
    title: "Payment Orchestration System",
    category: "Fintech / Distributed Systems",
    description: "Multi-gateway payment router with 2s automated failover and Redis-backed idempotency, hitting 99.95% success.",
    tags: ["TypeScript", "Kafka", "RabbitMQ", "Redis", "Docker"],
    match: "99%",
    episode: "S01 E03",
    github: null,
    demo: null
  },
  {
    title: "Workforce Compliance Platform",
    category: "Full-Stack ELT Pipeline",
    description: "13-table payroll system automating PF/ESI deductions for a 300+ worker firm, with sub-3s analytics dashboards.",
    tags: ["React", "NestJS", "Prisma", "Redis", "BullMQ"],
    match: "97%",
    episode: "S01 E04",
    github: null,
    demo: null
  },
  {
    title: "Drowsiness Detection Research",
    category: "Applied Deep Learning",
    description: "IEEE-published MobileNetV2 optimization for edge deployment — 94.03% accuracy at a 65% smaller footprint.",
    tags: ["Python", "TensorFlow", "CNN", "Edge AI"],
    match: "96%",
    episode: "S01 E05",
    github: "https://github.com/Animesht1008/Deep-Learning-Model-for-Drowsiness-Detection",
    paper: "https://ieeexplore.ieee.org/document/10580469/"
  },
  {
    title: "Beacon — Group Travel App",
    category: "Open Source / Mobile",
    description: "Cross-platform group travel app with a Clean Architecture core and real-time GraphQL location subscriptions.",
    tags: ["Flutter", "Dart", "GraphQL", "WebSockets"],
    match: "97%",
    episode: "S01 E06",
    github: "https://github.com/Animesht1008/beacon",
    demo: null
  },
  {
    title: "Voice-Driven Commerce Operations Engine",
    category: "Full-Stack AI Voice Platform",
    description: "Full-stack AI voice automation platform for COD order verification, customer interaction, and delivery coordination.",
    tags: ["REST API", "MongoDB", "Webhook", "AI"],
    match: "99%",
    episode: "S01 E07",
    github: "https://github.com/Animesht1008/Voice-Driven-Commerce-Operations-Engine",
    demo: "https://voice-driven-commerce-operations-engine-1.onrender.com/"
  },
  {
    title: "WanderLust- Scalable Full-Stack Rental Platform",
    category: "Full-Stack Rental Marketplace",
    description: "A Scalable Full-Stack rental platform supporting property listing creation, booking, Mapbox-powered location visualization and payment orchestration with a microservices architecture.",
    tags: ["Node.js", "Express.js", "MongoDB", "Docker"],
    match: "95%",
    episode: "S01 E08",
    github: "https://github.com/Animesht1008/Major-Project",
    demo: "https://major-project-mkab.onrender.com/"
  }
];

// Small inline icon set (no external icon dependency)
const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.5 0 12.3c0 5.44 3.44 10.05 8.21 11.68.6.12.82-.27.82-.6 0-.3-.01-1.08-.02-2.12-3.34.75-4.04-1.66-4.04-1.66-.55-1.44-1.34-1.83-1.34-1.83-1.09-.77.08-.75.08-.75 1.21.09 1.84 1.28 1.84 1.28 1.07 1.87 2.81 1.33 3.5 1.02.11-.79.42-1.33.76-1.64-2.66-.31-5.47-1.37-5.47-6.1 0-1.35.46-2.45 1.22-3.31-.12-.31-.53-1.56.12-3.25 0 0 1-.33 3.3 1.26a11.2 11.2 0 0 1 6 0c2.28-1.59 3.29-1.26 3.29-1.26.65 1.69.24 2.94.12 3.25.76.86 1.22 1.96 1.22 3.31 0 4.74-2.81 5.79-5.49 6.09.43.38.81 1.14.81 2.31 0 1.67-.02 3.01-.02 3.42 0 .33.22.72.83.6C20.57 22.34 24 17.74 24 12.3 24 5.5 18.63 0 12 0z" />
  </svg>
);

const ExternalIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5m0 0v5m0-5L10 14m-1-9H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-4" />
  </svg>
);

const PaperIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

// Renders the github / live-demo / paper icon links for a project card, if any exist
const ProjectLinks = ({ project, size = "w-7 h-7" }) => {
  if (!project.github && !project.demo && !project.paper) {
    return <div className="w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] transition-all" />;
  }
  return (
    <div className="flex items-center gap-2">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          title="View GitHub repo"
          className={`${size} rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all p-1.5`}
        >
          <GithubIcon className="w-full h-full" />
        </a>
      )}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          title="View live demo"
          className={`${size} rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all p-1.5`}
        >
          <ExternalIcon className="w-full h-full" />
        </a>
      )}
      {project.paper && (
        <a
          href={project.paper}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          title="Read IEEE paper"
          className={`${size} rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all p-1.5`}
        >
          <PaperIcon className="w-full h-full" />
        </a>
      )}
    </div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileCarouselRef = useRef(null);

  const handleMobileScroll = (e) => {
    const container = e.target;
    const center = container.scrollLeft + container.offsetWidth / 2;

    let activeIdx = 0;
    let minDiff = Infinity;

    mobileCardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - center);
      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    });

    mobileCardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.to(card, {
        scale: i === activeIdx ? 1 : 0.92,
        opacity: i === activeIdx ? 1 : 0.5,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Set initial origins (Centered in viewport)
      gsap.set([folderBackRef.current, folderFrontRef.current], { 
        xPercent: -50, 
        yPercent: -50 
      });
      gsap.set(folderFrontRef.current, { transformOrigin: "bottom center" });
      
      const getGridPos = (index) => {
        let row, col;
        if (index < 3) { row = 0; col = index; }
        else if (index === 3) { row = 1; col = 0; }
        else if (index === 4) { row = 1; col = 2; }
        else { row = 2; col = index - 5; }
        return { row, col };
      };

      cardsRef.current.forEach((card) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
        });
      });

      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        if (isDesktop) {
          let floatTween;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%", 
              end: "bottom 50%",
              toggleActions: "play reverse play reverse",
              onEnter: () => { if (floatTween) floatTween.kill(); },
              onEnterBack: () => { if (floatTween) floatTween.kill(); },
              onLeave: () => { if (floatTween) floatTween.kill(); },
              onLeaveBack: () => { if (floatTween) floatTween.kill(); }
            },
            onComplete: () => {
              floatTween = gsap.to(cardsRef.current, {
                y: "+=12",
                rotation: "+=1",
                duration: 3.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                stagger: { amount: 1.5, from: "random" }
              });
            }
          });

          // 1. Folder opens with smooth rotation
          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 1.2,
            ease: "power3.inOut"
          });

          // 2. Cards rise up collectively
          tl.to(cardsRef.current, {
            y: -140,
            scale: 0.9,
            zIndex: 70,
            duration: 0.6,
            stagger: 0.04,
            ease: "back.out(1.2)"
          }, "-=0.6");

          // 3. Cards magically spread out into an ultra-clean blockbuster grid layout
          tl.to(cardsRef.current, {
            x: (i) => {
              const w = Math.max(...cardsRef.current.map(c => c?.offsetWidth || 0)) || 360;
              const gap = 40;
              const { col } = getGridPos(i);
              return (col - 1) * (w + gap);
            },
            y: (i) => {
              const h = Math.max(...cardsRef.current.map(c => c?.offsetHeight || 0)) || 240;
              const gap = 40;
              const { row } = getGridPos(i);
              return (row - 1) * (h + gap);
            },
            rotation: () => gsap.utils.random(-3, 3),
            scale: 1,
            duration: 1.4,
            stagger: { amount: 0.4, from: "center" },
            ease: "expo.out"
          }, "-=0.2");
        }

        if (isMobile) {
          const cardW = window.innerWidth * 0.8;
          const gap = 20;
          
          mobileCardsRef.current.forEach((card, i) => {
            gsap.set(card, {
              x: -(i * (cardW + gap)), 
              y: 0,
              scale: 0.4,
              opacity: 0,
              rotation: gsap.utils.random(-15, 15)
            });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
            }
          });

          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 0.8,
            ease: "power3.inOut"
          });

          tl.to(mobileCardsRef.current, {
            y: -100,
            opacity: 1,
            scale: 0.85,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.2)"
          }, "-=0.4");

          tl.to(mobileCardsRef.current, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: (i) => i === 0 ? 1 : 0.92,
            opacity: (i) => i === 0 ? 1 : 0.5,
            duration: 0.8,
            stagger: 0.08,
            ease: "expo.out",
            onComplete: () => {
              if (mobileCarouselRef.current) {
                mobileCarouselRef.current.style.overflowX = 'auto';
                mobileCarouselRef.current.style.pointerEvents = 'auto';
              }
            }
          }, "-=0.2");
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="bg-[#0b0b0b] min-h-[100svh] md:min-h-[170vh] relative font-sans overflow-x-clip text-white w-full flex items-center justify-center py-24 md:py-40 select-none">
      
      {/* Background Netflix Cinematic Title Watermark */}
      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[14vw] sm:text-[17vw] md:text-[20vw] font-black text-white/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase">
          ORIGINALS
        </h1>
      </div>

      {/* Ambient Crimson Glow behind folder */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-red-600/15 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Main Perspective Container */}
      <div className="mt-12 relative w-full max-w-7xl h-full flex items-center justify-center perspective-[2000px] z-10">
        
        {/* Origin Container */}
        <div className="relative w-0 h-0 transform-style-3d">
          
          {/* Folder Back */}
          <div 
            ref={folderBackRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video bg-[#141414] rounded-[24px] border border-red-600/40 shadow-[0_20px_50px_rgba(229,9,20,0.25)] flex items-center justify-center"
            style={{ zIndex: 5 }}
          >
            <div className="absolute -top-6 left-6 w-32 h-8 bg-[#1f1f1f] rounded-t-xl border-t border-red-600/30" />
            <div className="relative z-10 text-red-600 font-mono font-black text-2xl tracking-widest uppercase opacity-60">
              ARCHIVE_SLOTS
            </div>
          </div>

          {/* Desktop Project Cards */}
          {projectsData.map((project, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="hidden md:block absolute w-[80vw] md:w-[33vw] max-w-[380px] aspect-[16/10] will-change-transform"
              style={{ zIndex: 10 + i }}
            >
              <div
                onClick={() => project.github && window.open(project.github, '_blank', 'noopener,noreferrer')}
                className={`w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414]/95 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500 group hover:scale-[1.04] hover:border-red-600 hover:shadow-[0_35px_80px_rgba(229,9,20,0.35)] hover:-translate-y-2 relative z-10 p-7 flex flex-col justify-between ${project.github ? 'cursor-pointer' : 'cursor-default'}`}
              >
                
                {/* Top Card Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-2.5 py-1 rounded border border-red-600/20">
                    {project.episode}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-red-400 font-bold">{project.match} Match</span>
                    <span className="text-[10px] font-mono border border-white/30 px-1 text-white/70">
                      {project.demo ? "LIVE" : "HD"}
                    </span>
                  </div>
                </div>

                {/* Middle Title & Description */}
                <div className="space-y-2 my-auto">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-white/40">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Tech Tags + Links */}
                <div className="flex items-end justify-between gap-2 pt-3 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-0.5 rounded group-hover:border-red-600/30 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ProjectLinks project={project} size="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}

          {/* Folder Front Flap */}
          <div 
            ref={folderFrontRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 w-full h-[85%] bg-[#1c1c1c] rounded-b-[24px] rounded-t-md shadow-[0_-5px_20px_rgba(0,0,0,0.8)] flex flex-col justify-end p-6 border-t border-red-600/40">
              <div className="w-20 h-1.5 bg-white/20 rounded-full mx-auto mb-2" />
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Swipeable Carousel */}
      <div 
        ref={mobileCarouselRef}
        onScroll={handleMobileScroll}
        className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-auto py-12 flex items-center gap-6 px-[12.5vw] pointer-events-none z-[100] snap-x snap-mandatory overflow-x-hidden hide-scrollbar"
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        {projectsData.map((project, i) => (
          <div 
            key={`mob-${i}`}
            ref={el => mobileCardsRef.current[i] = el}
            className="shrink-0 w-[78vw] aspect-[16/11] snap-center will-change-transform relative z-10"
          >
            <div
              onClick={() => project.github && window.open(project.github, '_blank', 'noopener,noreferrer')}
              className={`w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414] p-6 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.9)] ${project.github ? 'cursor-pointer' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest text-red-500 bg-red-600/10 px-2 py-0.5 rounded">
                  {project.episode}
                </span>
                <span className="text-xs font-mono text-red-400 font-bold">{project.match} Match</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">{project.title}</h3>
                <p className="text-xs text-white/70 font-light line-clamp-2">{project.description}</p>
              </div>
              <div className="flex items-end justify-between gap-2 pt-2 border-t border-white/10">
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <ProjectLinks project={project} size="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Projects;