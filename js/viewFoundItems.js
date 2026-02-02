const resultsDOM = document.querySelector('.search-results');
let CURRENT_LISTENER = null;

const redirectPage = () => {
	window.location.href = 'results.html';
};

const getDataAttribute = (e) => {
	const itemString = e.target.getAttribute('data-info');
	return JSON.parse(itemString);
};

const addDataToSessionStorage = (item) => {
	sessionStorage.clear();
	sessionStorage.setItem('pilot', JSON.stringify(item));
};

const viewMessage = () => {
	const messageElement = document.createElement('h3');
	messageElement.classList.add('search-results__message');
	messageElement.textContent = 'Brak w bazie';
	resultsDOM.appendChild(messageElement);
};

export const viewResults = (foundItems) => {
	resultsDOM.textContent = '';

	if (!foundItems.length) return viewMessage();

	foundItems.forEach((item) => {
		const newElement = document.createElement('button');
		newElement.classList.add('search-results__button');
		newElement.textContent = item.name;
		newElement.setAttribute('data-info', JSON.stringify(item));
		resultsDOM.appendChild(newElement);
	});

	if (CURRENT_LISTENER) {
		resultsDOM.removeEventListener('click', CURRENT_LISTENER);
	}

	CURRENT_LISTENER = (e) => {
		const item = getDataAttribute(e);
		addDataToSessionStorage(item);
		redirectPage();
	};

	resultsDOM.addEventListener('click', CURRENT_LISTENER);
};
