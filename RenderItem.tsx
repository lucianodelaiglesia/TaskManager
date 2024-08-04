import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './Styles';
import {Task} from './App';

interface ItemProps {
  item: Task;
  markDone: (task: Task) => void;
  openModal: (task: Task) => void;
}

export default function RenderItem({
  item,
  markDone,
  openModal,
}: ItemProps) {
  return (
    <View key={item.id} style={styles.itemContainer}>
      <TouchableOpacity onPress={() => markDone(item)}>
        <Text style={item.done ? styles.textDone : styles.text}>
          {item.title}
        </Text>
        <Text style={item.done ? styles.textDone : styles.text}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
        <Text style={item.done ? styles.textDone : styles.text}>
          ID: {item.id}
        </Text>
      </TouchableOpacity>
      {item.done && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => openModal(item)}>
          <Text style={styles.textWhite}>Remove</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
