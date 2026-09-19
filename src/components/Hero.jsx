import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import pictureImg from '../assets/Portfolio/picture.png';

const Hero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const contentRef = useRef(null);

  const developerRoles = [
    'FEATURE FILM // FULL-STACK ENGINEER',
    'ORIGINAL SERIES // DISTRIBUTED SYSTEMS',
    'BLOCKBUSTER // PAYMENT ORCHESTRATION',
    'ACCLAIMED // COMPETITIVE PROGRAMMER'
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    if (!section || !card || !content) return;

    // --- GSAP CINEMATIC ENTRANCE ANIMATION ---
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      section.querySelector('header'),
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(
      content.querySelectorAll('.hero-anim-item'),
      { y: 50, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.12 },
      "-=0.7"
    )
    .fromTo(
      card,
      { scale: 0.75, opacity: 0, rotationY: 35, rotationX: -15 },
      { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, duration: 1.4, ease: "back.out(1.2)" },
      "-=0.9"
    );

    // --- MOUSE PHYSICS & SPOTLIGHT TRACKING ---
    gsap.set([cursorDotRef.current, cursorRingRef.current], {
      scale: 0.5,
      opacity: 0,
      transformOrigin: "50% 50%"
    });

    const xToDot = gsap.quickTo(cursorDotRef.current, "x", { duration: 0.05, ease: "power2.out" });
    const yToDot = gsap.quickTo(cursorDotRef.current, "y", { duration: 0.05, ease: "power2.out" });
    
    const xToRing = gsap.quickTo(cursorRingRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const yToRing = gsap.quickTo(cursorRingRef.current, "y", { duration: 0.15, ease: "power3.out" });

    const xTilt = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3.out" });
    const yTilt = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3.out" });
    const glareX = gsap.quickTo(glareRef.current, "x", { duration: 0.3, ease: "power2.out" });
    const glareY = gsap.quickTo(glareRef.current, "y", { duration: 0.3, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dotSize = 12;
      const ringSize = 48;

      // Update Spotlight position instantly via inline style
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }

      // Update Custom Cursor coordinates
      xToDot(x - dotSize / 2);
      yToDot(y - dotSize / 2);
      xToRing(x - ringSize / 2);
      yToRing(y - ringSize / 2);

      // Card 3D Perspective Calculations
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
      const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

      const rotateX = -((y - cardCenterY) / (cardRect.height / 2)) * 16;
      const rotateY = ((x - cardCenterX) / (cardRect.width / 2)) * 16;

      xTilt(rotateY);
      yTilt(rotateX);

      // Holographic Glare mapping
      glareX((x - cardRect.left) - cardRect.width / 2);
      glareY((y - cardRect.top) - cardRect.height / 2);
    };

    const handleMouseEnter = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power2.inOut"
      });
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
      xTilt(0);
      yTilt(0);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen lg:h-screen bg-[#050505] lg:overflow-hidden flex flex-col justify-between select-none cursor-none"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>

      {/* 1. Cinematic Background Gradient & Marquee */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/90 to-[#050505] z-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...developerRoles, ...developerRoles].map((role, idx) => (
              <span key={idx} className="text-[14vw] font-black text-red-600 mx-8 uppercase tracking-tighter">
                {role} &bull;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Direct Mouse Tracking Spotlight Beam (Glows wherever you move) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(229,9,20,0.35) 0%, rgba(229,9,20,0.1) 40%, transparent 70%)'
        }}
      ></div>

      {/* 3. Main Content Layer */}
      <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:h-full flex flex-col justify-between pt-28 pb-16 lg:pt-24 lg:pb-12 gap-10 lg:gap-0">
        
        {/* Top Netflix Cinematic Badge */}
        <div className="hero-anim-item flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-red-500 font-bold tracking-wider">DEVELOPER SERIES</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">SEASONS 2024 - 2026</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/50 tracking-wider">
             <span className="flex items-center gap-1.5 px-2 py-0.5 border border-green-500/40 rounded bg-green-500/10 text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              OPEN TO WORK
            </span>
            <span className="px-2 py-0.5 border border-white/20 rounded bg-black/40">FULL-STACK 4K</span>
            <span className="px-2 py-0.5 border border-white/20 rounded bg-black/40">AI / ML CERTIFIED</span>
          </div>
        </div>

        {/* Main Center Cinematic Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 my-auto">
          
          {/* Left Side: Developer Story & Description */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-5 text-left">
            
            <div className="hero-anim-item flex items-center gap-3">
              <span className="px-2.5 py-0.5 bg-red-600 text-white font-black text-xs rounded tracking-widest shadow-[0_0_20px_rgba(229,9,20,0.8)] animate-pulse">CF MASTER</span>
              <span className="text-white/80 text-xs font-mono tracking-widest uppercase">Software Developer</span>
              <span className="text-white/80 text-xs font-mono tracking-widest uppercase">· Full-Stack Engineer</span>
            </div>

            <h1 className="hero-anim-item text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              ANIMESH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_35px_rgba(220,38,38,0.5)]">
                TIWARI
              </span>
            </h1>

             <div className="hero-anim-item flex flex-nowrap items-stretch gap-2 sm:gap-3 w-full">
              <div className="flex items-center gap-2 px-2.5 sm:px-3 py-2 sm:py-2.5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md min-w-0 flex-1 min-h-[54px]">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-600 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 21V9l8-5 8 5v12M4 21h16M9 21v-6h6v6" />
                  </svg>
                </div>
                <div className="leading-tight min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">NIT Raipur</div>
                  <div className="text-[10px] sm:text-xs text-white/50 whitespace-nowrap">B.Tech</div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-2.5 sm:px-3 py-2 sm:py-2.5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md min-w-0 flex-1 min-h-[54px]">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-600 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 9l10 6 10-6-10-6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" />
                  </svg>
                </div>
                <div className="leading-tight min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">Information</div>
                  <div className="text-[10px] sm:text-xs font-bold text-white whitespace-nowrap">Technology</div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-2.5 sm:px-3 py-2 sm:py-2.5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md min-w-0 flex-1 min-h-[54px]">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-600 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="5" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4M3 10h18" />
                  </svg>
                </div>
                <div className="leading-tight min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">2020 - 2024</div>
                  <div className="text-[10px] sm:text-xs text-white/50 whitespace-nowrap">Batch</div>
                </div>
              </div>
            </div>

            <p className="hero-anim-item text-sm md:text-base text-white/80 font-light leading-relaxed max-w-md drop-shadow">
              Engineering distributed payment systems, event-driven backends, and full-stack platforms — with a research and competitive-programming edge.
            </p>

            {/* Action Button Set */}
            <div className="hero-anim-item flex items-center gap-4 pt-2 flex-wrap">
              <a
                href="#projects"
                className="px-8 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.3)] flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-800 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Contact Me
              </a>
              <a
                href="/Animesh_Tiwari_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-white/80 border border-white/15 font-bold text-xs uppercase tracking-widest rounded hover:border-red-600/60 hover:text-red-500 transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                </svg>
                Resume
              </a>
            </div>
          </div>

          {/* Center: Interactive 3D Holographic Tilt Developer Poster Frame */}
          <div className="lg:col-span-4 flex justify-center perspective-[1200px]">
            <div 
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform"
            >
              {/* Cinematic Red Neon Back Glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-red-600/70 via-rose-600/40 to-purple-600/20 rounded-3xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000"></div>
              
              {/* Poster Card with Glossy Sheen */}
              <div className="relative w-[280px] md:w-[320px] p-3.5 bg-[#141414]/90 backdrop-blur-2xl rounded-2xl border border-red-600/40 shadow-[0_40px_80px_rgba(0,0,0,0.95)] overflow-hidden">
                
                {/* Dynamic Specular Glare Layer */}
                <div 
                  ref={glareRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-40"
                ></div>

                {/* Netflix Series Tag */}
                <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-red-600 text-white font-mono text-[10px] font-bold tracking-widest rounded shadow-xl">
                  FEATURED DEV
                </div>

                <img
                  src={pictureImg}
                  alt="Developer Portrait"
                  className="w-full h-[330px] md:h-[390px] object-cover rounded-xl filter contrast-125 brightness-105 group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Technical Specs & Stack */}
          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right">
            <div className="p-5 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl max-w-xs">
              <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold mb-2">Selected Achievements</h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                <li>Google Summer of Code 2022</li>
                <li>IEEE Published Researcher 2024</li>
                <li>Codeforces Master (Rating 2133)</li>
                <li>Codeforces 6 <span style={{ color: "gold", fontSize: "1.05rem" }}>★</span> (Rating 2308)</li>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Cinematic Ticker */}
        <div className="hero-anim-item flex items-center justify-between text-xs font-mono text-white/50 tracking-widest uppercase">
          <span>ENGINEERED FOR SCALABILITY</span>
          <span>[ PORTFOLIO RELEASE v2.6 ]</span>
        </div>
      </div>

      {/* 4. Ultra Pro Max Custom Precision Cursor Suite */}
      <div
        ref={cursorDotRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-3 h-3 bg-red-600 rounded-full shadow-[0_0_15px_#E50914]"
      ></div>

      <div
        ref={cursorRingRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-12 h-12 border border-red-600/60 rounded-full flex items-center justify-center backdrop-blur-[1px]"
      ></div>

      {/* --- NETFLIX-THEMED DEVELOPER NAVBAR --- */}
      <header className="absolute top-0 left-0 z-50 w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between pointer-events-auto">
        <div className="text-2xl font-black text-red-600 tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(229,9,20,0.9)]">
          ANIMESH<span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/80">
          <a href="#home" className="hover:text-red-500 transition-colors">Home</a>
          <a href="#about" className="hover:text-red-500 transition-colors">About</a>
          <a href="#experience" className="hover:text-red-500 transition-colors">Experience</a>
          <a href="#skills" className="hover:text-red-500 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-red-500 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-red-500 transition-colors">Contact</a>
          <a
            href="/Animesh_Tiwari_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-400 transition-colors"
          >
            Resume
          </a>
        </nav>
        <a
          href="#contact"
          className="px-5 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.6)] hover:scale-105 active:scale-95"
        >
          Hire Me
        </a>
      </header>
    </section>
  );
};

export default Hero;