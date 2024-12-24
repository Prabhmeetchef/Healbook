import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Shield, Lock, Clock } from 'lucide-react'

export function Hero() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-90" />
      <div className="relative container flex flex-col lg:flex-row items-center gap-8 pt-24 pb-12 lg:py-32">
        <div className="flex flex-col space-y-6 lg:w-1/2 text-white z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            The best place for all your Healthcare data
          </h1>
          <p className="text-lg sm:text-xl opacity-90">
            Secure, convenient, and accessible healthcare record management. Your medical history in one trusted platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-cyan-500 hover:bg-white/90 w-full sm:w-auto">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 w-full sm:w-auto">
              Learn More
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
            <div className="flex flex-col items-center text-center">
              <Shield className="h-8 w-8 mb-2" />
              <h3 className="font-semibold">Secure</h3>
              <p className="text-sm opacity-90">End-to-end encrypted</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Lock className="h-8 w-8 mb-2" />
              <h3 className="font-semibold">Private</h3>
              <p className="text-sm opacity-90">HIPAA compliant</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="h-8 w-8 mb-2" />
              <h3 className="font-semibold">24/7 Access</h3>
              <p className="text-sm opacity-90">Always available</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 z-10 w-full max-w-md lg:max-w-none">
          <Image
            src="/placeholder.svg?height=600&width=600"
            alt="Healthcare Professional"
            width={600}
            height={600}
            className="rounded-lg shadow-xl w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  )
}

