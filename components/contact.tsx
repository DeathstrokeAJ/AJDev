"use client"

import React, { useState } from "react"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const SERVICE_ID = "service_uypqkai"
const TEMPLATE_ID = "your_custom_template_id" // Replace with your actual EmailJS template ID
const PUBLIC_KEY = "59EVNs-M5pCdhakfC"

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    if (submitStatus === "error") {
      setSubmitStatus("idle")
      setErrorMessage("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, formState, PUBLIC_KEY)
      setSubmitStatus("success")
      setFormState({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Contact Information */}
      <div className="space-y-8">
        <div>
          <h3 className="text-3xl font-bold mb-4 gradient-text">Let's Connect</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            I'm always excited to discuss new projects, opportunities, or collaborations. Whether you have a project in
            mind or just want to chat about technology, feel free to reach out!
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-purple-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
              <Mail className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Email</h4>
              <a
                href="mailto:adithyaj2910@gmail.com"
                className="text-muted-foreground hover:text-purple-400 transition-colors"
              >
                adithyaj2910@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-blue-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
              <Github className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">GitHub</h4>
              <a
                href="https://github.com/DeathstrokeAJ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-400 transition-colors"
              >
                github.com/DeathstrokeAJ
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-cyan-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
              <Linkedin className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">LinkedIn</h4>
              <a
                href="https://linkedin.com/in/adithya-parambil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-cyan-400 transition-colors"
              >
                linkedin.com/in/adithya-parambil
              </a>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
          <h4 className="font-semibold text-lg mb-2 text-purple-400">Quick Response</h4>
          <p className="text-sm text-muted-foreground">
            I typically respond to emails within 24 hours. For urgent matters, feel free to connect with me on LinkedIn
            for faster communication.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="terminal relative">
        <div className="flex items-center gap-2 mb-6 text-sm">
          <span className="text-red-500">●</span>
          <span className="text-yellow-500">●</span>
          <span className="text-green-500">●</span>
          <span className="ml-2 opacity-70">contact-form.sh</span>
        </div>

        {submitStatus === "success" ? (
          <div className="space-y-6">
            <Alert className="border-green-500/50 bg-green-500/10">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-400">
                Message sent successfully! I'll get back to you soon.
              </AlertDescription>
            </Alert>
            <div className="space-y-4">
              <p className="typing-effect">
                <span className="text-primary-foreground/70">$</span> Message delivered to adithyaj2910@gmail.com
              </p>
              <p className="typing-effect">
                <span className="text-primary-foreground/70">$</span> Thank you for reaching out!
              </p>
              <p className="typing-effect flex items-center">
                <span className="text-primary-foreground/70">$</span>
                <span className="ml-1 animate-pulse">_</span>
              </p>
            </div>
          </div>
        ) : (
          <>
            {submitStatus === "error" && (
              <Alert className="border-red-500/50 bg-red-500/10 mb-6">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-400">{errorMessage}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <p className="text-sm mb-2">
                  <span className="text-primary-foreground/70">$</span> Enter your name:
                </p>
                <Input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="terminal-input"
                  placeholder="John Doe"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <p className="text-sm mb-2">
                  <span className="text-primary-foreground/70">$</span> Enter your email:
                </p>
                <Input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="terminal-input"
                  placeholder="john@example.com"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <p className="text-sm mb-2">
                  <span className="text-primary-foreground/70">$</span> Enter your message:
                </p>
                <Textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  className="terminal-input min-h-[120px] resize-none"
                  placeholder="I'd like to discuss a project..."
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" /> Send Message
                  </span>
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default Contact
