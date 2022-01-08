const parse = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

export default parse;
