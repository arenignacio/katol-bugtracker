const requests = (baseURL) => {
	const get = async (subURL) => {
		console.log('attempting to get data..');
		const res = await fetch(`${baseURL}/${subURL}`);

		if (res.ok) {
			return await res.json();
		} else {
			console.log('data fetch failed');
		}
	};

	const post = async (subURL, values) => {
		console.log('attempting to post data..');
		const data = await fetch(`${baseURL}/${subURL}`, {
			method: 'Post',
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
			body: JSON.stringify(values),
		});

		if (data.ok) {
			return await data.json();
		} else {
			console.log('data post failed');
		}
	};

	const put = async (subURL, values) => {
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
		put,
		post,
		get,
	};
};

export default requests;
