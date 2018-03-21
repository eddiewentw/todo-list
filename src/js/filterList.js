import config from './appConfig';

const filterList = (list) => list.filter((todo) => config.filter.completed || !todo.completed)
	.filter((todo) => config.filter.uncompleted || todo.completed);

export default filterList;
