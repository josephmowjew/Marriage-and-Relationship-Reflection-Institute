'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Users, Video, MapPin, ArrowRight, ArrowLeft, CheckCircle2, Heart, Church, Mail, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/animated-section';
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";

const stepSchemas = {
  1: z.object({
    sessionType: z.enum(['marriage', 'pre-marriage', 'pastoral'])
  }),
  2: z.object({
    date: z.date(),
    sessionFormat: z.enum(['online', 'in-person']),
    sessionDuration: z.enum(['60min', '90min'])
  }),
  3: z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
    description: z.string().min(10, 'Please provide a brief description of at least 10 characters'),
    preferredContact: z.enum(['email', 'phone', 'whatsapp'])
  })
} as const;

// Combined schema for the entire form
const formSchema = z.object({
  sessionType: z.enum(['marriage', 'pre-marriage', 'pastoral']),
  date: z.date(),
  sessionFormat: z.enum(['online', 'in-person']),
  sessionDuration: z.enum(['60min', '90min']),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  description: z.string().min(10, 'Please provide a brief description of at least 10 characters'),
  preferredContact: z.enum(['email', 'phone', 'whatsapp'])
});

type FormData = z.infer<typeof formSchema>;

const defaultValues: FormData = {
  sessionType: 'marriage',
  date: new Date(),
  sessionFormat: 'online',
  sessionDuration: '60min',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  description: '',
  preferredContact: 'email'
};

const SESSION_TYPES = [
  {
    id: 'marriage',
    title: 'Marriage Counseling',
    description: 'Strengthen your marriage through expert guidance and support.',
    icon: Users,
    price: 'R850 per session',
  },
  {
    id: 'pre-marriage',
    title: 'Pre-Marriage Counseling',
    description: 'Build a strong foundation for your future marriage.',
    icon: Heart,
    price: 'R750 per session',
  },
  {
    id: 'pastoral',
    title: 'Pastoral Mentorship',
    description: 'Guidance and support for ministry leaders.',
    icon: Church,
    price: 'R950 per session',
  },
] as const;

const stepValidationFields = {
  1: ['sessionType'],
  2: ['date', 'sessionFormat', 'sessionDuration'],
  3: ['firstName', 'lastName', 'email', 'phone', 'description', 'preferredContact'],
} as const;

