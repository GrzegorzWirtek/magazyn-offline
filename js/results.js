const resultsInfoDOM = document.querySelector('.info');

const viewInfo = (item) => {
	Object.entries(item).forEach(([key, value]) => {
		if (key === 'id') return;
		const h3 = document.createElement('h3');
		h3.classList.add('info__h3', `info__${key}`);
		if (key === 'location' && value.length > 3) {
			h3.classList.add('info__location--small');
		}
		h3.textContent = value;

		resultsInfoDOM.appendChild(h3);
	});
};

const showLocation = ({ id }) => {
	document.querySelector(`#${id}`).classList.add('active');
};

const getItem = () => {
	const storedItem = sessionStorage.getItem('pilot');
	if (storedItem) return JSON.parse(storedItem);
};

const init = () => {
	const item = getItem();
	viewInfo(item);
	showLocation(item);
};

init();
