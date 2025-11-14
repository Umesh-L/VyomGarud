import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { insertContactSchema } from "@shared/schema";
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
  Loader2,
  Gauge,
  Activity,
  Plane
} from "lucide-react";
import heroImage from "@assets/generated_images/Military_UAV_drone_hero_7255cab5.png";

function AnimatedCounter({ end, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const isDecimal = end.toString().includes(".");
    const numericEnd = parseFloat(end);
    const increment = numericEnd / (duration * 60);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericEnd) {
        setCount(numericEnd);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {end.toString().includes(".") 
        ? count.toFixed(1)
        : Math.floor(count)}
      {suffix}
    </span>
  );
}

function CircularProgress({ value, maxValue, label, unit, color = "hsl(var(--primary))" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let current = 0;
    const increment = value / (2 * 60);
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [value, isInView]);

  const percentage = (displayValue / maxValue) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div ref={ref} className="relative w-32 h-32">
      <svg className="transform -rotate-90 w-32 h-32">
        <circle
          cx="64"
          cy="64"
          r="45"
          stroke="hsl(var(--border))"
          strokeWidth="8"
          fill="none"
        />
        <motion.circle
          cx="64"
          cy="64"
          r="45"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: isInView ? strokeDashoffset : circumference }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-primary">
          {Math.round(displayValue)}
        </div>
        <div className="text-xs text-muted-foreground">{unit}</div>
      </div>
      <div className="text-center mt-2 text-sm font-medium">{label}</div>
    </div>
  );
}

const PARTICLE_POSITIONS = [
  { x: 10, y: 20, delay: 0 },
  { x: 25, y: 60, delay: 0.5 },
  { x: 50, y: 30, delay: 1 },
  { x: 70, y: 80, delay: 1.5 },
  { x: 85, y: 40, delay: 2 },
  { x: 40, y: 70, delay: 0.8 },
  { x: 60, y: 15, delay: 1.2 },
  { x: 90, y: 55, delay: 1.8 },
];

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary) / 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary) / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {PARTICLE_POSITIONS.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/15"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

function FlightPathSVG() {
  const pathRef = useRef(null);
  const isInView = useInView(pathRef, { once: true });
  
  return (
    <svg 
      ref={pathRef}
      viewBox="0 0 800 400" 
      className="w-full h-full"
      style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.3))' }}
    >
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
        </linearGradient>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="hsl(var(--primary))" />
        </marker>
      </defs>
      
      <motion.path
        d="M 50 350 Q 200 50, 400 200 T 750 100"
        stroke="url(#pathGradient)"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      <motion.circle
        cx="50"
        cy="350"
        r="4"
        fill="hsl(var(--primary))"
        initial={{ scale: 0 }}
        animate={{ scale: isInView ? 1 : 0 }}
        transition={{ delay: 0.2 }}
      />
      
      <motion.circle
        cx="400"
        cy="200"
        r="4"
        fill="hsl(var(--primary))"
        initial={{ scale: 0 }}
        animate={{ scale: isInView ? 1 : 0 }}
        transition={{ delay: 1 }}
      />
      
      <motion.circle
        cx="750"
        cy="100"
        r="4"
        fill="hsl(var(--primary))"
        initial={{ scale: 0 }}
        animate={{ scale: isInView ? 1 : 0 }}
        transition={{ delay: 1.8 }}
      />

      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ delay: 2.2 }}
      >
        <motion.path
          d="M 750 95 L 760 100 L 750 105 Z"
          fill="hsl(var(--primary))"
          animate={{
            x: [-700, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: 2.5,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut"
          }}
        />
      </motion.g>
    </svg>
  );
}

