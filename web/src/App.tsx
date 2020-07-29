import React from 'react';
import Routes from './Routes';
import './styles.scss';

export default function App() {
	if (window.localStorage.getItem('colorScheme') == null)
		window.localStorage.setItem('colorScheme', 'dark');

	return (
		<Routes />
	);
}