import { Hono } from 'hono';
import { getAvailableDriversController } from './driversOn.controllers';

export const driversOn = new Hono();

driversOn.get('/drivers/:id/available', getAvailableDriversController);


