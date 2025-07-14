"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { technologies } from "@/data/technologies"

gsap.registerPlugin(ScrollTrigger)

const techGroups = [
  {
    title: "Frontend",
    items: ["React JS", "Next JS", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Node JS", "Firebase", "MongoDB"],
  },
  {
    title: "DevOps",
    items: ["Docker", "Git", "Firebase", "Vercel", "GitHub Actions"],
  },
  {
    title: "Others",
    items: ["SAP Analytics", "RabbitMQ", "Canva", "WordPress"],
  },
]

const TechStack = () => {
  useEffect(() => {
    gsap.fromTo(
      ".tech-icon",
      {
        opacity: 0,
        y: 80,
        rotation: 180,
        scale: 0.5,
      },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".tech-icons-wrapper",
          start: "top 80%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
        },
      },
    )
  }, [])

  return (
    <section>
      
      <div className="flex flex-col gap-10">
        {techGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-xl font-semibold mb-4 text-primary">{group.title}</h3>
            <div className="tech-icons-wrapper flex flex-row flex-wrap justify-center gap-6 md:gap-10">
              {group.items.map((name) => {
                const tech = technologies.find((t) => t.name.toLowerCase() === name.toLowerCase()) || { name, icon: "/placeholder.svg" }
                return (
                  <div className="tech-icon group relative" key={tech.name}>
                    <div className="w-16 h-16 md:w-20 md:h-20 p-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-110 hover:rotate-6 hover:shadow-lg hover:shadow-primary/20">
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                      />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs font-medium text-primary bg-card px-2 py-1 rounded border border-border whitespace-nowrap">
                        {tech.name}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TechStack
