const reloadUsers = () => {
	// clean the users
	removeUsers();

	// show loading
	document.getElementById('loading_users').style.display = 'block';

	// load the users (hide loading by default)
	loadUsers();
};