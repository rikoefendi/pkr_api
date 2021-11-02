export const responseFormatter = (data, status = 200, message?: any, error = false) => {
	const messages = {
		'200': 'success',
		'204': 'no content',
		'201': 'created',
		'404': 'not found',
		'422': 'entity not valid',
		'500': 'internal server error',
	}
	if (!message) {
		message = messages[status]
	}
	return {
		data,
		status,
		message,
		error,
	}
}
