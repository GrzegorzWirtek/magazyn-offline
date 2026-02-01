const resultsDOM = document.querySelector('.search-results');
let CURRENT_LISTENER = null;

const redirectPage = (e) => {
	window.location.href = `results.html?q=${e.target.textContent}`;
};

const viewMessage = () => {
	const messageElement = document.createElement('h3');
	messageElement.classList.add('search-results__message');
	messageElement.textContent = 'BRAK W BAZIE';
	resultsDOM.appendChild(messageElement);
};

export const viewResults = (foundItems) => {
	resultsDOM.textContent = '';

	if (!foundItems.length) return viewMessage();

	foundItems.forEach(({ name }) => {
		const newElement = document.createElement('button');
		newElement.classList.add('search-results__button');
		newElement.textContent = name;
		resultsDOM.appendChild(newElement);
	});

	if (CURRENT_LISTENER) {
		resultsDOM.removeEventListener('click', CURRENT_LISTENER);
	}

	CURRENT_LISTENER = (e) => {
		redirectPage(e);
	};

	resultsDOM.addEventListener('click', CURRENT_LISTENER);
};
