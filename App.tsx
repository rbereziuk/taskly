import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from './theme';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.itemContaier}>
        <Text style={styles.itemText}>Coffee</Text>
        <TouchableOpacity
          onPress={() => console.log('Pressed')}
          style={styles.deleteBtn}
          activeOpacity={0.8}
        >
          <Text style={styles.deleteBtnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: 'center',
  },
  itemContaier: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightskyblue',
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 18,
    fontWeight: '200',
  },
  deleteBtn: {
    backgroundColor: theme.colorBlack,
    color: theme.colorWhite,
    padding: 8,
    borderRadius: 6,
  },
  deleteBtnText: {
    color: theme.colorWhite,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
