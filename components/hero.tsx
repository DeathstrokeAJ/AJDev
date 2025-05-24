"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react"
import TypewriterComponent from "typewriter-effect"
import ComputersCanvas from "@/components/computers-canvas"

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate name reveal
      if (nameRef.current) {
        gsap.from(nameRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "back.out(1.7)",
        })
      }

      // Animate hero icons
      gsap.from(".hero-icon", {
        opacity: 0,
        scale: 0,
        rotation: 180,
        stagger: 0.1,
        duration: 1,
        delay: 0.5,
        ease: "back.out(1.7)",
      })

      // Animate social icons
      gsap.from(".social-icon", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        delay: 1,
        ease: "power3.out",
      })

      // Animate CTA button
      gsap.from(".cta-button", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 1.2,
        ease: "power3.out",
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div ref={heroRef} className="min-h-screen flex items-center justify-center pt-16 pb-8">
      {isMobile ? (
        // Mobile layout - stacked vertically
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          {/* Content */}
          <div className="text-center mb-8">
            <h1 ref={nameRef} className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
              Adithya Parambil
            </h1>

            <div className="text-xl md:text-2xl font-medium mb-6 h-12 flex justify-center items-center">
              <TypewriterComponent
                options={{
                  strings: [
                    "Full Stack Developer",
                    "Mobile App Developer",
                    "React / React Native Specialist",
                    "UI/UX Enthusiast",
                  ],
                  autoStart: true,
                  loop: true,
                  wrapperClassName: "typing-effect text-primary",
                  cursorClassName: "text-primary",
                }}
              />
            </div>

            {/* Colorful Hero Icons */}
            <div className="flex justify-center space-x-4 mb-6">
              <div className="hero-icon w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-3 hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z" />
                </svg>
              </div>
              <div className="hero-icon w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-teal-600 p-3 hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                  <path d="M17 7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h10c2.76 0 5-2.24 5-5s-2.24-5-5-5zM7 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                </svg>
              </div>
              <div className="hero-icon w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-600 p-3 hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                  <path d="M7 2v11h3v9l7-12h-4l4-8z" />
                </svg>
              </div>
              <div className="hero-icon w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 p-3 hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                  <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 4h10v16H7V4z" />
                </svg>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Crafting beautiful, responsive web applications and mobile experiences with modern technologies. Passionate
              about creating seamless user interfaces and robust backend solutions.
            </p>

            <div className="flex justify-center space-x-4 mb-8">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </a>
              <a href="mailto:contact@example.com" className="social-icon">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Button>
              </a>
              <a href="/resume.pdf" download className="social-icon">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <FileText className="h-5 w-5" />
                  <span className="sr-only">Resume</span>
                </Button>
              </a>
            </div>

            <a href="#dashboard" className="cta-button inline-block">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
              >
                Explore My Work
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
            </a>
          </div>

          {/* 3D Canvas - Below content in mobile */}
          <div className="w-full h-[350px] mt-4">
            <ComputersCanvas isMobile={isMobile} />
          </div>
        </div>
      ) : (
        // Desktop layout - side by side
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 ref={nameRef} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 gradient-text">
              Adithya Parambil
            </h1>

            <div className="text-xl md:text-2xl font-medium mb-6 h-12 flex justify-center lg:justify-start items-center">
              <TypewriterComponent
                options={{
                  strings: [
                    "Full Stack Developer",
                    "Mobile App Developer",
                    "React / React Native Specialist",
                    "UI/UX Enthusiast",
                  ],
                  autoStart: true,
                  loop: true,
                  wrapperClassName: "typing-effect text-primary",
                  cursorClassName: "text-primary",
                }}
              />
            </div>

            {/* Colorful Hero Icons */}
            <div className="flex justify-center lg:justify-start space-x-4 mb-6">
              <div className="hero-icon w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-3 hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z" />
                </svg>
              </div>
              <div className="hero-icon w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-teal-600 p-3 hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                  <path d="M17 7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h10c2.76 0 5-2.24 5-5s-2.24-5-5-5zM7 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                </svg>
              </div>
              <div className="hero-icon w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-600 p-3 hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                  <path d="M7 2v11h3v9l7-12h-4l4-8z" />
                </svg>
              </div>
              <div className="hero-icon w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 p-3 hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                  <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 4h10v16H7V4z" />
                </svg>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Crafting beautiful, responsive web applications and mobile experiences with modern technologies. Passionate
              about creating seamless user interfaces and robust backend solutions.
            </p>

            <div className="flex justify-center lg:justify-start space-x-4 mb-8">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </a>
              <a href="mailto:contact@example.com" className="social-icon">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Button>
              </a>
              <a href="/resume.pdf" download className="social-icon">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <FileText className="h-5 w-5" />
                  <span className="sr-only">Resume</span>
                </Button>
              </a>
            </div>

            <a href="#dashboard" className="cta-button inline-block">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
              >
                Explore My Work
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
            </a>
          </div>

          {/* Right side - 3D Canvas */}
          <div className="order-1 lg:order-2 h-[600px]">
            <ComputersCanvas isMobile={isMobile} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Hero
