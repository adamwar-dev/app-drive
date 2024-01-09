import axios from 'axios';
axios.defaults.withCredentials = true;

export interface AccountInfo {
	firstName: string;
	email: string;
	externalType: string;
} 

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

	public static verify(token: string) {
		let data = 0;
		return axios.post(`http://localhost:4000/accounts/verify-email`, {
			Token: token,
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

	public static externalAuth(name: string, email: string, externalId: string, externalType: string) {
		let data = '';
		return axios.post(`http://localhost:4000/accounts/external-auth`, {
			firstName: name,
			Email: email,
			ExternalId: externalId,
			ExternalType: externalType
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

	public static getProfileInfo(token: string) {
		let status = 0;
		return axios.post(`http://localhost:4000/accounts/get-account-info`, {
			UserToken: token,
		}, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			}
		}).then(res => {
			console.log(res);
			console.log(res.data);
			const data = res.data;
			return data;
		}).catch(er => {
			console.log(er);
			return status;
		});
	}
	
	public static resetPasswordRequest(email: string) {
		let data = 0;
		return axios.post(`http://localhost:4000/accounts/forgot-password`, {
			Email: email
		}, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			}
		}).then(res => {
			data = res.status;
			console.log(data);
			return data;
		}).catch(er => {
			console.log(er);
			return data;
		});
	}

	public static resetPassword(token: string, password: string) {
		let data = 1;
		return axios.post(`http://localhost:4000/accounts/reset-password`, {
			Token: token,
			Password: password,
			ConfirmPassword: password,
		}, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			}
		}).then(res => {
			data = res.status;
			return data;
		}).catch(er => {
			console.log(data);
			return data;
		});
	}
}