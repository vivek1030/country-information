import { Request, Response, NextFunction } from 'express';
import * as countryService from '../services/countryService';
import { sendResponse } from '../utils/response';

export const getAllCountries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const countries = await countryService.getAllCountries();
    sendResponse(res, 200, 'success', 'All countries fetched successfully', countries);
  } catch (error) {
    next(error);
  }
};

export const getCountryByCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const country = await countryService.getCountryByCode(req.params.code);
    if (country) {
      sendResponse(res, 200, 'success', 'Country fetched successfully', country);
    } else {
      sendResponse(res, 404, 'error', 'Country not found');
    }
  } catch (error) {
    next(error);
  }
};

export const getCountriesByRegion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const countries = await countryService.getCountriesByRegion(req.params.region);
    sendResponse(res, 200, 'success', `Countries in region '${req.params.region}' fetched`, countries);
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
    sendResponse(res, 200, 'success', 'Countries matching search criteria fetched', countries);
  } catch (error) {
    next(error);
  }
};
