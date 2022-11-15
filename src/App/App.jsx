import "./App.css";
import Login from "../containers/Login/Login";
import { useSelector } from "react-redux";
import { getState } from "../store/reducer";
import TimeReport from "../containers/TimeReport/TimeReport";
import { useSaveStorage } from "../lib/hooks/useSaveStorage";

function App() {
	const { login } = useSelector(getState);
	useSaveStorage();

	return <div className="App">{!login ? <Login /> : <TimeReport />}</div>;
}

export default App;
