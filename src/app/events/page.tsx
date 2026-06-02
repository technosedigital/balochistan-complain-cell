import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsClient from '@/components/EventsClient';
import * as dbService from '@/lib/dbService';

export const revalidate = 60; // ISR

export const metadata = {
  title: 'Community Events | Balochistan Connect',
  description: 'Participate in upcoming cultural festivals, developmental workshops, eco-tourism meetups, and maritime expos in Balochistan.',
};

export default async function EventsPage() {
  const events = await dbService.getEvents();

  // Convert mongoose models to JSON-serializable structures
  const serializedEvents = JSON.parse(JSON.stringify(events));

  return (
    <>
      <Navbar />

      <main className="flex-1 py-16 bg-transparent transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-accent">
              Provincial Events
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white leading-none">
              Cultural & Development Events
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-lg mx-auto font-medium">
              Join upcoming festivals, maritime expos, hiking tours, and community activities happening across Balochistan.
            </p>
          </div>

          {/* Interactive Event Grid & Dialog Form Client */}
          <EventsClient initialEvents={serializedEvents} />

        </div>
      </main>

      <Footer />
    </>
  );
}
