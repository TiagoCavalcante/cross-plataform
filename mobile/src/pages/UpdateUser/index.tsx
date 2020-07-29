import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import api from '../../api';
import globalStyles from '../Home/styles';
import styles from './styles';
import { ColorSchemeName, useColorScheme } from 'react-native-appearance';

export default function UpdateUser() {
	const colorScheme: ColorSchemeName = useColorScheme();
	const autoThemeColor: string = (colorScheme == 'light') ? '#FFF' : '#000';

	const [id, setId] = useState('');
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [number, setNumber] = useState('');
	const [idBorderStyle, setIdBorderStyle] = useState(StyleSheet.create({ border: {} }));
	const [userNameBorderStyle, setUserNameBorderStyle] = useState(StyleSheet.create({ border: {} }));
	const [emailBorderStyle, setEmailBorderStyle] = useState(StyleSheet.create({ border: {} }));
	const [numberBorderStyle, setNumberBorderStyle] = useState(StyleSheet.create({ border: {} }));

	const updateUser = async (): Promise<void> => {
		const styleSheet = StyleSheet.create({
			border: {
				borderColor: '#F00',
				borderWidth: 3
			}
		});

		if (id === '')
			setIdBorderStyle(styleSheet);
		else
			setIdBorderStyle(StyleSheet.create({ border: {} }));
		if (userName === '')
			setUserNameBorderStyle(styleSheet);
		else
			setUserNameBorderStyle(StyleSheet.create({ border: {} }));
		if (email === '')
			setEmailBorderStyle(styleSheet);
		else
			setEmailBorderStyle(StyleSheet.create({ border: {} }));
		if (number === '')
			setNumberBorderStyle(styleSheet);
		else
			setNumberBorderStyle(StyleSheet.create({ border: {} }));

		if (id !== '' && userName !== '' && email !== '' && number !== '') {
			try {
				await api.put(`user/${id}`, {
					name: userName,
					email,
					number
				});

				setId(() => (''));
				setUserName(() => (''));
				setEmail(() => (''));
				setNumber(() => (''));
			}
			catch {
				Alert.alert('An error occuered', 'Try again later')
			}
		}
	};

	return (
		<View style={[globalStyles.container, { backgroundColor: autoThemeColor }]}>
			<TextInput style={[styles.input, { backgroundColor: (colorScheme == 'light') ? '#CCC' : '#FFF' }, idBorderStyle.border]} onChangeText={setId} placeholder='0' placeholderTextColor='#777' textContentType='telephoneNumber' value={id} keyboardType='number-pad' />

			<TextInput style={[styles.input, { backgroundColor: (colorScheme == 'light') ? '#CCC' : '#FFF' }, userNameBorderStyle.border]} onChangeText={setUserName} maxLength={32} placeholder='User name' placeholderTextColor='#777' value={userName} />

			<TextInput style={[styles.input, { backgroundColor: (colorScheme == 'light') ? '#CCC' : '#FFF' }, emailBorderStyle.border]} onChangeText={setEmail} maxLength={64} placeholder='email@email.com' autoCompleteType='email' textContentType='emailAddress' placeholderTextColor='#777' value={email} keyboardType='email-address' />

			<TextInput style={[styles.input, { backgroundColor: (colorScheme == 'light') ? '#CCC' : '#FFF' }, numberBorderStyle.border]} onChangeText={setNumber} maxLength={14} placeholder='999999999' placeholderTextColor='#777' textContentType='telephoneNumber' value={number} keyboardType='number-pad' />

			<TouchableOpacity style={[globalStyles.button, { backgroundColor: '#0F0', marginTop: 10 }]} onPress={updateUser}>
				<Text style={globalStyles.bigText}>
					Create user
				</Text>
			</TouchableOpacity>
		</View>
	);
}