import { useEffect } from 'react';
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

export default useVerifyLogin;
