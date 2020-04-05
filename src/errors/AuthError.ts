import AppError from './AppError';

export default class AuthError extends AppError {
  constructor(message: string) {
    super(message || 'Authentication failed', 401);
  }
}
