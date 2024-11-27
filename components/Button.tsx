import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const Button: React.FC<Props> = ({ title, onPress, style }) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    padding: 10,
  },
  text: {
    color: '#fff',
    textTransform: 'uppercase',
  },
});
