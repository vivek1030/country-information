'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CountryCardProps {
  name: string;
  flag: string;
  region: string;
  timezones: string[];
  code: string;
}

export default function CountryCard({
  name,
  flag,
  region,
  timezones,
  code,
}: CountryCardProps) {
  const [localTime, setLocalTime] = useState('');

  // Parse "UTC+05:30" into offset in minutes
  const parseUTCOffset = (tz: string): number | null => {
    const match = tz.match(/UTC([+-])(\d{2}):?(\d{2})?/);
    if (!match) return null;

    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2], 10);
    const minutes = parseInt(match[3] || '0', 10);

    return sign * (hours * 60 + minutes);
  };

  // Update clock every second based on timezone offset
  useEffect(() => {
    const updateTime = () => {
      const timezone = timezones[0]; // Use the first timezone
      const offsetMinutes = parseUTCOffset(timezone);

      let now = new Date();
      if (offsetMinutes !== null) {
        now = new Date(now.getTime() + offsetMinutes * 60 * 1000);
      }

      setLocalTime(now.toUTCString().slice(17, 25));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezones]);

  return (
    <Link
      href={`/country/${code}`}
      className="bg-white rounded-xl shadow p-4 flex flex-col items-center gap-2 hover:shadow-lg transition"
    >
      <div className="w-20 h-14 relative">
        <img src={flag} className="w-20 h-14 object-contain" />
      </div>
      <h2 className="text-lg font-semibold text-center">{name}</h2>
      <p className="text-gray-500">{region}</p>
      <p className="text-blue-600 font-mono">{localTime}</p>
    </Link>
  );
}
