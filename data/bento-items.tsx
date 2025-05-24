import { Button } from "@/components/ui/button"

export const bentoItems = [
  {
    title: "Web Development",
    description: "Full-stack web applications using modern frameworks and technologies.",
    icon: "Code",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Frontend Development</h4>
          <p className="text-sm text-muted-foreground mb-2">React, Next.js, TypeScript</p>
          <p className="text-sm">Building responsive, interactive user interfaces with modern frameworks.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Backend Development</h4>
          <p className="text-sm text-muted-foreground mb-2">Node.js, Express, MongoDB</p>
          <p className="text-sm">Creating robust APIs and server-side applications.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Full-Stack Projects</h4>
          <p className="text-sm text-muted-foreground mb-2">End-to-end solutions</p>
          <p className="text-sm">Complete web applications from concept to deployment.</p>
        </div>
      </div>
    ),
    links: [
      { label: "GitHub Projects", url: "https://github.com/" },
      { label: "Live Demos", url: "#projects" },
    ],
  },
  {
    title: "Mobile Development",
    description: "Cross-platform mobile applications using React Native and modern tools.",
    icon: "Briefcase",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">React Native Apps</h4>
          <p className="text-sm text-muted-foreground mb-2">iOS & Android</p>
          <p className="text-sm">Cross-platform mobile applications with native performance.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Bhaw-Bhaw App</h4>
          <p className="text-sm text-muted-foreground mb-2">Full-featured mobile app</p>
          <p className="text-sm">Complete mobile application with real-time features and cloud integration.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Mobile UI/UX</h4>
          <p className="text-sm text-muted-foreground mb-2">Design & Development</p>
          <p className="text-sm">Creating intuitive and beautiful mobile user experiences.</p>
        </div>
      </div>
    ),
    links: [
      { label: "App Store", url: "#" },
      { label: "Play Store", url: "#" },
    ],
  },
  {
    title: "E-commerce Solutions",
    description: "Custom e-commerce platforms and integrations with Shopify and WooCommerce.",
    icon: "ShoppingCart",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Shopify Development</h4>
          <p className="text-sm text-muted-foreground mb-2">Custom themes & apps</p>
          <p className="text-sm">Building custom Shopify stores with advanced functionality.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">WordPress E-commerce</h4>
          <p className="text-sm text-muted-foreground mb-2">WooCommerce solutions</p>
          <p className="text-sm">Complete WordPress e-commerce websites with custom features.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Payment Integration</h4>
          <p className="text-sm text-muted-foreground mb-2">Secure transactions</p>
          <p className="text-sm">Implementing secure payment gateways and checkout processes.</p>
        </div>
      </div>
    ),
    links: [
      { label: "Lara and Daughters", url: "https://laraanddaughters.com/" },
      { label: "Jagdish Foods", url: "https://jagdishfoods.com/" },
    ],
  },
  {
    title: "UI/UX Design",
    description: "Creating beautiful, user-friendly interfaces and experiences.",
    icon: "Palette",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Design Systems</h4>
          <p className="text-sm text-muted-foreground mb-2">Consistent UI components</p>
          <p className="text-sm">Building scalable design systems and component libraries.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Responsive Design</h4>
          <p className="text-sm text-muted-foreground mb-2">Mobile-first approach</p>
          <p className="text-sm">Creating designs that work perfectly on all devices.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">User Experience</h4>
          <p className="text-sm text-muted-foreground mb-2">User-centered design</p>
          <p className="text-sm">Focusing on usability and user satisfaction in every project.</p>
        </div>
      </div>
    ),
    links: [
      { label: "Figma Designs", url: "#" },
      { label: "Design Portfolio", url: "#projects" },
    ],
  },
  {
    title: "Cloud & DevOps",
    description: "Deployment, hosting, and cloud infrastructure management.",
    icon: "Wrench",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Cloud Deployment</h4>
          <p className="text-sm text-muted-foreground mb-2">AWS, Vercel, Netlify</p>
          <p className="text-sm">Deploying applications to various cloud platforms.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">CI/CD Pipelines</h4>
          <p className="text-sm text-muted-foreground mb-2">Automated deployment</p>
          <p className="text-sm">Setting up continuous integration and deployment workflows.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Performance Optimization</h4>
          <p className="text-sm text-muted-foreground mb-2">Speed & efficiency</p>
          <p className="text-sm">Optimizing applications for maximum performance and user experience.</p>
        </div>
      </div>
    ),
    links: [
      { label: "GitHub Actions", url: "https://github.com/" },
      { label: "Deployment Guides", url: "#" },
    ],
  },
  {
    title: "Resume & Experience",
    description: "Professional journey and downloadable resume.",
    icon: "FileText",
    content: (
      <div className="space-y-4">
        <p className="mb-4">View my professional journey and download my complete resume for more details.</p>

        <div className="timeline mb-6">
          <div className="timeline-item">
            <div className="mb-1">
              <span className="text-sm font-medium text-muted-foreground">2022 - Present</span>
            </div>
            <h4 className="font-bold">B.E. Computer Engineering</h4>
            <p className="text-sm text-muted-foreground">VCET</p>
          </div>

          <div className="timeline-item">
            <div className="mb-1">
              <span className="text-sm font-medium text-muted-foreground">2023 - 2024</span>
            </div>
            <h4 className="font-bold">Freelance Developer</h4>
            <p className="text-sm text-muted-foreground">Web & Mobile Development</p>
          </div>

          <div className="timeline-item">
            <div className="mb-1">
              <span className="text-sm font-medium text-muted-foreground">2022 - 2023</span>
            </div>
            <h4 className="font-bold">Multiple Internships</h4>
            <p className="text-sm text-muted-foreground">TechNode, YPP, Stakesman, etc.</p>
          </div>
        </div>

        <div className="flex justify-center">
          <a href="/resume.pdf" download>
            <Button variant="default" className="w-full">
              Download Full Resume
            </Button>
          </a>
        </div>
      </div>
    ),
    links: [{ label: "LinkedIn", url: "https://linkedin.com/" }],
  },
]
