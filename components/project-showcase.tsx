"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Github, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { projects } from "@/data/projects"

const ProjectShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
    setSelectedProject(projects[currentIndex === 0 ? projects.length - 1 : currentIndex - 1])
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
    setSelectedProject(projects[currentIndex === projects.length - 1 ? 0 : currentIndex + 1])
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50 cursor-pointer"
            onClick={() => {
              setSelectedProject(project)
              setCurrentIndex(index)
            }}
          >
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <p className="text-sm text-white/80 line-clamp-2">{project.description}</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{project.title}</h3>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedProject?.title}</DialogTitle>
            <DialogDescription>{selectedProject?.description}</DialogDescription>
          </DialogHeader>

          <div className="mt-4 aspect-video relative rounded-lg overflow-hidden">
            {selectedProject && (
              <Image
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            )}

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous project</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
              onClick={handleNext}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next project</span>
            </Button>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-1 mb-4">
              {selectedProject?.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {selectedProject?.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Button variant="default" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" /> Live Demo
                  </Button>
                </a>
              )}

              {selectedProject?.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4 mr-1" /> View Code
                  </Button>
                </a>
              )}
            </div>
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

export default ProjectShowcase
