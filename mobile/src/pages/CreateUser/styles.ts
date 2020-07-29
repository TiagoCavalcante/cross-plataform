import { StyleSheet } from 'react-native';
import globalStyles from '../Home/styles';

const styles = StyleSheet.create({
	input: {
		...globalStyles.normalText,
		width: '100%',
		textAlign: 'left',
		borderRadius: 8,
		marginBottom: 10,
		padding: 4
	}
});

export default styles;