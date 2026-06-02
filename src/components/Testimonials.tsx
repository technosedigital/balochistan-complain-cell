'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    name: 'Sajid Ali Kakar',
    district: 'Quetta',
    role: 'Local Resident',
    issue: 'Sewerage Blockage',
    quote: 'The Samungli Road sewerage overflow was flooding our school street for weeks. I filed a complaint on Balochistan Connect, uploaded a photo, and the Municipal Corporation resolved it within 3 days. Excellent system!',
  },
  {
    name: 'Bibi Gul',
    district: 'Ziarat',
    role: 'Teacher',
    issue: 'School Water Pipe Burst',
    quote: 'We were without water in our high school department. The PHE department dispatched maintenance within 24 hours of reporting. It is transparent and fast. Highly recommended portal!',
  },
  {
    name: 'Naseer Gwadari',
    district: 'Gwadar',
    role: 'Business Owner',
    issue: 'Street Light Failures',
    quote: 'Our harbor road was completely dark at night, affecting fishing deliveries. Filed the complaint, got regular SMS updates, and they fixed the lights. Incredible work by the IT department!',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative">
        
        {/* Title */}
        <div className="space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-accent">
            Citizen Voice
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Feedback from Our Community
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto font-medium">
            Hear from citizens across Balochistan who resolved their neighborhood concerns using our digital services.
          </p>
        </div>

        {/* Testimonial Box */}
        <div className="relative glass-premium max-w-4xl mx-auto rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden min-h-[300px] flex flex-col justify-center items-center">
          
          <div className="absolute top-4 left-6 text-primary/10 dark:text-accent/15 z-0">
            <Quote className="h-20 w-20 transform -rotate-18" />
          </div>

          <div className="relative z-10 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <p className="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-200 italic leading-relaxed max-w-2xl mx-auto">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>

                <div className="flex flex-col items-center">
                  <h4 className="text-base font-black text-gray-900 dark:text-white">
                    {testimonials[current].name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500 font-semibold">
                    <span>{testimonials[current].role}</span>
                    <span>•</span>
                    <span className="text-primary dark:text-accent font-bold">{testimonials[current].district} District</span>
                  </div>
                  
                  <div className="inline-flex items-center gap-1 mt-3 px-2.5 py-0.5 rounded-full bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 text-[10px] font-bold border border-green-200/50">
                    <CheckCircle2 className="h-3 w-3" />
                    Resolved: {testimonials[current].issue}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center gap-2 mt-8 z-10">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === current ? 'w-6 bg-primary dark:bg-accent' : 'w-2.5 bg-gray-300 dark:bg-gray-700'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Side Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors z-20"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors z-20"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>

        </div>

      </div>
    </section>
  );
}
