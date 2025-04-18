'use client';

import CountryCard from '@/components/CountryCard';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const type = searchParams.get('type');

  const [countries, setCountries] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUrl = `/search?${type}=${search}`;

  useEffect(() => {
    console.log(search);
    if (search) {
      const fetchCountries = async () => {
        try {
          setLoading(true);
          setError(null);

          const response = await fetch(apiBaseUrl + searchUrl);

          if (!response.ok) {
            throw new Error('Failed to fetch countries');
          }

          const data = await response.json();

          if (data.status === 'success') {
            setCountries(data.data);
          } else {
            throw new Error(data.message || 'No countries found');
          }
        } catch (err) {
          setError(
            err instanceof Error ? err.message : 'An unknown error occurred'
          );
          setCountries([]);
        } finally {
          setLoading(false);
        }
      };

      fetchCountries();
    }
  }, [search, type]);

  if (loading) return <div className="p-4">Loading countries...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <p className="mb-4">
        You searched for: <span className="font-semibold">{search}</span>
      </p>

      {countries.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {countries.map((country: any, index: number) => (
            <CountryCard
              key={index}
              name={country?.name?.common}
              flag={country.flags.png}
              region={country.region}
              timezones={country.timezones}
              code={country.cca3}
            />
          ))}
        </div>
      ) : (
        <p>No countries found matching your search.</p>
      )}
    </div>
  );
}
