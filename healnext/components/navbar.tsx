"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'

export function Navbar() {
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
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className={`text-2xl font-bold ${isScrolled ? "text-cyan-500" : "text-white"}`}>+</span>
          <span className={`text-2xl font-bold ${isScrolled ? "text-cyan-500" : "text-white"}`}>ealbook</span>
        </Link>
        <nav className={`fixed inset-0 ${isMenuOpen ? 'flex' : 'hidden'} flex-col items-center justify-center bg-white/95 backdrop-blur-md space-y-8 text-lg md:static md:flex md:flex-row md:space-y-0 md:space-x-4 md:bg-transparent`}>
          <Button variant="ghost" className={`${isScrolled ? "text-gray-600 hover:text-cyan-500" : "text-white hover:text-white/80"}`} onClick={() => setIsMenuOpen(false)}>
            Features
          </Button>
          <Button variant="ghost" className={`${isScrolled ? "text-gray-600 hover:text-cyan-500" : "text-white hover:text-white/80"}`} onClick={() => setIsMenuOpen(false)}>
            About
          </Button>
          <Button variant="ghost" className={`${isScrolled ? "text-gray-600 hover:text-cyan-500" : "text-white hover:text-white/80"}`} onClick={() => setIsMenuOpen(false)}>
            Contact
          </Button>
          <Button className={`${isScrolled ? "bg-cyan-500 text-white hover:bg-cyan-600" : "bg-white text-cyan-500 hover:bg-white/90"}`} onClick={() => setIsMenuOpen(false)}>
            Log In
          </Button>
        </nav>
        <Button variant="ghost" className="md:hidden z-50" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <X className={`h-6 w-6 ${isScrolled ? "text-gray-600" : "text-white"}`} />
          ) : (
            <Menu className={`h-6 w-6 ${isScrolled ? "text-gray-600" : "text-white"}`} />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
    </header>
  )
}

