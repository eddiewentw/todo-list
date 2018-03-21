import confirmButtonHandler from '../src/js/confirmButtonHandler';
import config from '../src/js/appConfig';
import { hideTaskEditor } from '../src/js/showTaskEditor';
import generateTodoItem from '../src/js/generateTodoItem';

jest.mock('../src/js/showTaskEditor');
jest.mock('../src/js/generateTodoItem');

afterEach(() => {
	hideTaskEditor.mockClear();
	generateTodoItem.mockClear();
});

test('There is no text in input', () => {
	document.body.innerHTML = '<input class="task" value=""/>';

	confirmButtonHandler();

	expect(hideTaskEditor).not.toHaveBeenCalled();
});

describe('Create a new todo task', () => {
	const title = 'new task';

	beforeAll(() => {
		document.body.innerHTML = `<input class='task' value='${title}'/>` +
			'<div class="task-editor"></div>' +
			'<div class="task-wrapper"></div>';
	});

	afterEach(() => {
		config.list = config.list.slice(0, 2);
		config.filter.uncompleted = true;
	});

	test('Basic', () => {
		confirmButtonHandler();

		expect(hideTaskEditor).toHaveBeenCalled();
		expect(config.list.length).toBe(3);
		expect(config.list[2].title).toBe(title);
		expect(config.list[2].id).toBe(config.list[1].id + 1);
		expect(generateTodoItem).toHaveBeenCalled();

		config.list = config.list.slice(0, 2);
	});

	test('Change todo id ordering', () => {
		config.list[0].id = 7;
		config.list[1].id = 3;

		confirmButtonHandler();

		expect(config.list[2].id).toBe(config.list[0].id + 1);
	});

	test('`uncompleted` filter is off', () => {
		config.filter.uncompleted = false;
		confirmButtonHandler();

		expect(generateTodoItem).not.toHaveBeenCalled();
	});
});

describe('Edit a todo task', () => {
	test('Change todo title', () => {
		config.edit = config.list[0].id;
		const title = 'edit task';

		document.body.innerHTML = `<input class='task' value='${title}'/>` +
			'<div class="task-editor -edit"></div>' +
			'<div class="task-wrapper">' +
				`<div class="task-item" data-id="${config.edit}">` +
					'<div class="check-flag"></div>' +
					'<div class="title"></div>' +
					'<i class="fa fa-edit"></i>' +
					'<i class="fa fa-trash"></i>' +
				'</div>' +
			'</div>';

		confirmButtonHandler();

		expect(hideTaskEditor).toHaveBeenCalled();
		expect(config.list.length).toBe(2);
		expect(config.list[0].title).toBe(title);
		expect(generateTodoItem).not.toHaveBeenCalled();
	});

	test('Does not change the title', () => {
		config.edit = config.list[0].id;
		const { title } = config.list[0];
		const querySelectorSpy = jest.spyOn(document, 'querySelector');

		document.body.innerHTML = `<input class='task' value='${title}'/>` +
			'<div class="task-editor -edit"></div>' +
			'<div class="task-wrapper">' +
				`<div class="task-item" data-id="${config.edit}">` +
					'<div class="check-flag"></div>' +
					'<div class="title"></div>' +
					'<i class="fa fa-edit"></i>' +
					'<i class="fa fa-trash"></i>' +
				'</div>' +
			'</div>';

		confirmButtonHandler();

		expect(querySelectorSpy).toHaveBeenCalledTimes(2);
	});
});
