const createUser = () => {
	const nameInput = document.getElementById('create_user_name_input');
	const emailInput = document.getElementById('create_user_email_input');
	const numberInput = document.getElementById('create_user_number_input');

	axios.post(`${process.env.HOST}/user`, {
		name: nameInput.value,
		email: emailInput.value,
		number: numberInput.value
	}).then((response) => {
		document.getElementById('user_list').innerHTML += userElement({
			id: response.data.id,
			name: nameInput.value,
			email: emailInput.value,
			number: numberInput.value
		});

		nameInput.value = '';
		emailInput.value = '';
		numberInput.value = '';
	}).catch(() =>
		dialog.showErrorBox('Error', 'An error occuered, try again later')
	);
};