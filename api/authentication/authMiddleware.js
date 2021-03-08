import jsonwebtoken from 'jsonwebtoken';
import config from 'config';

export default function (req, res, next) {
  // Get token from header
  // TODO: change to cookies
  // const token = req.header('x-auth-token');
  const token = req.cookies.access_token;
  // Check if not token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    jsonwebtoken.verify(
      token,
      config.get('jwtSecret'),
      (error, decoded) => {
        if (error) {
          return res.status(401).json({ msg: 'Token is not valid' });
        }
        req.user = decoded.user;
        next();
      },
    );
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
}
