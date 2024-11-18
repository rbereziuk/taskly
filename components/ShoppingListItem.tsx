import { Alert, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { theme } from '../theme';

type Props = {
  name: string;
};

export function ShoppingListItem({ name }: Props) {
  const handleDelete = () => {
    Alert.alert(`Are you sure you want to delete ${name}?`, '', [
      {
        text: 'Yes',
        onPress: () => console.log('Deleting...'),
        style: 'destructive',
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={styles.itemContaier}>
      <Text style={styles.itemText}>{name}</Text>
      <TouchableOpacity
        onPress={handleDelete}
        style={styles.deleteBtn}
        activeOpacity={0.8}
      >
        <Text style={styles.deleteBtnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
