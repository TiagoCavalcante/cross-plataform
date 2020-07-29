import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import api from '../../api';
import globalStyles from '../Home/styles';
import styles from './styles';
import { ColorSchemeName, useColorScheme } from 'react-native-appearance';

export default function CreateUser() {
	const colorScheme: ColorSchemeName = useColorScheme();
	const autoThemeColor: string = (colorScheme == 'light') ? '#FFF' : '#000';

	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [number, setNumber] = useState('');
	const [userNameBorderStyle, setUserNameBorderStyle] = useState(StyleSheet.create({ border: {} }));
	const [emailBorderStyle, setEmailBorderStyle] = useState(StyleSheet.create({ border: {} }));
	const [numberBorderStyle, setNumberBorderStyle] = useState(StyleSheet.create({ border: {} }));

	const createUser = async (): Promise<void> => {
		const styleSheet = StyleSheet.create({
			border: {
				borderColor: '#F00',
				borderWidth: 3
			}
		});

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

		if (userName !== '' && email !== '' && number !== '') {
			try {
				await api.post('user', {
					name: userName,
					email,
					number: parseInt(number)
				});

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
			<TextInput style={[styles.input, { backgroundColor: (colorScheme == 'light') ? '#CCC' : '#FFF' }, userNameBorderStyle.border]} onChangeText={setUserName} maxLength={32} placeholder='User name' placeholderTextColor='#777' value={userName} />

			<TextInput style={[styles.input, { backgroundColor: (colorScheme == 'light') ? '#CCC' : '#FFF' }, emailBorderStyle.border]} onChangeText={setEmail} maxLength={64} placeholder='email@email.com' placeholderTextColor='#777' autoCompleteType='email' textContentType='emailAddress' value={email} keyboardType='email-address' autoCapitalize='none' />

			<TextInput style={[styles.input, { backgroundColor: (colorScheme == 'light') ? '#CCC' : '#FFF' }, numberBorderStyle.border]} onChangeText={setNumber} maxLength={14} placeholder='999999999' placeholderTextColor='#777' textContentType='telephoneNumber' value={number} keyboardType='number-pad' />

			<TouchableOpacity style={[globalStyles.button, { backgroundColor: '#0F0', marginTop: 10 }]} onPress={createUser}>
				<Text style={globalStyles.bigText}>
					Create user
				</Text>
			</TouchableOpacity>
		</View>
	);
}