import jwt from "jsonwebtoken";
import { APIError } from "../utils/error.utils.js";
import { StatusCode } from "../utils/statuscode.utils.js";

export const authMiddleware = (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new APIError(
        StatusCode.UNAUTHORIZED,
        "Authorization token missing"
      );
    }

    const token = authHeader.split(" ")[1];
      console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = {
      userid: decoded.userid,  
      email: decoded.email,
    };

    next();
  } catch (error) {
    return next(
      new APIError(
        StatusCode.UNAUTHORIZED,
        "Invalid or expired token"
      )
    );
  }
};
