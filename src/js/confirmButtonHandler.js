import config from './appConfig';
import generateTodoItem from './generateTodoItem';
import { hideTaskEditor } from './showTaskEditor';

const editTodo = (todoId, title) => {
	const todo = config.list.filter(({ id }) => id === todoId)[0];

	if (todo.title === title) {
		return;
	}

	todo.title = title;
	document.querySelector(
		`.task-wrapper > div[data-id='${config.edit}']`,
	).firstChild.nextSibling.innerText = title;
};

const createNewTodo = (title) => {
	const newTodoData = {
		id: config.list.reduce((accumulator, value) => (
			value.id > accumulator ? value.id : accumulator
		), 0) + 1,
		title,
		completed: false,
	};

	config.list.push(newTodoData);

	if (config.filter.uncompleted) {
		document.querySelector('.task-wrapper').appendChild(generateTodoItem(newTodoData));
	}
};

const confirmButtonHandler = () => {
	const taskTitle = document.querySelector('input.task').value;

	if (!taskTitle) {
		return;
	}

	if (document.querySelector('.task-editor').classList.contains('-edit')) {
		editTodo(config.edit, taskTitle);
	} else {
		createNewTodo(taskTitle);
	}

	hideTaskEditor();
};

export default confirmButtonHandler;
