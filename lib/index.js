var mod = {};

mod.money = function(input, whole) {
	var output = input;
	var parts;
	var temp;
	var i;

	if(typeof output == 'string') {
		output = output.replace(/,/g, '');
		if(output.indexOf('$') === 0) {
			output = output.slice(1);
		}
	}

	if(whole) {
		output = Number(output).toFixed(0);
	} else {
		output = Number(output).toFixed(2);
	}
	if(isNaN(output)) {
		output = new Error('Input is not a number that can be formatted.');
	} else {

		// Add commas manually (purposely chose not to use Number.toLocaleString() because
		// of browser support (IE Mobile) and speed concerns (not sure if speed concerns are valid)
		// Also chose not to use a regex
		parts = output.split('.');
		if(parts.length > 1) {
			output =  '.' + parts[1];
		} else {
			output = '';
		}
		temp = parts[0];
		while(temp.length > 3) {
			output = ',' + temp.slice(-3) + output;
			temp = temp.slice(0, -3);
		}
		output = temp + output;

		output = '$' + output;
	}

	return output;
}

module.exports = mod;
