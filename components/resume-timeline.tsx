"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileDown, Calendar, MapPin, ExternalLink } from "lucide-react"
import { experiences } from "@/data/experiences"

const ResumeTimeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
  gsap.registerPlugin(ScrollTrigger)

  const ctx = gsap.context(() => {
    const isMobile = window.innerWidth < 768 // Tailwind's md breakpoint

    gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card, i) => {
      if (isMobile) {
        // Animate on load (no scroll)
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.15, // small stagger for nicer effect
          }
        )
      } else {
        // Animate with scrollTrigger
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: i % 2 === 0 ? -100 : 100,
            y: 50,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    })
  }, timelineRef)

  return () => ctx.revert()
}, [])


  return (
    <div ref={timelineRef} className="relative">
      <div className="flex justify-center mb-12">
        <a href="/assets/Resume.pdf" download>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FileDown className="h-5 w-5 mr-2" />
            Download Resume
          </Button>
        </a>
      </div>

      <div className="card-timeline max-w-6xl mx-auto">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className={`timeline-card ${index % 2 === 0 ? "timeline-card-left" : "timeline-card-right"}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left side content */}
              {index % 2 === 0 ? (
                <>
                  <div className="md:text-right">
                    <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{experience.period}</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                      </div>

                      <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                        {experience.role}
                      </h3>

                      <div className="flex items-center gap-2 mb-3 justify-end">
                        <h4 className="text-lg text-purple-400 font-medium">{experience.company}</h4>
                        <MapPin className="h-4 w-4 text-purple-500" />
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">{experience.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4 justify-end">
                        {experience.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-300 border-purple-500/20 hover:border-purple-500/40 transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {experience.achievements && (
                        <div className="pt-3 border-t border-border/50">
                          <h5 className="text-sm font-medium mb-2 text-purple-400">Key Achievements</h5>
                          <ul className="space-y-1">
                            {experience.achievements.map((achievement, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2 justify-end">
                                <span>{achievement}</span>
                                <span className="text-purple-500 mt-1">•</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {experience.link && (
                        <div className="mt-4 text-right">
                          <a
                            href={experience.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            View Project <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="hidden md:block"></div>
                </>
              ) : (
                <>
                  <div className="hidden md:block"></div>
                  <div>
                    <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{experience.period}</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                      </div>

                      <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                        {experience.role}
                      </h3>

                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-4 w-4 text-purple-500" />
                        <h4 className="text-lg text-purple-400 font-medium">{experience.company}</h4>
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">{experience.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {experience.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-300 border-purple-500/20 hover:border-purple-500/40 transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {experience.achievements && (
                        <div className="pt-3 border-t border-border/50">
                          <h5 className="text-sm font-medium mb-2 text-purple-400">Key Achievements</h5>
                          <ul className="space-y-1">
                            {experience.achievements.map((achievement, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-purple-500 mt-1">•</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {experience.link && (
                        <div className="mt-4">
                          <a
                            href={experience.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            View Project <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResumeTimeline
