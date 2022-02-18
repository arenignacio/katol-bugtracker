const requests = (baseURL) => {
	const get = async (subURL) => {
		if (subURL[0] === '/') {
			console.log('/forward slash at beginning of subURL not required');
		}

		const data = await fetch(`${baseURL}/${subURL}`);

		if (data.ok) {
			return await data.json();
		} else {
			console.log('data fetch failed');
		}
	};

	const post = async (subURL, values) => {
		if (subURL[0] === '/') {
			console.log('/forward slash at beginning of subURL not required');
		}
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
		if (subURL[0] === '/') {
			console.log('/forward slash at beginning of subURL not required');
		}

		const data = await fetch(`${baseURL}/${subURL}`, {
			method: 'Put',
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
			body: JSON.stringify(values),
		});

		if (data.ok) {
			return await data.json();
		} else {
			console.log('data update failed');
		}
	};

	const del = async (subURL, body = null) => {
		console.log('attempting to update data..');
		await fetch(`${baseURL}/${subURL}`, {
			method: 'Delete',
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
			body: body ? JSON.stringify(body) : '',
		});
	};

	return {
		put,
		post,
		get,
		del,
	};
};

export default requests;
