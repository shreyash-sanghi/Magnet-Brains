import React, { useEffect, useState } from 'react';

import { FaSearch, FaHome, FaPlus } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import Header from '../../Constant/Header';
import { getGreetingTime, todayDay } from '../../Constant/GetTime';
import Card from '../../Constant/Card';
import { axiosInstance } from '../../API/axiosApi';
import toast from 'react-hot-toast';

function HomePage() {
  const naviage = useNavigate();
  const [currentTime,setCurrentTime] = useState("");
  const [currentDay,setCurrentDay] = useState("");
  const [tasks, setTasks] = useState([]);
  const [pandCount , setPendCount] = useState(0);
  const isTaskOverdue = (task) => {
  const deadlineDateTime = new Date(`${task.taskDeadline}T${task.taskTime}`);
  const now = new Date();

  return now > deadlineDateTime && task.currentStatus === "Pending";
};

const getPendingCount = async()=>{
  try {
    const res = await axiosInstance.get("/task/get-pending-task");
    setPendCount(res?.data?.data);
  } catch (error) {
    console.log(error);
  }
}
const getTask = async () => {
  try {
    const res = await axiosInstance.get("/task/get");
    const fetchedTasks = res?.data?.data || [];

    setTasks(fetchedTasks);

    fetchedTasks.forEach(task => {
      if (isTaskOverdue(task)) {
        handleStatus(task._id, "Overdue");
      }
    });

  } catch (error) {
    toast.error("Something went wrong");
  }
};

  


  useEffect(()=>{
    getTask();
    getPendingCount();
   setCurrentTime(getGreetingTime());
   setCurrentDay(todayDay);
  },[])
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

const categories = [
    { name: 'All',  color: 'from-green-400 to-green-600' },
    { name: 'Home',  color: 'from-green-400 to-green-600' },
    { name: 'Work', color: 'from-purple-400 to-purple-600' },
    { name: 'Personal',  color: 'from-pink-400 to-pink-600' },
    { name: 'Education', color: 'from-blue-400 to-blue-600' },
    { name: 'Other',  color: 'from-orange-400 to-orange-600' }
  ];

  const currentStatus = [
    { name: 'Pending',  color: 'from-yellow-400 to-amber-600' },
    { name: 'Completed',  color: 'from-green-400 to-green-600' },
    { name: 'Overdue', color: 'from-red-400 to-red-600' }
  ];
 
  const filteredTasks = tasks.filter(task => {
  const matchCategory =
    selectedCategory === 'All' || task.category === selectedCategory;

  const matchSearch =
    task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.taskDescription.toLowerCase().includes(searchQuery.toLowerCase());

  return matchCategory && matchSearch;
});


const handleStatus = async (taskId, currentStatus) => {
  try {
    await axiosInstance.patch(`/task/status/${taskId}`, { currentStatus });

    setTasks(prev =>
      prev.map(task =>
        task._id === taskId
          ? { ...task, currentStatus }
          : task
      )
    );
  } catch (error) {
    toast.error("Something went wrong");
  }
};


  const handleTaskDelete = async(taskId) => {
    try {
       const res = await axiosInstance.delete(`/task/delete/${taskId}`);
       toast.success("Task have successfully delete: ")
       setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
                if (error.response) {
      toast.error("Error: " + error.response.data.error);
    } else {
      toast.error("Something went wrong");
    }
    }finally{

    }
  };

  const handleTaskEdit = async(task) => {
  try {
       const res = await axiosInstance.put(`/task/edit/${task._id}`,task);
       toast.success("Task have Successfully Update : ")
        getTask();
    } catch (error) {
                if (error.response) {
      toast.error("Error: " + error.response.data.error);
    } else {
      toast.error("Something went wrong");
    }
    }finally{

    }
  };


  const completedCount = pandCount;
  const completionPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
          <Header text={`${currentTime}`} subtext={`Have a wonderful ${currentDay}!`}/>
  
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-6 shadow-xl">
          <div className="flex items-center gap-6">
            <div className="relative">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionPercentage / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-xl">{completionPercentage}%</span>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-white text-xl font-semibold mb-2">
                You have {tasks.length - completedCount} task{tasks.length - completedCount !== 1 ? 's' : ''} to complete.
              </h2>
              <p className="text-gray-300">
                {completedCount === 0 ? 'No tasks completed yet. Keep going!' : `${completedCount} task${completedCount !== 1 ? 's' : ''} completed. Great work!`}
              </p>
            </div>
          </div>
        </div>


        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for task..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
        </div>


        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 whitespace-nowrap ${
                selectedCategory === category.name
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-white/10 backdrop-blur-lg border border-white/20 text-gray-300 hover:bg-white/20'
              }`}
            >
              <FaHome className="text-sm" />
              {category.name} 
            </button>
          ))}
        </div>

    
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 text-center">
              <p className="text-gray-300 text-lg">No tasks found in this category</p>
            </div>
          ) : (
            filteredTasks.map(task => (
            <Card
              key={task._id}
              task={task}
              categories={categories}
              currentStatus={currentStatus}
              onTaskComplete={handleStatus}
              onTaskDelete={handleTaskDelete}
              onTaskEdit={handleTaskEdit}
            />
          ))
          )}
        </div>

    

        <button onClick={()=>naviage("/add")} className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center text-white text-3xl hover:scale-110 transition-transform z-50">
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default HomePage;