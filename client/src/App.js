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
import EditBook from "./components/EditBook";
import BookAllocation from "./components/BookAllocation";
import AllocatedBooks from "./components/AllocatedBooks";

const AppContent = () => {
  const location = useLocation();
  const showSidebar = location.pathname.startsWith("/dashboard");

  return (
    <div className="flex w-screen h-screen ">
      {showSidebar && <Sidebar />}
      <div className="content flex-1">
        <Routes>
          <Route path="/dashboard/*" element={<Content />}>
            <Route path="analytics" element={<Analytics />} />
            <Route path="add_user" element={<AddUser />} />
            <Route path="add_book" element={<AddBook />} />
            <Route path="all_books" element={<AllBooks />} />
            <Route path="allocate_book" element={<BookAllocation />} />
            <Route path="allocated_books" element={<AllocatedBooks />} />
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
