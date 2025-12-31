import React, { useState } from 'react';
import { HiSparkles } from 'react-icons/hi';
import { FaArrowLeft, FaTasks, FaAlignLeft, FaClock, FaTag } from 'react-icons/fa';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import Header from '../../Constant/Header';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../API/axiosApi';

function AddTask() {
  const [formData, setFormData] = useState({
    taskName: '',
    taskDescription: '',
    taskDeadline: '',
    taskTime: '',
    category: '',
    priority:''
  });
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { name: 'Home', icon: '🏠', color: 'from-green-400 to-green-600', bgColor: 'bg-green-500/20' },
    { name: 'Work', icon: '💼', color: 'from-purple-400 to-purple-600', bgColor: 'bg-purple-500/20' },
    { name: 'Personal', icon: '👤', color: 'from-blue-400 to-blue-600', bgColor: 'bg-blue-500/20' },
    { name: 'Education', icon: '📚', color: 'from-yellow-400 to-yellow-600', bgColor: 'bg-yellow-500/20' },
    { name: 'Other', icon: '📌', color: 'from-pink-400 to-pink-600', bgColor: 'bg-pink-500/20' }
  ];
  const priority = [
    { name: 'Low', icon: '💼', color: 'from-green-400 to-green-600', bgColor: 'bg-green-500/20' },
    { name: 'Medium', icon: '💼', color: 'from-purple-400 to-purple-600', bgColor: 'bg-purple-500/20' },
    { name: 'High', icon: '💼', color: 'from-blue-400 to-blue-600', bgColor: 'bg-blue-500/20' },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
      try {
      const response = await axiosInstance.post("/task/create",formData)
      console.log(response);
      setFormData({
        taskName: '',
        taskDescription: '',
        taskDeadline: '',
        taskTime: '',
        category: '',
        priority:''
      });
      toast.success('Task created successfully!');
      } catch (error) {
                  if (error.response) {
      toast.error("Error: " + error.response.data.error);
    } else {
      toast.error("Something went wrong");
    }
      }finally{
        setIsLoading(false);
      }


  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>
      
        <Header text="Create New Task" subtext="Fill in the details to add a new task" handleGoBack={handleGoBack}/>
      <div className="relative max-w-3xl mx-auto">

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-200 text-sm font-medium mb-2">
                Task Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaTasks className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="taskName"
                  value={formData.taskName}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter task name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-200 text-sm font-medium mb-2">
                Task Description
              </label>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-4 pointer-events-none">
                  <FaAlignLeft className="text-gray-400" />
                </div>
                <textarea
                  name="taskDescription"
                  value={formData.taskDescription}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                  placeholder="Enter task description"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-200 text-sm font-medium mb-2">
                  Deadline Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaClock className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="taskDeadline"
                    value={formData.taskDeadline}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-200 text-sm font-medium mb-2">
                  Deadline Time
                </label>
                <input
                  type="time"
                  name="taskTime"
                  value={formData.taskTime}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-200 text-sm font-medium mb-3">
                Select Category
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat.name })}
                    className={`relative p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                      formData.category === cat.name
                        ? `bg-gradient-to-r ${cat.color} border-white/50 shadow-lg`
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{cat.icon}</div>
                      <div className="text-white font-semibold text-sm">{cat.name}</div>
                    </div>
                    {formData.category === cat.name && (
                      <div className="absolute top-2 right-2">
                        <IoMdCheckmarkCircle className="text-white text-xl" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              {!formData.category && (
                <p className="text-gray-400 text-xs mt-2 ml-1">
                  Please select a category for your task
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-200 text-sm font-medium mb-3">
                Select Task Priority
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {priority.map((pro) => (
                  <button
                    key={pro.name}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority: pro.name })}
                    className={`relative p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                      formData.priority === pro.name
                        ? `bg-gradient-to-r ${pro.color} border-white/50 shadow-lg`
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{pro.icon}</div>
                      <div className="text-white font-semibold text-sm">{pro.name}</div>
                    </div>
                    {formData.category === pro.name && (
                      <div className="absolute top-2 right-2">
                        <IoMdCheckmarkCircle className="text-white text-xl" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              {!formData.category && (
                <p className="text-gray-400 text-xs mt-2 ml-1">
                  Please select a category for your task
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-8"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Task...
                </>
              ) : (
                <>
                  <IoMdCheckmarkCircle className="text-xl" />
                  Create Task
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTask;