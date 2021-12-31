import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASEURL } from './constants';

const useVerifyLogin = (status = 'check') => {
	//pass 'initial' as a parameter if verification is done during login

	const navigate = useNavigate();

	useEffect(() => {
		console.log('useVerifyLogin executed');
		const status = fetch(`${API_BASEURL}/user/amIloggedIn`);
		status
			.then((response) => {
				return response.json();
			})
			.then((isLoggedIn) => {
				console.log(`user is logged in? ${isLoggedIn}`);
				if (!isLoggedIn) navigate('/login');
			});
	});
};

export default useVerifyLogin;
