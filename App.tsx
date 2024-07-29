import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import styles from './Styles';
import RenderItem from './RenderItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Object task
export interface Task {
  id: number;
  title: string;
  done: boolean;
  date: Date;
}

export default function App() {
  //Text input
  const [text, setText] = useState('');

  //Tasks list
  const [tasks, setTasks] = useState<Task[]>([]);

  //State to manage last id
  const [lastId, setLastId] = useState(0);

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
        const localTasks = JSON.parse(value);
        const highestId = Math.max(...localTasks.map(task => task.id));
        setTasks(localTasks);
        setLastId(highestId || 0);
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
      id: lastId + 1,
      title: text,
      done: false,
      date: new Date(),
    };

    tmp.push(newTask);
    setTasks(tmp);
    setLastId(lastId + 1);
    storeData(tmp);
    setText('');
  };

  //Change done attribute
  const markDone = (task: Task) => {
    const tmp = [...tasks];
    const index = tmp.findIndex(e => e.id === task.id);
    const todo = tasks[index];
    todo.done = !todo.done;
    setTasks(tmp);
    storeData(tmp);
  };

  //Remove task from list
  const removeFunction = (task: Task) => {
    const tmp = [...tasks];
    const index = tmp.findIndex(e => e.id === task.id);
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
