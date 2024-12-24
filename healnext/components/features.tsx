import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Share2, Bell, Shield, Users, Calendar } from 'lucide-react'

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Healbook?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive healthcare management tools designed for you
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-cyan-500 mb-2" />}
            title="Digital Records"
            description="Store and access your medical records, prescriptions, and test results digitally"
          />
          <FeatureCard
            icon={<Share2 className="h-8 w-8 text-cyan-500 mb-2" />}
            title="Easy Sharing"
            description="Securely share your medical information with healthcare providers"
          />
          <FeatureCard
            icon={<Bell className="h-8 w-8 text-cyan-500 mb-2" />}
            title="Reminders"
            description="Never miss appointments or medications with smart notifications"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8 text-cyan-500 mb-2" />}
            title="Data Security"
            description="Enterprise-grade security to protect your sensitive medical information"
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-cyan-500 mb-2" />}
            title="Family Access"
            description="Manage healthcare records for your entire family in one place"
          />
          <FeatureCard
            icon={<Calendar className="h-8 w-8 text-cyan-500 mb-2" />}
            title="Appointment Booking"
            description="Schedule appointments with healthcare providers directly through the platform"
          />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="flex flex-col items-center text-center p-6">
      <CardHeader>
        {icon}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}

