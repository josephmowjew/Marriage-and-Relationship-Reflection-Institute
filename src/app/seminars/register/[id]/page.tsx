'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ArrowRight, ArrowLeft, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Form validation schemas
const formSchema = {
  1: z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Valid phone number is required'),
    attendees: z.number().min(1).max(10),
  }),
  2: z.object({
    session: z.enum(['morning', 'afternoon']),
    dietaryRequirements: z.string(),
    specialNeeds: z.string(),
  }),
  3: z.object({
    paymentMethod: z.enum(['credit_card', 'bank_transfer']),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  }),
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  attendees: number;
  session: 'morning' | 'afternoon';
  dietaryRequirements: string;
  specialNeeds: string;
  paymentMethod: 'credit_card' | 'bank_transfer';
  acceptTerms: boolean;
};

const SEMINARS = {
  'building-foundations': {
    title: 'Building Strong Foundations in Marriage',
    price: 1500,
    location: 'Johannesburg',
    date: 'Feb 28, 2024',
  },
  'pastoral-excellence': {
    title: 'Pastoral Leadership Excellence',
    price: 1500,
    location: 'Cape Town',
    date: 'Mar 15, 2024',
  },
  'communication-marriage': {
    title: 'Communication in Marriage',
    price: 1500,
    location: 'Durban',
    date: 'Apr 5, 2024',
  },
} as const;

export default function RegisterPage() {
  const params = useParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  
  const seminarId = params.id as string;
  const seminar = SEMINARS[seminarId as keyof typeof SEMINARS];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Partial<FormData>>({
    resolver: zodResolver(formSchema[step as keyof typeof formSchema]),
    defaultValues: {
      attendees: 1,
      session: 'morning',
      dietaryRequirements: '',
      specialNeeds: '',
      paymentMethod: 'credit_card',
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: Partial<FormData>) => {
    const newFormData = { ...formData, ...data };
    setFormData(newFormData);
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Handle final submission
      console.log('Final form data:', newFormData);
      // TODO: Implement API call
    }
  };

  const steps = [
    { number: 1, title: 'Personal Information' },
    { number: 2, title: 'Seminar Details' },
    { number: 3, title: 'Payment' },
  ];

  if (!seminar) {
    return (
      <div className="min-h-screen bg-[#F8F5F2] pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Seminar not found</h1>
          <p className="mt-2 text-gray-600">The seminar you're looking for doesn't exist.</p>
          <Button className="mt-6" asChild>
            <Link href="/seminars">Back to Seminars</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F2] pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-between items-center relative">
              {steps.map((s, i) => (
                <div key={s.number} className="flex flex-col items-center relative z-10">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: step >= s.number ? 1 : 0.8,
                      opacity: step >= s.number ? 1 : 0.4 
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= s.number ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step > s.number ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      s.number
                    )}
                  </motion.div>
                  <p className={`mt-2 text-sm font-medium ${
                    step >= s.number ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {s.title}
                  </p>
                </div>
              ))}
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-[2px] bg-gray-200">
                <motion.div
                  className="h-full bg-red-600"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((step - 1) / 2) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>

          {/* Form Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              {/* Seminar Info */}
              <div className="mb-8 pb-6 border-b">
                <h1 className="text-2xl font-bold text-gray-900">{seminar.title}</h1>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {seminar.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {seminar.location}
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {step === 1 && (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          {...register('firstName')}
                          className="w-full"
                          placeholder="John"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm">{errors.firstName.message as string}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          {...register('lastName')}
                          className="w-full"
                          placeholder="Doe"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm">{errors.lastName.message as string}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        className="w-full"
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message as string}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        className="w-full"
                        placeholder="+27 123 456 789"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone.message as string}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="attendees">Number of Attendees</Label>
                      <Input
                        id="attendees"
                        type="number"
                        min="1"
                        max="10"
                        {...register('attendees', { valueAsNumber: true })}
                        className="w-full"
                        placeholder="1"
                      />
                      {errors.attendees && (
                        <p className="text-red-500 text-sm">{errors.attendees.message as string}</p>
                      )}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Seminar Details</h2>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Preferred Session</Label>
                        <RadioGroup defaultValue="morning" className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value="morning" 
                              id="morning"
                              {...register('session')}
                            />
                            <Label htmlFor="morning">Morning Session (9:00 AM - 12:00 PM)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value="afternoon" 
                              id="afternoon"
                              {...register('session')}
                            />
                            <Label htmlFor="afternoon">Afternoon Session (2:00 PM - 5:00 PM)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dietary">Dietary Requirements</Label>
                        <Textarea
                          id="dietary"
                          {...register('dietaryRequirements')}
                          placeholder="Please specify any dietary requirements..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="special">Special Needs</Label>
                        <Textarea
                          id="special"
                          {...register('specialNeeds')}
                          placeholder="Please specify any special needs or accommodations..."
                        />
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                    <div className="space-y-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium mb-2">Seminar Fee</h3>
                        <div className="flex justify-between items-center">
                          <span>Registration Fee</span>
                          <span className="font-medium">R {seminar.price.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <RadioGroup defaultValue="credit_card" className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value="credit_card" 
                              id="credit_card"
                              {...register('paymentMethod')}
                            />
                            <Label htmlFor="credit_card">Credit Card</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value="bank_transfer" 
                              id="bank_transfer"
                              {...register('paymentMethod')}
                            />
                            <Label htmlFor="bank_transfer">Bank Transfer</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="acceptTerms"
                            {...register('acceptTerms')}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-600"
                          />
                          <Label htmlFor="acceptTerms">I accept the terms and conditions</Label>
                        </div>
                        {errors.acceptTerms && (
                          <p className="text-red-500 text-sm">{errors.acceptTerms.message as string}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <div className="flex justify-between pt-6">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className={`bg-red-600 hover:bg-red-700 text-white ml-auto flex items-center gap-2 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isSubmitting}
                  >
                    {step === 3 ? 'Complete Registration' : 'Continue'}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 