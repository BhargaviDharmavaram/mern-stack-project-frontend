import React, { createContext } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Account from "./Account";
import AddPG from "./CreatePgForm";
import AddRoom from "./AddRoomForm";
import AddResident from "./AddResidentForm";
import ConfirmResident from "./ConfirmResident";
import AdminDashBoard from "./AdminDashBoard";
import PaymentPage from "./PaymentPage";
import ResidentDashBoard from "./ResidentDashboard";
import VacatedResidents from "./VacatedResidents";
import ShowPG from "./ShowPg";
import SelectPg from "./SelectPg";
import EditRoomPage from "./EditRoomPage";
import EditResident from "./EditResident";
import EditPG from "./EditPG";
import PrivateRoute from "./PrivateRoute";
import { FaUserCircle } from "react-icons/fa"; // Import the FaUserCircle icon
import '../css/Main.css'
import HomeNestLogo from '../images/HomeNest Logo.jpg'

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

export const RoleContext = createContext();

const Main = (props) => {
    const { userLoggedIn, handleAuth, role } = props;

    const handleLogout = () => {
        // Use SweetAlert2 for logout confirmation
        Swal.fire({
        title: "Logout",
        text: "Are you sure you want to log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Logout",
        cancelButtonText: "Cancel",
        }).then((result) => {
        if (result.isConfirmed) {
            // User confirmed logout
            // For removing token from local storage
            localStorage.removeItem("token");

            // For logout the user
            handleAuth();

            Swal.fire({
            title: "Logged out successfully!",
            icon: "success",
            showConfirmButton: false,
            });

            // Navigate only after confirmation
            props.history.push("/");
        }
        });
    };

    return (
        <div>
            <RoleContext.Provider value = {{role , userLoggedIn, handleLogout}}>
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor : '#0D0D0C'}}>
          <div className="navbar-left">
            <img src={HomeNestLogo} height='40px' width='40px' alt="Logo" style={{ borderRadius: '50%' }} />
            <Link
              className="navbar-brand"
              style={{ color: "white", textDecoration: "none" }}
              to="/"
            >
              HomeNest
            </Link>
          </div>
          <div className="navbar-right">
            <ul className="navbar-nav">
              {userLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "white" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </li>
                  {role === "pg_admin" && (
                    <>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          style={{ color: "white" }}
                          to="/addpg"
                        >
                          AddPG
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          style={{ color: "white" }}
                          to="/selectpg"
                        >
                          Select PG
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/account">
                        <FaUserCircle style={{ color: "white" }} />
                        </Link>
                      </li>
                    </>
                  )}
                  {role === "pg_resident" && (
                    <>
                        <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={{ color: "white" }}
                            to="/residentdashboard"
                        >
                            Resident DashBoard
                        </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/account">
                            <FaUserCircle style={{ color: "white" }} />
                            </Link>
                        </li>
                    </>
                  )}
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "white" }}
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "white" }}
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
            <Route path="/" component={Home} exact={true} />
            <Route path="/register" component={Register} />
            <Route
                path="/login"
                render={(props) => <Login {...props} handleAuth={handleAuth} />}
            />
            <Route path="/confirm" component={ConfirmResident} />
            <Route path="/payment/:razorPayId" component={PaymentPage} />

            <PrivateRoute path="/selectpg" component={SelectPg} />
            <PrivateRoute path="/account" component={Account} />
            <PrivateRoute path="/addpg" component={AddPG} />
            <PrivateRoute path="/edit-pg/:pgDetailsId" component={EditPG} />

            <PrivateRoute path="/addroom/:pgDetailsId" component={AddRoom} />
            <PrivateRoute
                path="/edit-room/:pgDetailsId/:roomId"
                component={EditRoomPage}
            />

            <PrivateRoute
                path="/addresident/:pgDetailsId"
                component={AddResident}
            />
            <PrivateRoute
                path="/editresident/:pgDetailsId/:residentId"
                component={EditResident}
            />

            <PrivateRoute
                path="/admindashboard/:pgDetailsId"
                component={AdminDashBoard}
            />
            <PrivateRoute
                path="/vacated-residents/:pgDetailsId"
                component={VacatedResidents}
            />

            <PrivateRoute
                path="/residentdashboard"
                component={ResidentDashBoard}
            />
            <PrivateRoute path="/showPg/:pgDetailsId" component={ShowPG} />

            </RoleContext.Provider>
        </div>
    );
};

export default withRouter(Main);
