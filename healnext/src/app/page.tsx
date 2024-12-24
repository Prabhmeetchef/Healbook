"use client"
import Head from "next/head";
import { useState, useEffect } from "react"
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import '../app/styles.css'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Clock, FileText, Share2, Bell, Users, Calendar, Menu, X, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return (
    <>
    <Head>
    <title>Healbook: Your Health Data Vault</title>
    <meta
      name="viewport"
      content="device-width,
    initial-scale=1.0"
    />
    <link rel="shortcut icon" href="mainlogowhite.png" type="image/x-icon" />
  </Head>
  <body className="min-w-screen">
    <div className="min-h-screen">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <img
            src="logomain.png"
            id="logo"
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
              isScrolled ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <img
            src="logomainwhite.png"
            id="logo"
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
              isScrolled ? 'opacity-100' : 'opacity-0'
            }`}
          />
          </Link>
          <div className="flex items-center justify-between h-20">
          <Link href="/">
          <img
            src="logomain.png"
            id="logo"
            className={`transition-opacity duration-300 ${
              isScrolled ? 'opacity-0' : 'opacity-0'
            }`}
          />
          </Link>
            <nav className={`hidden md:flex space-x-8 ${isScrolled ? "text-gray-800" : "text-white"}`}>
              <Link href="/" className="text-sm font-medium hover:text-[#0CC0DF] transition-colors">Features</Link>
              <Link href="/" className="text-sm font-medium hover:text-[#0CC0DF] transition-colors">About</Link>
              <Link href="/" className="text-sm font-medium hover:text-[#0CC0DF] transition-colors">Contact</Link>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <LoginLink>
              <Button variant="ghost" className={`text-sm font-medium ${isScrolled ? "text-gray-800 hover:text-[#0CC0DF]" : "text-white hover:text-cyan-100"}`}>
                Log In
              </Button>
              </LoginLink>
              <RegisterLink>
              <Button className={`text-sm font-medium ${isScrolled ? "bg-[#0CC0DF] text-white hover:bg-cyan-700" : "bg-white text-[#0CC0DF] hover:bg-cyan-50"}`}>
                Sign Up
              </Button>
              </RegisterLink>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? (
                  <X className={`h-6 w-6 ${isScrolled ? "text-gray-800" : "text-white"}`} />
                ) : (
                  <Menu className={`h-6 w-6 ${isScrolled ? "text-gray-800" : "text-white"}`} />
                )}
              </Button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="#features" className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-[#0CC0DF]">Features</Link>
              <Link href="#about" className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-[#0CC0DF]">About</Link>
              <Link href="#contact" className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-[#0CC0DF]">Contact</Link>
              <Button variant="ghost" className="w-full text-left px-3 py-2 text-base font-medium text-gray-800 hover:text-[#0CC0DF]">Log In</Button>
              <Button className="w-full text-left px-3 py-2 text-base font-medium bg-[#0CC0DF] text-white hover:bg-[#0CC0DF]">Sign Up</Button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative pt-20 pb-32 bg-gradient-to-r from-[#0CC0DF] to-[#00d9ff]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16">
            <div className="flex flex-col lg:flex-row items-center space-x-60">
              <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  The best place for all your Healthcare data
                </h1>
                <p className="text-xl text-cyan-100 mb-8">
                  Secure, convenient, and accessible healthcare record management. Your medical history in one trusted platform.
                </p>
              </div>
              <div className="pt-8">
                <Image
                  src="/Doc.jpg?height=600&width=600"
                  alt="Healthcare Professional"
                  width={600}
                  height={600}
                  className="rounded-[200px] shadow-2xl"
                  priority
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-32">
              <div className="flex flex-col items-center text-center text-white">
                <Shield className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure</h3>
                <p className="text-cyan-100">End-to-end encrypted</p>
              </div>
              <div className="flex flex-col items-center text-center text-white">
                <Lock className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Private</h3>
                <p className="text-cyan-100">HIPAA compliant</p>
              </div>
              <div className="flex flex-col items-center text-center text-white">
                <Clock className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">24/7 Access</h3>
                <p className="text-cyan-100">Always available</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Healbook?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FileText className="h-10 w-10 text-[#0CC0DF]" />}
                title="Digital Records"
                description="Store and access your medical records, prescriptions, and test results digitally"
              />
              <FeatureCard
                icon={<Share2 className="h-10 w-10 text-[#0CC0DF]" />}
                title="Easy Sharing"
                description="Securely share your medical information with healthcare providers"
              />
              <FeatureCard
                icon={<Bell className="h-10 w-10 text-[#0CC0DF]" />}
                title="Reminders"
                description="Never miss appointments or medications with smart notifications"
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-[#0CC0DF]" />}
                title="Data Security"
                description="Enterprise-grade security to protect your sensitive medical information"
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-[#0CC0DF]" />}
                title="Family Access"
                description="Manage healthcare records for your entire family in one place"
              />
              <FeatureCard
                icon={<Calendar className="h-10 w-10 text-[#0CC0DF]" />}
                title="Appointment Booking"
                description="Schedule appointments with healthcare providers directly through the platform"
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#0CC0DF] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to take control of your healthcare data?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust Healbook with their healthcare information management
            </p>
            <div className="flex justify-center">
              <RegisterLink>
              <Button size="lg" className="bg-white text-black hover:text-[#0CC0DF] p-2">
                Sign Up Now
              </Button>
              </RegisterLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 pt-24">
        <div className="container px-4 sm:px-6 lg:px-24">
          <div className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
            <div className="px-00">
              <Link href="/" className="flex items-center space-x-2 mb-4">
              <img src="logomainwhite.png" id="logo" alt="logo.png" />
              </Link>
              <p className="text-gray-600 mb-4">Secure healthcare data management platform for everyone</p>
            </div>
            <div className="px-2">
              <h4 className="text-lg font-semibold mb-4">Founders</h4>
              <div className="space-y-2">
                <FounderLink name="Harshavardhan Srinivas" url="https://www.linkedin.com/in/harshavardhan-p-787a11202/" />
                <FounderLink name="Prabhmeet Singh" url="https://www.linkedin.com/in/prabhmeet-singh-11446699w/" />
              </div>
            </div>
            <div className="px-7">
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="space-y-2">
                <SocialLink icon={<Github className="h-5 w-5" />} name="GitHub Repository" url="https://github.com/Prabhmeetchef/Healbook" />
                <SocialLink icon={<Mail className="h-5 w-5" />} name="Email Us" url="mailto:prabhmeetsinghns1000@gmail.com" />
              </div>
            </div>
            <div className="px-8">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-gray-600 hover:text-[#0CC0DF]">About</Link>
                <a href="https://healchat.healbook.in" className="block text-gray-600 hover:text-[#0CC0DF]">Healchat</a>
              </div>
            </div>
          </div>
          <div className="m-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600">&copy; {new Date().getFullYear()} Healbook. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </body>
    </>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="flex flex-col items-center text-center ">
      <CardHeader className="items-center">
        {icon}
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}

function FounderLink({ name, url }: { name: string; url: string }) {
  return (
    <Link 
      href={url}
      className="flex items-center space-x-2 text-gray-600 hover:text-[#0CC0DF]"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Linkedin className="h-5 w-5" />
      <span>{name}</span>
      <ExternalLink className="h-4 w-4" />
    </Link>
  )
}

function SocialLink({ icon, name, url }: { icon: React.ReactNode; name: string; url: string }) {
  return (
    <Link 
      href={url}
      className="flex items-center space-x-2 text-gray-600 hover:text-[#0CC0DF]"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
      <span>{name}</span>
      <ExternalLink className="h-4 w-4" />
    </Link>
  )
}