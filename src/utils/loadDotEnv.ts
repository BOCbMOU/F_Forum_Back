import { config } from 'dotenv';

const configResult = config();

if (configResult.error) {
  throw configResult.error;
}
