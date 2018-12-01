var mod = {};

mod.and = function(use_chain, input) {
	if(use_chain !== true) {
		input = use_chain;
		use_chain = false;
	}

	var output = input;
	if(output.length == 2) {
		output = output[0] + ' and ' + output[1];
	} else {
		output = output.join(', ');
		output = output.replace(/(.*)(,\s)(.*?)$/, '$1, and $3');
	}

	if(use_chain) {
		return chain(output);
	} else {
		return output;
	}
}

mod.camelCase = function(use_chain, input, first_word_capitalized) {
	if(use_chain !== true) {
		first_word_capitalized = input;
		if(first_word_capitalized !== false) {
			first_word_capitalized = true;
		}
		input = use_chain;
		use_chain = false;
	}

	var i;
	var parts = input.replace(/\s+/g, ' ').split(' ');
	var output = '';
	for(i = 0; i < parts.length; i++) {
		if(i == 0 && !first_word_capitalized) {
			parts[i] = parts[i].charAt(0).toLowerCase() + parts[i].slice(1);
		} else {
			parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
		}
	}
	output = parts.join('');

	if(use_chain) {
		return chain(output);
	} else {
		return output;
	}
}

mod.money = function(use_chain, input, whole, symbol) {
	if(use_chain !== true) {
		symbol = whole;
		whole = input;
		input = use_chain;
		use_chain = false;
	}
	if(!symbol) {
		symbol = '$';
	}

	var negative = false;
	var output = input;
	var parts;
	var temp;
	var i;

	if(typeof output == 'string') {
		output = output.replace(/,/g, '');
		if(output.indexOf(symbol) === 0) {
			output = output.slice(1);
		}
	}

	if(output < 0) {
		negative = true;
	}

	if(whole) {
		output = Number(output).toFixed(0);
	} else {
		output = Number(output).toFixed(2);
	}
	if(isNaN(output)) {
		output = new Error('Input is not a number that can be formatted.');
	} else {
		// Strip negative
		output = output.replace('-', '');

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

		if(negative) {
			output = '-' + output;
		}

		output = symbol + output;
	}

	if(use_chain) {
		return chain(output);
	} else {
		return output;
	}
}

mod.number = function(use_chain, input, whole) {
	if(use_chain !== true) {
		whole = input;
		input = use_chain;
		use_chain = false;
	}

	var negative = false;
	var output = input;
	var parts;
	var temp;
	var i;

	if(typeof output == 'string') {
		output = output.replace(/,/g, '');
	}

	if(output < 0) {
		negative = true;
	}

	if(whole) {
		output = Number(output).toFixed(0);
	} else {
		output = Number(output).toFixed(2);
	}
	if(isNaN(output)) {
		output = new Error('Input is not a number that can be formatted.');
	} else {
		// Strip negative
		output = output.replace('-', '');

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

		if(negative) {
			output = '-' + output;
		}

	}

	if(use_chain) {
		return chain(output);
	} else {
		return output;
	}
}

mod.or = function(use_chain, input) {
	if(use_chain !== true) {
		input = use_chain;
		use_chain = false;
	}

	var output = input;
	if(output.length == 2) {
		output = output[0] + ' or ' + output[1];
	} else {
		output = output.join(', ');
		output = output.replace(/(.*)(,\s)(.*?)$/, '$1, or $3');
	}

	if(use_chain) {
		return chain(output);
	} else {
		return output;
	}
}

mod.intrim = function(use_chain, input, remove, sub) {
	if(use_chain !== true) {
		sub = remove;
		remove = input;
		input = use_chain;
		use_chain = false;
	}

	var output = input;

	if(!sub) {
		sub = '';
	}

	remove = remove.replace(/([\.\\\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:\-])/g, '\\' + '$1');  
	output = output.replace(new RegExp('' + remove + '+', 'g'), sub);

	if(use_chain) {
		return chain(output);
	} else {
		return output;
	}
}

mod.ltrim = function(use_chain, input, remove, sub) {
	if(use_chain !== true) {
		sub = remove;
		remove = input;
		input = use_chain;
		use_chain = false;
	}

	// https://stackoverflow.com/a/5105195
	// . \ + * ? [ ^ ] $ ( ) { } = ! < > | : -
	var output = input;
	remove = remove.replace(/([\.\\\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:\-])/g, '\\' + '$1');  
	output = sub + output.replace(new RegExp('^' + remove + '+'), '');

	if(use_chain) {
		return chain(output);
	} else {
		return output;
	}
}

