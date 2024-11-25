import { StyleSheet, TextInput, FlatList } from 'react-native';
import { useState } from 'react';
import { theme } from '../theme';
import { ShoppingListItem } from '../components/ShoppingListItem';
import { EmptyList } from '../components/EmptyList';

type ShoppingList = {
  id: number;
  name: string;
  isCompleted?: boolean;
};

export default function App() {
  const [shoppingList, setShoppingList] = useState<ShoppingList[]>([]);
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (!value) return;
    const newShoppingList = [
      {
        id: Date.now(),
        name: value,
      },
      ...shoppingList,
    ];
    setShoppingList(newShoppingList);
    setValue('');
  };

  const handleDelete = (id: number) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      data={shoppingList}
      renderItem={({ item }) => (
        <ShoppingListItem
          name={item.name}
          isCompleted={item.isCompleted}
          onDelete={() => handleDelete(item.id)}
        />
      )}
      ListHeaderComponent={
        <TextInput
          value={value}
          placeholder="E.g. Coffee"
          onChangeText={setValue}
          style={styles.textInput}
          onSubmitEditing={handleSubmit}
          blurOnSubmit={false}
        />
      }
      ListEmptyComponent={<EmptyList message="Shopping List is empy" />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorWhite,
    flex: 1,
    padding: 12,
  },
  contentContainer: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: theme.colorWhite,
  },
});
