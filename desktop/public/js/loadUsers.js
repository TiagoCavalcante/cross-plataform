const loadUsers = (page = 1) => {
	axios.get(`${process.env.HOST}/users?page=${page}`).then((response) => {
		document.getElementById('loading_users').style.display = 'none';

		document.getElementById('user_list').innerHTML += response.data.map(userElement).join('');

		if (response.data.length === 5)
			loadUsers(++page);
	}).catch(() =>
		document.getElementById('root').innerHTML = `
			<h2>An error occuered</h2>
			<p>Check if you have internet connection and try again later</p>
		`
	);
};