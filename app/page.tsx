"use client"

import { LoginForm } from "@/components/auth/login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Users, FileText, Award, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Navigation Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-bold text-lg">G</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">GSMA</h1>
                <p className="text-xs text-muted-foreground">Mobile Money Certification</p>
              </div>
            </div>
            <Badge variant="secondary" className="animate-pulse">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              System Online
            </Badge>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="w-fit bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
                <Award className="w-3 h-3 mr-1" />
                Trusted by 200+ Providers
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Mobile Money
                <span className="block text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                  Certification
                </span>
                <span className="block text-2xl lg:text-3xl text-muted-foreground font-normal mt-2">Made Simple</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Streamline your certification journey with our intelligent platform. From document submission to final
                approval, we've got you covered.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, label: "Secure & Compliant", desc: "Bank-grade security" },
                { icon: Users, label: "Multi-Role Access", desc: "Providers, Assessors, Auditors" },
                { icon: FileText, label: "Smart Documents", desc: "AI-powered review" },
                { icon: TrendingUp, label: "Real-time Tracking", desc: "Live progress updates" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group p-4 rounded-xl bg-card/50 border border-border/50 hover:bg-card transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <feature.icon className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-sm text-foreground">{feature.label}</h3>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-muted-foreground">ISO 27001 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-muted-foreground">GDPR Compliant</span>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <Card className="relative bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Shield className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                <CardDescription className="text-base">Sign in to access your certification dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <LoginForm />

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">280+</div>
                    <div className="text-xs text-muted-foreground">Indicators</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">50+</div>
                    <div className="text-xs text-muted-foreground">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">99.9%</div>
                    <div className="text-xs text-muted-foreground">Uptime</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.15) 1px, transparent 0);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  )
}
