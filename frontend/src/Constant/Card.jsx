import React, { useState } from 'react';
import { IoMdCheckmarkCircleOutline, IoMdClose } from 'react-icons/io';
import { FaHome, FaFlag } from 'react-icons/fa';
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { AiOutlineWarning } from "react-icons/ai";

function Card({ task, categories, currentStatus, priorities, onTaskComplete, onTaskDelete, onTaskEdit }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  
  const [editForm, setEditForm] = useState({
    taskName: task.taskName,
    taskDescription: task.taskDescription,
    taskDeadline: task.taskDeadline,
    taskTime: task.taskTime,
    category: task.category,
    currentStatus: task.currentStatus,
    priority: task.priority || 'Medium'
  });

  const statusConfig = currentStatus.find(c => c.name === task.currentStatus);
  const priorityConfig = priorities?.find(p => p.name === task.priority);
  const isCompleted = task.currentStatus === 'Completed';

  const handleEditClick = () => {
    setEditForm({
      taskName: task.taskName,
      taskDescription: task.taskDescription,
      taskDeadline: task.taskDeadline,
      taskTime: task.taskTime,
      category: task.category,
      currentStatus: task.currentStatus,
      priority: task.priority || 'Medium'
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    onTaskEdit?.({ ...task, ...editForm });
    setShowEditModal(false);
  };

  const handleDeleteConfirm = () => {
    onTaskDelete?.(task._id);
    setShowDeleteModal(false);
  };

  const handleCompleteConfirm = () => {
    onTaskComplete?.(task._id, "Completed");
    setShowCompleteModal(false);
  };

  return (
    <>
      <div
        className={`bg-gradient-to-r backdrop-blur-lg rounded-2xl border p-5 shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] ${
          isCompleted 
            ? 'from-green-500/40 to-emerald-500/40 border-green-400/50' 
            : 'from-purple-500/30 to-pink-500/30 border-white/20'
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`text-xl font-bold ${isCompleted ? 'text-white line-through' : 'text-white'}`}>
                {task?.taskName}
              </h3>
              {task.priority && (
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r ${
                  priorityConfig?.color || 'from-gray-400 to-gray-600'
                } text-white ring-2 ${
                  priorityConfig?.ringColor || 'ring-white/30'
                }`}>
                  <FaFlag className="text-[10px]" />
                  {task.priority}
                </span>
              )}
            </div>
            <p className={`text-sm mb-3 ${isCompleted ? 'text-gray-300 line-through' : 'text-gray-200'}`}>
              {task?.taskDescription}
            </p>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <IoMdCheckmarkCircleOutline className="text-lg" />
              <span>{task.taskDeadline} - {task.taskTime}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="text-red-300 hover:text-red-400 transition-colors p-2"
              title="Delete task"
            >
              <MdDeleteOutline className='text-2xl'/>
            </button>
            <button 
              onClick={handleEditClick}
              className="text-green-300 hover:text-green-400 transition-colors p-2"
              title="Edit task"
            >
              <CiEdit className='text-2xl'/>
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r ${
              categories.find(c => c.name === task.category)?.color || 'from-gray-400 to-gray-600'
            } text-white`}>
              <FaHome className="text-xs" />
              {task?.category}
            </span>
            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r ${
              statusConfig?.color || 'from-gray-400 to-gray-600'
            } text-white ring-2 ${
              isCompleted ? 'ring-green-400' : 'ring-white/30'
            }`}>
              <FaHome className="text-xs" />
              {task.currentStatus}
            </span>
          </div>
          
          {!isCompleted && (
            <button
              onClick={() => setShowCompleteModal(true)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
            >
              <IoMdCheckmarkCircleOutline className="text-lg" />
              Mark Complete
            </button>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl border border-white/20 p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Edit Task</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <IoMdClose className="text-2xl" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Task Name</label>
                <input
                  type="text"
                  value={editForm.taskName}
                  onChange={(e) => setEditForm({...editForm, taskName: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Description</label>
                <textarea
                  value={editForm.taskDescription}
                  onChange={(e) => setEditForm({...editForm, taskDescription: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows="3"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">Deadline</label>
                  <input
                    type="date"
                    value={editForm.taskDeadline}
                    onChange={(e) => setEditForm({...editForm, taskDeadline: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">Time</label>
                  <input
                    type="time"
                    value={editForm.taskTime}
                    onChange={(e) => setEditForm({...editForm, taskTime: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Category</label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map(cat => (
                    <option key={cat.name} value={cat.name} className="bg-purple-900">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Priority</label>
                <select
                  value={editForm.priority}
                  onChange={(e) => setEditForm({...editForm, priority: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {priorities?.map(priority => (
                    <option key={priority.name} value={priority.name} className="bg-purple-900">
                      {priority.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Status</label>
                <select
                  value={editForm.currentStatus}
                  onChange={(e) => setEditForm({...editForm, currentStatus: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {currentStatus.map(status => (
                    <option key={status.name} value={status.name} className="bg-purple-900">
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-red-900 to-pink-900 rounded-2xl border border-red-400/30 p-6 max-w-md w-full shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                <AiOutlineWarning className="text-4xl text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Delete Task?</h2>
              <p className="text-gray-200 mb-6">
                Are you sure you want to delete "<span className="font-semibold">{task.taskName}</span>"? This action cannot be undone.
              </p>
              
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold hover:from-red-600 hover:to-red-800 transition-all shadow-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Complete Confirmation Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-green-900 to-emerald-900 rounded-2xl border border-green-400/30 p-6 max-w-md w-full shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <IoMdCheckmarkCircleOutline className="text-4xl text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Mark as Complete?</h2>
              <p className="text-gray-200 mb-6">
                Are you sure you want to mark "<span className="font-semibold">{task.taskName}</span>" as completed?
              </p>
              
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowCompleteModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCompleteConfirm}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg"
                >
                  Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;