export default function Home() {
  const { toast } = useToast();
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOverlayY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroAccentOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 0]);

  const form = useForm({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data) => {
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

  const onSubmit = (data) => {
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
    <div className="min-h-screen relative">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: scaleProgress }}
      />

      {/* Enhanced Animated Background */}
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Simplified Parallax Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroParallaxY }}
        >
          <img 
            src={heroImage} 
            alt="VyomGarud UAV System" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroOverlayY }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold tracking-tight mb-6"
              data-testid="heading-hero-title"
            >
              {['V', 'Y', 'O', 'M'].map((letter, i) => (
                <motion.span
                  key={`vyom-${i}`}
                  className="inline-block text-foreground"
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.2 + i * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  {letter}
                </motion.span>
              ))}
              {['G', 'A', 'R', 'U', 'D'].map((letter, i) => (
                <motion.span
                  key={`garud-${i}`}
                  className="inline-block text-primary ml-4"
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 + i * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
            
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="uppercase tracking-wider relative overflow-hidden group"
                  data-testid="button-contact-hero"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary-foreground/0 via-primary-foreground/20 to-primary-foreground/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative">Request Information</span>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="uppercase tracking-wider backdrop-blur-md bg-background/10 relative overflow-hidden group"
                  data-testid="button-capabilities"
                  onClick={() => document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-foreground/0 via-foreground/10 to-foreground/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative">View Capabilities</span>
                </Button>
              </motion.div>
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
      <section className="py-24 md:py-32 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="relative mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-center">
                <span className="text-foreground">Our </span>
                <span className="text-primary">Mission</span>
              </h2>
              <motion.div
                className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4"
                initial={{ width: 0 }}
                whileInView={{ width: "200px" }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </div>
            
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

            {/* Stats Grid with Animated Counters */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
              variants={staggerContainer}
            >
              {[
                { value: 10, suffix: "+", label: "Years of Excellence" },
                { value: 50, suffix: "K+", label: "Flight Hours" },
                { value: 99.9, suffix: "%", label: "Uptime Reliability" },
                { value: 24, suffix: "/7", label: "Support Available" }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center group relative"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.08, y: -5 }}
                  data-testid={`stat-${index}`}
                >
                  <div
                    className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <motion.div
                    className="relative bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border/50"
                    whileHover={{ borderColor: "hsl(var(--primary) / 0.5)" }}
                  >
                    <div 
                      className="text-3xl md:text-4xl font-bold text-primary mb-2 relative"
                      data-testid={`stat-value-${index}`}
                    >
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2.5} />
                    </div>
                    <div 
                      className="text-sm text-muted-foreground uppercase tracking-wider"
                      data-testid={`stat-label-${index}`}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
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
            <div className="relative mb-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-foreground">Core </span>
                <span className="text-primary">Capabilities</span>
              </h2>
              <motion.div
                className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4"
                initial={{ width: 0 }}
                whileInView={{ width: "200px" }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </div>
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
              <motion.div 
                key={index} 
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.08,
                  rotateY: 8,
                  rotateX: 5,
                  z: 50,
                  transition: { duration: 0.4, type: "spring", stiffness: 300 }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                <Card 
                  className="h-full hover-elevate active-elevate-2 transition-all duration-300 border-card-border group overflow-visible relative"
                  data-testid={`card-capability-${index}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ transform: "translateZ(-1px)" }}
                  />
                  <CardHeader>
                    <motion.div 
                      className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <capability.icon className="w-6 h-6 text-primary" />
                    </motion.div>
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
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-foreground">Why </span>
                <span className="text-primary">VyomGarud</span>
              </h2>
              <motion.div
                className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4"
                initial={{ width: 0 }}
                whileInView={{ width: "200px" }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </div>
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
                className="text-center relative group"
                variants={fadeInUp}
                whileHover={{ y: -15, scale: 1.05 }}
                data-testid={`highlight-${index}`}
              >
                <div
                  className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div 
                  className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-6"
                >
                  <highlight.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 
                  className="text-2xl font-semibold mb-3 relative"
                  data-testid={`highlight-title-${index}`}
                >
                  {highlight.title}
                </h3>
                {highlight.stat && (
                  <motion.div 
                    className="text-4xl font-bold text-primary mb-3"
                    data-testid={`highlight-stat-${index}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    {highlight.stat}
                  </motion.div>
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

      {/* Mission Planning Visualization */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <div className="relative mb-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-foreground">Mission </span>
                <span className="text-primary">Planning</span>
              </h2>
              <motion.div
                className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4"
                initial={{ width: 0 }}
                whileInView={{ width: "200px" }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Autonomous flight path optimization with real-time adjustments
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="overflow-hidden hover-elevate bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                  <div className="flex-1 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Plane className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Intelligent Route Planning</h3>
                        <p className="text-muted-foreground">
                          Our UAV systems utilize advanced algorithms to calculate optimal flight paths,
                          considering weather conditions, no-fly zones, and mission objectives.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Target className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Precision Waypoint Navigation</h3>
                        <p className="text-muted-foreground">
                          Multi-waypoint support with GPS accuracy down to centimeter-level precision
                          for critical surveillance and delivery operations.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Gauge className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Real-Time Adjustments</h3>
                        <p className="text-muted-foreground">
                          Dynamic path recalculation based on changing environmental conditions
                          and mission parameters during flight.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-h-[300px] lg:min-h-[400px]">
                    <FlightPathSVG />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Performance Metrics Section */}
      <section className="py-24 md:py-32 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <div className="relative mb-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-foreground">Performance </span>
                <span className="text-primary">Metrics</span>
              </h2>
              <motion.div
                className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4"
                initial={{ width: 0 }}
                whileInView={{ width: "200px" }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-world performance data from our UAV systems
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="flex flex-col items-center" data-testid="metric-speed">
              <CircularProgress value={320} maxValue={400} label="Max Speed" unit="km/h" />
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center" data-testid="metric-altitude">
              <CircularProgress value={5500} maxValue={6000} label="Ceiling" unit="m" color="hsl(200, 70%, 50%)" />
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center" data-testid="metric-range">
              <CircularProgress value={45} maxValue={50} label="Range" unit="km" color="hsl(280, 70%, 50%)" />
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center" data-testid="metric-endurance">
              <CircularProgress value={8} maxValue={10} label="Endurance" unit="hrs" color="hsl(340, 70%, 50%)" />
            </motion.div>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="overflow-hidden hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  System Capabilities Overview
                </CardTitle>
                <CardDescription>
                  Advanced features that set our UAVs apart
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { label: 'Payload Capacity', value: 85, max: 100, unit: 'kg' },
                    { label: 'Battery Efficiency', value: 94, max: 100, unit: '%' },
                    { label: 'Navigation Accuracy', value: 98, max: 100, unit: '%' },
                    { label: 'Weather Resistance', value: 88, max: 100, unit: '%' }
                  ].map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      data-testid={`bar-metric-${index}`}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{metric.label}</span>
                        <span className="text-sm text-muted-foreground">{metric.value}{metric.unit}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-primary/60"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(metric.value / metric.max) * 100}%` }}
                          transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 px-6">
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
