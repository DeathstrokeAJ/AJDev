"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { skillCategories } from "@/data/skills"

const SkillsTiles = () => {
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate skill categories
      gsap.utils.toArray<HTMLElement>(".skill-category").forEach((category, i) => {
        gsap.fromTo(
          category,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.2,
            scrollTrigger: {
              trigger: category,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })

      // Animate skill items
      gsap.utils.toArray<HTMLElement>(".skill-item").forEach((item) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    }, skillsRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={skillsRef} className="space-y-12">
      {skillCategories.map((category) => (
        <div key={category.name} className="skill-category">
          <div className="flex items-center gap-2 mb-6">
            <category.icon className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">{category.name}</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {category.skills.map((skill) => (
              <div
                key={skill.name}
                className="skill-item flex flex-col items-center p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-3">
                  {skill.icon ? (
                    <skill.icon className="h-8 w-8 text-primary" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {skill.name.charAt(0)}
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium text-center">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkillsTiles
