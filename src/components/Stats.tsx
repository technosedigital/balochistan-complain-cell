'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ClipboardCheck, Clock, MapPin } from 'lucide-react';

interface StatItemProps {
  label: string;
  target: number;
  suffix?: string;
  icon: React.ReactNode;
  delay?: number;
}

function Counter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);
    
    // For large targets, increase step size to prevent lags
    const step = Math.ceil(end / (totalMiliseconds / incrementTime));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const statItems = [
    {
      label: 'Complaints Resolved',
      target: 14829,
      suffix: '+',
      icon: <ClipboardCheck className="h-6 w-6 text-primary dark:text-accent" />,
      colorClass: 'text-primary dark:text-accent',
    },
    {
      label: 'Active Cases',
      target: 294,
      suffix: '',
      icon: <Clock className="h-6 w-6 text-yellow-500" />,
      colorClass: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      label: 'Cities & Districts',
      target: 37,
      suffix: '',
      icon: <MapPin className="h-6 w-6 text-emerald-500" />,
      colorClass: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'Registered Citizens',
      target: 85200,
      suffix: '+',
      icon: <Users className="h-6 w-6 text-blue-500" />,
      colorClass: 'text-blue-600 dark:text-blue-400',
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/30 mb-4">
                {item.icon}
              </div>
              <h3 className={`text-2xl sm:text-3xl font-black ${item.colorClass} tracking-tight`}>
                <Counter target={item.target} suffix={item.suffix} />
              </h3>
              <p className="mt-1 text-sm font-semibold text-gray-500 dark:text-gray-400">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
