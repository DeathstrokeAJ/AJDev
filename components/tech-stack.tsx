"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { technologies } from "@/data/technologies"

gsap.registerPlugin(ScrollTrigger)

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
      <div className="tech-icons-wrapper flex flex-row flex-wrap justify-center gap-8 md:gap-10">
        {technologies.map((technology) => (
          <div className="tech-icon group relative" key={technology.name}>
            <div className="w-20 h-20 md:w-28 md:h-28 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-110 hover:rotate-6 hover:shadow-lg hover:shadow-primary/20">
              <img
                src={technology.icon || "/placeholder.svg"}
                alt={technology.name}
                className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
              />
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-medium text-primary bg-card px-2 py-1 rounded border border-border whitespace-nowrap">
                {technology.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TechStack
