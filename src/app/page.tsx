'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight, Heart, Users, Calendar, MessageCircle, BookOpen, Church } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/animated-section";

export default function Home() {
  return (
    <div className="bg-[#F8F5F2]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="container mx-auto">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Expert Marriage
              <br />
              <span className="text-red-600">Mentorship & Counselling</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Guiding couples through their journey with professional mentorship, counselling, and relationship-building programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700" asChild>
                <Link href="/book">Schedule a Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn About Our Approach</Link>
              </Button>
            </div>
          </motion.div>

          <div className="relative">
            {/* Main Image */}
            <motion.div 
              className="relative w-full max-w-3xl mx-auto aspect-[16/9] rounded-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
        <Image
                src="/couple-image.jpg"
                alt="Happy couple talking and smiling"
                fill
                className="object-cover object-[50%_10%] scale-125"
          priority
        />
              {/* Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F8F5F2] to-transparent"></div>
            </motion.div>

            {/* Floating Questions */}
            <motion.div 
              className="absolute left-0 top-1/4 bg-white p-4 rounded-lg shadow-lg max-w-xs transform -translate-x-1/4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: "-25%" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-sm text-gray-400 mb-1">Mei wonders...</p>
              <p className="text-sm font-medium">How can we communicate better without arguing?</p>
            </motion.div>

            <motion.div 
              className="absolute right-0 top-0 bg-white p-4 rounded-lg shadow-lg max-w-xs transform translate-x-1/4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: "25%" }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-sm text-gray-400 mb-1">Kenneth wonders...</p>
              <p className="text-sm font-medium">What should I do about my in-laws?</p>
            </motion.div>

            <motion.div 
              className="absolute right-1/4 bottom-0 bg-white p-4 rounded-lg shadow-lg max-w-xs"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="text-sm text-gray-400 mb-1">Kenneth wonders...</p>
              <p className="text-sm font-medium">What's so important about date night?</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <AnimatedSection>
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <p className="text-red-600 font-medium mb-4">Our Services</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-12">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                    Professional Marriage Mentorship
                  </h2>
                </div>
                <div>
                  <p className="text-lg text-gray-600">
                    At MRRI, we provide expert guidance through personalized mentorship, counselling sessions, and structured programs designed to strengthen your relationship.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <motion.div 
                  className="p-6 bg-gray-50 rounded-xl"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Heart className="w-12 h-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Relationship Assessment</h3>
                  <p className="text-gray-600">Comprehensive evaluation of your relationship dynamics</p>
                </motion.div>

                <motion.div 
                  className="p-6 bg-gray-50 rounded-xl"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Users className="w-12 h-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Couples Mentorship</h3>
                  <p className="text-gray-600">One-on-one guidance with experienced mentors</p>
                </motion.div>

                <motion.div 
                  className="p-6 bg-gray-50 rounded-xl"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Calendar className="w-12 h-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Structured Programs</h3>
                  <p className="text-gray-600">Tailored courses for different relationship stages</p>
                </motion.div>

                <motion.div 
                  className="p-6 bg-gray-50 rounded-xl"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageCircle className="w-12 h-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Ongoing Support</h3>
                  <p className="text-gray-600">Continuous guidance and communication</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Why Choose MRRI */}
      <AnimatedSection>
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <p className="text-red-600 font-medium mb-4">Why Choose MRRI</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                    Our mentorship approach...
                  </h2>
                </div>
                <div className="space-y-6">
                  {[
                    "Combines professional counselling with practical relationship guidance",
                    "Provides personalized support tailored to your unique situation",
                    "Offers both in-person and online mentorship options"
                  ].map((text, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 * i }}
                    >
                      <CheckCircle2 className="text-red-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <p className="text-lg text-gray-600">{text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* What We Do Section */}
      <AnimatedSection>
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <p className="text-red-600 font-medium mb-4">What We Do</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-12">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                    Comprehensive Support for Relationships & Ministry
                  </h2>
                </div>
                <div>
                  <p className="text-lg text-gray-600">
                    From strengthening marriages to empowering pastoral leaders, we provide expert guidance and mentorship for both personal relationships and ministerial development.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Marriage Mentorship Card */}
                <motion.div 
                  className="p-8 bg-gray-50 rounded-2xl relative overflow-hidden group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-bl-full -mr-16 -mt-16"></div>
                  <Heart className="w-12 h-12 text-red-600 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Marriage & Relationship Mentorship</h3>
                  <p className="text-gray-600 mb-6">
                    Expert guidance for couples at every stage of their journey, from pre-marriage preparation to ongoing relationship enrichment.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-red-600" />
                      <span>Personalized counselling sessions</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-red-600" />
                      <span>Relationship assessment and guidance</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-red-600" />
                      <span>Structured relationship programs</span>
          </li>
                  </ul>
                  <Button className="bg-red-600 hover:bg-red-700" asChild>
                    <Link href="/marriage-mentorship">Learn More</Link>
                  </Button>
                </motion.div>

                {/* Pastoral Mentorship Card */}
                <motion.div 
                  className="p-8 bg-gray-50 rounded-2xl relative overflow-hidden group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-bl-full -mr-16 -mt-16"></div>
                  <Church className="w-12 h-12 text-red-600 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Pastoral & Ministerial Mentorship</h3>
                  <p className="text-gray-600 mb-6">
                    Specialized coaching and support for pastoral leaders, helping them develop their ministry and leadership skills.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-red-600" />
                      <span>Leadership development coaching</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-red-600" />
                      <span>Ministry growth strategies</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-red-600" />
                      <span>Pastoral counseling training</span>
                    </li>
                  </ul>
                  <Button className="bg-red-600 hover:bg-red-700" asChild>
                    <Link href="/pastoral-mentorship">Learn More</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Course Options */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pre-Marriage Course */}
            <AnimatedSection delay={0.2}>
              <div className="relative bg-white rounded-3xl overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-[#FFA726] opacity-20 rounded-tl-[100px] group-hover:scale-110 transition-transform duration-300"></div>
                <div className="relative p-8 pb-12">
                  <p className="text-red-600 font-medium mb-4">In person or online</p>
                  <h2 className="text-3xl font-bold mb-4">The Pre-Marriage Course</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    For engaged couples, newlyweds, or couples exploring the idea of marriage
                  </p>
                  <div className="relative w-full aspect-[4/3] mb-8 rounded-lg overflow-hidden">
                    <Image
                      src="/pre-marriage-couple.jpg"
                      alt="Engaged couple walking together"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700" size="lg" asChild>
                    <Link href="/pre-marriage">Learn More</Link>
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            {/* Marriage Course */}
            <AnimatedSection delay={0.4}>
              <div className="relative bg-white rounded-3xl overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <div className="absolute bottom-0 right-0 w-full h-1/3 bg-red-600 opacity-20 rounded-tr-[100px] group-hover:scale-110 transition-transform duration-300"></div>
                <div className="relative p-8 pb-12">
                  <p className="text-red-600 font-medium mb-4">In person or online</p>
                  <h2 className="text-3xl font-bold mb-4">The Marriage Course</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    For couples who are married or have lived together for more than two years
                  </p>
                  <div className="relative w-full aspect-[4/3] mb-8 rounded-lg overflow-hidden">
            <Image
                      src="/marriage-couple.jpg"
                      alt="Happy married couple sharing drinks"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700" size="lg" asChild>
                    <Link href="/marriage">Learn More</Link>
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Seminars Section */}
      <AnimatedSection>
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <p className="text-red-600 font-medium mb-4">Upcoming Events</p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  Marriage & Ministry Seminars
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Join our transformative seminars designed to strengthen relationships and empower ministry leaders.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Seminar Card 1 */}
                <motion.div 
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col h-full"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="aspect-[3/4] relative">
          <Image
                      src="/seminars/1.jpeg"
                      alt="Seminar poster"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-red-600 text-sm font-medium mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>Upcoming - Feb 28, 2024</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">Building Strong Foundations in Marriage</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">A comprehensive seminar on establishing and maintaining healthy relationships.</p>
                    <div className="mt-auto">
                      <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                        <Link href="/seminars/register">Register Now</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Seminar Card 2 */}
                <motion.div 
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col h-full"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="aspect-[3/4] relative">
          <Image
                      src="/seminars/2.jpeg"
                      alt="Seminar poster"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-red-600 text-sm font-medium mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>Upcoming - Mar 15, 2024</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">Pastoral Leadership Excellence</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">Empowering pastoral leaders with effective ministry strategies.</p>
                    <div className="mt-auto">
                      <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                        <Link href="/seminars/register">Register Now</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* View All Seminars Card */}
                <motion.div 
                  className="group relative bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 flex flex-col h-full"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-8 flex flex-col flex-1 items-center justify-center text-center">
                    <Calendar className="w-16 h-16 text-red-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2">View All Seminars</h3>
                    <p className="text-gray-600 mb-6">Discover our full range of upcoming seminars and events.</p>
                    <div className="mt-auto">
                      <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white" asChild>
                        <Link href="/seminars">Browse Seminars</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Call to Action */}
      <AnimatedSection>
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="bg-[#F4F1EE] rounded-3xl p-12 md:p-20 flex flex-col md:flex-row justify-between items-center gap-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                Ready to invest in your marriage?
              </h2>
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-lg px-8 rounded-full group"
                asChild
              >
                <Link href="/get-started" className="flex items-center gap-2">
                  Get started now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Newsletter Section */}
      <AnimatedSection>
        <section className="bg-[#3C3C3B] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Newsletter Header */}
              <div className="max-w-2xl mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Subscribe now for expert marriage advice delivered straight to your inbox!
                </h2>
                <p className="text-lg text-gray-300">
                  Join over 1,500,000 couples on their marriage journey
                </p>
              </div>

              {/* Email Subscription Form */}
              <div className="flex flex-col md:flex-row gap-4 mb-20">
                <div className="flex-grow max-w-xl">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full h-14 px-6 rounded-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 transition-shadow duration-300"
                  />
                </div>
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 h-14"
                  size="lg"
                >
                  Subscribe
                </Button>
              </div>

              {/* Footer Links */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-12 border-t border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    MRRI provides expert marriage mentorship and counselling, helping couples build stronger relationships through professional guidance and support.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Marriage Programs</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/pre-marriage" className="text-gray-400 hover:text-white transition-colors">
                        Pre-Marriage Course
                      </Link>
                    </li>
                    <li>
                      <Link href="/marriage" className="text-gray-400 hover:text-white transition-colors">
                        Marriage Course
                      </Link>
                    </li>
                    <li>
                      <Link href="/seminars" className="text-gray-400 hover:text-white transition-colors">
                        Seminars
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Mentorship</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/marriage-mentorship" className="text-gray-400 hover:text-white transition-colors">
                        Marriage Mentorship
                      </Link>
                    </li>
                    <li>
                      <Link href="/pastoral-mentorship" className="text-gray-400 hover:text-white transition-colors">
                        Pastoral Mentorship
                      </Link>
                    </li>
                    <li>
                      <Link href="/resources" className="text-gray-400 hover:text-white transition-colors">
                        Resources
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Contact</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/book" className="text-gray-400 hover:text-white transition-colors">
                        Book a Session
                      </Link>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
