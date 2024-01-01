import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout.jsx";
import AddActivity from "./components/AddActivity.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      // <Route path="/" element={<Layout />}>
         <Route index element={<AddActivity />} />
       
      // </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
