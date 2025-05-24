"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GraduationCap, Award, Calendar, MapPin, Trophy, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { education } from "@/data/education"

const Education = () => {
  const educationRef = useRef<HTMLDivElement>(null)
  const [selectedEducation, setSelectedEducation] = useState<(typeof education)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate education cards
      gsap.utils.toArray<HTMLElement>(".education-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: i * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    }, educationRef)

    return () => ctx.revert()
  }, [])

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newIndex = currentIndex === 0 ? education.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    setSelectedEducation(education[newIndex])
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newIndex = currentIndex === education.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    setSelectedEducation(education[newIndex])
  }

  return (
    <>
      <div ref={educationRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {education.map((item, index) => (
          <div
            key={index}
            className="education-card group cursor-pointer"
            onClick={() => {
              setSelectedEducation(item)
              setCurrentIndex(index)
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{item.period}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
              {item.degree}
            </h3>

            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-purple-500" />
              <h4 className="text-lg text-purple-400 font-medium">{item.institution}</h4>
            </div>

            <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{item.description}</p>

            {item.grade && (
              <div className="mb-3">
                <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30">
                  {item.grade}
                </Badge>
              </div>
            )}

            {item.achievements && item.achievements.length > 0 && (
              <div className="pt-3 border-t border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-400">
                    {item.achievements.length} Achievement{item.achievements.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">Click to view all achievements</div>
              </div>
            )}

            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedEducation} onOpenChange={(open) => !open && setSelectedEducation(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                <GraduationCap className="h-6 w-6 text-purple-400" />
              </div>
              {selectedEducation?.degree}
            </DialogTitle>
            <DialogDescription className="text-lg">
              {selectedEducation?.institution} • {selectedEducation?.period}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            <p className="text-muted-foreground mb-6 leading-relaxed">{selectedEducation?.description}</p>

            {selectedEducation?.grade && (
              <div className="mb-6">
                <h4 className="font-medium mb-2 text-purple-400">Academic Performance</h4>
                <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30 text-base px-3 py-1">
                  {selectedEducation.grade}
                </Badge>
              </div>
            )}

            {selectedEducation?.achievements && selectedEducation.achievements.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium mb-3 flex items-center gap-2 text-purple-400">
                  <Award className="h-5 w-5" /> Achievements & Recognition
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedEducation.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-card/50 border border-border/50">
                      <Trophy className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedEducation?.subjects && (
              <div className="mb-6">
                <h4 className="font-medium mb-3 text-purple-400">Key Subjects</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEducation.subjects.map((subject) => (
                    <Badge
                      key={subject}
                      variant="secondary"
                      className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-300 border-purple-500/20"
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-border/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevious}
              className="flex items-center gap-2 hover:text-purple-400"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {education.length}
            </span>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleNext}
              className="flex items-center gap-2 hover:text-purple-400"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Education
