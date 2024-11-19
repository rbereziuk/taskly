import { StyleSheet, View } from 'react-native';
import { theme } from '../theme';
import { ShoppingListItem } from '../components/ShoppingListItem';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View style={styles.container}>
      <Link
        href="/counter"
        style={{
          textAlign: 'center',
          marginBottom: 18,
          fontSize: 24,
          color: '#00BFFF',
        }}
      >
        Go to /counter
      </Link>
      <ShoppingListItem name="Coffee" />
      <ShoppingListItem name="Apple" />
      <ShoppingListItem name="PlayStation 5" isCompleted />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: 'center',
  },
});
