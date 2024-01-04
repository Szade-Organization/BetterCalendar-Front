import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout.jsx";
import AddActivity from "./components/AddActivity.jsx";
import Statistics from "./components/Statistics.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}/>
        //  <Route index element={<AddActivity />} />
          // <Route index element={<Statistics />} />
  
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