export default function BookPage() {
  const [step, setStep] = useState(1);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onChange'
  });

  const { register, handleSubmit, formState: { errors }, watch, setValue } = form;
  const formData = watch();

  const handleNext = () => {
    console.log('Current step:', step);
    console.log('Form data:', formData);
    
    if (step === 1 && formData.sessionType) {
      setStep(2);
    } else if (step === 2 && formData.date && formData.sessionFormat && formData.sessionDuration) {
      setStep(3);
    }
  };

  const handleFormSubmit = async (data: FormData) => {
    console.log('Form submitted:', data);
    
    if (step < 3) {
      handleNext();
    } else {
      // Handle final submission
      try {
        // TODO: Add API call to handle booking
        console.log('Final submission:', data);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const steps = [
    { number: 1, title: 'Session Type' },
    { number: 2, title: 'Date & Time' },
    { number: 3, title: 'Your Details' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F2] pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
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
              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                {step === 1 && (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Select Session Type</h2>
                    <div className="grid gap-6">
                      {SESSION_TYPES.map((type) => (
                        <label
                          key={type.id}
                          className={`relative flex flex-col md:flex-row items-start gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.sessionType === type.id
                              ? 'border-red-600 bg-red-50'
                              : 'border-gray-200 hover:border-red-600/50'
                          }`}
                        >
                          <input
                            type="radio"
                            value={type.id}
                            {...register('sessionType')}
                            className="sr-only"
                          />
                          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-100 text-red-600 shrink-0">
                            <type.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-1">{type.title}</h3>
                            <p className="text-gray-600 mb-2">{type.description}</p>
                            <p className="text-sm font-medium text-red-600">{type.price}</p>
                          </div>
                          {formData.sessionType === type.id && (
                            <div className="absolute top-4 right-4 text-red-600">
                              <CheckCircle2 className="w-6 h-6" />
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                    {errors.sessionType && (
                      <p className="text-red-500 text-sm">{errors.sessionType.message}</p>
                    )}
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Choose Date & Time</h2>
                    <div className="space-y-8">
                      <div>
                        <Label className="text-base mb-4 block">Select Date</Label>
                        <div className="p-4 border rounded-xl bg-white">
                          <Calendar
                            mode="single"
                            selected={formData.date}
                            onSelect={(date) => {
                              if (date) {
                                setValue('date', date);
                              }
                            }}
                            className="mx-auto"
                            classNames={{
                              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                              month: "space-y-4",
                              caption: "flex justify-center pt-1 relative items-center",
                              caption_label: "text-sm font-medium",
                              nav: "space-x-1 flex items-center",
                              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                              nav_button_previous: "absolute left-1",
                              nav_button_next: "absolute right-1",
                              table: "w-full border-collapse space-y-1",
                              head_row: "flex",
                              head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                              row: "flex w-full mt-2",
                              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                              day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                              day_selected: "bg-red-600 text-white hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white",
                              day_today: "bg-accent text-accent-foreground",
                              day_outside: "text-muted-foreground opacity-50",
                              day_disabled: "text-muted-foreground opacity-50",
                              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                              day_hidden: "invisible",
                            }}
                            fromDate={new Date()}
                            disabled={(date) => 
                              date < new Date() || // Can't select past dates
                              date.getDay() === 0 || // Can't select Sundays
                              date > new Date(new Date().setMonth(new Date().getMonth() + 2)) // Can only book 2 months ahead
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-base mb-4">Session Format</Label>
                        <RadioGroup 
                          defaultValue={formData.sessionFormat} 
                          className="grid grid-cols-2 gap-4"
                          value={formData.sessionFormat}
                          onValueChange={(value) => setValue('sessionFormat', value as 'online' | 'in-person')}
                        >
                          <label className={`flex flex-col items-center gap-2 p-6 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.sessionFormat === 'online' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-red-600/50'
                          }`}>
                            <RadioGroupItem value="online" {...register('sessionFormat')} className="sr-only" />
                            <Video className="w-6 h-6 text-red-600" />
                            <span className="text-sm font-medium">Online</span>
                          </label>
                          <label className={`flex flex-col items-center gap-2 p-6 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.sessionFormat === 'in-person' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-red-600/50'
                          }`}>
                            <RadioGroupItem value="in-person" {...register('sessionFormat')} className="sr-only" />
                            <MapPin className="w-6 h-6 text-red-600" />
                            <span className="text-sm font-medium">In-Person</span>
                          </label>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label className="text-base mb-4">Session Duration</Label>
                        <RadioGroup 
                          defaultValue={formData.sessionDuration} 
                          className="space-y-4"
                          value={formData.sessionDuration}
                          onValueChange={(value) => setValue('sessionDuration', value as '60min' | '90min')}
                        >
                          <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.sessionDuration === '60min' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-red-600/50'
                          }`}>
                            <div className="flex items-center gap-4">
                              <RadioGroupItem value="60min" {...register('sessionDuration')} className="sr-only" />
                              <div>
                                <p className="font-medium">60 Minutes</p>
                                <p className="text-sm text-gray-600">Standard session</p>
                              </div>
                            </div>
                            <span className="text-red-600 font-medium">R850</span>
                          </label>
                          <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.sessionDuration === '90min' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-red-600/50'
                          }`}>
                            <div className="flex items-center gap-4">
                              <RadioGroupItem value="90min" {...register('sessionDuration')} className="sr-only" />
                              <div>
                                <p className="font-medium">90 Minutes</p>
                                <p className="text-sm text-gray-600">Extended session</p>
                              </div>
                            </div>
                            <span className="text-red-600 font-medium">R1,200</span>
                          </label>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label className="text-base mb-4">Session Time</Label>
                        <div className="grid grid-cols-4 gap-4">
                          {['09:00', '11:00', '14:00', '16:00'].map((time) => (
                            <Button
                              key={time}
                              type="button"
                              variant="outline"
                              className={`py-6 ${
                                formData.date ? 
                                  format(formData.date, 'HH:mm') === time ? 
                                    'border-red-600 bg-red-50 hover:bg-red-50' : 
                                    'hover:border-red-600/50' 
                                  : 'opacity-50 cursor-not-allowed'
                              }`}
                              disabled={!formData.date}
                              onClick={() => {
                                if (formData.date) {
                                  const [hours, minutes] = time.split(':');
                                  const newDate = new Date(formData.date);
                                  newDate.setHours(parseInt(hours), parseInt(minutes));
                                  setValue('date', newDate);
                                }
                              }}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Your Details</h2>
                    <div className="grid gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <input
                            id="firstName"
                            type="text"
                            {...register('firstName')}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="John"
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <input
                            id="lastName"
                            type="text"
                            {...register('lastName')}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Doe"
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <input
                          id="email"
                          type="email"
                          {...register('email')}
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <input
                          id="phone"
                          type="tel"
                          {...register('phone')}
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="+27 123 456 789"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm">{errors.phone.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Brief Description</Label>
                        <textarea
                          id="description"
                          {...register('description')}
                          className="w-full px-3 py-2 border rounded-md h-32 resize-none"
                          placeholder="Please provide a brief description of what you'd like to discuss..."
                        />
                        {errors.description && (
                          <p className="text-red-500 text-sm">{errors.description.message}</p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <Label>Preferred Contact Method</Label>
                        <RadioGroup defaultValue={formData.preferredContact} className="grid grid-cols-3 gap-4">
                          <label className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.preferredContact === 'email' ? 'border-red-600 bg-red-50' : 'border-gray-200'
                          }`}>
                            <RadioGroupItem value="email" {...register('preferredContact')} />
                            <Mail className="w-6 h-6 text-red-600" />
                            <span className="text-sm font-medium">Email</span>
                          </label>
                          <label className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.preferredContact === 'phone' ? 'border-red-600 bg-red-50' : 'border-gray-200'
                          }`}>
                            <RadioGroupItem value="phone" {...register('preferredContact')} />
                            <Phone className="w-6 h-6 text-red-600" />
                            <span className="text-sm font-medium">Phone</span>
                          </label>
                          <label className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.preferredContact === 'whatsapp' ? 'border-red-600 bg-red-50' : 'border-gray-200'
                          }`}>
                            <RadioGroupItem value="whatsapp" {...register('preferredContact')} />
                            <MessageCircle className="w-6 h-6 text-red-600" />
                            <span className="text-sm font-medium">WhatsApp</span>
                          </label>
                        </RadioGroup>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex justify-between pt-6">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                  )}
                  <Button
                    type={step === 3 ? 'submit' : 'button'}
                    onClick={step < 3 ? handleNext : undefined}
                    className="bg-red-600 hover:bg-red-700 text-white ml-auto flex items-center gap-2"
                  >
                    {step === 3 ? 'Complete Booking' : 'Continue'}
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