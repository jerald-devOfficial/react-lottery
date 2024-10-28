import "./App.css";
import lottery from "./lottery";
import { useReducer, useEffect } from "react";
import web3 from "./web3";

const initialState = {
  manager: "",
  players: [],
  balance: 0,
};

const reducer = (state, action) => ({ ...state, ...action });

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchManager = async () => {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(manager);

      dispatch({ manager });
      dispatch({ players });
      dispatch({ balance });
    };
    fetchManager();
  }, []);

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>Manager: {state.manager}</p>
      <p>Players: {state.players}</p>
      <p>Balance: {web3.utils.fromWei(state.balance, "ether")} ETH</p>
    </div>
  );
};

export default App;
