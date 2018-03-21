import 'font-awesome/css/font-awesome.css';

import config from './appConfig';
import generateTodoItem from './generateTodoItem';
import showTaskEditor, { hideTaskEditor } from './showTaskEditor';
import confirmButtonHandler from './confirmButtonHandler';
import filterHandler from './filterHandler';
import filterList from './filterList';

import '../css/reset.css';
import '../css/control-bar.css';
import '../css/action-button.css';
import '../css/status-filter.css';
import '../css/task-wrapper.css';
import '../css/task-item.css';
import '../css/check-flag.css';
import '../css/window-overlay.css';
import '../css/task-editor.css';

(() => {
	const $taskWrapper = document.querySelector('.task-wrapper');

	/**
	 * render todo list
	 */
	config.list.forEach((todo) => {
		$taskWrapper.appendChild(generateTodoItem(todo));
	});

	/**
	 * add a task button
	 */
	document.querySelector('.action-button#add-task')
		.addEventListener('click', () => {
			showTaskEditor();
		});

	/**
	 * hide editor when clicking on the overlay
	 */
	document.querySelector('.window-overlay')
		.addEventListener('click', ({ target }) => {
			if (!target.classList.contains('window-overlay')) {
				return;
			}

			hideTaskEditor();
		});

	document.querySelector('.action-button#cancel')
		.addEventListener('click', () => {
			hideTaskEditor();
		});

	/**
	 * add a todo task
	 */
	document.querySelector('.action-button#confirm')
		.addEventListener('click', () => confirmButtonHandler());

	/**
	 * remove all completed tasks
	 */
	document.querySelector('.action-button#remove-completed')
		.addEventListener('click', () => {
			config.list = config.list.filter((todo) => !todo.completed);

			$taskWrapper.innerHTML = '';

			filterList(config.list).forEach((todo) => {
				$taskWrapper.appendChild(generateTodoItem(todo));
			});
		});

	/**
	 * filter options
	 */
	document.querySelector('.status-filter#uncompleted')
		.addEventListener(
			'click',
			(e) => filterHandler(
				'uncompleted',
				e.target.classList.contains('status-filter') ? e.target : e.target.parentNode,
			),
		);
	document.querySelector('.status-filter#completed')
		.addEventListener(
			'click',
			(e) => filterHandler(
				'completed',
				e.target.classList.contains('status-filter') ? e.target : e.target.parentNode,
			),
		);
})();
