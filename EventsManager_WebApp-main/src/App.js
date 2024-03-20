import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import Home from "./screens/Home";
import SingleEvent from "./screens/SingleEvent";
import UserProfile from "./screens/UserProfile";
import Events from "./screens/Events";
import Signup from "./screens/Signup";
import PostEvents from "./screens/PostEvents";
import Page404 from "./screens/Page404";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" Component={Home} />
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:id" element={<SingleEvent />} />
        <Route path="/post-event" element={<PostEvents />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Page404 />}/>
        
      </Routes>

    </Router>
  );
}

export default App;
