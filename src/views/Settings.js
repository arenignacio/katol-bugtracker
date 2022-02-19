import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Settings = () => {
	const { user, activeBtn, setActiveBtn } = useOutletContext();

	useEffect(() => {
		if (activeBtn !== 'settings') {
			setActiveBtn('settings');
		}
	}, []);
	return <div>This is settings</div>;
};

export default Settings;
