import config from './appConfig';
import generateTodoItem from './generateTodoItem';
import filterList from './filterList';

const switchUncompletedStatus = ($flag) => {
	if (config.filter.uncompleted) {
		config.filter.uncompleted = false;
		$flag.classList.remove('-checked');

		return;
	}

	config.filter.uncompleted = true;
	$flag.classList.add('-checked');
};

const switchCompletedStatus = ($flag) => {
	if (config.filter.completed) {
		config.filter.completed = false;
		$flag.classList.remove('-checked');

		return;
	}

	config.filter.completed = true;
	$flag.classList.add('-checked');
};

const filterHandler = (type, $filter) => {
	if (type === 'completed') {
		switchCompletedStatus($filter.firstChild);
	} else {
		switchUncompletedStatus($filter.firstChild);
	}

	const $taskWrapper = document.querySelector('.task-wrapper');

	$taskWrapper.innerHTML = '';
	filterList(config.list).forEach((todo) => {
		$taskWrapper.appendChild(generateTodoItem(todo));
	});
};

export default filterHandler;
