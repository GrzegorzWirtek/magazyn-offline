import { findItems } from './search.js';
import { viewResults } from './viewFoundItems.js';

const searchButton = document.querySelector('#search-button');

const handleSubmit = (e) => {
	e.preventDefault();
	const inputElement = document.getElementById('search-input');
	const inputValue = inputElement.value;
	inputElement.blur();

	if (!inputValue) return;
	inputElement.value = '';

	const foundItems = findItems(inputValue);
	viewResults(foundItems);
};

searchButton.addEventListener('click', handleSubmit);
