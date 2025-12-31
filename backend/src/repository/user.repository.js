import User from "../models/users.models.js";

class userRepository {
  static async createUser(data) {
    return await User.createUser(data);
  }

  static async findByEmail(email) {
    return await User.findOne({ email }).select("+password");
  }
}

export default userRepository;
