import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StackList } from '../../Routes';
import styles from './styles';
import { useColorScheme, ColorSchemeName } from 'react-native-appearance';

export default function Home({ navigation }: { navigation: StackNavigationProp<StackList, 'Home'>; }) {
	const colorScheme: ColorSchemeName = useColorScheme();
	const autoThemeColor: string = (colorScheme == 'light') ? '#FFF' : '#000';
	const autoThemeInverseColor: string = (colorScheme == 'light') ? '#000' : '#FFF';

	const navigateToCreateUser = (): void =>
		navigation.navigate('CreateUser');

	const navigateToListUsers = (): void =>
		navigation.navigate('ListUsers');

	const navigateToUpdateUser = (): void =>
		navigation.navigate('UpdateUser');

	return (
		<View style={[styles.container, { backgroundColor: autoThemeColor }]}>
			<TouchableOpacity style={[styles.button, { backgroundColor: autoThemeInverseColor }]} onPress={navigateToListUsers}>
				<Text style={[styles.bigText, { color: autoThemeColor }]}>
					List the users
				</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[styles.button, { backgroundColor: '#00F', marginTop: 10 }]} onPress={navigateToUpdateUser}>
				<Text style={styles.bigText}>
					Update a user
				</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[styles.button, { backgroundColor: '#0F0', marginTop: 10 }]} onPress={navigateToCreateUser}>
				<Text style={styles.bigText}>
					Create a user
				</Text>
			</TouchableOpacity>
		</View>
	);
}