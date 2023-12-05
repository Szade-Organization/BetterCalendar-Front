import { useState } from "react";

import "./App.css";
import AddActivity from "./components/AddActivity";
import resets from './components/_resets.module.css';
import { AiPlannerWindow } from './components/AiPlannerWindow/AiPlannerWindow.tsx';


function App() {


  return (
    <>
      <AiPlannerWindow/>
      {/*<AddActivity />*/}
    </>
  );
}

export default App;
