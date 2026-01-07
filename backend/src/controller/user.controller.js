import userService from "../services/user.service.js";
import { APIError } from "../utils/error.utils.js";
import { Response } from "../utils/response.utils.js";
import { StatusCode } from "../utils/statuscode.utils.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, 
};

export class userController {

    static async verifyToken(request, response) {
    return Response.Send(
      response,
      StatusCode.OK,
      "Token verified",
      {
        userid: request.user.userid,
        email: request.user.email,
      }
    );
  }

  static async signup(request, response, next) {
    try {
      console.log(request.body)
      const result = await userService.signup(request.body);

      if (!result.success) {
        return next(
          new APIError(result.statusCode, result.message)
        );
      }
    
      response.cookie("token", result.data.token, cookieOptions);

      return Response.Send(
        response,
        StatusCode.CREATED,
        "Success",
        result.data
      );
    } catch (error) {
      next(error);
    }
  }

  static async login(request, response, next) {
    try {
      const { email, password } = request.body;

      const result = await userService.login(email, password);

      if (!result.success) {
        return next(
          new APIError(result.statusCode, result.message)
        );
      }

      response.cookie("token", result.data.token, cookieOptions);

      return Response.Send(
        response,
        StatusCode.OK,
        "Success",
        result.data
      );
    } catch (error) {
      next(error);
    }
  }

  static async logout(request, response) {
    response.clearCookie("token");
    return Response.Send(
      response,
      StatusCode.OK,
      "Logged out successfully"
    );
  }
}
