"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  ArrowDown, Github, Linkedin, Mail, FileText, 
  Code, Palette, Database, Smartphone 
} from "lucide-react"
import { technologies } from "@/data/technologies"
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentRole, setCurrentRole] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const particlesRef = useRef<any[]>([])
  const animationRef = useRef<number>()

  const roles = [
    "Full Stack Developer",
    "SaaS Builder",
    "NPM Package Builder",
    "Content Creator",
    "Mobile Developer"
  ]

  /** ------------------ PARTICLE SYSTEM ------------------ */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const initParticles = () => {
      particlesRef.current = []
      const particleCount = Math.min(120, Math.floor(window.innerWidth / 12))
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.4 + 0.1,
          hue: Math.random() * 60 + 200,
          life: Math.random() * 100,
          maxLife: Math.random() * 120 + 60
        })
      }
    }
    initParticles()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach(p => {
        const dx = mousePos.x - p.x
        const dy = mousePos.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 100) {
          const force = (100 - dist) / 100
          p.vx += dx * force * 0.0006
          p.vy += dy * force * 0.0006
        }

        p.x += p.vx
        p.y += p.vy
        p.life++

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        if (p.life > p.maxLife) {
          p.x = Math.random() * canvas.width
          p.y = Math.random() * canvas.height
          p.life = 0
          p.opacity = Math.random() * 0.4 + 0.1
        }

        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 2
        )
        gradient.addColorStop(0, `hsla(${p.hue}, 80%, 65%, ${p.opacity})`)
        gradient.addColorStop(1, `hsla(${p.hue}, 80%, 55%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current!)
    }
  }, [mousePos])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentRole(prev => (prev + 1) % roles.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  /** ------------------ SKILLS & LINKS ------------------ */
 const skillIcons = [
  { 
    icon: "/assets/tech/reactjs.png", 
    label: "React JS", 
    gradient: "from-blue-500 via-cyan-400 to-teal-500" 
  },
  { 
    icon: "/assets/tech/nextjs.png", 
    label: "Next.js", 
    gradient: "from-gray-800 via-gray-600 to-black" 
  },
  { 
    icon: "/assets/tech/firebase.png", 
    label: "Firebase", 
    gradient: "from-yellow-400 via-amber-500 to-orange-600" 
  },
  { 
    icon: "/assets/tech/wordpress.webp", 
    label: "WordPress", 
    gradient: "from-blue-600 via-indigo-500 to-purple-600" 
  },
  { 
    icon: "/assets/tech/mongodb.png", 
    label: "MongoDB", 
    gradient: "from-green-500 via-emerald-500 to-teal-600" 
  },
]


  const socialLinks = [
    { icon: Github, label: "GitHub", url: "https://github.com/DeathstrokeAJ", username: "DeathstrokeAJ" },
    { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com/in/adithya-parambil", username: "adithya-parambil" },
    { icon: Mail, label: "Email", url: "mailto:adithyaj2910@gmail.com", username: "adithyaj2910@gmail.com" }
  ]

  /** ------------------ UI ------------------ */
  return (
    <div
      ref={heroRef}
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden 
                 bg-white from-slate-950 via-gray-900 to-slate-800"
    >
      {/* Particle Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 w-full h-full" style={{ mixBlendMode: "screen" }} />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center space-y-8"
        >
          {/* Name */}
         {/* Name */}
<h1 
  ref={nameRef}
  className="text-[clamp(2.5rem,6vw,5rem)] tracking-tight 
             font-[SuperchargeLaser] 
             bg-gradient-to-r from-purple-400 via-purple-500 to-purple-700
             bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
>
  Adithya Parambil
</h1>

{/* Role Rotator */}
<div className="relative h-12 overflow-hidden">
  {roles.map((role, index) => (
    <motion.div
      key={role}
      initial={{ opacity: 0, y: 20 }}
      animate={index === currentRole ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 text-lg sm:text-2xl md:text-3xl 
                 font-[Supercharge3D] tracking-wide
                 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 
                 bg-clip-text text-transparent"
    >
      {role}
    </motion.div>
  ))}
</div>


          {/* Skill Cards */}
          {/* Skill Cards */}
<div className="flex flex-wrap justify-center gap-6 mt-8">
  {skillIcons.map((s, i) => (
    <motion.div
      key={s.label}
      whileHover={{ scale: 1.15, rotate: 6 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl  
                 flex items-center justify-center shadow-xl cursor-pointer backdrop-blur-sm`}
    >
      <img src={s.icon} alt={s.label} className="w-15 h-15" />
    </motion.div>
  ))}
</div>

          {/* Description */}
         <p className="max-w-3xl mx-auto text-gray-800 text-base sm:text-lg md:text-xl leading-relaxed mt-6">
  Full-stack developer building <span className="text-indigo-600 font-semibold">scalable apps</span>  
  with <span className="text-purple-600 font-semibold">React, Next.js, Firebase, and MongoDB</span>.  
  Passionate about <span className="text-indigo-700 font-semibold">AI, cybersecurity, and ed-tech innovation</span>.
</p>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-8">
  {socialLinks.map((s, i) => (
    <motion.a
      key={s.label}
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-3 px-5 py-3 rounded-2xl 
                 bg-gradient-to-r from-white via-purple-900 to-purple-700
                 border border-purple-800/40 backdrop-blur-md 
                 hover:from-purple-800 hover:via-black hover:to-purple-600 
                 transition-all"
    >
      <s.icon className="w-6 h-6 text-purple-300" />
      <span className="text-purple-200">{s.label}</span>
    </motion.a>
  ))}
</div>


          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:scale-105 transition">
              Explore My Work <ArrowDown className="ml-2 w-5 h-5" />
            </Button>
            <a href="/assets/Resume.pdf" download>
              <Button size="lg" variant="outline" className="border-gray-400 text-white bg-black hover:bg-white/10 hover:scale-105 transition">
                <FileText className="mr-2 w-5 h-5" /> Download Resume
              </Button>
            </a>
          </div>

          {/* Scroll Indicator */}
         
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
