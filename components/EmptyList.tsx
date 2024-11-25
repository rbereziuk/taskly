import { Text, View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface Props {
  message: string;
}

export const EmptyList: React.FC<Props> = ({ message }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="playlist-edit" size={28} color="black" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 15,
    marginLeft: 8,
  },
});
