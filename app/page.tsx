import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Upload, MapPin, Printer, Star, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Printer className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">PrintConnect</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#for-customers" className="text-sm font-medium hover:text-primary">
              For Customers
            </Link>
            <Link href="#for-shopkeepers" className="text-sm font-medium hover:text-primary">
              For Shopkeepers
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Print documents anywhere, anytime
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Connect with local print shops and get your documents printed with just a few clicks. No more waiting
                  in lines or dealing with printer issues.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Person picking up printed documents"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get your documents printed in three simple steps
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Upload</h3>
                <p className="text-muted-foreground">Upload your documents securely to our platform in any format</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Select Shop</h3>
                <p className="text-muted-foreground">
                  Choose from nearby print shops based on ratings, price, and distance
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Printer className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Print</h3>
                <p className="text-muted-foreground">Pick up your printed documents when ready or get them delivered</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Benefits</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              {/* Customer Benefits */}
              <div id="for-customers" className="space-y-6">
                <h3 className="text-2xl font-bold">For Customers</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Convenience</h4>
                      <p className="text-muted-foreground">Print from anywhere without owning a printer</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Save Time</h4>
                      <p className="text-muted-foreground">No more waiting in lines or dealing with printer issues</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Quality Options</h4>
                      <p className="text-muted-foreground">Choose from various print qualities and paper types</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Shopkeeper Benefits */}
              <div id="for-shopkeepers" className="space-y-6">
                <h3 className="text-2xl font-bold">For Shopkeepers</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Increased Business</h4>
                      <p className="text-muted-foreground">Reach more customers and grow your print shop business</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Streamlined Operations</h4>
                      <p className="text-muted-foreground">Manage print jobs efficiently with our dashboard</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Customer Insights</h4>
                      <p className="text-muted-foreground">Gain valuable data about your customers and their needs</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {/* Testimonial 1 */}
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image src="/placeholder.svg?height=64&width=64" alt="User profile" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-muted-foreground italic">
                    "PrintConnect saved me during finals week when my printer broke down. Found a shop nearby and had my
                    documents ready in 30 minutes!"
                  </p>
                  <h4 className="text-lg font-semibold mt-4">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">Student</p>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image src="/placeholder.svg?height=64&width=64" alt="User profile" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-muted-foreground italic">
                    "As a small business owner, PrintConnect has helped me reach more customers and streamline my print
                    shop operations."
                  </p>
                  <h4 className="text-lg font-semibold mt-4">Michael Chen</h4>
                  <p className="text-sm text-muted-foreground">Print Shop Owner</p>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image src="/placeholder.svg?height=64&width=64" alt="User profile" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-muted-foreground italic">
                    "I travel frequently for work and PrintConnect makes it easy to print documents on the go without
                    carrying a printer."
                  </p>
                  <h4 className="text-lg font-semibold mt-4">Emily Rodriguez</h4>
                  <p className="text-sm text-muted-foreground">Business Consultant</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Frequently Asked Questions
                </h2>
              </div>
            </div>
            <div className="mx-auto max-w-3xl mt-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How much does it cost to use PrintConnect?</AccordionTrigger>
                  <AccordionContent>
                    PrintConnect is free to use for customers. You only pay for the printing services you use, with
                    prices set by individual print shops. For shopkeepers, we charge a small commission on each
                    transaction.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What file formats are supported?</AccordionTrigger>
                  <AccordionContent>
                    We support all common document formats including PDF, DOCX, XLSX, PPTX, JPG, PNG, and many more. If
                    you have a specific format not listed, please contact us.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How do I know my documents are secure?</AccordionTrigger>
                  <AccordionContent>
                    We take security seriously. All documents are encrypted during upload and storage. Print shops can
                    only access your documents after you've selected them for printing, and access is automatically
                    revoked after printing is complete.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I get my documents delivered?</AccordionTrigger>
                  <AccordionContent>
                    Yes, some print shops offer delivery services. You can see which shops offer delivery when browsing
                    nearby locations, along with any associated delivery fees.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>How do I become a print shop partner?</AccordionTrigger>
                  <AccordionContent>
                    Simply sign up as a shopkeeper on our platform. You'll need to provide details about your shop,
                    services offered, and complete a verification process. Once approved, you can start receiving print
                    jobs.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to start printing?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Join thousands of users who are already enjoying the convenience of PrintConnect.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/signup?role=customer">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Sign Up as Customer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/signup?role=shopkeeper">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    Register Your Shop
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:h-24">
          <div className="flex items-center gap-2">
            <Printer className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">PrintConnect</span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              About Us
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">© 2025 PrintConnect. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

