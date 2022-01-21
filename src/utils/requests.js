const requests = (baseURL) => {
	const update = async (subURL, values) => {
		console.log('attempting to update data..');
		const data = await fetch(`${baseURL}/${subURL}`, {
			method: 'Put',
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
			body: JSON.stringify(values),
		});

		if (data.ok) {
			console.log('data sucessfully updated');
		} else {
			console.log('data update failed');
		}
	};

	return {
		update,
	};
};

export default requests;
