import filterHandler from '../src/js/filterHandler';
import config from '../src/js/appConfig';
import filterList from '../src/js/filterList';
import generateTodoItem from '../src/js/generateTodoItem';

beforeEach(() => {
	config.filter.completed = true;
	config.filter.uncompleted = true;
});

jest.mock('../src/js/filterList', () => jest.fn(() => ['todo']));
jest.mock('../src/js/generateTodoItem.js');

test('Change `completed` to `off`', () => {
	document.body.innerHTML = '<div class="task-wrapper"></div>' +
		'<div class="status-filter">' +
			'<div class="check-flag -dark -checked"></div>' +
			'Completed tasks' +
		'</div>';

	filterHandler('completed', document.querySelector('.status-filter'));

	expect(filterList).toHaveBeenCalled();
	expect(generateTodoItem).toHaveBeenCalled();
	expect(config.filter.completed).toBeFalsy();
	expect(
		document.querySelector('.check-flag').classList.contains('-checked'),
	).toBeFalsy();
});

test('Change `completed` to `on`', () => {
	config.filter.completed = false;
	document.body.innerHTML = '<div class="task-wrapper"></div>' +
		'<div class="status-filter">' +
			'<div class="check-flag -dark"></div>' +
			'Completed tasks' +
		'</div>';

	filterHandler('completed', document.querySelector('.status-filter'));

	expect(filterList).toHaveBeenCalled();
	expect(generateTodoItem).toHaveBeenCalled();
	expect(config.filter.completed).toBeTruthy();
	expect(
		document.querySelector('.check-flag').classList.contains('-checked'),
	).toBeTruthy();
});

test('Change `completed` to `off`', () => {
	document.body.innerHTML = '<div class="task-wrapper"></div>' +
		'<div class="status-filter">' +
			'<div class="check-flag -dark -checked"></div>' +
			'Uncompleted tasks' +
		'</div>';

	filterHandler('uncompleted', document.querySelector('.status-filter'));

	expect(filterList).toHaveBeenCalled();
	expect(generateTodoItem).toHaveBeenCalled();
	expect(config.filter.uncompleted).toBeFalsy();
	expect(
		document.querySelector('.check-flag').classList.contains('-checked'),
	).toBeFalsy();
});

test('Change `completed` to `on`', () => {
	config.filter.uncompleted = false;
	document.body.innerHTML = '<div class="task-wrapper"></div>' +
		'<div class="status-filter">' +
			'<div class="check-flag -dark"></div>' +
			'Uncompleted tasks' +
		'</div>';

	filterHandler('uncompleted', document.querySelector('.status-filter'));

	expect(filterList).toHaveBeenCalled();
	expect(generateTodoItem).toHaveBeenCalled();
	expect(config.filter.uncompleted).toBeTruthy();
	expect(
		document.querySelector('.check-flag').classList.contains('-checked'),
	).toBeTruthy();
});
