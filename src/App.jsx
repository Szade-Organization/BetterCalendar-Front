import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<Layout />}></Route>)
  );
  return <RouterProvider router={router} />;
}

export default App;
