import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Constants.statusBarHeight,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10
	},
	normalText: {
		textAlign: 'center',
		fontSize: 24
	},
	bigText: {
		textAlign: 'center',
		fontSize: 32
	},
	button: {
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 8
	}
});

export default styles;