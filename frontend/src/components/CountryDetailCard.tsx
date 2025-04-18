'use client';

interface CountryDetailCardProps {
  country: {
    name: {
      common: string;
      official: string;
    };
    cca2: string;
    cca3: string;
    region: string;
    subregion: string;
    capital?: string[];
    population: number;
    flags: {
      png: string;
      alt?: string;
    };
    currencies?: {
      [code: string]: {
        name: string;
        symbol: string;
      };
    };
    languages?: {
      [code: string]: string;
    };
    timezones: string[];
    borders?: string[];
  };
}

export default function CountryDetailCard({ country }: CountryDetailCardProps) {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-xl dark:bg-gray-900 dark:text-white">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Flag Image */}
        <div className="md:w-1/2">
          <img
            src={country.flags.png}
            alt={
              country.flags.alt ||
              `Flag of ${country.name.common} (${country.cca3})`
            }
            className="w-full h-auto rounded-xl border shadow-md"
          />
        </div>

        {/* Country Info */}
        <div className="md:w-1/2 space-y-6">
          <div>
            <h1 className="text-4xl font-extrabold">{country.name.common}</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              {country.name.official}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
            <div>
              <p className="text-gray-600 dark:text-gray-400 font-semibold">
                Code
              </p>
              <p>
                {country.cca2} / {country.cca3}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 font-semibold">
                Region
              </p>
              <p>
                {country.region} ({country.subregion})
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 font-semibold">
                Capital
              </p>
              <p>{country.capital?.join(', ') || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 font-semibold">
                Population
              </p>
              <p>{country.population.toLocaleString()}</p>
            </div>
          </div>

          {country.currencies && (
            <div>
              <h3 className="text-lg font-semibold mb-1">💰 Currencies</h3>
              <ul className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md space-y-1 text-sm">
                {Object.entries(country.currencies).map(([code, currency]) => (
                  <li key={code}>
                    {currency.name} ({currency.symbol || 'N/A'}) — {code}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {country.languages && (
            <div>
              <h3 className="text-lg font-semibold mb-1">🗣️ Languages</h3>
              <p>{Object.values(country.languages).join(', ')}</p>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-1">⏰ Timezones</h3>
            <p className="text-sm">{country.timezones.join(', ')}</p>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-1">
                🌐 Bordering Countries
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {country.borders.map((borderCode) => (
                  <a
                    key={borderCode}
                    href={`/countries/${borderCode}`}
                    title={`View details for ${borderCode}`}
                    className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                  >
                    {borderCode}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
