export const API_BASEURL = 'https://katol-bug-tracker.herokuapp.com';
//heroku url https://katol-bug-tracker.herokuapp.com
//local url http://localhost:8080

export const getTicket = (id = '') => {
	let uriString = API_BASEURL;

	if (id) uriString = `${API_BASEURL}/${id}`;
	return uriString;
};