mod.rtrim = function(use_chain, input, remove, sub) {
	if(use_chain !== true) {
		sub = remove;
		remove = input;
		input = use_chain;
		use_chain = false;
	}

	// https://stackoverflow.com/a/5105195
	// . \ + * ? [ ^ ] $ ( ) { } = ! < > | : -
	var output = input;
	remove = remove.replace(/([\.\\\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:\-])/g, '\\' + '$1');  
	output = output.replace(new RegExp(remove + '+$'), '') + sub;

	if(use_chain) {
		return chain(output);
	} else {
		return output;
	}
}

mod.trim = function(use_chain, input, remove, left_sub, right_sub) {
	if(use_chain !== true) {
		right_sub = left_sub;
		left_sub = remove;
		remove = input;
		input = use_chain;
		use_chain = false;
	}

	var output = input;
	if(!left_sub) {
		left_sub = '';
	}
	if(!right_sub) {
		right_sub = left_sub;
	}
	output = mod.ltrim(output, remove, left_sub);
	output = mod.rtrim(output, remove, right_sub);

	if(use_chain) {
		return chain(output);
	} else {
		return output;
	}
}

mod.luntrim = function(use_chain, input, before) {
	if(use_chain !== true) {
		before = input;
		input = use_chain;
		use_chain = false;
	}

	var output = input;
	output = before + output;

	if(use_chain) {
		return chain(output);
	} else {
		return output;
	}
}

mod.runtrim = function(use_chain, input, after) {
	if(use_chain !== true) {
		after = input;
		input = use_chain;
		use_chain = false;
	}

	var output = input;
	output = output + after;
	return output;

	if(use_chain) {
		return chain(output);
	} else {
		return output;
	}
}

mod.untrim = function(use_chain, input, before, after) {
	if(use_chain !== true) {
		after = before;
		before = input;
		input = use_chain;
		use_chain = false;
	}

	var output = input;
	output = mod.luntrim(output, before);
	output = mod.runtrim(output, after);

	if(use_chain) {
		return chain(output);
	} else {
		return output;
	}
}

mod.replace = function(use_chain, input, search, sub) {
	if(use_chain !== true) {
		sub = search;
		search = input;
		input = use_chain;
		use_chain = false;
	}

	var output = input;
	output = output.replace(search, sub);

	if(use_chain) {
		return chain(output);
	} else {
		return output;
	}
}

mod.title = function(use_chain, input) {
	if(use_chain !== true) {
		input = use_chain;
		use_chain = false;
	}

	var i;
	var parts = input.replace(/\s+/g, ' ').split(' ');
	var output = '';
	for(i = 0; i < parts.length; i++) {
		parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
	}
	output = parts.join(' ');

	if(use_chain) {
		return chain(output);
	} else {
		return output;
	}
}


mod.underscore = function(use_chain, input) {
	if(use_chain !== true) {
		input = use_chain;
		use_chain = false;
	}

	var output = input;
	output = output.replace(/\s+/g, '_');

	if(use_chain) {
		return chain(output);
	} else {
		return output;
	}
}


mod.start = function(input) {
	return chain(input);
}
mod.begin = mod.start;

mod.end = function(input) {
	return input;
}
mod.finish = mod.end;

function chain(input) {
	var output = {};

	output.camelCase = mod.camelCase.bind(null, true, input);
	output.end = mod.end.bind(null, input);
	output.intrim = mod.intrim.bind(null, true, input);
	output.ltrim = mod.ltrim.bind(null, true, input);
	output.luntrim = mod.luntrim.bind(null, true, input);
	output.money = mod.money.bind(null, true, input);
	output.replace = mod.replace.bind(null, true, input);
	output.rtrim = mod.rtrim.bind(null, true, input);
	output.runtrim = mod.runtrim.bind(null, true, input);
	output.title = mod.title.bind(null, true, input);
	output.trim = mod.trim.bind(null, true, input);
	output.underscore = mod.underscore.bind(null, true, input);
	output.untrim = mod.untrim.bind(null, true, input);

	return output;
}

module.exports = mod;
