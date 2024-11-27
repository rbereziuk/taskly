import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { getData } from '../../utils/storage';
import { format } from 'date-fns';
import { PersistedCountdownState, countdownStorageKey } from '../counter/index';

const fullDateFormat = `LLL d yyyy, h:mm aaa`;

export default function HistoryScreen() {
  const [countdownState, setCountdownState] =
    useState<PersistedCountdownState>();

  useEffect(() => {
    const init = async () => {
      const value = await getData(countdownStorageKey);
      setCountdownState(value);
    };
    init();
  }, []);

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      data={countdownState?.completedAtTimestamps}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>
            {format(item, fullDateFormat)}
          </Text>
        </View>
      )}
      ListEmptyComponent={
        <View>
          <Text>Your shopping list is empty</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    marginTop: 8,
  },
  listItem: {
    marginHorizontal: 8,
    marginBottom: 8,
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 12,
    borderRadius: 6,
  },
  listItemText: {
    fontSize: 18,
  },
});
