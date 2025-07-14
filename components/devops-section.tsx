import React, { useState } from 'react'
import { 
  GitBranch, 
  Server, 
  Globe, 
  Database, 
  Eye, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Shield,
  Rocket,
  Settings,
  Cloud,
  Code2,
  Timer,
  Star,
  TrendingUp
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const devopsServices = [
  {
    id: 'cicd',
    icon: GitBranch,
    title: 'CI/CD Pipeline',
    description: 'GitHub Actions CI/CD setup for automatic deployment',
    features: ['Automated testing', 'Code quality checks', 'Multi-environment deployment'],
    tech: ['GitHub Actions', 'Workflows', 'YAML'],
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-500',
    status: 'Production Ready'
  },
  {
    id: 'docker',
    icon: Server,
    title: 'Containerization',
    description: 'Dockerized frontend + backend services',
    features: ['Multi-stage builds', 'Container orchestration', 'Development environments'],
    tech: ['Docker', 'Docker Compose', 'Kubernetes'],
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-500',
    status: 'Optimized'
  },
  {
    id: 'hosting',
    icon: Globe,
    title: 'Web Hosting',
    description: 'Firebase Hosting with custom domain support',
    features: ['SSL certificates', 'CDN integration', 'Custom domains'],
    tech: ['Firebase', 'Cloudflare', 'DNS'],
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
    iconColor: 'text-green-500',
    status: 'Live'
  },
  {
    id: 'database',
    icon: Database,
    title: 'Backend Services',
    description: 'Real-time database + auth configuration using Firebase',
    features: ['Real-time sync', 'Authentication', 'Cloud functions'],
    tech: ['Firebase', 'Firestore', 'Auth'],
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30',
    iconColor: 'text-orange-500',
    status: 'Scalable'
  },
  {
    id: 'preview',
    icon: Eye,
    title: 'Preview Deployments',
    description: 'Preview deployments via Vercel per commit',
    features: ['Branch previews', 'PR deployments', 'Testing environments'],
    tech: ['Vercel', 'Netlify', 'Surge'],
    color: 'from-indigo-500/20 to-violet-500/20',
    borderColor: 'border-indigo-500/30',
    iconColor: 'text-indigo-500',
    status: 'Automated'
  }
]

const stats = [
  { label: 'Deployment Speed', value: '< 2 min', icon: Timer },
  { label: 'Uptime', value: '99.9%', icon: TrendingUp },
  { label: 'Environments', value: '3+', icon: Settings },
  { label: 'Success Rate', value: '100%', icon: CheckCircle2 }
]

export default function DevOpsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)

  return (
    <section id="skills" className="section py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20">
            <Rocket className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">DevOps & Infrastructure</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Deployment Pipeline
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Streamlined development workflow with automated deployment, 
            monitoring, and scalable infrastructure solutions
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 text-center hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="inline-flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg mb-2">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* DevOps Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {devopsServices.map((service, index) => (
            <Card
              key={service.id}
              className={`group relative overflow-hidden bg-gradient-to-br ${service.color} border ${service.borderColor} hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer hover:-translate-y-1 ${
                hoveredCard === service.id ? 'scale-[1.02]' : ''
              } ${
                selectedService === service.id ? 'ring-2 ring-primary/50' : ''
              }`}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
            >
              <CardContent className="p-6 space-y-4">
                {/* Service Header */}
                <div className="flex items-start justify-between">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 ${service.iconColor}`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`${service.iconColor} bg-white/10 border-white/20 backdrop-blur-sm`}
                  >
                    {service.status}
                  </Badge>
                </div>

                {/* Service Info */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {service.tech.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="outline" 
                      className="text-xs bg-white/5 border-white/20 hover:bg-white/10 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Features (Expandable) */}
                <div className={`space-y-2 transition-all duration-300 ${
                  selectedService === service.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Star className="h-4 w-4 text-primary" />
                    Key Features
                  </div>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover Arrow */}
                <div className={`flex items-center gap-2 text-primary transition-all duration-300 ${
                  hoveredCard === service.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}>
                  <span className="text-sm font-medium">
                    {selectedService === service.id ? 'Click to collapse' : 'Click to expand'}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Workflow Visualization */}
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Deployment Workflow
            </h3>
            <p className="text-muted-foreground">From code to production in minutes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2">
            {[
              { icon: Code2, title: 'Code Push', desc: 'Developer commits' },
              { icon: GitBranch, title: 'CI/CD', desc: 'Automated testing' },
              { icon: Server, title: 'Build', desc: 'Docker containers' },
              { icon: Shield, title: 'Security', desc: 'Vulnerability scan' },
              { icon: Cloud, title: 'Deploy', desc: 'Live production' }
            ].map((step, index) => (
              <div key={step.title} className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border border-primary/30 mb-3">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-primary/10" />
                  )}
                </div>
                <h4 className="font-medium text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Rocket className="h-5 w-5 mr-2" />
            View Infrastructure Details
          </Button>
        </div>
      </div>
    </section>
  )
}