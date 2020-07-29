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
export default function UpdateUser(props: Props) {
	const colorScheme: string = window.localStorage.getItem('colorScheme') as string;
	const autoThemeColor: string = (colorScheme === 'light') ? '#FFF' : '#000';
	const autoThemeInverseColor: string = (colorScheme === 'light') ? '#000' : '#FFF';

	const [id, setId] = useState('');
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [number, setNumber] = useState('');

	const updateUser = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		api.put(`user/${id}`, {
			name: userName,
			email,
			number
		}).then(() => {
			if (props.data.find(element => element.id === parseInt(id)))
				props.setData(props.data.map(element => (element.id === parseInt(id)) ? { id, name: userName, email, number: parseInt(number) } : element));
			else
				props.setData([...props.data, { id, name: userName, email, number: parseInt(number) }]);

			setId(() => (''));
			setUserName(() => (''));
			setEmail(() => (''));
			setNumber(() => (''));
		}).catch(() =>
			window.alert('An error occuered\nTry again later')
		);
	};

	return (
		<form onSubmit={updateUser} style={{ backgroundColor: autoThemeColor, borderBottomWidth: 3, borderBottomColor: autoThemeInverseColor, borderBottomStyle: 'solid', paddingBottom: 10, marginBottom: 10 }}>
			<input pattern='\d*' style={{ backgroundColor: (colorScheme === 'light') ? '#CCC' : '#FFF' }} onChange={(e) => { if ((e.target.validity.valid) || (e.target.value === '')) setId(e.target.value); }} placeholder='0' value={id} required />

			<input style={{ backgroundColor: (colorScheme === 'light') ? '#CCC' : '#FFF' }} onChange={(e) => setUserName(e.target.value)} maxLength={32} placeholder='User name' value={userName} required />

			<input type='email' style={{ backgroundColor: (colorScheme === 'light') ? '#CCC' : '#FFF' }} onChange={(e) => setEmail(e.target.value)} maxLength={64} placeholder='email@email.com' value={email} required />

			<input pattern='\d*' style={{ backgroundColor: (colorScheme === 'light') ? '#CCC' : '#FFF' }} maxLength={14} placeholder='999999999' value={number} onChange={(e) => { if ((e.target.validity.valid) || (e.target.value === '')) setNumber(e.target.value) }} required />

			<button type='submit' style={{ backgroundColor: '#0F0', marginTop: 10 }}>
				Update user
			</button>
		</form>
	);
}