import Task from "../models/tasks.models.js";

class taskRepository {

  static async createTask(data) {
    return await Task.createTask(data);
  }

  static async editTask(userId,taskId, data) {
    return await Task.editTask(userId,taskId, data);
  }

  static async changeStatus(userId,taskId, status) {
    return await Task.changeStatus(userId,taskId, status);
  }

  static async deleteTask(userId,taskId) {
    return await Task.deleteTask(userId,taskId);
  }

  static async getTasks({ userId,categories, search }) {
    console.log("u ",userId)
    return await Task.getTasks({ userId,categories, search });
  }
  static async getPandingCount(userId) {
    return await Task.getPandingCount(userId);
  }
}

export default taskRepository;
