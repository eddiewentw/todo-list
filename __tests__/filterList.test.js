import filterList from '../src/js/filterList';
import config from '../src/js/appConfig';

beforeEach(() => {
	config.filter.completed = true;
	config.filter.uncompleted = true;
});

test('Both are on', () => {
	expect(
		filterList(config.list).length,
	).toBe(2);
});

test('Both are off', () => {
	config.filter.completed = false;
	config.filter.uncompleted = false;

	expect(
		filterList(config.list).length,
	).toBe(0);
});

test('`completed` are off', () => {
	config.filter.completed = false;

	filterList(config.list).forEach((todo) => {
		expect(todo.completed).toBeFalsy();
	});
});

test('`uncompleted` are off', () => {
	config.filter.uncompleted = false;

	filterList(config.list).forEach((todo) => {
		expect(todo.completed).toBeTruthy();
	});
});
