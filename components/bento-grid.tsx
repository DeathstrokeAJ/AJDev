"use client"

import React from "react"

import { useState } from "react"
import { Briefcase, Code, Shield, Wrench, Award, FileText, ChevronRight, ExternalLink, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { bentoItems } from "@/data/bento-items"

const BentoGrid = () => {
  const [selectedItem, setSelectedItem] = useState<(typeof bentoItems)[0] | null>(null)

  const getIconComponent = (iconName: string) => {
    const icons = {
      Briefcase,
      Code,
      Shield,
      Wrench,
      Award,
      FileText,
    }
    return icons[iconName as keyof typeof icons] || Code
  }

  const getGlowClass = (index: number) => {
    const glowClasses = ["glow-purple", "glow-blue", "glow-orange", "glow-pink"]
    return glowClasses[index % glowClasses.length]
  }

  return (
    <>
      <div className="bento-grid">
        {bentoItems.map((item, index) => {
          const IconComponent = getIconComponent(item.icon)
          return (
            <div
              key={item.title}
              className={`bento-item group ${getGlowClass(index)}`}
              onClick={() => setSelectedItem(item)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="relative">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-purple-500/20 hover:text-purple-400"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">{item.title}</h3>
              <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">{item.description}</p>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                {selectedItem &&
                  React.createElement(getIconComponent(selectedItem.icon), {
                    className: "h-6 w-6 text-purple-400",
                  })}
              </div>
              {selectedItem?.title}
            </DialogTitle>
            <DialogDescription className="text-lg">{selectedItem?.description}</DialogDescription>
          </DialogHeader>

          <div className="mt-6 max-h-96 overflow-y-auto">{selectedItem?.content}</div>

          {selectedItem?.links && selectedItem.links.length > 0 && (
            <div className="mt-6 pt-4 border-t border-border/50">
              <h4 className="font-medium mb-3 text-purple-400">Related Links</h4>
              <div className="flex flex-wrap gap-3">
                {selectedItem.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-400 hover:from-purple-500/20 hover:to-blue-500/20 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40"
                  >
                    {link.label} <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          )}

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

export default BentoGrid
