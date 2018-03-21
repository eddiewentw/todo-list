export default {
	NODE_ENV: process.env.NODE_ENV && JSON.stringify(process.env.NODE_ENV.toUpperCase()),
	DEV: JSON.stringify(process.env.NODE_ENV === 'dev'),
	PRODUCTION: JSON.stringify(process.env.NODE_ENV === 'production'),
};
