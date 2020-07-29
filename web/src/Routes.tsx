import React, { useEffect, useState } from 'react';
import CreateUser from './pages/CreateUser';
import ListUsers from './pages/ListUsers';
import UpdateUser from './pages/UpdateUser';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

export default function Routes() {
	const [colorScheme, setColorScheme] = useState(window.localStorage.getItem('colorScheme'));
	const [data, setData] = useState<Array<any>>([]);

	const handleClick = (isChecked: boolean) => {
		if (isChecked)
			window.localStorage.setItem('colorScheme', 'dark');
		else
			window.localStorage.setItem('colorScheme', 'light');

		setColorScheme(window.localStorage.getItem('colorScheme'));
	}

	useEffect((): void => {
		(document.getElementById('isDarkMode') as HTMLInputElement).checked = (colorScheme === 'dark');
		document.body.style.backgroundColor = (colorScheme === 'light') ? '#FFF' : '#000';
	}, [colorScheme])

	return (
		<BrowserRouter>
			<nav>
				<ul>
					<li>
						<Link to='/' className='smallText'>Home</Link>
					</li>
					<li>
						<Link to='/create_user' className='smallText'>Create a user</Link>
					</li>
					<li>
						<Link to='/update_user' className='smallText'>Update a user</Link>
					</li>
					<li>
						<p className='smallText' style={{ display: 'inline', color: (colorScheme === 'light') ? '#000' : '#FFF' }}>
							Dark mode
							<input id='isDarkMode' type='checkbox' onChange={(e) => handleClick(e.target.checked)} />
						</p>
					</li>
				</ul>
			</nav>

			<Switch>
				<Route exact path='/create_user'>
					<CreateUser data={data} setData={setData} />
				</Route>
				<Route exact path='/update_user'>
					<UpdateUser data={data} setData={setData} />
				</Route>
			</Switch>

			<ListUsers data={data} setData={setData} />
		</BrowserRouter>
	);
}