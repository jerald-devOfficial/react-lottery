import "./App.css";
import lottery from "./lottery";
import { useState, useEffect } from "react";

function App() {
  const [manager, setManager] = useState("");

  useEffect(() => {
    async function fetchManager() {
      const res = await lottery.methods.manager().call();
      setManager(res);
    }
    fetchManager();
  }, []);

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>Manager: {manager}</p>
    </div>
  );
}

export default App;
