import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Auth from "./pages/auth/Auth";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.authData);
  return (
    <div className="App">
      <div className="absolute w-[22rem] h-56 rounded-[50%] bg-rose-300 blur-[72px] top-[-18%] right-0"></div>
      <div className="absolute w-[22rem] h-56 rounded-[50%] bg-rose-300 blur-[72px] top-[36%] left-[-8rem]"></div>

      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="../home" /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
      </Routes>
    </div>
  );
}

export default App;
