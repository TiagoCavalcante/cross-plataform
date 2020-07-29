import React, { useState, FormEvent } from 'react';
import api from '../../api';

type Props = {
	data: Array<{
		id: number,
		name: string,
		email: string,
		number: number;
	}>;
	setData: Function;
};

export default function CreateUser(props: Props) {
	const colorScheme: string = window.localStorage.getItem('colorScheme') as string;
	const autoThemeColor: string = (colorScheme === 'light') ? '#FFF' : '#000';
	const autoThemeInverseColor: string = (colorScheme === 'light') ? '#000' : '#FFF';

	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [number, setNumber] = useState('');

	const createUser = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		api.post('user', {
			name: userName,
			email,
			number
		}).then((response) => {
			props.setData([...props.data, { id: response.data.id, name: userName, email, number }]);

			setUserName(() => (''));
			setEmail(() => (''));
			setNumber(() => (''));
		}).catch(() =>
			window.alert('An error occuered\nTry again later')
		);
	};

	return (
		<form onSubmit={createUser} style={{ backgroundColor: autoThemeColor, borderBottomWidth: 3, borderBottomColor: autoThemeInverseColor, borderBottomStyle: 'solid', paddingBottom: 10, marginBottom: 10 }}>
			<input style={{ backgroundColor: (colorScheme === 'light') ? '#CCC' : '#FFF' }} onChange={(e) => setUserName(e.target.value)} maxLength={32} placeholder='User name' value={userName} required />

			<input type='email' style={{ backgroundColor: (colorScheme === 'light') ? '#CCC' : '#FFF' }} onChange={(e) => setEmail(e.target.value)} maxLength={64} placeholder='email@email.com' value={email} required />

			<input pattern='\d*' style={{ backgroundColor: (colorScheme === 'light') ? '#CCC' : '#FFF' }} maxLength={14} placeholder='999999999' value={number} onChange={(e) => { if ((e.target.validity.valid) || (e.target.value === '')) setNumber(e.target.value) }} required />

			<button type='submit' style={{ backgroundColor: '#0F0', marginTop: 10 }}>
				Create user
			</button>
		</form>
	);
}