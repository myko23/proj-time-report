import InputSet from "../../components/InputSet/InputSet";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import "./Login.css";
import Logo from "../../assets/images/Logo.svg";
import { useDispatch } from "react-redux";
import { initializedData, onLogin, setName } from "../../store/reducer";
import { useState } from "react";

function Login() {
	const [nameIn, setNameIn] = useState("");
	const dispatch = useDispatch();
	return (
		<div className="Login">
			<div className="Login__login-box">
				<div className="Login__login-set">
					<img src={Logo} alt="logo" className="Login__logo" />
					<div className="Login__text-set">
						<h1 className="Login__header">Welcome</h1>
						<InputSet
							className="Login__input"
							label="Name"
							placeholder="Insert Name Here"
							value={nameIn}
							setValue={setNameIn}
						/>
						<PrimaryButton
							onClick={() => {
								const response =
									localStorage.getItem("timereportdata");
								const data = JSON.parse(response);
								if (data) initializedData(dispatch)(data);
								setName(dispatch)(nameIn);
								onLogin(dispatch);
							}}
							label="LOGIN"
							width="10rem"
						/>
					</div>
				</div>
				<div className="Login__image-container"></div>
			</div>
		</div>
	);
}

export default Login;
