import generateTodoItem from '../src/js/generateTodoItem';
import config from '../src/js/appConfig';
import showTaskEditor from '../src/js/showTaskEditor';

jest.mock('../src/js/showTaskEditor');

const testId = 'test';

describe('generateTodoItem', () => {
	beforeAll(() => {
		document.body.innerHTML = '<div class="task-wrapper"></div>' +
			'<div class="_template-block">' +
				'<div class="task-item">' +
					'<div class="check-flag"></div>' +
					'<div class="title"></div>' +
					'<i class="fa fa-edit"></i>' +
					'<i class="fa fa-trash"></i>' +
				'</div>' +
			'</div>';
	});

	afterEach(() => {
		config.list = config.list.filter(({ id }) => id !== testId);
	});

	test('A uncompleted task', () => {
		const title = 'test-uncompleted';
		const todoObject = {
			id: testId,
			title,
			completed: false,
		};
		const todo = generateTodoItem(todoObject);
		config.list.push(todoObject);

		expect(
			todo.classList.contains('-completed'),
		).toBeFalsy();
		expect(
			todo.firstChild.classList.contains('-checked'),
		).toBeFalsy();
		expect(
			todo.firstChild.nextSibling.innerText,
		).toBe(title);

		document.querySelector('.task-wrapper').appendChild(todo);

		const querySelectorSpy = jest.spyOn(document, 'querySelector');

		todo.firstChild.click();

		expect(
			todo.classList.contains('-completed'),
		).toBeTruthy();
		expect(
			todo.firstChild.classList.contains('-checked'),
		).toBeTruthy();
		expect(
			config.list[2].completed,
		).toBeTruthy();

		todo.firstChild.nextSibling.nextSibling.click();

		expect(showTaskEditor).toHaveBeenCalled();

		todo.lastChild.click();

		expect(querySelectorSpy).toHaveBeenCalledTimes(1);
		expect(
			document.querySelector('.task-wrapper').innerHTML,
		).toBe('');
	});

	test('A completed task', () => {
		const title = 'test-completed';
		const todoObject = {
			id: testId,
			title,
			completed: true,
		};
		const todo = generateTodoItem(todoObject);
		config.list.push(todoObject);

		expect(
			todo.classList.contains('-completed'),
		).toBeTruthy();
		expect(
			todo.firstChild.classList.contains('-checked'),
		).toBeTruthy();
		expect(
			todo.firstChild.nextSibling.innerText,
		).toBe(title);

		todo.firstChild.click();

		expect(
			todo.classList.contains('-completed'),
		).toBeFalsy();
		expect(
			todo.firstChild.classList.contains('-checked'),
		).toBeFalsy();
		expect(
			config.list[2].completed,
		).toBeFalsy();
	});
});
