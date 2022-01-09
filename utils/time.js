const time = (input) => {
	let output = 1000;

	if (!['object', 'function'].includes(typeof input)) {
		output = input * 1000;
	}

	if (typeof input === 'object') {
		const { days, hours, minutes, seconds } = input;
		console.log(input);

		if (seconds && seconds !== 0) {
			output += seconds * 1000;
		}

		if (minutes && minutes !== 0) {
			output += minutes * 60 * 1000;
		}

		if (hours && hours !== 0) {
			output += hours * 60 * 60 * 1000;
		}

		if (days && days !== 0) {
			output += days * 24 * 60 * 60 * 1000;
		}

		return output;
	}

	return output;
};

module.exports = time;
