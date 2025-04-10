import axios from 'axios';
import NodeCache from 'node-cache';

const countryCache = new NodeCache({ stdTTL: 3600 });
const API_URL = 'https://restcountries.com/v3.1';

export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  cca3: string;
  region: string;
  subregion: string;
  capital: string[];
  population: number;
  flags: {
    png: string;
    svg: string;
  };
  currencies: Record<string, { name: string; symbol: string }>;
  languages: Record<string, string>;
  timezones: string[];
}

export const getAllCountries = async (): Promise<Country[]> => {
  const cacheKey = 'all-countries';
  const cachedData = countryCache.get<Country[]>(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${API_URL}/all?fields=name,flag,region,flags`);
    const countries = response.data.map(processCountryData);
    countryCache.set(cacheKey, countries);
    return countries;
  } catch (error) {
    throw new Error('Failed to fetch countries');
  }
};

export const getCountryByCode = async (code: string): Promise<Country | null> => {
  const cacheKey = `country-${code}`;
  const cachedData = countryCache.get<Country>(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${API_URL}/alpha/${code}`);
    if (response.data && response.data.length > 0) {
      const country = processCountryData(response.data[0]);
      countryCache.set(cacheKey, country);
      return country;
    }
    return null;
  } catch (error) {
    throw new Error('Failed to fetch country by code');
  }
};

export const getCountriesByRegion = async (region: string): Promise<Country[]> => {
  const cacheKey = `region-${region}`;
  const cachedData = countryCache.get<Country[]>(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${API_URL}/region/${region}`);
    const countries = response.data.map(processCountryData);
    countryCache.set(cacheKey, countries);
    return countries;
  } catch (error) {
    throw new Error('Failed to fetch countries by region');
  }
};

export const searchCountries = async (filters: {
  name?: string;
  capital?: string;
  region?: string;
  timezone?: string;
}): Promise<Country[]> => {
  try {
    let url = API_URL;

    if (filters.name) {
      url += `/name/${filters.name}`;
    } else if (filters.capital) {
      url += `/capital/${filters.capital}`;
    } else if (filters.region) {
      url += `/region/${filters.region}`;
    } else {
      throw new Error('At least one search parameter (name or capital) is required');
    }

    const response = await axios.get(url);
    let countries = response.data.map(processCountryData);

    if (filters.timezone) {
      countries = countries.filter((country: Country) =>
        country.timezones.some((tz) => tz.includes(filters.timezone!)),
      );
    }

    return countries;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }
    throw new Error('Failed to search countries');
  }
};

const processCountryData = (countryData: any): Country => {
  return {
    name: countryData.name,
    cca2: countryData.cca2,
    cca3: countryData.cca3,
    region: countryData.region,
    subregion: countryData.subregion,
    capital: countryData.capital || [],
    population: countryData.population,
    flags: countryData.flags,
    currencies: countryData.currencies || {},
    languages: countryData.languages || {},
    timezones: countryData.timezones || [],
  };
};
