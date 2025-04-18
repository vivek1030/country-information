'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CountryDetailCard from '@/components/CountryDetailCard';

export default function CountryPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  const params = useParams();
  const code = params.code as string;

  const [country, setCountry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiBaseUrl}/code/${code}`);
        if (!response.ok) throw new Error('Country not found');
        const data = await response.json();
        setCountry(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load country');
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [code]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;
  if (!country)
    return <div className="p-4 text-center">Country data not available</div>;

  return <CountryDetailCard country={country} />;
}
