"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export function Analytics() {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 })
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        duration: 0.2,
        x: cursorPosition.x,
        y: cursorPosition.y,
        ease: "power2.out",
      })
    }
  }, [cursorPosition])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
    </>
  )
}
