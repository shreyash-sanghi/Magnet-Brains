import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId:{
        type: mongoose.Schema.Types.ObjectId,
  ref: "UserModel",  
  required: true,
    },
    taskName: { type: String, required: true },
    taskDescription: {
      type: String,
      required: true,
    },

    taskDeadline: { type: String, required: true },
    taskTime: { type: String, required: true },

    category: {
      type: String,
      enum: ["Home", "Work", "Personal", "Education", "Other"],
      default: "Other",
    },

    currentStatus: {
      type: String,
      enum: ["Pending", "Completed","Overdue"],
      default: "Pending",
    },
    complteDate:{
    type : Date,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
  },
  { timestamps: true }
);



taskSchema.statics.createTask = async function(data) {
  console.log(data);
  const task = new this(data);
  return await task.save();
};

taskSchema.statics.editTask = async function (userId,taskId, data) {
  return await this.findOneAndUpdate(
    { _id: taskId, userId },
    data,
    { new: true }
  );
};


taskSchema.statics.changeStatus = async function (userId, taskId, status) {
  const update = { currentStatus: status };

  if (status === "Completed") {
    update.complteDate = new Date();
  }

  return await this.findOneAndUpdate(
    { _id: taskId, userId },
    update,
    { new: true }
  );
};


taskSchema.statics.deleteTask = async function (userId,taskId) {
  return await this.findOneAndDelete({
    _id: taskId,
    userId,
  });
};
taskSchema.statics.getPandingCount = async function (userId) {
  return await this.countDocuments({
    userId,
    currentStatus: "Completed"
  });
};


taskSchema.statics.getTasks = async function ({ userId, categories, search }) {
  let filter = { userId };

  if (categories && Array.isArray(categories) && categories.length > 0) {
    filter.category = { $in: categories };
  }

  if (search && typeof search === "string" && search.trim() !== "") {
    const searchRegex = new RegExp(search.trim(), "i");
    filter.$or = [
      { taskName: searchRegex },
      { taskDescription: searchRegex },
    ];
  }
  const tasks = await this.find(filter).lean();
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  tasks.sort((a, b) => {
    const p1 = priorityOrder[a.priority] || 4;
    const p2 = priorityOrder[b.priority] || 4;
    return p1 - p2 || new Date(b.createdAt) - new Date(a.createdAt);
  });

  return tasks;
};



const Task = mongoose.model('TaskModel', taskSchema);

export default Task;
