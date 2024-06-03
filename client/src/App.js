import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { AppStatesProvider } from "./context/AppStates";
import { ToastProvider } from "./context/ToastContext";
import { BookContextProvider } from "./context/BookCart";
import Sidebar from "./panel/Sidebar";
import Content from "./panel/Content";
import AddUser from "./components/AddUser";
import Analytics from "./components/Analytics";
import AddBook from "./components/AddBook";
import AllBooks from "./components/AllBooks";
import BookAllocation from "./components/BookAllocation";
import AllocatedBooks from "./components/AllocatedBooks";
import ManageStudent from "./components/ManageStudent";
import StudentDetail from "./components/StudentDetail";
import Login from "./authentication/Login";
import Home from "./components/Home";
import StudentLogin from "./authentication/StudentLogin";
import StudentPanel from "./components/Student/StudentPanel";
import UpdateProfile from "./components/Student/UpdateProfile";
import AvailalbeBooks from "./components/Student/AvailalbeBooks";
import LoanBooks from "./components/Student/LoanBooks";

const AppContent = () => {
  const location = useLocation();
  const showSidebar = location.pathname.startsWith("/dashboard");

  return (
    <div className="flex w-screen h-screen ">
      {showSidebar && <Sidebar />}
      <div className="content flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student_login" element={<StudentLogin />} />
          <Route path="/student_panel/*" element={<StudentPanel />}>
            <Route path="" element={<LoanBooks />} />
            <Route path="update_profile" element={<UpdateProfile />} />
            <Route path="books_available" element={<AvailalbeBooks />} />

          </Route>
        </Routes>
        <Routes>

          <Route path="/admin_login" element={<Login />} />
          <Route path="/dashboard/*" element={<Content />}>
            <Route path="" element={<Analytics />} />
            <Route path="add_user" element={<AddUser />} />
            <Route path="add_book" element={<AddBook />} />
            <Route path="all_books" element={<AllBooks />} />
            <Route path="allocate_book" element={<BookAllocation />} />
            <Route path="allocated_books" element={<AllocatedBooks />} />
            <Route path="manage_students" element={<ManageStudent />} />
            <Route path="student_info/:cnic" element={<StudentDetail />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="">
      <BookContextProvider>
        <AppStatesProvider>
          <ToastProvider>
            <Router>
              <AppContent />
            </Router>
          </ToastProvider>
        </AppStatesProvider>
      </BookContextProvider>
    </div>
  );
};

export default App;
