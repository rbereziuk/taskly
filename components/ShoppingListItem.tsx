import { Alert, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { theme } from '../theme';

type Props = {
  name: string;
  isCompleted?: boolean;
};

export function ShoppingListItem({ name, isCompleted }: Props) {
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
    <View
      style={[
        styles.itemContaier,
        isCompleted && styles.completedItemContainer,
      ]}
    >
      <Text style={[styles.itemText, isCompleted && styles.completedText]}>
        {name}
      </Text>
      <TouchableOpacity
        onPress={handleDelete}
        style={[styles.deleteBtn, isCompleted && styles.completedDeleteBtn]}
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
    fontWeight: '400',
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
  // Completed item styles
  completedItemContainer: {
    backgroundColor: '#eee',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  completedDeleteBtn: {
    backgroundColor: '#708090',
  },
});
