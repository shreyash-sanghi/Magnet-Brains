import taskRepository from "../repository/tasks.repository.js";
import { serviceResponse } from "../utils/serviceresponse.utils.js";

class taskService {

  static async create(data) {
    
    const result = await taskRepository.createTask(data);
    
    if (!result) {
      return serviceResponse.failure(500, "Unable to create task");
    }

    return serviceResponse.success(
      201,
      "Task created successfully",
      result
    );
  }
  static async edit(userId,taskId, data) {
    const result = await taskRepository.editTask(userId,taskId, data);

    if (!result) {
      return serviceResponse.failure(404, "Task not found");
    }

    return serviceResponse.success(
      200,
      "Task updated successfully",
      result
    );
  }

  static async changeStatus(userId,taskId, status) {
    const result = await taskRepository.changeStatus(userId,taskId, status);

    if (!result) {
      return serviceResponse.failure(404, "Task not found");
    }

    return serviceResponse.success(
      200,
      "Task status updated successfully",
      result
    );
  }

  static async delete(userId,taskId) {
    const result = await taskRepository.deleteTask(userId,taskId);

    if (!result) {
      return serviceResponse.failure(404, "Task not found");
    }

    return serviceResponse.success(
      200,
      "Task deleted successfully",
      result
    );
  }

static async getAll(userId, query = {}) {
  console.log(userId)
  const { categories, search } = query;  

  const result = await taskRepository.getTasks({ userId, categories, search });

  if (!result || result.length === 0) {
    return serviceResponse.success(200, "No tasks found", []);
  }

  return serviceResponse.success(200, "Tasks fetched successfully", result);
}
static async getPandingCount(userId) {
  const result = await taskRepository.getPandingCount(userId);

  if (!result || result.length === 0) {
    return serviceResponse.success(200, "No tasks found", []);
  }

  return serviceResponse.success(200, "Tasks fetched successfully", result);
}

}

export default taskService;
