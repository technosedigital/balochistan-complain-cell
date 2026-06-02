import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsListClient from '@/components/NewsListClient';
import * as dbService from '@/lib/dbService';

export const revalidate = 60; // ISR

export const metadata = {
  title: 'News & Announcements | Balochistan Connect',
  description: 'Stay informed on the latest government announcements, developmental projects, press releases, and community activities in Balochistan.',
};

export default async function NewsPage() {
  const newsItems = await dbService.getNews();

  // Convert mongoose object IDs and Date objects to JSON-serializable values
  const serializedNews = JSON.parse(JSON.stringify(newsItems));

  return (
    <>
      <Navbar />

      <main className="flex-1 py-16 bg-transparent transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Title */}
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-accent">
              Public Announcements
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white leading-none">
              News & Updates Portal
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-lg mx-auto font-medium">
              Read up-to-date press releases, local development schemes, and administrative announcements from Balochistan.
            </p>
          </div>

          {/* Interactive Client-Side Grid Filter & Search */}
          <NewsListClient initialNews={serializedNews} />

        </div>
      </main>

      <Footer />
    </>
  );
}
