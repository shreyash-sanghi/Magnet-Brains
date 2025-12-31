import jwt from "jsonwebtoken";
import userRepository from "../repository/user.repository.js";
import { serviceResponse } from "../utils/serviceresponse.utils.js";

class userService {

  // SIGNUP
  static async signup(data) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      return serviceResponse.failure(409, "Email already exists");
    }

    const user = await userRepository.createUser(data);

    const token = jwt.sign(
      { userid: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return serviceResponse.success(201, "Signup successful", {
      user:{_id:user._id,name:user.name,email:user.email},
      token,
    });
  }

  static async login(email, password) {
    const user = await userRepository.findByEmail(email);
if (!user) {
      return serviceResponse.failure(401, "Invalid credentials");
    }
const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return serviceResponse.failure(401, "Invalid credentials");
    }const token = jwt.sign(
      { userid: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return serviceResponse.success(200, "Login successful", {
      user:{_id:user._id,name:user.name,email:user.email},
      token,
    });
  }
}

export default userService;
