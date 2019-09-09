import React, {useState} from 'react';
import {getToken} from '../api/strapi';

const LoginForm = params => {

	const userInit = {mail: "", password: ""};
	const [user, setUser] = useState(userInit);
	const handleChange = e => {
		const {name, value} = e.target
		setUser({...user, [name]: value});
	}

	const handleSubmit = e => {
		e.preventDefault();
		getToken(user).then(resp => {
			if(resp){
				setUser(userInit);
				params.setLoggedIn(true);
				loginBtnAction();
			}else{
				document.getElementById("loginError").style.display = "block";
			}
		});
		
	}

	

	const loginform = (
		<div id="login-form">
		<form onSubmit={e => handleSubmit(e)}>
			<label id="loginError">Wrong username or password</label>
			<label>E-mail</label>
			<input type="text" name="mail" onChange={e => handleChange(e)} value={user.mail} required />
			<label>Password</label>
			<input type="password" name="password" onChange={e => handleChange(e)} value={user.password} required/>
			<button type="submit">Sign in</button>
		</form>
		</div>
	);

	const loginBtnAction = () => {
		let element = document.getElementById("login-form");
		if (element.style.display === "block"){
			element.style.display = "none";
			document.getElementById("loginBtn").innerHTML = "Sign in"
		} else {
			element.style.display = "block";
			document.getElementById("loginBtn").innerHTML = "Close"
		}
		//document.getElementById("loginBtn").style.display = "none";
		
		
		element.style.position = "absolute";
	}

	return(
		<div>
		<a onClick={loginBtnAction} id="loginBtn">Sign in</a>
		{loginform}
		</div>
	);
}

export default LoginForm;