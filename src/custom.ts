import { DecodedData } from './app/middleware/tokenCheck'; // Adjust the import path as necessary

declare module 'express-serve-static-core' {
  interface Request {
    user?: DecodedData; // or your specific decoded token type
  }
}