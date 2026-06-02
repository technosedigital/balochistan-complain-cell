import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Landmark, Compass, Award, CalendarClock, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'About Us | Balochistan Connect',
  description: 'Learn about our mission, vision, goals, and commitment to transparency and civic service reforms in Balochistan.',
};

export default function AboutPage() {
  const milestones = [
    {
      year: '2023',
      title: 'E-Governance Vision Launched',
      description: 'The Balochistan Cabinet approved a provincial strategy to digitalize citizen complaints and automate file flows between secretariats.',
    },
    {
      year: '2024',
      title: 'Municipal Hub System Seeded',
      description: 'Successfully connected 12 municipal corporations in Quetta division, resolving water distribution and sanitation issues digitally.',
    },
    {
      year: '2025',
      title: 'Provincial Expansion',
      description: 'Extended coverage to Gwadar, Lasbela, and Khuzdar districts. Deployed local dashboards to help divisional officers assign tasks directly.',
    },
    {
      year: '2026',
      title: 'Balochistan Connect Launch',
      description: 'Integrated tourism listings and cultural calendars alongside citizen tracking tools, ensuring direct transparency across all 37 districts.',
    },
  ];

  return (
    <>
      <Navbar />

      <main className="flex-1 py-16 bg-transparent transition-colors duration-300">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-accent">
              Platform Overview
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white leading-none">
              About Balochistan Connect
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed font-medium">
              We empower citizens, showcase cultural treasures, and hold municipal departments directly accountable to local communities.
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="default" className="p-2 border-gray-200 dark:border-gray-800">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:text-accent">
                  <Compass className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-2xl font-extrabold text-gray-900 dark:text-white">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="pt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
                To simplify civic engagement across Balochistan by providing a transparent, highly responsive tracking interface. We bridge administrative walls, ensuring that garbage collection, power cuts, road maintenance, and water supplies are addressed efficiently at every district level.
              </CardContent>
            </Card>

            <Card variant="default" className="p-2 border-gray-200 dark:border-gray-800">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:text-accent">
                  <Landmark className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-2xl font-extrabold text-gray-900 dark:text-white">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="pt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
                To build a modern digital ecosystem that not only resolves civic issues but highlights the historic wonders, scenic juniper forests, and pristine golden beaches of Balochistan. We envision a digital province that attracts international tourists while ensuring municipal accountability for its citizens.
              </CardContent>
            </Card>
          </div>

          {/* Why This Platform Exists */}
          <div className="glass-premium rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-800 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                Why this Platform Exists
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Traditionally, resolving civic complaints required citizens to travel to district secretariats, submit physical letters, and navigate paper tracking systems. Balochistan Connect replaces this process entirely. Every submission generates a secure digital tracking number, sending notifications directly to regional dispatchers and municipal supervisors to ensure real action.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-primary/10 border border-primary/25 text-primary shadow-inner">
                <Award className="h-14 w-14 text-secondary animate-pulse-slow" />
              </div>
            </div>
          </div>

          {/* Timeline of Digital Reform */}
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-accent">
                Our Journey
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                Reforms & Milestones
              </h2>
              <p className="text-sm text-gray-500 max-w-md mx-auto font-medium">
                Tracing the evolution of digital public administration across the province.
              </p>
            </div>

            <div className="relative border-l border-gray-200 dark:border-gray-800 max-w-3xl mx-auto pl-6 sm:pl-8 space-y-10">
              {milestones.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-gray-900 border-2 border-primary text-primary dark:text-accent shadow-sm group-hover:scale-110 transition-transform">
                    <CalendarClock className="h-3.5 w-3.5" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <span className="text-sm font-black text-secondary uppercase tracking-widest bg-secondary/10 px-2 py-0.5 rounded-md">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-accent transition-colors pt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commitment */}
          <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-black uppercase text-green-700 dark:text-green-400 tracking-wider">
                Public Service Commitment
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed font-semibold">
                Every citizen has the right to clean water, reliable energy, and safe roads. We hold administrative authorities responsible, auditing resolution speeds, notes, and citizen feedback on every single complaint.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
