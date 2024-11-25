import { StyleSheet, TextInput, FlatList, LayoutAnimation } from 'react-native';
import { useEffect, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { theme } from '../theme';
import { ShoppingListItem } from '../components/ShoppingListItem';
import { EmptyList } from '../components/EmptyList';
import { orderList } from '../utils/orderList';
import { getData, storeData } from '../utils/storage';

type ShoppingList = {
  id: number;
  name: string;
  lastUpdatedAt: number;
  completedAt?: number | null;
};

export default function App() {
  const [shoppingList, setShoppingList] = useState<ShoppingList[]>([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    getData().then((list) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      if (list) {
        setShoppingList(list);
      }
    });
  }, []);

  const handleSubmit = () => {
    if (!value) return;
    const newShoppingList = [
      {
        id: Date.now(),
        name: value,
        lastUpdatedAt: Date.now(),
      },
      ...shoppingList,
    ];

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList);
    storeData(newShoppingList);
    setValue('');
  };

  const handleDelete = (id: number) => {
    const updatedList = shoppingList.filter((item) => item.id !== id);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShoppingList(updatedList);
    storeData(updatedList);
  };

  const handleToggleComplete = (id: number) => {
    const updatedList = shoppingList.map((item) => {
      if (item.id === id) {
        if (item.completedAt) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        return {
          ...item,
          lastUpdatedAt: Date.now(),
          completedAt: item.completedAt ? null : Date.now(),
        };
      } else {
        return item;
      }
    });

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(updatedList);
    storeData(updatedList);
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      data={orderList(shoppingList)}
      renderItem={({ item }) => (
        <ShoppingListItem
          name={item.name}
          isCompleted={Boolean(item.completedAt)}
          onDelete={() => handleDelete(item.id)}
          onToggleComplete={() => handleToggleComplete(item.id)}
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
