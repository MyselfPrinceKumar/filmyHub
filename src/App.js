import Headers from "./Components/Headers";
import Card from "./Components/Card";
import { Route, Routes } from "react-router-dom";
import AddMovie from "./Components/AddMovie";
import Detail from "./Components/Detail";
import { createContext, useState } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
const appState = createContext();
function App() {
  const [login, setLogin] = useState();
  const [userName, setUserName] = useState("");
  return (
    <appState.Provider value={{ useState, login, setUserName, setLogin }}>
      <div className="bg-black">
        <Headers />
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/addMovie" element={<AddMovie />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </appState.Provider>
  );
}

export default App;
export { appState };