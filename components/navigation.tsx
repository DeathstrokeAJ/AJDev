"use client"
import { useState, useEffect } from "react"
import { Menu, Sun, Moon, Terminal, Download, ExternalLink, X } from "lucide-react"

// Mock components for demonstration
const Button = ({ children, variant = "default", size = "default", className = "", onClick, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${
      variant === "ghost" ? "hover:bg-accent hover:text-accent-foreground" :
      variant === "outline" ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" :
      "bg-primary text-primary-foreground hover:bg-primary/90"
    } ${
      size === "icon" ? "h-9 w-9" :
      size === "sm" ? "h-8 px-3 text-sm" :
      "h-10 px-4 py-2"
    } ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
)

const Navigation = () => {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState("light")
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      // Update active section based on scroll position
      const sections = ["home", "projects", "resume", "skills", "education", "contact"]
      const scrollPosition = window.scrollY + 100
      
      for (const section of sections) {
        const element = document.getElementById(section === "home" ? "" : section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/", id: "home" },
    { name: "Projects", href: "/#projects", id: "projects" },
    { name: "Experience", href: "/#resume", id: "resume" },
    { name: "Skills", href: "/#skills", id: "skills" },
    { name: "Education", href: "/#education", id: "education" },
    { name: "Contact", href: "/#contact", id: "contact" },
    { name: "Nerd Notes", href: "/nerd-notes", id: "nerd-notes" },
  ]

  const handleNavClick = (href) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
    setMobileMenuOpen(false)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) return null

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => window.location.href = "/"}
              className="flex items-center space-x-2 group transition-all duration-200 hover:scale-105"
            >
              <div className="relative">
                <Terminal className="h-7 w-7 text-blue-600 dark:text-blue-400 transition-colors duration-200 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
                <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AP
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg group ${
                    activeSection === link.id
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <a
                href="https://drive.google.com/file/d/YOUR_RESUME_ID/preview"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group"
              >
                <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                <span>View Resume</span>
              </a>
              
              <a
                href="https://drive.google.com/uc?export=download&id=YOUR_RESUME_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2 lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative overflow-hidden"
              >
                <div className={`transition-all duration-300 ${theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}>
                  <Sun className="h-5 w-5 text-yellow-500" />
                </div>
                <div className={`absolute transition-all duration-300 ${theme === "dark" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}>
                  <Moon className="h-5 w-5 text-blue-600" />
                </div>
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative"
              >
                <div className={`transition-all duration-300 ${mobileMenuOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}>
                  <Menu className="h-5 w-5" />
                </div>
                <div className={`absolute transition-all duration-300 ${mobileMenuOpen ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`}>
                  <X className="h-5 w-5" />
                </div>
              </Button>
            </div>

            {/* Desktop Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden lg:flex relative overflow-hidden ml-4"
            >
              <div className={`transition-all duration-300 ${theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}>
                <Sun className="h-5 w-5 text-yellow-500" />
              </div>
              <div className={`absolute transition-all duration-300 ${theme === "dark" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}>
                <Moon className="h-5 w-5 text-blue-600" />
              </div>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Adithya Parambil
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 px-6 py-4">
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`w-full text-left px-4 py-3 text-lg font-medium transition-all duration-200 rounded-lg ${
                        activeSection === link.id
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </nav>

              {/* Mobile Resume Actions */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <a
                  href="https://drive.google.com/file/d/YOUR_RESUME_ID/preview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ExternalLink className="h-5 w-5" />
                  <span className="font-medium">View Resume</span>
                </a>
                
                <a
                  href="https://drive.google.com/uc?export=download&id=YOUR_RESUME_ID"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Download className="h-5 w-5" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navigation