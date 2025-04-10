import { Request, Response, NextFunction } from 'express';
import * as countryService from '../services/countryService';

export const getAllCountries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const countries = await countryService.getAllCountries();
    res.json(countries);
  } catch (error) {
    next(error);
  }
};

export const getCountryByCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const country = await countryService.getCountryByCode(req.params.code);
    if (country) {
      res.json(country);
    } else {
      res.status(404).json({ error: 'Country not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const getCountriesByRegion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const countries = await countryService.getCountriesByRegion(req.params.region);
    res.json(countries);
  } catch (error) {
    next(error);
  }
};

export const searchCountries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, capital, region, timezone } = req.query;

    const countries = await countryService.searchCountries({
      name: name as string,
      capital: capital as string,
      region: region as string,
      timezone: timezone as string,
    });
    res.json(countries);
  } catch (error) {
    next(error);
  }
};
