const removeUsers = () => {
	document.querySelectorAll('li[id^=user_]').forEach((element) =>
		element.remove()
	);
};