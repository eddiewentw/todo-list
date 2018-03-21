export const hideTaskEditor = () => {
	document.querySelector('.window-overlay').classList.remove('-show');
	document.querySelector('.task-editor').classList.remove('-edit');

	/**
	 * clear the input
	 */
	document.querySelector('input.task').value = '';
};

const showTaskEditor = (action, currentTitle) => {
	document.querySelector('.window-overlay').classList.add('-show');
	document.querySelector('.task-editor > input.task').focus();

	if (action === 'edit') {
		document.querySelector('.task-editor').classList.add('-edit');
		document.querySelector('input.task').value = currentTitle;
	}
};

export default showTaskEditor;
