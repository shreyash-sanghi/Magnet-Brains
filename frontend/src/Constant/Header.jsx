import {React,useState,useRef,useEffect} from 'react'
import { FaArrowLeft, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext/AuthProvider';
import toast from 'react-hot-toast';
import { axiosInstance } from '../API/axiosApi';
import { useNavigate } from 'react-router-dom';
function Header({text,subtext,handleGoBack}) {
  const { authUser,setAuthUser} = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
    const userEmail = authUser?.email;
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async() => {
     try {
       const res = await axiosInstance.post("/user/logout");
       localStorage.clear();
       setAuthUser(undefined);
       navigate("/login");
       setShowProfileMenu(false);
     } catch (error) {
      toast.error(error);
     }
  };
  return (
      <div>
      {/* Header */}
      <div className="relative max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className='flex gap-2'>
            {handleGoBack && (
              <button
                onClick={handleGoBack}
                className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <FaArrowLeft className="text-white text-lg" />
              </button>
            )}
          
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                {text}
              </h1>
              <p className="text-gray-300 italic mt-1">{subtext}</p>
            </div>
          </div>

          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <FaUser className="text-gray-300" />
            </button>

           
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-gradient-to-br from-purple-900/95 to-purple-800/95 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden z-50">

                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-500 rounded-full flex items-center justify-center">
                      <FaUser className="text-white text-xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-300 text-sm truncate">
                        {userEmail || 'user@example.com'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-white/10 rounded-lg transition-all group"
                  >
                    <FaSignOutAlt className="text-red-400 text-lg group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
