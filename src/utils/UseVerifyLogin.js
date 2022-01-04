/* import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASEURL } from './constants';

const useVerifyLogin = (status = 'check') => {
	//pass 'initial' as a parameter if verification is done during login

	const navigate = useNavigate();

	useEffect(() => {
		const checkStat = async () => {
			try {
				const status = await fetch(`${API_BASEURL}/user/amIloggedIn`);
				const isLoggedIn = await status.json();
				if (!isLoggedIn) navigate('/login');
			} catch (e) {
				navigate('/login');
			}
		};

		checkStat();
	}, [navigate]);
};

export default useVerifyLogin; */

import { API_BASEURL } from './constants';

const verifyLogin = async () => {
	let result = false;

	localStorage.setItem('isLoggedIn', 'false');

	//pass 'initial' as a parameter if verification is done during login

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
