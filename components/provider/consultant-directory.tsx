"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Star,
  Users,
  Globe,
  Building,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  Clock,
  User,
} from "lucide-react"

interface Consultant {
  id: string
  name: string
  email: string
  phone: string
  organization: string
  specialty: string
  languages: string[]
  status: "available" | "busy" | "offline"
  rating: number
  totalProjects: number
  experience: string
  hourlyRate: string
  avatar?: string
  bio: string
}

const mockConsultants: Consultant[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@gsma.com",
    phone: "+1 (555) 123-4567",
    organization: "GSMA Consulting",
    specialty: "Risk Management & Compliance",
    languages: ["English", "French", "Spanish"],
    status: "available",
    rating: 4.9,
    totalProjects: 24,
    experience: "8+ years",
    hourlyRate: "$150/hr",
    bio: "Expert in mobile money compliance with deep knowledge of GSMA standards and regulatory requirements across multiple jurisdictions.",
  },
  {
    id: "2",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@gsma.com",
    phone: "+252 61 123 4567",
    organization: "GSMA Consulting",
    specialty: "Technology & Infrastructure",
    languages: ["English", "Arabic", "Somali"],
    status: "available",
    rating: 4.8,
    totalProjects: 18,
    experience: "6+ years",
    hourlyRate: "$140/hr",
    bio: "Specialized in mobile money technology infrastructure, security, and digital transformation for emerging markets.",
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    email: "maria.rodriguez@gsma.com",
    phone: "+34 91 123 4567",
    organization: "GSMA Consulting",
    specialty: "Financial Services & AML",
    languages: ["English", "Spanish", "Portuguese"],
    status: "busy",
    rating: 4.7,
    totalProjects: 22,
    experience: "7+ years",
    hourlyRate: "$145/hr",
    bio: "AML and financial crime prevention specialist with extensive experience in mobile money compliance and risk assessment.",
  },
  {
    id: "4",
    name: "David Chen",
    email: "david.chen@gsma.com",
    phone: "+86 138 1234 5678",
    organization: "GSMA Consulting",
    specialty: "Digital Identity & KYC",
    languages: ["English", "Mandarin", "Cantonese"],
    status: "available",
    rating: 4.6,
    totalProjects: 15,
    experience: "5+ years",
    hourlyRate: "$135/hr",
    bio: "Digital identity and KYC expert specializing in mobile money customer onboarding and verification systems.",
  },
]

export function ConsultantDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("")
  const [languageFilter, setLanguageFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const specialties = Array.from(new Set(mockConsultants.map(c => c.specialty)))
  const languages = Array.from(new Set(mockConsultants.flatMap(c => c.languages)))

  const filteredConsultants = mockConsultants.filter((consultant) => {
    const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSpecialty = !specialtyFilter || consultant.specialty === specialtyFilter
    const matchesLanguage = !languageFilter || consultant.languages.includes(languageFilter)
    const matchesStatus = !statusFilter || consultant.status === statusFilter

    return matchesSearch && matchesSpecialty && matchesLanguage && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Available</Badge>
      case "busy":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Busy</Badge>
      case "offline":
        return <Badge className="bg-gray-500/10 text-gray-600 border-gray-500/20">Offline</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="w-3 h-3" />
      case "busy":
        return <Clock className="w-3 h-3" />
      case "offline":
        return <Clock className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      )
    }
    return stars
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Consultant Directory</h2>
        <p className="text-muted-foreground">
          Browse and select from our network of certified GSMA consultants
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Find Your Perfect Consultant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search consultants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Specialties</SelectItem>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Languages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Languages</SelectItem>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredConsultants.length} of {mockConsultants.length} consultants
        </p>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filters
        </Button>
      </div>

      {/* Consultant Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredConsultants.map((consultant) => (
          <Card key={consultant.id} className="hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={consultant.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                      {consultant.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {consultant.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Building className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{consultant.organization}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(consultant.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Rating and Experience */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {renderStars(consultant.rating)}
                  <span className="text-sm text-muted-foreground ml-1">({consultant.rating})</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {consultant.experience}
                </div>
              </div>

              {/* Specialty */}
              <div>
                <h4 className="font-medium text-sm text-foreground mb-2">Specialty</h4>
                <p className="text-sm text-muted-foreground">{consultant.specialty}</p>
              </div>

              {/* Languages */}
              <div>
                <h4 className="font-medium text-sm text-foreground mb-2">Languages</h4>
                <div className="flex flex-wrap gap-1">
                  {consultant.languages.map((language, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <Globe className="w-2 h-2 mr-1" />
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold text-primary">{consultant.totalProjects}</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold text-primary">{consultant.hourlyRate}</div>
                  <div className="text-xs text-muted-foreground">Rate</div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h4 className="font-medium text-sm text-foreground mb-2">About</h4>
                <p className="text-sm text-muted-foreground line-clamp-3">{consultant.bio}</p>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-4 border-t border-border/50">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button size="sm" className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                  <Users className="w-4 h-4 mr-2" />
                  Select
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredConsultants.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No consultants found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSpecialtyFilter("")
                setLanguageFilter("")
                setStatusFilter("")
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
