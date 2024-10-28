import "./App.css";
import lottery from "./lottery";
import { useReducer, useEffect } from "react";
import web3 from "./web3";

const initialState = {
  manager: "",
  players: [],
  balance: 0,
  value: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(state.value, "ether"),
    });
  };

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>Manager: {state.manager}</p>
      <p>Players: {state.players}</p>
      <p>Balance: {web3.utils.fromWei(state.balance, "ether")} ETH</p>

      <hr />

      <form onSubmit={handleSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label htmlFor="etherAmount">Amount of ether to enter</label>
          <input
            id="etherAmount"
            value={state.value}
            onChange={(e) => dispatch({ value: e.target.value })}
          />
          <button type="submit">Enter</button>
        </div>
      </form>
    </div>
  );
};

export default App;
