import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import * as dbService from '@/lib/dbService';
import { Globe, Mail, ShieldCheck } from 'lucide-react';

export const revalidate = 60; // ISR

export const metadata = {
  title: 'Administration Team | Balochistan Connect',
  description: 'Meet the executive leadership and technical directors managing Balochistan Connect digital services and reforms.',
};

export default async function TeamPage() {
  const team = await dbService.getTeam();

  return (
    <>
      <Navbar />

      <main className="flex-1 py-16 bg-transparent transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-accent">
              Platform Leadership
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white leading-none">
              Administration & Technical Team
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-lg mx-auto font-medium">
              The division heads, operations leads, and developers working to modernize citizen-government communication in Balochistan.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member: any) => (
              <Card
                key={member._id}
                className="group overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
              >
                
                {/* Profile Image with subtle scale hover */}
                <div className="relative aspect-square w-full bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0 border-b border-gray-100 dark:border-gray-800">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                  />
                  
                  {/* Floating Shield for verified officer */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 shadow p-1.5 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-primary" title="Verified Officer">
                    <ShieldCheck className="h-5 w-5 text-secondary" />
                  </div>
                </div>

                {/* Content */}
                <CardHeader className="p-5 pb-2 text-center">
                  <span className="text-[10px] font-black uppercase text-secondary tracking-widest">
                    {member.role}
                  </span>
                  <CardTitle className="text-base font-black text-gray-900 dark:text-white mt-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-5 pt-0 pb-6 text-center flex-1 flex flex-col justify-between">
                  {member.bio && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-semibold mb-4">
                      {member.bio}
                    </p>
                  )}

                  {/* Social Contacts List */}
                  <div className="flex items-center justify-center gap-4 mt-auto pt-2">
                    {member.socials?.twitter && (
                      <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" title="Twitter">
                        <Globe className="h-4.5 w-4.5" />
                      </a>
                    )}
                    {member.socials?.linkedin && (
                      <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" title="LinkedIn">
                        <Globe className="h-4.5 w-4.5" />
                      </a>
                    )}
                    {member.socials?.facebook && (
                      <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" title="Facebook">
                        <Globe className="h-4.5 w-4.5" />
                      </a>
                    )}
                    {member.socials?.email && (
                      <a href={`mailto:${member.socials.email}`} className="text-gray-400 hover:text-primary transition-colors" title="Email Officer">
                        <Mail className="h-4.5 w-4.5" />
                      </a>
                    )}
                  </div>
                </CardContent>

              </Card>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
