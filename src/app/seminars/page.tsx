'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users, ArrowRight, Filter } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/animated-section";
import { useEffect, useState } from "react";
import { getSeminars } from "../actions/seminars";
import { format } from "date-fns";

interface Seminar {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string
  location: string;
  imageUrl: string;
  audienceType: string;
  slug: string;
}

interface PrismaSeminar {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl: string;
  audienceType: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function SeminarsPage() {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeminars = async () => {
      try {
        setLoading(true);
        const result = await getSeminars();
        
        if ('error' in result && result.error) {
          setError(result.error);
        } else if (result.seminars) {
          // Convert date to string for proper rendering
          const formattedSeminars = result.seminars.map((seminar: PrismaSeminar) => ({
            ...seminar,
            date: seminar.date.toISOString(),
          }));
          setSeminars(formattedSeminars);
        }
      } catch (err) {
        setError('Failed to load seminars');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeminars();
  }, []);

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'MMM dd, yyyy');
  };

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
              <Button 
                size="lg" 
                className="bg-white text-red-600 hover:bg-gray-100 transform transition-all duration-300 ease-out hover:scale-105 active:scale-95 hover:-translate-y-0.5 active:translate-y-0.5" 
                asChild
              >
                <Link href="#upcoming">View Upcoming Seminars</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white hover:bg-white/20 hover:text-white backdrop-blur-sm bg-white/10 transform transition-all duration-300 ease-out hover:scale-105 active:scale-95 hover:-translate-y-0.5 active:translate-y-0.5 hover:shadow-lg hover:shadow-white/20" 
                asChild
              >
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

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg text-gray-500">Loading seminars...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg text-red-500">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Seminar Cards */}
              {seminars.map((seminar, index) => (
                <AnimatedSection key={seminar.id} delay={0.1 * index} className="h-full">
                  <motion.div 
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="aspect-[3/4] relative">
                      <Image
                        src={seminar.imageUrl}
                        alt={seminar.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(seminar.date)}</span>
                          <span className="mx-2">•</span>
                          <MapPin className="w-4 h-4" />
                          <span>{seminar.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-red-600 text-sm font-medium mb-2">
                        <Users className="w-4 h-4" />
                        <span>{seminar.audienceType}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 line-clamp-2">{seminar.title}</h3>
                      <p className="text-gray-600 mb-6 line-clamp-2">{seminar.description}</p>
                      <div className="mt-auto">
                        <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                          <Link href={`/seminars/register/${seminar.slug}`} className="flex items-center justify-center gap-2">
                            Register Now
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          )}
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
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 px-4 bg-red-600 text-white">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Relationships?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Join one of our upcoming seminars and start your journey toward healthier, more fulfilling relationships.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-red-600 hover:bg-gray-100 px-8 transform transition-all duration-300 ease-out hover:scale-105 active:scale-95" 
                asChild
              >
                <Link href="#upcoming">Browse Seminars</Link>
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
} 