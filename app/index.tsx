import { StyleSheet, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { theme } from '../theme';
import { ShoppingListItem } from '../components/ShoppingListItem';

type ShoppingList = {
  id: number;
  name: string;
  isCompleted?: boolean;
};

const initialList: ShoppingList[] = [
  {
    id: 1,
    name: 'Coffee',
  },
  {
    id: 2,
    name: 'Apple',
  },
  {
    id: 3,
    name: 'PlayStation 5',
    isCompleted: true,
  },
];

export default function App() {
  const [shoppingList, setShoppingList] = useState<ShoppingList[]>(initialList);
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
    >
      <TextInput
        value={value}
        placeholder="E.g. Coffee"
        onChangeText={setValue}
        style={styles.textInput}
        onSubmitEditing={handleSubmit}
        blurOnSubmit={false}
      />
      {shoppingList.map((item) => (
        <ShoppingListItem
          name={item.name}
          key={item.id}
          isCompleted={item.isCompleted}
        />
      ))}
    </ScrollView>
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
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: theme.colorWhite,
  },
});
