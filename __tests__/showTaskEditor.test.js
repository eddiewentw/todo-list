import showTaskEditor, { hideTaskEditor } from '../src/js/showTaskEditor';

describe('showTaskEditor', () => {
	test('Base', () => {
		document.body.innerHTML = '<div class="window-overlay"></div>' +
			'<div class="task-editor">' +
				'<input class="task" value=""/>' +
			'</div>';

		showTaskEditor();

		expect(
			document.querySelector('.window-overlay').classList.contains('-show'),
		).toBeTruthy();
	});

	test('Edit mode', () => {
		document.body.innerHTML = '<div class="window-overlay"></div>' +
			'<div class="task-editor">' +
				'<input class="task" value=""/>' +
			'</div>';

		const title = 'this-is-todo-title';
		showTaskEditor('edit', title);

		expect(
			document.querySelector('.task-editor').classList.contains('-edit'),
		).toBeTruthy();
		expect(
			document.querySelector('input.task').value,
		).toBe(title);
	});
});

test('hideTaskEditor', () => {
	document.body.innerHTML = '<div class="window-overlay"></div>' +
		'<div class="task-editor -edit">' +
			'<input class="task" value="foo"/>' +
		'</div>';

	hideTaskEditor();

	expect(
		document.querySelector('.window-overlay').classList.contains('-show'),
	).toBeFalsy();
	expect(
		document.querySelector('.task-editor').classList.contains('-edit'),
	).toBeFalsy();
	expect(
		document.querySelector('input.task').value,
	).toBe('');
});
