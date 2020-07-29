const deleteUser = (id) => {
	axios.delete(`${process.env.HOST}/user/${id}`).then(() =>
		document.getElementById(`user_${id}`).remove()
	).catch(() =>
		dialog.showErrorBox('Error', 'An error occuered, try again later')
	);
};