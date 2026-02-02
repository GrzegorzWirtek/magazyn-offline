import { findOneItem } from './search.js';
const params = new URLSearchParams(window.location.search);
const itemName = params.get('q');
const CURRENT_ID = null;

const resultsInfoDOM = document.querySelector('.info');

const viewInfo = (itemInfo) => {
	Object.entries(itemInfo).forEach(([key, value]) => {
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
	if (CURRENT_ID) {
		document.querySelector(`#${CURRENT_ID}`).classList.remove('active');
	}
	document.querySelector(`#${id}`).classList.add('active');
};

const getItemInfo = () => {
	const itemInfo = findOneItem(itemName);
	viewInfo(itemInfo);
	showLocation(itemInfo);
};

getItemInfo();
