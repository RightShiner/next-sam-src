import { errorHandler, jwtMiddleware, connectDB } from './';
import dbConnect from 'middlewares/mongodb-handler';

export { apiHandler };

function apiHandler(handler) {
  dbConnect();

  return async (req, res) => {
    try {
      // global middleware
      await jwtMiddleware(req, res);

      // route handler
      await handler(req, res);
    } catch (err) {
      // global error handler
      errorHandler(err, res);
    }
  };
}
