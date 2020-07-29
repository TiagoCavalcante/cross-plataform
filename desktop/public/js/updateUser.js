const updateUser = () => {
	const idInput = document.getElementById('update_user_id_input');
	const nameInput = document.getElementById('update_user_name_input');
	const emailInput = document.getElementById('update_user_email_input');
	const numberInput = document.getElementById('update_user_number_input');

	axios.put(`${process.env.HOST}/user/${idInput.value}`, {
		name: nameInput.value,
		email: emailInput.value,
		number: numberInput.value
	}).then(() => {
		idInput.value = '';
		nameInput.value = '';
		emailInput.value = '';
		numberInput.value = '';
		
		reloadUsers();
	}).catch(() =>
		dialog.showErrorBox('Error', 'An error occuered, try again later')
	);
};