import { AuthenticationError } from 'apollo-server-express';
import jwt from'jsonwebtoken';

const context = ({ req }) => {
  try {
    const authorization = req.headers.authorization;
    if ( !authorization ) return undefined;

    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, "JWT_SECRET_KEY");

    return {
      loggedInUser: decoded.user_id
    };

  } catch (error) {
    console.log(error);
    throw new AuthenticationError('invalid token');
  }
};

export default context;