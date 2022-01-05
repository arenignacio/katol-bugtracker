import { API_BASEURL } from './constants';

const verifyLogin = async () => {
	let result = false;

	console.log('check executes');
	try {
		const status = await fetch(`${API_BASEURL}/user/amIloggedIn`);
		const isLoggedIn = await status.json();
		if (isLoggedIn) {
			localStorage.setItem('isLoggedIn', 'true');
			result = true;
		}
	} catch (e) {
		return result;
	}

	return result;
};

export default verifyLogin;
