const time = (input) => {
	let output = 1000;

	if (!['object', 'function'].includes(typeof input)) {
		output = input * 1000;
	}

	if (typeof input === 'object') {
		const { day, hours, minutes, seconds } = input;

		if (seconds) {
			output *= seconds;
		}

		if (minutes) {
			output = output * 60 * minutes;
		}

		return;
	}

	return output;
};

export default time;
