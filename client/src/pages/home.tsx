import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Target, 
  Cpu, 
  Radio, 
  Shield, 
  Zap, 
  Eye, 
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  Loader2
} from "lucide-react";
import heroImage from "@assets/generated_images/Military_UAV_drone_hero_7255cab5.png";

export default function Home() {
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting VyomGarud. We'll respond shortly.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const capabilities = [
    {
      icon: Eye,
      title: "Advanced Surveillance",
      description: "Military-grade optical and thermal imaging systems for comprehensive reconnaissance in any environment."
    },
    {
      icon: Cpu,
      title: "Autonomous Navigation",
      description: "AI-powered flight control with obstacle avoidance and mission planning for complex operations."
    },
    {
      icon: Radio,
      title: "Secure Communications",
      description: "Encrypted data links with long-range transmission capabilities for mission-critical operations."
    },
    {
      icon: Shield,
      title: "Defense Solutions",
      description: "Hardened systems designed for hostile environments with redundant fail-safes and countermeasures."
    }
  ];

  const highlights = [
    {
      icon: Target,
      title: "Precision Engineering",
      stat: "99.9%",
      description: "Mission success rate across 10,000+ flight hours in diverse operational conditions"
    },
    {
      icon: Zap,
      title: "Rapid Deployment",
      stat: "<5min",
      description: "Field-ready in under 5 minutes with autonomous takeoff and landing capabilities"
    },
    {
      icon: Shield,
      title: "Military-Grade Reliability",
      stat: "24/7",
      description: "Built to MIL-STD specifications with redundant systems and all-weather operation"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="VyomGarud UAV System" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 
              className="text-6xl md:text-8xl font-bold tracking-tight mb-6"
              data-testid="heading-hero-title"
            >
              <span className="text-foreground">VYOM</span>
              <span className="text-primary">GARUD</span>
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto font-light tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              data-testid="text-hero-tagline"
            >
              Military-Grade UAV Systems Engineered for Precision, Reliability, and Advanced Autonomy
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button 
                size="lg" 
                className="uppercase tracking-wider"
                data-testid="button-contact-hero"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Request Information
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="uppercase tracking-wider backdrop-blur-md bg-background/10"
                data-testid="button-capabilities"
                onClick={() => document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Capabilities
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          >
            <ChevronDown className="w-8 h-8 text-muted-foreground" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              <span className="text-foreground">Our </span>
              <span className="text-primary">Mission</span>
            </h2>
            
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                VyomGarud stands at the forefront of unmanned aerial systems, delivering cutting-edge UAV 
                technology that combines military-grade precision with advanced autonomous capabilities. 
                Our systems are engineered for critical missions where reliability isn't optional—it's essential.
              </p>
              <p>
                With over a decade of aerospace engineering excellence, we develop drone solutions that 
                perform flawlessly in the most demanding environments. From defense applications to 
                commercial surveillance, our UAV platforms set the standard for precision, endurance, and operational effectiveness.
              </p>
            </div>

            {/* Stats Grid */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
              variants={staggerContainer}
            >
              {[
                { value: "10+", label: "Years of Excellence" },
                { value: "50K+", label: "Flight Hours" },
                { value: "99.9%", label: "Uptime Reliability" },
                { value: "24/7", label: "Support Available" }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  variants={fadeInUp}
                  data-testid={`stat-${index}`}
                >
                  <div 
                    className="text-3xl md:text-4xl font-bold text-primary mb-2"
                    data-testid={`stat-value-${index}`}
                  >
                    {stat.value}
                  </div>
                  <div 
                    className="text-sm text-muted-foreground uppercase tracking-wider"
                    data-testid={`stat-label-${index}`}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-24 md:py-32 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Core </span>
              <span className="text-primary">Capabilities</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced systems engineered for mission-critical performance
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {capabilities.map((capability, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card 
                  className="h-full hover-elevate active-elevate-2 transition-all duration-300 border-card-border"
                  data-testid={`card-capability-${index}`}
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                      <capability.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{capability.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {capability.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Why </span>
              <span className="text-primary">VyomGarud</span>
            </h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {highlights.map((highlight, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={fadeInUp}
                data-testid={`highlight-${index}`}
              >
                <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <highlight.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 
                  className="text-2xl font-semibold mb-3"
                  data-testid={`highlight-title-${index}`}
                >
                  {highlight.title}
                </h3>
                {highlight.stat && (
                  <div 
                    className="text-4xl font-bold text-primary mb-3"
                    data-testid={`highlight-stat-${index}`}
                  >
                    {highlight.stat}
                  </div>
                )}
                <p 
                  className="text-muted-foreground leading-relaxed"
                  data-testid={`highlight-description-${index}`}
                >
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Get In </span>
              <span className="text-primary">Touch</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to discuss your UAV requirements? Contact our team for a consultation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll respond within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your full name" 
                                {...field} 
                                disabled={contactMutation.isPending}
                                data-testid="input-name"
                              />
                            </FormControl>
                            <FormMessage data-testid="error-name" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="your.email@company.com" 
                                {...field}
                                disabled={contactMutation.isPending}
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage data-testid="error-email" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your organization (optional)" 
                                {...field}
                                disabled={contactMutation.isPending}
                                data-testid="input-company"
                              />
                            </FormControl>
                            <FormMessage data-testid="error-company" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your requirements..." 
                                className="min-h-32 resize-none"
                                {...field}
                                disabled={contactMutation.isPending}
                                data-testid="input-message"
                              />
                            </FormControl>
                            <FormMessage data-testid="error-message" />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full uppercase tracking-wider"
                        disabled={contactMutation.isPending}
                        data-testid="button-submit-contact"
                      >
                        {contactMutation.isPending ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <a 
                        href="mailto:contact@vyomgarud.com" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                        data-testid="link-email"
                      >
                        contact@vyomgarud.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Phone</div>
                      <a 
                        href="tel:+1-800-VYOMGRD" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                        data-testid="link-phone"
                      >
                        +1-800-VYOMGRD
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Headquarters</div>
                      <div className="text-muted-foreground">
                        Aerospace Technology Park<br />
                        Innovation District<br />
                        Tech Valley, USA
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <h4 className="font-semibold mb-4">Business Hours</h4>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-foreground">VYOM</span>
                <span className="text-primary">GARUD</span>
              </h3>
              <p className="text-muted-foreground">
                Military-grade UAV systems engineered for precision, reliability, and advanced autonomy.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="hover:text-primary transition-colors"
                    data-testid="link-home"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-primary transition-colors"
                    data-testid="link-capabilities-footer"
                  >
                    Capabilities
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-primary transition-colors"
                    data-testid="link-contact-footer"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">Export Compliance</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} VyomGarud Systems. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
