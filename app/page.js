"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import useScrollPosition from "@/hooks/useScrollPosition";
import {
  ArrowRight,
  UploadCloud,
  Wand2,
  Sparkles,
  Palette,
  Zap,
  Shield,
  Monitor,
  Clock,
  Star,
  Quote,
  Check,
  ChevronDown,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  CreditCard,
  Camera,
  Image as ImageIcon,
} from "lucide-react";

const NavLink = ({ href, children }) => (
  <Link href={href} className="relative group text-gray-600 hover:text-indigo-600 font-medium transition-colors">
    <motion.span
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      {children}
    </motion.span>
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
  </Link>
);

export default function Home() {
  const { isSignedIn } = useUser();
  const [openFaq, setOpenFaq] = useState(null);
  const [counters, setCounters] = useState({ rooms: 0, rating: 0, styles: 0, seconds: 0 });
  const { scrollPosition } = useScrollPosition();
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  // Animate counters when stats section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const targets = { rooms: 50000, rating: 4.9, styles: 15, seconds: 30 };

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounters({
        rooms: Math.floor(targets.rooms * progress),
        rating: parseFloat((targets.rating * progress).toFixed(1)),
        styles: Math.floor(targets.styles * progress),
        seconds: Math.floor(targets.seconds * progress),
      });
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
  };

  const styles = [
    { name: "Modern", image: "/images/modern.png" },
    { name: "Minimalist", image: "/images/minimalist.png" },
    { name: "Traditional", image: "/images/traditional.png" },
    { name: "Industrial", image: "/images/industrial.png" },
    { name: "Bohemian", image: "/images/bohemian.png" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      rating: 5,
      quote: "This tool completely transformed how I visualize my home renovations. Within seconds, I could see my living room in different styles!",
    },
    {
      name: "Michael Chen",
      role: "Interior Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      rating: 5,
      quote: "As a professional designer, this saves me hours of work. I use it to quickly show clients different possibilities for their spaces.",
    },
    {
      name: "Emily Davis",
      role: "Real Estate Agent",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      rating: 5,
      quote: "Virtual staging has never been easier. My listings get more attention and sell faster thanks to this amazing AI tool.",
    },
  ];

  const faqs = [
    {
      question: "How does the AI interior design work?",
      answer: "Simply upload a photo of your room, select your preferred style, and our AI will generate a photorealistic redesign in seconds. The AI analyzes your room's layout and applies the chosen style while preserving the room structure.",
    },
    {
      question: "What image formats are supported?",
      answer: "We support JPG, PNG, and WebP formats. For best results, use high-quality images with good lighting. The recommended resolution is at least 1024x1024 pixels.",
    },
    {
      question: "How long does it take to generate a design?",
      answer: "Most designs are generated within 10-30 seconds, depending on the complexity of the room and current server load. Premium users get priority processing.",
    },
    {
      question: "Can I use the generated images commercially?",
      answer: "Yes! Users have full commercial rights to use generated images for listings, marketing materials, and client presentations.",
    },
    {
      question: "What if I'm not satisfied with the result?",
      answer: "You can regenerate with different settings at no extra cost. Our AI improves with each generation, and you can adjust prompts to get exactly what you want.",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <ScrollProgress />
      <ScrollToTop />

      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Interior Design AI</span>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How it Works</NavLink>
          <NavLink href="#styles">Styles</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="#faq">FAQ</NavLink>
          <NavLink href="#contact">Contact Us</NavLink>
        </div>

        {/* SignIn/Dashboard */}
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <Link
              href="/dashboard"
              className="px-6 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Dashboard
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button className="px-6 py-2 rounded-full border-2 border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition-colors">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-20 pb-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-8">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium border border-indigo-100 w-fit"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  AI-Powered Interiors
                </motion.div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-gray-900">
                  Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Room</span> in Seconds.
                </h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg"
                >
                  Upload a photo of your empty room and let our advanced AI re-imagine it in any style. From messy to modern in a click.
                </motion.p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Content - Slider */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg transform hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2rem] blur-2xl opacity-10 animate-pulse">
              </div>
              <BeforeAfterSlider
                beforeImage="/images/messy.png"
                afterImage="/images/scandinavian.png"
              />
              {/* Floating Badge */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Wand2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Generated in</p>
                    <p className="text-lg font-bold text-gray-900">4.2 Seconds</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 md:px-12 lg:px-20 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Features</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to visualize your dream space
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: "AI-Powered", description: "State-of-the-art AI generates photorealistic interior designs" },
              { icon: Palette, title: "Multiple Styles", description: "Choose from 5+ curated interior design styles" },
              { icon: Monitor, title: "High Resolution", description: "Get stunning 1080p HD quality Photos" },
              { icon: Zap, title: "Fast Processing", description: "Generate designs in under 10-30 seconds" },
              { icon: ImageIcon, title: "Easy to Use", description: "Simple drag-and-drop interface, no design skills needed" },
              { icon: Shield, title: "Secure & Private", description: "Your images are encrypted and deleted after 1 hour" },
            ].map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div
                  className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Works</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Transform your space in three simple steps
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200" />

            {[
              { icon: Camera, title: "Upload Photo", description: "Take a photo of your room or upload an existing one. Any angle works!" },
              { icon: Palette, title: "Choose Style", description: "Select from 5+ interior design styles - Modern, Scandinavian, Industrial & more" },
              { icon: Sparkles, title: "Get Results", description: "AI generates a stunning redesign in seconds. Download and share instantly!" },
            ].map((step, index) => (
              <ScrollReveal key={index} delay={index * 0.2}>
                <div className="relative group">
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Style Gallery Section */}
      <section id="styles" className="py-24 px-6 md:px-12 lg:px-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Style <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Gallery</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore the different styles our AI can generate
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          >
            {styles.map((style, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-72 snap-center group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <Image
                    src={style.image}
                    alt={style.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-bold">{style.name}</h3>
                    <p className="text-white/80 text-sm mt-1">Click to explore</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Thousands</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                See what our users are saying
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 0.2} direction={index % 2 === 0 ? "left" : "right"}>
                <div
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative"
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-indigo-100" />
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100">
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed">{testimonial.quote}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section
      <section ref={statsRef} className="py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: `${counters.rooms.toLocaleString()}+`, label: "Rooms Transformed" },
              { value: counters.rating, label: "User Rating" },
              { value: `${counters.styles}+`, label: "Design Styles" },
              { value: `${counters.seconds}s`, label: "Average Time" },
            ].map((stat, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 mt-2">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section> */}

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 md:px-12 lg:px-20 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Pricing</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose the plan that works for you
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                description: "Perfect for trying out",
                features: ["3 room designs", "Basic styles", "Standard resolution", "24h image storage"],
                cta: "Get Started",
                popular: false,
              },
              {
                name: "Pro",
                price: "$9",
                period: "/month",
                description: "Best for homeowners",
                features: ["50 room designs/mo", "All 15+ styles", "HD resolution", "Commercial license", "Priority processing", "30-day storage"],
                cta: "Start Pro Trial",
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "For teams & agencies",
                features: ["Unlimited designs", "Custom styles", "4K resolution", "API access", "Dedicated support", "White-label option"],
                cta: "Contact Sales",
                popular: false,
              },
            ].map((plan, index) => (
              <ScrollReveal key={index} delay={index * 0.2}>
                <div
                  className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 ${plan.popular
                    ? "border-indigo-500 shadow-xl shadow-indigo-100 scale-105"
                    : "border-gray-100 hover:border-indigo-200 hover:shadow-lg"
                    }`}
                >
                  {plan.popular && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1, type: "spring" }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-full"
                    >
                      Most Popular
                    </motion.div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-4 mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-600">
                        <Check className="w-5 h-5 text-indigo-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${plan.popular
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Questions</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div
                  className="bg-stone-50 rounded-2xl overflow-hidden border border-gray-100"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-stone-100 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <ScrollReveal direction="up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Join thousands of homeowners and designers who are already using AI to visualize their dream interiors.
            </p>
            <Link
              href={isSignedIn ? "/dashboard/create-new" : "/dashboard"}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              Get Started for Free <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Professional Footer */}
      <footer id="contact" className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Column 1 - Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Wand2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Interior Design AI</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">
                Transform any room with AI-powered interior design. Upload a photo and watch the magic happen.
              </p>
              <div className="flex gap-4">
                {[Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 - Product */}
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-3 text-gray-400">
                {["Features", "Pricing", "Gallery", "API"].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Company */}
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-3 text-gray-400">
                {["About", "Blog", "Contact"].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Legal */}
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-3 text-gray-400">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col justify-center md:flex-row items-center gap-4 text-xl text-gray-200">
            <p>© {new Date().getFullYear()} Interior Design AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}