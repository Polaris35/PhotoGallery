import {verify} from "jsonwebtoken";
import {NextFunction, Request, Response} from 'express'

async function auth(req:Request, res: Response, next: NextFunction ) {

  const token = req.header("Authorization")?.split(' ')[1];
  console.log(token);
  const secretJwt = process.env.JWT_SECRET;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = verify(token, secretJwt);
    console.log(decoded);
    req.user = decoded
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

export default auth;