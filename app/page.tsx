"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Hero from "@/components/hero"
import BentoGrid from "@/components/bento-grid"
import ProjectShowcase from "@/components/project-showcase"
import ResumeTimeline from "@/components/resume-timeline"
import TechStack from "@/components/tech-stack"
import Education from "@/components/education"
import Contact from "@/components/contact"
import EasterEgg from "@/components/easter-egg"

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Set up scroll-based animations
    const ctx = gsap.context(() => {
      // Fade in sections as they come into view
      gsap.utils.toArray<HTMLElement>(".section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={mainRef} className="container mx-auto px-4 py-8">
      <Hero />

      <section id="dashboard" className="section py-16">
        <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Interactive Dashboard</h2>
        <BentoGrid />
      </section>

      <section id="projects" className="section py-16">
        <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Project Showcase</h2>
        <ProjectShowcase />
      </section>

      <section id="tech" className="section py-16">
        <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Technologies & Tools</h2>
        <TechStack />
      </section>

      <section id="resume" className="section py-16">
        <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Experience Timeline</h2>
        <ResumeTimeline />
      </section>

      <section id="education" className="section py-16">
        <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Education</h2>
        <Education />
      </section>

      <section id="contact" className="section py-16">
        <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Get In Touch</h2>
        <Contact />
      </section>

      <EasterEgg />
    </div>
  )
}
