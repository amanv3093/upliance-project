import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Counter from "./components/Counter/Counter.jsx";
import UserDataForm from "./components/UserDataForm/UserDataForm.jsx";
import TextEditors from "./components/TextEditors/TextEditors.jsx";
import LoginLogout from "./components/LoginLogout/LoginLogout.jsx";
import Logout from "./components/LoginLogout/Logout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Counter /> },
      { path: "/userForm", element: <UserDataForm /> },
      { path: "/textEditor", element: <TextEditors /> },
      { path: "/login", element: <LoginLogout /> },
    ],
  },
  { path: "/logout", element: <Logout /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
