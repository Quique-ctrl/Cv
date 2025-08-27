"use client";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import ThemeToggle from "@/components/ThemeToggle";
import { profile, skills, projects, experience, education, certifications } from "@/data/profile";
import { FaMapMarkerAlt, FaRegCalendarAlt, FaEnvelope, FaPhoneAlt, FaLinkedin } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import Image from "next/image";

interface TypingTextProps {
  text: string;
  speed?: number;
}

// Typing effect component
function TypingText({ text, speed = 35 }: TypingTextProps) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return (
    <span>
      {display}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// Skills data
const skillLevels = {
  "JavaScript": 60,
  "TypeScript": 50,
  "React": 70,
  "Node.js": 65,
  "Express": 75,
  "SQL": 70,
  "NoSQL": 70,
  "UI/UX": 40,
};

export default function Page() {
  // Confetti on CV download
  const handleConfetti = () => {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
  };

  // Para animar las barras de skills
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (skillsRef.current) {
        const rect = skillsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) setSkillsVisible(true);
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main id="top">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/60 dark:bg-black/40 border-b border-neutral-200/60 dark:border-neutral-800/60">
        <nav className="container-page h-14 flex items-center justify-between">
          <a href="#top" className="font-semibold">{profile.handle}</a>
          <div className="flex items-center gap-3 text-sm">
            <a href="#proyectos" className="hover:underline">Proyectos</a>
            <a href="#experiencia" className="hover:underline">Experiencia</a>
            <a href="#contacto" className="hover:underline">Contacto</a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* HERO */}
      <Section>
        <div className="card p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="relative flex flex-col items-center">
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={256} // o el tamaño real de tu imagen
                height={256}
                className="h-52 w-52 md:h-64 md:w-64 rounded-full object-cover border-4 border-white shadow-2xl dark:border-neutral-900 transition-all duration-300 hover:scale-105 hover:shadow-3xl profile-pic"
                style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)" }}
              />
            </div>
            <div className="flex-1 flex flex-col gap-4 items-center md:items-start">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center md:text-left">{profile.name}</h1>
              <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 text-center md:text-left max-w-xl">
                <TypingText text={profile.tagline} />
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {skills.slice(0, 8).map((s) => (
                  <span key={s} className="text-xs rounded-full border border-neutral-300/60 dark:border-neutral-700/60 px-2 py-0.5 bg-white/70 dark:bg-neutral-900/60 shadow-sm hover:scale-105 transition">{s}</span>
                ))}
              </div>
              <div className="flex gap-4 pt-2">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 rounded-full bg-black text-white dark:bg-white dark:text-black px-5 py-2 text-sm font-semibold shadow hover:scale-105 hover:bg-neutral-900 dark:hover:bg-neutral-200 transition button-pulse"
                >
                  <span>🤝</span> Contactar
                </a>
                <a
                  href={profile.cvUrl}
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold shadow hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                  onClick={handleConfetti}
                >
                  <svg width="18" height="18" fill="none"><path d="M9 2v10m0 0l-4-4m4 4l4-4M3 16h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Descargar CV
                </a>
              </div>
              <div className="flex gap-4 pt-2 text-neutral-500 dark:text-neutral-400 text-sm">
                <span className="inline-flex items-center gap-1"><FaMapMarkerAlt /> {profile.location}</span>
                <span className="inline-flex items-center gap-1"><FaRegCalendarAlt /> {profile.availability}</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SOBRE MÍ + SKILLS COMPACTAS */}
      <Section title="Sobre mí">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-6 md:col-span-2 flex flex-col gap-3">
            <h2 className="text-xl font-semibold mb-2">Sobre mí</h2>
            <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
              Soy un desarrollador orientado a producto. Me gustan las interfaces limpias,
              accesibles y con micro-interacciones discretas. Busco roles de Frontend/Full-stack.
            </p>
            {/* Skills compactas tipo gráfica */}
            <div ref={skillsRef} className="skills-graph">
              {Object.entries(skillLevels).map(([skill, level]) => (
                <div key={skill}>
                  <div className="skill-label-row">
                    <span>{skill}</span>
                    <span>{level}%</span>
                  </div>
                  <div className="skill-bar-compact-bg">
                    <div
                      className={`skill-bar-compact-fill${skillsVisible ? " visible" : ""}`}
                      style={{ width: skillsVisible ? `${level}%` : 0 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-6 flex flex-col gap-4 items-start">
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <FaMapMarkerAlt />
              <span className="text-xs">Ubicación</span>
            </div>
            <p className="font-medium">{profile.location}</p>
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 mt-2">
              <FaRegCalendarAlt />
              <span className="text-xs">Disponibilidad</span>
            </div>
            <p className="font-medium">{profile.availability}</p>
          </div>
        </div>
      </Section>

      {/* PROYECTOS */}
      <Section id="proyectos" title="Proyectos">
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p) => <ProjectCard key={p.title} {...p} />)}
        </div>
      </Section>

      {/* EXPERIENCIA */}
      <Section id="experiencia" title="Experiencia">
        <ul className="space-y-4">
          {experience.map((e) => (
            <li key={e.role} className="card p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">{e.role}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{e.company}</p>
                </div>
                <span className="text-xs text-neutral-600 dark:text-neutral-400 whitespace-nowrap">{e.period}</span>
              </div>
              <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {e.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      {/* EDUCACIÓN */}
      <Section id="educacion" title="Educación">
        <ul className="space-y-4">
          {education.map((e) => (
            <li key={e.school} className="card p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">{e.school}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{e.degree}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">{e.place}</p>
                </div>
                <span className="text-xs text-neutral-600 dark:text-neutral-400 whitespace-nowrap">{e.period}</span>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* FORMACIÓN ADICIONAL / CERTIFICACIONES */}
      <Section id="formacion" title="Formación adicional">
        <ul className="space-y-3">
          {certifications.map((c) => (
            <li key={c.name} className="flex items-center justify-between gap-4 card p-4">
              <span className="text-sm">{c.name}</span>
              <span className="text-xs text-neutral-600 dark:text-neutral-400">{c.date}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* CONTACTO */}
      <Section id="contacto" title="Contacto">
        <div className="card p-8 flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-2">¿Colaboramos?</h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex flex-col gap-2 text-base">
              <a className="inline-flex items-center gap-2 underline hover:text-blue-600 transition" href={`mailto:${profile.email}`}>
                <FaEnvelope /> {profile.email}
              </a>
              <a className="inline-flex items-center gap-2 underline hover:text-blue-600 transition" href={`tel:${profile.phone}`}>
                <FaPhoneAlt /> {profile.phone}
              </a>
              <a className="inline-flex items-center gap-2 underline hover:text-blue-600 transition" href={profile.linkedin} target="_blank" rel="noreferrer">
                <FaLinkedin /> LinkedIn
              </a>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <span className="text-neutral-500 dark:text-neutral-400 text-sm">¡Estoy abierto a nuevas oportunidades y colaboraciones!</span>
            </div>
          </div>
        </div>
      </Section>

      <footer className="container-page py-10 text-center text-sm text-neutral-600 dark:text-neutral-400">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </main>
  );
}