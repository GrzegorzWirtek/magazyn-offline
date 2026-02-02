import { items } from './store/data.js';

const searchItems = (inputValue) => {
	const filteredData = items
		.filter((item) =>
			item.name.toLowerCase().includes(inputValue.toLowerCase()),
		)
		.slice(0, 7);

	return filteredData.sort((a, b) => a.name.localeCompare(b.name));
};

export const findOneItem = (itemName) => {
	return items.find(
		(item) => item.name.toLowerCase() === itemName.toLowerCase(),
	);
};

export const findItems = (inputValue) => {
	const foundItems = searchItems(inputValue);
	return foundItems;
};
