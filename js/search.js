import { items } from './data.js';

const searchItems = (inputValue) => {
	const pattern = inputValue.toLowerCase().trim().replace(/\s+/g, '.*');

	const regex = new RegExp(pattern, 'i');

	const filteredData = items
		.filter((item) => regex.test(item.name))
		.slice(0, 7);

	return filteredData.sort((a, b) => a.name.localeCompare(b.name));
};

export const findItems = (inputValue) => {
	const foundItems = searchItems(inputValue);
	return foundItems;
};
