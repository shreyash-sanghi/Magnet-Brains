import taskService from "../services/task.service.js";
import { APIError } from "../utils/error.utils.js";
import { Response } from "../utils/response.utils.js";
import { StatusCode } from "../utils/statuscode.utils.js";

export class taskController {

  static async create(request, response, next) {
    try {

      const { userid } = request.user;
      const data = {
        ...request.body,
        userId: userid,
      };
      console.log(request.body);
      const result = await taskService.create(data);

      if (!result.success) {
        return next(
          new APIError(StatusCode.SERVER_ERROR, result.message)
        );
      }

      return Response.Send(
        response,
        StatusCode.CREATED,
        "Success",
        result.data
      );
    } catch (error) {
      return next(error);
    }
  }

  static async edit(request, response, next) {
    try {
      const { userid } = request.user;
      const { taskId } = request.params;

      const result = await taskService.edit(
        userid,
        taskId,
        request.body
      );

      if (!result.success) {
        return next(
          new APIError(StatusCode.NOT_FOUND, result.message)
        );
      }

      return Response.Send(
        response,
        StatusCode.OK,
        "Success",
        result.data
      );
    } catch (error) {
      return next(error);
    }
  }

  static async changeStatus(request, response, next) {
    try {
      const { userid } = request.user;
      const { taskId } = request.params;
      const { currentStatus } = request.body;

      const result = await taskService.changeStatus(
        userid,
        taskId,
        currentStatus
      );

      if (!result.success) {
        return next(
          new APIError(StatusCode.NOT_FOUND, result.message)
        );
      }

      return Response.Send(
        response,
        StatusCode.OK,
        "Success",
        result.data
      );
    } catch (error) {
      return next(error);
    }
  }

  static async delete(request, response, next) {
    try {
      const { userid } = request.user;
      const { taskId } = request.params;

      const result = await taskService.delete(userid, taskId);

      if (!result.success) {
        return next(
          new APIError(StatusCode.NOT_FOUND, result.message)
        );
      }

      return Response.Send(
        response,
        StatusCode.OK,
        "Success",
        result.data
      );
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(request, response, next) {
    try {
      const { userid } = request.user;
      const query = request.query;
      const result = await taskService.getAll(userid,query);

      if (!result.success) {
        return next(
          new APIError(StatusCode.SERVER_ERROR, result.message)
        );
      }

      return Response.Send(
        response,
        StatusCode.OK,
        "Success",
        result.data
      );
    } catch (error) {
      return next(error);
    }
  }
  static async getPandingCount(request, response, next) {
    try {
      const { userid } = request.user;
      const result = await taskService.getPandingCount(userid);
      if (!result.success) {
        return next(
          new APIError(StatusCode.SERVER_ERROR, result.message)
        );
      }

      return Response.Send(
        response,
        StatusCode.OK,
        "Success",
        result.data
      );
    } catch (error) {
      return next(error);
    }
  }
}
