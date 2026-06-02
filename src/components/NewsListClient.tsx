'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Badge from '@/components/ui/badge';
import Input from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Calendar, Search, Newspaper, ChevronRight } from 'lucide-react';

interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  image: string;
  content: string;
  category: string;
  publishedAt: string;
}

interface NewsListClientProps {
  initialNews: NewsItem[];
}

const categories = ['All', 'Announcement', 'Press Release', 'Development', 'Community', 'Tourism'];

export default function NewsListClient({ initialNews }: NewsListClientProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter and Search logic
  const filteredNews = useMemo(() => {
    return initialNews.filter((item) => {
      const matchesSearch = 
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.content.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialNews, search, activeCategory]);

  // Reset page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, activeCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNews.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredNews, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm">
        
        {/* Search bar */}
        <div className="relative w-full md:max-w-xs shrink-0">
          <Input
            placeholder="Search news & reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-xl"
          />
          <div className="absolute left-3.5 top-3.5 text-gray-400">
            <Search className="h-4 w-4" />
          </div>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-1.5 justify-center md:justify-end w-full overflow-x-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Grid listing */}
      {paginatedNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paginatedNews.map((article) => (
            <Card
              key={article._id}
              className="group flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="default">{article.category}</Badge>
                </div>
              </div>

              <CardHeader className="p-5 flex-1">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-semibold mb-2">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <CardTitle className="text-base font-extrabold group-hover:text-primary transition-colors text-gray-900 dark:text-white line-clamp-2">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-xs line-clamp-3 leading-relaxed mt-2 text-gray-600 dark:text-gray-400">
                  {article.content}
                </CardDescription>
              </CardHeader>

              <CardFooter className="px-5 pb-5 pt-0 border-t-0">
                <Link
                  href={`/news/${article.slug}`}
                  className="w-full text-center py-2.5 text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750 border border-gray-200/50 dark:border-gray-800 rounded-xl transition-colors flex items-center justify-center gap-1"
                >
                  Read Full Article
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
          <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">No articles found</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto font-medium">
            Try adjusting your search query or switching to another category.
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-xs font-bold disabled:opacity-40"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`h-8 w-8 text-xs font-bold rounded-lg transition-colors ${
                currentPage === page
                  ? 'bg-primary text-white'
                  : 'border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-xs font-bold disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
