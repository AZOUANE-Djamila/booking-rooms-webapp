import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import ListRoom from "./components/ListRoom";
import Dashboard from "./components/dashboard/Dashboard";
import RoomsList from "./components/dashboard/Rooms/RoomsList";
import ListUsers from "./components/dashboard/Customers/UsersList";
import Signin from "./components/dashboard/Customers/Signin";
import Signup from "./components/dashboard/Customers/Signup";
import DashboardRoomDetail from "./components/dashboard/Rooms/DashboardRoomDetail";
import RoomDetail from "./components/RoomDetail";
import RoomType from "./components/dashboard/Rooms/RoomType";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("isLoggedIn");
        if (token) {
          // Validate the token on the server
          const response = await axios.post(
            "http://localhost:5000/api/accounts/signin",
            { token }
          );
          setIsLoggedIn(true);
          setUserType(response.data.user.role);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Switch>
      <Route exact path="/" component={ListRoom} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/dashboard/rooms" component={RoomsList} />
      <Route
        exact
        path="/dashboard/rooms/:roomName"
        component={DashboardRoomDetail}
      />
      <Route exact path="/dashboard/roomtype" component={RoomType} />
      <Route exact path="/dashboard/customers" component={ListUsers} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/rooms" component={ListRoom} />
      <Route exact path="/rooms/:_id" component={RoomDetail} />
    </Switch>
  );
}

export default App;
