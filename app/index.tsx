import { StyleSheet, TextInput, View } from 'react-native';
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
    <View style={styles.container}>
      <TextInput
        value={value}
        placeholder="E.g. Coffee"
        onChangeText={setValue}
        style={styles.textInput}
        onSubmitEditing={handleSubmit}
      />
      {shoppingList.map((item) => (
        <ShoppingListItem
          name={item.name}
          key={item.id}
          isCompleted={item.isCompleted}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorWhite,
    justifyContent: 'flex-start',
    padding: 10,
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginVertical: 15,
  },
});
