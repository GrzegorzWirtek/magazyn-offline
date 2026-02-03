import { findItems } from './search.js';
import { viewResults } from './viewFoundItems.js';

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('../service-worker.js')
			.then((registration) => {
				console.log('Service Worker zarejestrowany:', registration.scope);
			})
			.catch((error) => {
				console.error('Błąd rejestracji SW:', error);
			});
	});
}

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
