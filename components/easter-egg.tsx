"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"

const EasterEgg = () => {
  const [sequence, setSequence] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const secretCode = ["u", "n", "l", "o", "c", "k"]

    useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add the key to the sequence
      setSequence((prev) => {
        const key = e.key
        if (typeof key === "string") {
          const newSequence = [...prev, key.toLowerCase()]

          // Keep only the last 6 keys
          if (newSequence.length > secretCode.length) {
            return newSequence.slice(newSequence.length - secretCode.length)
          }

          return newSequence
        }
        return prev
      })
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  useEffect(() => {
    // Check if the sequence matches the secret code
    if (sequence.length === secretCode.length) {
      const isMatch = sequence.every((key, i) => key === secretCode[i])

      if (isMatch) {
        setIsOpen(true)
        setSequence([])
      }
    }
  }, [sequence])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">🔓 Secret Project Unlocked!</DialogTitle>
          <DialogDescription>
            You've discovered my secret project. This is a special project I've been working on.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 terminal p-6">
          <h3 className="text-xl font-bold mb-4 text-primary">Saarthi Programming Language</h3>
          <p className="mb-4">
            Saarthi is a custom programming language I developed that was published in IEEE. It's designed to simplify
            programming concepts for beginners while maintaining powerful capabilities for advanced users.
          </p>

          <div className="bg-black/50 p-4 rounded-md mb-4">
            <pre className="text-primary text-sm">
              <code>{`// Example Saarthi code
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}

print(fibonacci(10)); // Output: 55`}</code>
            </pre>
          </div>

          <p className="text-sm text-primary-foreground/70">
            This project combines compiler design, language theory, and user experience to create an accessible
            programming environment.
          </p>

          <div className="mt-6 flex justify-end">
            <a
              href="https://ieee.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm"
            >
              View IEEE Publication →
            </a>
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
  )
}

export default EasterEgg
