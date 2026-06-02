import React from 'react';
import * as dbService from '@/lib/dbService';
import AdminComplaintsClient from '@/components/AdminComplaintsClient';

export const revalidate = 0; // Dynamic page

export const metadata = {
  title: 'Manage Complaints | Admin Dashboard',
  description: 'Manage citizen reports, assign local municipal authorities, review attached evidence, and write operational log notes.',
};

export default async function AdminComplaintsPage() {
  const complaints = await dbService.getComplaints();

  // Convert mongoose models to JSON
  const serializedComplaints = JSON.parse(JSON.stringify(complaints));

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white font-sans">Citizen Complaints</h1>
          <p className="text-xs text-gray-500 mt-1">Review, dispatch, update progress, and log operations records.</p>
        </div>
      </div>

      {/* Interactive table, filters & actions panel */}
      <AdminComplaintsClient initialComplaints={serializedComplaints} />

    </div>
  );
}
