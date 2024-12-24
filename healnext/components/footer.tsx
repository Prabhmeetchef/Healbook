import Link from "next/link"
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full border-t py-16 bg-gray-50">
      <div className="container">
        {/* Branding Section */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <Link 
            href="/" 
            className="flex items-center space-x-2 transition-transform hover:scale-105"
          >
            <span className="text-3xl font-bold text-cyan-500">+</span>
            <span className="text-3xl font-bold text-cyan-500">ealbook</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-md">
            Secure healthcare data management platform for everyone
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Founders Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-cyan-500"></span>
              Founders
            </h4>
            <div className="space-y-4">
              <Link 
                href="https://www.linkedin.com/in/harshavardhan-p-787a11202/"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-cyan-500 transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="bg-gray-100 p-2 rounded-full group-hover:bg-cyan-50">
                  <Linkedin className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">Harshavardhan Srinivas</span>
                  <span className="text-xs">Co-founder</span>
                </div>
                <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link 
                href="https://www.linkedin.com/in/prabhmeet-singh-11446699w/"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-cyan-500 transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="bg-gray-100 p-2 rounded-full group-hover:bg-cyan-50">
                  <Linkedin className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">Prabhmeet Singh</span>
                  <span className="text-xs">Co-founder</span>
                </div>
                <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* Connect Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-cyan-500"></span>
              Connect With Us
            </h4>
            <div className="space-y-4">
              <Link 
                href="https://github.com/Prabhmeetchef/Healbook"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-cyan-500 transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="bg-gray-100 p-2 rounded-full group-hover:bg-cyan-50">
                  <Github className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">GitHub Repository</span>
                  <span className="text-xs">View our open-source code</span>
                </div>
                <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link 
                href="mailto:prabhmeetsinghns1000@gmail.com"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-cyan-500 transition-colors group"
              >
                <div className="bg-gray-100 p-2 rounded-full group-hover:bg-cyan-50">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">Email Us</span>
                  <span className="text-xs">prabhmeetsinghns1000@gmail.com</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-cyan-500"></span>
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                href="#features"
                className="text-sm text-muted-foreground hover:text-cyan-500 transition-colors"
              >
                Features
              </Link>
              <Link 
                href="#about"
                className="text-sm text-muted-foreground hover:text-cyan-500 transition-colors"
              >
                About
              </Link>
              <Link 
                href="#privacy"
                className="text-sm text-muted-foreground hover:text-cyan-500 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="#terms"
                className="text-sm text-muted-foreground hover:text-cyan-500 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Healbook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

