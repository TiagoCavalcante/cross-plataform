import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import Routes from './Routes';
import { StatusBar } from 'expo-status-bar';
import { AppearanceProvider, useColorScheme, Appearance } from 'react-native-appearance';

export default function App() {
	const colorScheme = useColorScheme();
	const theme = (colorScheme == 'light') ? 'dark' : 'light';
	const color = (colorScheme == 'light') ? '#FFF' : '#000';

	return (
		<AppearanceProvider>
			<NavigationContainer>
				<StatusBar backgroundColor={color} style={theme} />
				<Routes />
			</NavigationContainer>
		</AppearanceProvider>
	);
}