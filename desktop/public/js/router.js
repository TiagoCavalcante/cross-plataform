const setRoute = (route) => {
	let router = document.getElementsByTagName('Router')[0];

	router.querySelectorAll(':scope > Route[path]').forEach((element) =>
		element.className = ''
	);

	if (route !== '')
		router.querySelector(`:scope > Route[path=${route}]`).className = 'actualRoute';
}