'use client';

import React, { useState, useEffect } from 'react';
import Badge from '@/components/ui/badge';
import Card from '@/components/ui/card';
import { Mail, CircleAlert, Clock } from 'lucide-react';
import { getUsersAction } from '@/app/actions';
import { useRouter } from 'next/navigation';

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await getUsersAction();
        if (res.success && res.data) {
          setUsers(res.data);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white font-sans">User Management</h1>
          <p className="text-xs text-gray-500 mt-1">Review accounts, roles, and security access logs.</p>
        </div>
      </div>

      {/* Info Warning */}
      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900 rounded-2xl flex gap-3 text-xs leading-relaxed font-semibold">
        <CircleAlert className="h-5 w-5 shrink-0 mt-0.5" />
        <div>
          <span>Default seeded test credentials are shown below. Under credentials provider configurations, these credentials will bypass database operations in both offline and online states to allow immediate evaluation.</span>
        </div>
      </div>

      {/* Grid listing table */}
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-left text-xs font-bold text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-800/40 text-gray-500 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="px-5 py-4">User Name</th>
              <th className="px-5 py-4">Email Address</th>
              <th className="px-5 py-4">Registry Date</th>
              <th className="px-5 py-4">Role</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-gray-500">
                  <div className="flex justify-center items-center gap-2">
                    <Clock className="h-4 w-4 animate-spin text-primary" />
                    <span>Loading registered users...</span>
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-gray-500">
                  No registered users found in the system.
                </td>
              </tr>
            ) : (
              users.map((u, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                  <td className="px-5 py-4 text-gray-900 dark:text-gray-100">{u.name}</td>
                  <td className="px-5 py-4 font-semibold text-gray-500 flex items-center gap-1.5 pt-4">
                    <Mail className="h-3.5 w-3.5" />
                    {u.email}
                  </td>
                  <td className="px-5 py-4 font-semibold text-gray-500">
                    {new Date(u.createdAt || u.joined || Date.now()).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={u.role === 'admin' ? 'success' : 'default'}>
                      {u.role}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {u.role !== 'admin' && (
                      <button
                        onClick={() => router.push(`/admin/complaints?search=${encodeURIComponent(u.email)}`)}
                        className="px-2.5 py-1.5 text-[10px] font-black uppercase rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary dark:text-accent dark:border-accent/20 dark:bg-accent/5 transition-all"
                      >
                        View Complaints
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
