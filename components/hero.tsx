"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, FileText, Code, Palette, Database, Smartphone } from "lucide-react"

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const [currentRole, setCurrentRole] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const roles = [
    "Full Stack Developer",
    "React Specialist", 
    "UI/UX Designer",
    "Mobile Developer"
  ]

  useEffect(() => {
    setIsVisible(true)
    
    // Animate role switching
    const interval = setInterval(() => {
      setCurrentRole(prev => (prev + 1) % roles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const skillIcons = [
    { 
      icon: Code, 
      label: "Development",
      gradient: "from-blue-500 to-purple-600",
      description: "Full Stack"
    },
    { 
      icon: Palette, 
      label: "Design",
      gradient: "from-purple-500 to-pink-600",
      description: "UI/UX"
    },
    { 
      icon: Database, 
      label: "Backend",
      gradient: "from-green-500 to-teal-600",
      description: "Scalable"
    },
    { 
      icon: Smartphone, 
      label: "Mobile",
      gradient: "from-orange-500 to-red-600",
      description: "Cross Platform"
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      url: "https://github.com/DeathstrokeAJ",
      username: "DeathstrokeAJ",
      color: "text-gray-400 hover:text-white"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://linkedin.com/in/adithya-parambil",
      username: "adithya-parambil",
      color: "text-blue-400 hover:text-blue-300"
    },
    {
      icon: Mail,
      label: "Email",
      url: "mailto:adithyaj2910@gmail.com",
      username: "adithyaj2910@gmail.com",
      color: "text-purple-400 hover:text-purple-300"
    }
  ]

  return (
    <div 
      ref={heroRef} 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Name and Title */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 
              ref={nameRef} 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Adithya Parambil
            </h1>
            
            <div className="text-xl sm:text-2xl md:text-3xl font-medium mb-6 h-12 flex justify-center items-center">
              <span className="text-muted-foreground">
                {roles.map((role, index) => (
                  <span
                    key={role}
                    className={`absolute transition-all duration-500 ${
                      index === currentRole 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-2'
                    }`}
                  >
                    {role}
                  </span>
                ))}
              </span>
            </div>
          </div>

          {/* Skills Icons */}
          <div className={`flex justify-center items-center gap-4 sm:gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {skillIcons.map((skill, index) => (
              <div
                key={skill.label}
                className={`group relative transition-all duration-500 delay-${index * 100}`}
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${skill.gradient} p-4 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 cursor-pointer`}>
                  <skill.icon className="w-full h-full text-white" />
                </div>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
                    <p className="text-xs font-medium">{skill.label}</p>
                    <p className="text-xs text-muted-foreground">{skill.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Full-stack developer building scalable web applications with{" "}
              <span className="text-primary font-medium">React, TypeScript, and Firebase</span>. 
              I've deployed <span className="text-primary font-medium">7+ projects</span> spanning ERP systems, 
              SaaS dashboards, and IoT backends.
            </p>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:border-primary/50 transition-colors">
                <div className="text-2xl font-bold text-primary mb-1">7+</div>
                <div className="text-sm text-muted-foreground">Deployed Projects</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:border-primary/50 transition-colors">
                <div className="text-2xl font-bold text-primary mb-1">IEEE</div>
                <div className="text-sm text-muted-foreground">Published Author</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:border-primary/50 transition-colors">
                <div className="text-2xl font-bold text-primary mb-1">SMB</div>
                <div className="text-sm text-muted-foreground">Business OS Platform</div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl hover:border-primary/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-blue-500/30 transition-all duration-300">
                    <social.icon className={`h-5 w-5 ${social.color} transition-colors`} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">{social.label}</div>
                    <div className="text-xs text-muted-foreground">{social.username}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row justify-center items-center gap-4 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a href="#dashboard" className="inline-block">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300 px-8"
              >
                Explore My Work
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
            </a>
            
            <a href="/resume.pdf" download>
              <Button
                variant="outline"
                size="lg"
                className="group hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-8"
              >
                <FileText className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse mt-2" />
        </div>
      </div>
    </div>
  )
}

export default Hero