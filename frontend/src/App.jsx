import { Route, Routes, Navigate } from "react-router-dom";
import routes from "./routers";
import { useAuth } from "./context/AuthContext/AuthProvider";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, loading } = useAuth();
  
  return (
     <>
    <Routes>
      {authUser &&
        routes.map((route, key) => {
          const Component = route.element;
          return (
            <Route
              key={key}
              path={route.path}
              element={<Component />}
            />
          );
        })}

      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <Login />}
      />

      <Route
        path="/signup"
        element={authUser ? <Navigate to="/" /> : <Signup />}
      />
      {!authUser && (
        <Route path="*" element={<Navigate to="/login" />} />
      )} 
    </Routes>
      <Toaster />
     </>
  );
};

export default App;
