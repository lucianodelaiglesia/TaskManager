import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './Styles';
import {Task} from './App';

interface ItemProps {
  item: Task;
  markDone: (task: Task) => void;
  removeFunction: (task: Task) => void;
}

export default function RenderItem({
  item,
  markDone,
  removeFunction,
}: ItemProps) {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => markDone(item)}>
        <Text style={item.done ? styles.textDone : styles.text}>
          {item.title}
        </Text>
        <Text style={item.done ? styles.textDone : styles.text}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {item.done && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFunction(item)}>
          <Text style={styles.textWhite}>Remove</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
