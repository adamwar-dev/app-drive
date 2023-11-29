import axios from 'axios';
axios.defaults.withCredentials = true;
export class AuthenticationDataProvider {

	public static signUp(firstName: string, email: string, password: string, confirmPassword: string, terms: boolean ) {
		let data = 0;
		return axios.post(`http://localhost:4000/accounts/register`, {
			firstName: firstName,
			email: email,
			password: password,
			confirmPassword: confirmPassword,
			acceptTerms: terms
		}, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			}
		}).then(res => {
			console.log(res);
			console.log(res.data);
			data = res.status;
			return data;
		}).catch(er => {
			console.log(er);
			return data;
		});
	}

	public static signIn(email: string, password: string) {
		let data = '';
		return axios.post(`http://localhost:4000/accounts/authenticate`, {
			Email: email,
			Password: password
		}, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			}
		}).then(res => {
			console.log(res.data);
			data = res.data.jwtToken;
			return data;
		}).catch(er => {
			console.log(er);
			return data;
		});
	}
}