import { Button } from "@/components/ui/button"

export const bentoItems = [
  {
    title: "Custom Web Applications",
    description: "End-to-end web application development using modern full-stack technologies.",
    icon: "Code",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Frontend Engineering</h4>
          <p className="text-sm text-muted-foreground mb-2">React.js, Next.js, TypeScript</p>
          <p className="text-sm">Building modern, responsive UIs with optimized performance and accessibility in mind.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Backend Architecture</h4>
          <p className="text-sm text-muted-foreground mb-2">Node.js, Firebase, REST APIs</p>
          <p className="text-sm">Designing secure, scalable APIs and cloud-based backend logic.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Full-Stack SaaS Projects</h4>
          <p className="text-sm text-muted-foreground mb-2">Padmavati ERP, Notify IoT, Business OS</p>
          <p className="text-sm">Projects that integrate frontend, backend, and cloud deployments for real-world businesses.</p>
        </div>
      </div>
    ),
    links: [
      { label: "GitHub Projects", url: "https://github.com/DeathstrokeAJ" },
      { label: "Live Demos", url: "#projects" },
    ],
  },
  {
    title: "Cloud Deployments & DevOps",
    description: "Scalable hosting, automation, and CI/CD for production-ready apps.",
    icon: "Wrench",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Cloud Hosting</h4>
          <p className="text-sm text-muted-foreground mb-2">Vercel, Firebase, Netlify</p>
          <p className="text-sm">Deploying apps with real-time hosting, HTTPS, and global delivery networks.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">CI/CD Automation</h4>
          <p className="text-sm text-muted-foreground mb-2">GitHub Actions</p>
          <p className="text-sm">Automating testing, builds, and multi-environment deploys on every commit.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Containerization & Optimization</h4>
          <p className="text-sm text-muted-foreground mb-2">Docker, Lighthouse</p>
          <p className="text-sm">Creating containerized builds and improving web performance scores for production use.</p>
        </div>
      </div>
    ),
    links: [
      { label: "GitHub CI/CD Workflows", url: "https://github.com/DeathstrokeAJ" },
      { label: "Deployment Tutorials", url: "#deployment-tutorials" },
    ],
  },
  {
    title: "SaaS & ERP Platforms",
    description: "Powerful business management tools tailored to real-world use cases.",
    icon: "Briefcase",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Transport ERP (Padmavati)</h4>
          <p className="text-sm text-muted-foreground mb-2">Logistics SaaS System</p>
          <p className="text-sm">Full booking, invoicing, and dispatch platform with PDF automation and dashboards.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Business OS</h4>
          <p className="text-sm text-muted-foreground mb-2">White-label CRM & Invoicing</p>
          <p className="text-sm">Multi-tenant SaaS with dynamic branding, PWA install, plan-tier access, and reminders.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Admin Panels</h4>
          <p className="text-sm text-muted-foreground mb-2">Dhrona CMS, Notify Analytics</p>
          <p className="text-sm">Admin systems with real-time data updates, access control, and insights dashboards.</p>
        </div>
      </div>
    ),
    links: [
      { label: "Padmavati ERP", url: "https://padmavati-travels.vercel.app/" },
      { label: "BlueWhale Project", url: "https://bluewhalelagos.com/" },
    ],
  },
  {
    title: "E-commerce Development",
    description: "Launch-ready storefronts built with Shopify, WooCommerce, and custom stacks.",
    icon: "ShoppingCart",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Shopify Stores</h4>
          <p className="text-sm text-muted-foreground mb-2">Custom themes + app integrations</p>
          <p className="text-sm">Designed and delivered scalable stores with SEO-friendly design and fast checkout UX.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">WordPress E-commerce</h4>
          <p className="text-sm text-muted-foreground mb-2">WooCommerce-based Stores</p>
          <p className="text-sm">Customized PHP themes and product pages for high-traffic sites.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Payments & Reports</h4>
          <p className="text-sm text-muted-foreground mb-2">Razorpay, Stripe, PDF exports</p>
          <p className="text-sm">Built secure payment flows and downloadable reports with jsPDF and Firestore data.</p>
        </div>
      </div>
    ),
    links: [
      { label: "Lara and Daughters", url: "https://laraanddaughters.com/" },
      { label: "Jagdish Foods", url: "https://jagdishfoods.com/" },
    ],
  },
  {
    title: "UI/UX & Product Design",
    description: "Design systems and responsive layouts that scale across platforms.",
    icon: "Palette",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Design Systems</h4>
          <p className="text-sm text-muted-foreground mb-2">shadcn/ui, Figma</p>
          <p className="text-sm">Component-first design systems with accessibility and theme customization.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">Responsive Layouts</h4>
          <p className="text-sm text-muted-foreground mb-2">Tailwind CSS + Mobile UX</p>
          <p className="text-sm">Mobile-first, keyboard-friendly designs optimized for speed and usability.</p>
        </div>

        <div className="p-4 rounded-md bg-card border border-border">
          <h4 className="font-bold">UI Consistency</h4>
          <p className="text-sm text-muted-foreground mb-2">Atomic structure, component reusability</p>
          <p className="text-sm">UI refactoring for better DX, scalability, and maintainability across apps.</p>
        </div>
      </div>
    ),
    links: [
      { label: "Figma Portfolio", url: "#figma" },
      { label: "UI Components", url: "#ui-components" },
    ],
  },
  {
    title: "Professional Services & Credentials",
    description: "My education, certifications, and experience highlights.",
    icon: "FileText",
    content: (
      <div className="space-y-4">
        <p className="mb-4">Credentials that reflect my professional growth and accomplishments.</p>

        <div className="timeline mb-6">
          <div className="timeline-item">
            <div className="mb-1">
              <span className="text-sm font-medium text-muted-foreground">2022 - 2026</span>
            </div>
            <h4 className="font-bold">B.E. Computer Engineering</h4>
            <p className="text-sm text-muted-foreground">VCET, Mumbai University</p>
          </div>

          <div className="timeline-item">
            <div className="mb-1">
              <span className="text-sm font-medium text-muted-foreground">2023 - 2025</span>
            </div>
            <h4 className="font-bold">Full Stack & SaaS Developer</h4>
            <p className="text-sm text-muted-foreground">Padmavati, BlueWhale, CyberEd</p>
          </div>

          <div className="timeline-item">
            <div className="mb-1">
              <span className="text-sm font-medium text-muted-foreground">Certifications</span>
            </div>
            <p className="text-sm text-muted-foreground">
              IEEE Publication, Google Cybersecurity, SAP Consulting (Forage), Goldman Sachs SWE Program
            </p>
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
    links: [
      { label: "LinkedIn", url: "https://linkedin.com/in/adithya-parambil" },
      { label: "GitHub", url: "https://github.com/DeathstrokeAJ" },
    ],
  },
];
