'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchFilter() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('name');
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handleSearchClick = () => {
    if (search.trim() == '') {
      return;
    }
    router.push(`/search?search=${search}&type=${type}`);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 py-12">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center p-6 bg-gray-50 rounded-lg shadow-lg max-w-4xl mx-auto w-full sm:w-auto">
        <div className="flex gap-3 w-full sm:w-auto">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search country..."
            className="px-4 py-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-80"
          />
          <select
            value={type}
            onChange={handleTypeChange}
            className="px-4 py-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-60"
          >
            <option value="name">Name</option>
            <option value="region">Region</option>
            <option value="capital">Capital</option>
          </select>
        </div>
        <button
          onClick={handleSearchClick}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:via-indigo-600 hover:to-purple-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto"
        >
          Search
        </button>
      </div>
    </div>
  );
}
