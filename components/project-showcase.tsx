"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Github, ExternalLink, X, ChevronLeft, ChevronRight, Zap, Star, Eye, Code2, Sparkles } from "lucide-react"
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
  const [isLoading, setIsLoading] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLoading(true)
    const newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    setSelectedProject(projects[newIndex])
    setTimeout(() => setIsLoading(false), 300)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLoading(true)
    const newIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    setSelectedProject(projects[newIndex])
    setTimeout(() => setIsLoading(false), 300)
  }

  const handleProjectClick = (project: typeof projects[0], index: number) => {
    setSelectedProject(project)
    setCurrentIndex(index)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedProject) return
      
      if (e.key === 'ArrowLeft') {
        handlePrevious(e as any)
      } else if (e.key === 'ArrowRight') {
        handleNext(e as any)
      } else if (e.key === 'Escape') {
        setSelectedProject(null)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedProject, currentIndex])

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Featured Projects</span>
          </div>
          
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.slice(0, 5).map((project, index) => (
            <div
              key={project.title}
              className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 cursor-pointer hover:-translate-y-1 ${
                hoveredIndex === index ? 'scale-[1.02]' : ''
              }`}
              onClick={() => handleProjectClick(project, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Project Preview */}
              <div className="aspect-video relative overflow-hidden bg-muted/30">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <iframe
                  src={project.webviewUrl}
                  title={project.title}
                  className="w-full h-full min-h-[200px] border-none rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
                  <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 text-white/90">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm font-medium">View Project</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <p className="text-sm text-white/80 line-clamp-2">{project.summary}</p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
                    <Zap className="h-3 w-3 mr-1" />
                    Live
                  </Badge>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm">Featured</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.summary}</p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs hover:bg-primary/10 transition-colors">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Features Preview */}
                {project.features && (
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Code2 className="h-3 w-3" />
                      Key Features
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {project.features.slice(0, 2).map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  {project.demoUrl && (
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.demoUrl, '_blank')
                      }}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 hover:bg-secondary/80 transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.githubUrl, '_blank')
                      }}
                    >
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden bg-card/95 backdrop-blur-xl border-border/50">
          {/* Modal Header */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b border-border/50 p-6">
            <DialogHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <DialogTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {selectedProject?.title}
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground">
                    {selectedProject?.description}
                  </DialogDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    Project {currentIndex + 1} of {projects.length}
                  </Badge>
                </div>
              </div>
              
              {/* Project Meta */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Code2 className="h-4 w-4" />
                  <span>{selectedProject?.technologies.length} Technologies</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current" />
                  <span>Featured Project</span>
                </div>
              </div>
            </DialogHeader>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
            <div className="p-6 space-y-8">
              {/* Project Preview */}
              <div className="relative">
                <div className="aspect-video relative rounded-xl overflow-hidden bg-muted/30 border border-border/50">
                  {selectedProject && (
                    <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
                      <iframe
                        src={selectedProject.webviewUrl}
                        title={selectedProject.title}
                        className="w-full h-full min-h-[300px] md:min-h-[400px] border-none rounded-xl"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-popups"
                      />
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-110"
                    onClick={handlePrevious}
                    disabled={isLoading}
                  >
                    <ChevronLeft className="h-5 w-5" />
                    <span className="sr-only">Previous project</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-110"
                    onClick={handleNext}
                    disabled={isLoading}
                  >
                    <ChevronRight className="h-5 w-5" />
                    <span className="sr-only">Next project</span>
                  </Button>

                  {/* Loading Indicator */}
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
                    </div>
                  )}
                </div>

                {/* Quick Navigation Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentIndex ? 'bg-primary scale-125' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                      onClick={() => {
                        setCurrentIndex(index)
                        setSelectedProject(projects[index])
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Technologies */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Code2 className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold">Tech Stack</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject?.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="hover:bg-primary/10 transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold">Key Features</h4>
                  </div>
                  <ul className="space-y-2">
                    {selectedProject?.features?.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-border/50">
                {selectedProject?.demoUrl && (
                  <Button 
                    variant="default" 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200"
                    onClick={() => window.open(selectedProject.demoUrl, '_blank')}
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    View Live Demo
                  </Button>
                )}
                {selectedProject?.githubUrl && (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="hover:bg-secondary/80 transition-all duration-200"
                    onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                  >
                    <Github className="h-5 w-5 mr-2" />
                    View Source Code
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Close Button */}
          <DialogClose asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 z-20 bg-background/80 hover:bg-background/90 backdrop-blur-sm rounded-full border border-border/50"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--muted));
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--muted-foreground) / 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground) / 0.5);
        }
      `}</style>
    </>
  )
}

export default ProjectShowcase