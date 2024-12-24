import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="w-full py-12 md:py-24 bg-cyan-500">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center text-white space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Ready to take control of your healthcare data?</h2>
          <p className="text-lg sm:text-xl max-w-2xl">
            Join thousands of users who trust Healbook with their healthcare information management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Sign Up Now
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white/10">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

