// app/page.tsx
"use client"

import { useState, useEffect, Suspense, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Sparkles, Calendar, User, Heart, X } from "lucide-react"

import Navigation from "@/components/navigation"
import { Analytics } from "@/components/analytics"

import Hero from "@/components/hero"
import BentoGrid from "@/components/bento-grid"
import ProjectShowcase from "@/components/project-showcase"
import ResumeTimeline from "@/components/resume-timeline"
import TechStack from "@/components/tech-stack"
import Education from "@/components/education"
import Contact from "@/components/contact"
import EasterEgg from "@/components/easter-egg"
import DevOpsSection from "@/components/devops-section"

// 🔥 Firebase
import { firestore } from "@/lib/firebase"
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore"

interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  date: Date
  tags: string[]
  likes: number
  image?: string
  email: string
}

// Blog Modal Component
const BlogModal = ({ blog, isOpen, onClose }: { 
  blog: BlogPost | null, 
  isOpen: boolean, 
  onClose: () => void 
}) => {
  if (!blog) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold pr-8 leading-tight">
              {blog.title}
            </DialogTitle>
          </div>
          
          {/* Blog Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {blog.date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>{blog.likes} likes</span>
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </DialogHeader>

        {/* Blog Image */}
        {blog.image && (
          <div className="my-6">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 sm:h-80 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-sm sm:prose-base max-w-none">
          <div className="whitespace-pre-wrap text-foreground leading-relaxed">
            {blog.content}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Blog Card Component
const BlogCard = ({ blog, onClick }: { blog: BlogPost, onClick: () => void }) => (
  <Card 
    className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full"
    onClick={onClick}
  >
    <CardContent className="p-4 sm:p-6 h-full flex flex-col">
      {/* Blog Image */}
      {blog.image && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      {/* Blog Meta */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
        <span className="flex items-center gap-1">
          <User className="w-3 h-3" />
          {blog.author}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {blog.date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Heart className="w-3 h-3" />
          {blog.likes}
        </span>
      </div>
      
      {/* Title */}
      <h3 className="font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2 text-sm sm:text-base">
        {blog.title}
      </h3>
      
      {/* Content Preview */}
      <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
        {blog.content.slice(0, 120)}...
      </p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-auto">
        {blog.tags?.slice(0, 3).map((tag, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
          >
            #{tag}
          </span>
        ))}
        {blog.tags?.length > 3 && (
          <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
            +{blog.tags.length - 3} more
          </span>
        )}
      </div>
    </CardContent>
  </Card>
)

// -------------------
// HomePage with GSAP
// -------------------
const HomePage = () => {
  const mainRef = useRef<HTMLDivElement>(null)

  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    }, mainRef)
    return () => ctx.revert()
  }, [])

  // 🔥 Realtime blogs from Firestore
  useEffect(() => {
    setLoading(true)
    const blogsRef = collection(firestore, "blogs")
    const q = query(blogsRef, orderBy("date", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      try {
        const blogData: BlogPost[] = snapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data()
            return {
              id: doc.id,
              title: data.title || "",
              content: data.content || "",
              author: data.author || "Unknown",
              date: data.date?.toDate() || new Date(),
              tags: Array.isArray(data.tags) ? data.tags : [],
              likes: typeof data.likes === "number" ? data.likes : 0,
              image: data.image || "",
              email: data.email || "",
            }
          },
        )
        setBlogs(blogData)
      } catch (err) {
        console.error("Error loading blogs:", err)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleBlogClick = (blog: BlogPost) => {
    setSelectedBlog(blog)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedBlog(null)
  }

  return (
    <div ref={mainRef} className="container mx-auto px-4 py-8 max-w-7xl">
      <Hero />

      {/* Core Services */}
      <section id="dashboard" className="section py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center gradient-text">
          CORE SERVICES
        </h2>
        <BentoGrid />
      </section>

      {/* Blog Preview Section */}
      <section className="section py-12 sm:py-16">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text flex items-center justify-center gap-2 flex-wrap">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
            Latest from NerdNotes
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Dive into my thoughts on development, technology, and the
            ever-evolving world of code.
          </p>
        </div>

        {/* Blog Previews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin w-8 h-8 border-3 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No blogs published yet.</p>
              </CardContent>
            </Card>
          ) : (
            blogs.slice(0, 3).map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onClick={() => handleBlogClick(blog)}
              />
            ))
          )}
        </div>

        {/* Read All Posts Button */}
        <div className="text-center">
          <Link href="/nerd-notes">
            <Button className="group w-full sm:w-auto">
              <BookOpen className="w-4 h-4 mr-2" />
              Read All Posts
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center gradient-text">
          PROJECTS
        </h2>
        <ProjectShowcase />
      </section>

      <DevOpsSection />

      <section id="tech" className="section py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center gradient-text">
          🛠 Tech Stack
        </h2>
        <TechStack />
      </section>

      <section id="resume" className="section py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center gradient-text">
          Experience Timeline
        </h2>
        <ResumeTimeline />
      </section>

      <section id="education" className="section py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center gradient-text">
          Education
        </h2>
        <Education />
      </section>

      <section id="contact" className="section py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center gradient-text">
          Get In Touch
        </h2>
        <Contact />
      </section>

      <EasterEgg />

      {/* Blog Modal */}
      <BlogModal 
        blog={selectedBlog}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  )
}

export default HomePage