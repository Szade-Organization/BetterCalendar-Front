import { Route, Routes } from "react-router";
import "./App.css";
import AuthLayout from "./pages/_auth/AuthLayout.jsx";
import RootLayout from "./pages/_root/RootLayout.jsx";
import AccordionLayout from "./pages/_root/AccordionLayout.jsx";
import LoginPage from "./pages/_auth/LoginPage.jsx";
import RegisterPage from "./pages/_auth/RegisterPage.jsx";

function App() {

  return (
    <main className="flex min-h-screen w-full bg-week-background" >
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route path="/" element={< AccordionLayout/>} />         
        </Route>
      </Routes>
    </main >
  )

}


export default App;
