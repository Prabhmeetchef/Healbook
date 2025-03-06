"use client"
import { useState, useEffect } from "react"
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import '../app/styles.css'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Clock, FileText, Share2, Bell, Users, Calendar, Menu, X, Github, Mail, ExternalLink, ChevronRight } from 'lucide-react'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: <FileText className="h-10 w-10" />,
      title: "Digital Records",
      description: "Store and access your medical records, prescriptions, and test results digitally",
    },
    {
      icon: <Share2 className="h-10 w-10" />,
      title: "Easy Sharing",
      description: "Securely share your medical information with healthcare providers",
    },
    {
      icon: <Bell className="h-10 w-10" />,
      title: "Reminders",
      description: "Never miss appointments or medications with smart notifications",
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Data Security",
      description: "Enterprise-grade security to protect your sensitive medical information",
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Family Access",
      description: "Manage healthcare records for your entire family in one place",
    },
    {
      icon: <Calendar className="h-10 w-10" />,
      title: "Appointment Booking",
      description: "Schedule appointments with healthcare providers directly through the platform",
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)

    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 3000)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(featureInterval)
    }
  }, [features.length])
  return (
    <div className="min-h-screen overflow-hidden bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg py-[32px]" : "bg-[#0CC0DF] py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="relative z-10">
              <div className="relative h-10 w-40">
                <Image
                  src="/logomain.png"
                  alt="Healbook Logo"
                  fill
                  className={`object-contain transition-opacity duration-300 ${
                    isScrolled ? "opacity-0" : "opacity-100"
                  }`}
                />
                <Image
                  src="/logomainwhite.png"
                  alt="Healbook Logo"
                  fill
                  className={`object-contain transition-opacity duration-300 ${
                    isScrolled ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            </Link>

            <nav className={`hidden md:flex items-center space-x-10 ${isScrolled ? "text-gray-800" : "text-white"}`}>
              <Link href="#features" className="text-sm font-medium hover:text-[#0CC0DF] transition-colors">
                Features
              </Link>
              <Link href="#about" className="text-sm font-medium hover:text-[#0CC0DF] transition-colors">
                About
              </Link>
              <Link href="#contact" className="text-sm font-medium hover:text-[#0CC0DF] transition-colors">
                Contact
              </Link>

              <div className="flex items-center space-x-4">
                <LoginLink>
                  <Button
                    variant="ghost"
                    className={`rounded-full text-sm font-medium ${
                      isScrolled ? "text-gray-800 hover:text-[#0CC0DF]" : "text-white hover:text-cyan-100"
                    }`}
                  >
                    Log In
                  </Button>
                </LoginLink>
                <RegisterLink>
                  <Button
                    className={`rounded-full text-sm font-medium ${
                      isScrolled
                        ? "bg-[#0CC0DF] text-white hover:bg-[#0AAFCC]"
                        : "bg-white text-[#0CC0DF] hover:bg-cyan-50"
                    }`}
                  >
                    Sign Up
                  </Button>
                </RegisterLink>
              </div>
            </nav>

            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="rounded-full">
                {isMenuOpen ? (
                  <X className={`h-6 w-6 ${isScrolled ? "text-gray-800" : "text-white"}`} />
                ) : (
                  <Menu className={`h-6 w-6 ${isScrolled ? "text-gray-800" : "text-white"}`} />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg rounded-b-2xl overflow-hidden">
            <div className="px-4 py-5 space-y-4">
              <Link
                href="#features"
                className="block px-4 py-3 text-base font-medium text-gray-800 hover:text-[#0CC0DF] rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#about"
                className="block px-4 py-3 text-base font-medium text-gray-800 hover:text-[#0CC0DF] rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#contact"
                className="block px-4 py-3 text-base font-medium text-gray-800 hover:text-[#0CC0DF] rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-2 space-y-3">
                <LoginLink>
                  <Button variant="outline" className="w-full justify-start rounded-lg">
                    Log In
                  </Button>
                </LoginLink>
                <RegisterLink>
                  <Button className="w-full justify-start bg-[#0CC0DF] text-white hover:bg-[#0AAFCC] rounded-lg">
                    Sign Up
                  </Button>
                </RegisterLink>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#0CC0DF]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0CC0DF] to-[#00d9ff] -skew-y-6 transform origin-top-left h-[120%] -z-10"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-80 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                Your Health Data Vault
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                The best place for all your Healthcare data
              </h1>
              <p className="text-xl text-cyan-100 mb-8 max-w-lg mx-auto lg:mx-0">
                Secure, convenient, and accessible healthcare record management. Your medical history in one trusted
                platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <RegisterLink>
                  <Button size="lg" className="bg-white text-[#0CC0DF] hover:bg-cyan-50 rounded-full px-6 py-2">
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </RegisterLink>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-white/20 backdrop-blur-sm rounded-3xl rotate-6"></div>
              <div className="absolute -inset-4 bg-white/20 backdrop-blur-sm rounded-3xl -rotate-2"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30">
                <Image
                  src="/Doc.jpg"
                  alt="Healthcare Professional"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-20">
            {[
              { icon: <Shield className="h-8 w-8" />, title: "Secure", desc: "End-to-end encrypted" },
              { icon: <Lock className="h-8 w-8" />, title: "Private", desc: "HIPAA compliant" },
              { icon: <Clock className="h-8 w-8" />, title: "24/7 Access", desc: "Always available" },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white flex items-center">
                <div className="bg-white/20 p-3 rounded-xl mr-4">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-cyan-100">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-1 bg-cyan-100 text-[#0CC0DF] rounded-full text-sm font-medium mb-4">
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Healbook?</h2>
            <p className="text-gray-600 text-lg">
              Our platform provides everything you need to manage your healthcare information securely and efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-300 p-6 rounded-2xl ${
                      activeFeature === index
                        ? "bg-[#0CC0DF] text-white shadow-lg shadow-cyan-200"
                        : "bg-white hover:bg-gray-50 border border-gray-100"
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className="flex items-start">
                      <div
                        className={`p-3 rounded-xl mr-4 ${
                          activeFeature === index ? "bg-white/20" : "bg-cyan-50 text-[#0CC0DF]"
                        }`}
                      >
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className={activeFeature === index ? "text-cyan-100" : "text-gray-600"}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-4 bg-cyan-50 rounded-3xl rotate-3"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="aspect-square relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-[#0CC0DF]/20 to-[#00d9ff]/20 animate-pulse"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {features[activeFeature].icon}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 text-center">
                    <h3 className="text-2xl font-bold text-gray-900">{features[activeFeature].title}</h3>
                    <p className="text-gray-600 mt-2">{features[activeFeature].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0CC0DF] skew-y-2 transform origin-bottom-right"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to take control of your healthcare data?</h2>
            <p className="text-xl mb-10 text-cyan-100">
              Join Healbook for end-to-end healthcare information management. Your health journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <RegisterLink>
                <Button size="lg" className="bg-white text-[#0CC0DF] hover:bg-cyan-50 rounded-full px-8 py-2 text-lg">
                  Sign Up Now
                </Button>
              </RegisterLink>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10 rounded-full px-8 text-lg"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white pt-20 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <Link href="/" className="inline-block mb-6">
                <Image src="/logomainwhite.png" alt="Healbook Logo" width={160} height={40} />
              </Link>
              <p className="text-gray-600 mb-6">
                Secure healthcare data management platform for everyone. Your health, your control.
              </p>
              <div className="flex space-x-4">
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Founders</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="https://www.linkedin.com/in/harshavardhan-p-787a11202/"
                    className="group flex items-center text-gray-600 hover:text-[#0CC0DF] gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    /></svg>
                    <span>Harshavardhan Srinivas</span>
                    <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/prabhmeet-singh-11446699w/"
                    className="group flex items-center text-gray-600 hover:text-[#0CC0DF] gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    /></svg>
                    <span>Prabhmeet Singh</span>
                    <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Connect With Us</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="https://github.com/Prabhmeetchef/Healbook"
                    className="group flex items-center text-gray-600 hover:text-[#0CC0DF]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5 mr-3 text-gray-400 group-hover:text-[#0CC0DF]" />
                    <span>GitHub Repository</span>
                    <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:prabhmeetsinghns1000@gmail.com"
                    className="group flex items-center text-gray-600 hover:text-[#0CC0DF]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Mail className="h-5 w-5 mr-3 text-gray-400 group-hover:text-[#0CC0DF]" />
                    <span>Email Us</span>
                    <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-[#0CC0DF]">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="https://foremanapp.netlify.app" target="_blank" className="text-gray-600 hover:text-[#0CC0DF]">
                    Foreman
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </footer>
    </div>
  )
}