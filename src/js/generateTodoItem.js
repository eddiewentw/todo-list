import config from './appConfig';
import showTaskEditor from './showTaskEditor';

const generateTodoItem = (todo) => {
	const $template = document.querySelector('._template-block > .task-item').cloneNode(true);

	if (todo.completed) {
		$template.classList.add('-completed');
		$template.firstChild.classList.add('-checked');
	}

	$template.setAttribute('data-id', todo.id);
	$template.firstChild.nextSibling.innerText = todo.title;

	/**
	 * switch status
	 */
	$template.firstChild.addEventListener('click', ({ target }) => {
		const todoObject = config.list.filter(({ id }) => id === todo.id)[0];
		todoObject.completed = !todoObject.completed;

		/**
		 * completed -> uncompleted
		 */
		if (target.classList.contains('-checked')) {
			target.classList.remove('-checked');
			target.parentNode.classList.remove('-completed');

			return;
		}

		/**
		 * uncompleted -> completed
		 */
		target.classList.add('-checked');
		target.parentNode.classList.add('-completed');
	});

	/**
	 * edit task
	 */
	$template.firstChild.nextSibling.nextSibling.addEventListener('click', () => {
		showTaskEditor('edit', todo.title);
		config.edit = todo.id;
	});

	/**
	 * delete task
	 */
	$template.lastChild.addEventListener('click', () => {
		config.list = config.list.filter(({ id }) => id !== todo.id);
		document.querySelector(`.task-wrapper > div[data-id='${todo.id}']`).remove();
	});

	return $template;
};

export default generateTodoItem;
