import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import styles from './Styles';
import RenderItem from './RenderItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Object task
export interface Task {
  title: string;
  done: boolean;
  date: Date;
}

export default function App() {
  //Text input
  const [text, setText] = useState('');

  //Tasks list
  const [tasks, setTasks] = useState<Task[]>([]);

  //Save persistence of data
  const storeData = async (value: Task[]) => {
    try {
      await AsyncStorage.setItem('mytasks', JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };

  //Load persistence of data
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('mytasks');
      if (value !== null) {
        const tasksLocal = JSON.parse(value);
        setTasks(tasksLocal);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //Load the data at start
  useEffect(() => {
    getData();
  }, []);

  //Add new task
  const addTask = () => {
    const tmp = [...tasks];
    const newTask = {
      title: text,
      done: false,
      date: new Date(),
    };
    tmp.push(newTask);
    setTasks(tmp);
    storeData(tmp);
    setText('');
  };

  //Change done attribute
  const markDone = (task: Task) => {
    const tmp = [...tasks];
    const index = tmp.findIndex(e => e.title === task.title);
    const todo = tasks[index];
    todo.done = !todo.done;
    setTasks(tmp);
    storeData(tmp);
  };

  //Remove task from list
  const removeFunction = (task: Task) => {
    const tmp = [...tasks];
    const index = tmp.findIndex(e => e.title === task.title);
    tmp.splice(index, 1);
    setTasks(tmp);
    storeData(tmp);
  };

  return (
    //Body
    <View style={styles.container}>
      {/* Title section */}
      <Text style={styles.title}>My tasks</Text>
      {/* Add new task section */}
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={(t: string) => setText(t)}
          placeholder="Add a new task"
          style={styles.textInput}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.textWhite}>Add</Text>
        </TouchableOpacity>
      </View>
      {/* Tasks list section */}
      <View style={styles.scrollContainer}>
        <FlatList
          renderItem={({item}) => (
            <RenderItem
              item={item}
              markDone={markDone}
              removeFunction={removeFunction}
            />
          )}
          data={tasks}
        />
      </View>
    </View>
  );
}
