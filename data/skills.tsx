import { Code, Shield, Database, Palette, Globe, ShoppingCart, Terminal, Wrench } from "lucide-react"

export const skillCategories = [
  {
    name: "Web Development",
    icon: Globe,
    skills: [
      { name: "HTML/CSS", icon: Code },
      { name: "JavaScript", icon: Code },
      { name: "TypeScript", icon: Code },
      { name: "React", icon: Code },
      { name: "Next.js", icon: Code },
      { name: "Node.js", icon: Code },
      { name: "Express", icon: Code },
      { name: "Tailwind CSS", icon: Palette },
      { name: "GSAP", icon: Code },
      { name: "Responsive Design", icon: Palette },
    ],
  },
  {
    name: "Cybersecurity",
    icon: Shield,
    skills: [
      { name: "Threat Analysis", icon: Shield },
      { name: "Network Security", icon: Shield },
      { name: "Encryption", icon: Shield },
      { name: "Vulnerability Assessment", icon: Shield },
      { name: "Security Operations", icon: Shield },
      { name: "Ethical Hacking", icon: Shield },
    ],
  },
  {
    name: "CMS & E-commerce",
    icon: ShoppingCart,
    skills: [
      { name: "WordPress", icon: Globe },
      { name: "Shopify", icon: ShoppingCart },
      { name: "WooCommerce", icon: ShoppingCart },
      { name: "Liquid", icon: Code },
      { name: "PHP", icon: Code },
      { name: "Content Management", icon: Globe },
    ],
  },
  {
    name: "Backend & Database",
    icon: Database,
    skills: [
      { name: "MongoDB", icon: Database },
      { name: "Firebase", icon: Database },
      { name: "SQL", icon: Database },
      { name: "REST API", icon: Code },
      { name: "Authentication", icon: Shield },
      { name: "Server Management", icon: Terminal },
    ],
  },
  {
    name: "Tools & Others",
    icon: Wrench,
    skills: [
      { name: "Git", icon: Terminal },
      { name: "VS Code", icon: Code },
      { name: "Figma", icon: Palette },
      { name: "Canva", icon: Palette },
      { name: "MS Office", icon: Wrench },
      { name: "Python", icon: Code },
      { name: "SAP", icon: Database },
      { name: "3D Printing", icon: Wrench },
    ],
  },
]
