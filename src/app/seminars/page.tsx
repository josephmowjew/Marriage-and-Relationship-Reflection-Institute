'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users, ArrowRight, Filter } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/animated-section";

export default function SeminarsPage() {
  return (
    <div className="bg-[#F8F5F2] pt-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-red-800/90">
          <Image
            src="/seminars-hero.jpg"
            alt="Seminar background"
            fill
            className="object-cover mix-blend-overlay"
            priority
          />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Transform Your Relationships Through Our Seminars
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Join our expert-led seminars designed to strengthen marriages and empower ministry leaders.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100" asChild>
                <Link href="#upcoming">View Upcoming Seminars</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                <Link href="/contact">Request Private Seminar</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Seminars */}
      <section className="py-20 px-4" id="upcoming">
        <div className="container mx-auto">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Upcoming Seminars</h2>
                <p className="text-lg text-gray-600">Join our transformative events</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
                <Button variant="outline" className="gap-2">
                  View Calendar
                  <Calendar className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Seminar Cards */}
            <AnimatedSection delay={0.1} className="h-full">
              <motion.div 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="aspect-[3/4] relative">
                  <Image
                    src="/seminars/1.jpeg"
                    alt="Building Strong Foundations in Marriage"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>Feb 28, 2024</span>
                      <span className="mx-2">•</span>
                      <MapPin className="w-4 h-4" />
                      <span>Johannesburg</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-red-600 text-sm font-medium mb-2">
                    <Users className="w-4 h-4" />
                    <span>For Couples</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">Building Strong Foundations in Marriage</h3>
                  <p className="text-gray-600 mb-6 line-clamp-2">A comprehensive seminar on establishing and maintaining healthy relationships.</p>
                  <div className="mt-auto">
                    <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                      <Link href="/seminars/register" className="flex items-center justify-center gap-2">
                        Register Now
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="h-full">
              <motion.div 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="aspect-[3/4] relative">
                  <Image
                    src="/seminars/2.jpeg"
                    alt="Pastoral Leadership Excellence"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>Mar 15, 2024</span>
                      <span className="mx-2">•</span>
                      <MapPin className="w-4 h-4" />
                      <span>Cape Town</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-red-600 text-sm font-medium mb-2">
                    <Users className="w-4 h-4" />
                    <span>For Ministry Leaders</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">Pastoral Leadership Excellence</h3>
                  <p className="text-gray-600 mb-6 line-clamp-2">Empowering pastoral leaders with effective ministry strategies.</p>
                  <div className="mt-auto">
                    <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                      <Link href="/seminars/register" className="flex items-center justify-center gap-2">
                        Register Now
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.3} className="h-full">
              <motion.div 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="aspect-[3/4] relative">
                  <Image
                    src="/seminars/3.jpeg"
                    alt="Communication in Marriage"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>Apr 5, 2024</span>
                      <span className="mx-2">•</span>
                      <MapPin className="w-4 h-4" />
                      <span>Durban</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-red-600 text-sm font-medium mb-2">
                    <Users className="w-4 h-4" />
                    <span>For Couples</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">Communication in Marriage</h3>
                  <p className="text-gray-600 mb-6 line-clamp-2">Master effective communication strategies for a stronger relationship.</p>
                  <div className="mt-auto">
                    <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                      <Link href="/seminars/register" className="flex items-center justify-center gap-2">
                        Register Now
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Attend Section */}
      <AnimatedSection>
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Attend Our Seminars?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Experience transformative learning and growth through our expertly crafted programs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Expert Guidance",
                    description: "Learn from experienced mentors and counselors with proven track records"
                  },
                  {
                    title: "Practical Tools",
                    description: "Gain actionable strategies and resources you can implement immediately"
                  },
                  {
                    title: "Community Support",
                    description: "Connect with like-minded couples and leaders on similar journeys"
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="p-6 bg-gray-50 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                  >
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Request Custom Seminar */}
      <AnimatedSection>
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="bg-red-600 rounded-3xl p-12 md:p-20 text-white">
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Looking for a Custom Seminar?
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  We offer tailored seminars for churches, organizations, and private groups.
                </p>
                <Button 
                  size="lg" 
                  className="bg-white text-red-600 hover:bg-gray-100 group"
                  asChild
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    Get in Touch
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
} 