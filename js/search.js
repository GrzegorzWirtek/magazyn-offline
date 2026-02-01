const searchItems = (inputValue, data) => {
	const filteredData = data
		.filter((item) =>
			item.name.toLowerCase().includes(inputValue.toLowerCase()),
		)
		.slice(0, 7);

	return filteredData.sort((a, b) => a.name.localeCompare(b.name));
};

export const findOneItem = (value, data) => {
	return data.find((item) => item.name.toLowerCase() === value.toLowerCase());
};

export const getData = async () => {
	const res = await fetch('json//data.json');
	return await res.json();
};

export const findItems = async (inputValue) => {
	const data = await getData(inputValue);
	const foundItems = searchItems(inputValue, data);
	return foundItems;
};
