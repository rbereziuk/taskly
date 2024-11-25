import {
  Alert,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

type Props = {
  name: string;
  isCompleted?: boolean;
  onDelete: () => void;
  onToggleComplete: () => void;
};

export function ShoppingListItem({
  name,
  isCompleted,
  onDelete,
  onToggleComplete,
}: Props) {
  const handleDelete = () => {
    Alert.alert(`Are you sure you want to delete ${name}?`, '', [
      {
        text: 'Yes',
        onPress: () => onDelete(),
        style: 'destructive',
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  return (
    <Pressable
      style={[
        styles.itemContaier,
        isCompleted && styles.completedItemContainer,
      ]}
      onPress={() => onToggleComplete()}
    >
      <Entypo name={isCompleted ? 'check' : 'circle'} size={24} color="black" />
      <Text style={[styles.itemText, isCompleted && styles.completedText]}>
        {name}
      </Text>
      <TouchableOpacity onPress={handleDelete} activeOpacity={0.5}>
        <FontAwesome
          name="close"
          size={24}
          color={isCompleted ? 'grey' : 'red'}
        />
      </TouchableOpacity>
    </Pressable>
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
    marginRight: 'auto',
    marginLeft: 15,
    flex: 1,
  },
  // Completed item styles
  completedItemContainer: {
    backgroundColor: '#eee',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
});
