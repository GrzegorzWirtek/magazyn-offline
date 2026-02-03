import { items } from './data.js';

const searchItems = (inputValue) => {
	const filteredData = items
		.filter((item) =>
			item.name.toLowerCase().includes(inputValue.toLowerCase()),
		)
		.slice(0, 7);

	return filteredData.sort((a, b) => a.name.localeCompare(b.name));
};

export const findItems = (inputValue) => {
	const foundItems = searchItems(inputValue);
	return foundItems;
};
