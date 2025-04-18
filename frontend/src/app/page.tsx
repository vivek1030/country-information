'use client';

import { useEffect, useRef, useState } from 'react';
import CountryCard from '@/components/CountryCard';

export default function Home() {
  const [countries, setCountries] = useState<any>();
  const [visibleCount, setVisibleCount] = useState(20);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  useEffect(() => {
    fetch(apiBaseUrl)
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 20);
        }
      },
      { threshold: 1 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {countries?.data
        ?.slice(0, visibleCount)
        .map((c: any, i: number) => (
          <CountryCard
            key={i}
            name={c.name.common}
            flag={c.flags.png}
            region={c.region}
            timezones={c.timezones}
            code={c.cca3}
          />
        ))}
      <div ref={loadMoreRef} className="h-10 col-span-full" />
    </div>
  );
}
