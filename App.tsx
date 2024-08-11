import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import styles from './Styles';
import RenderItem from './RenderItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import BootSplash from 'react-native-bootsplash';

//Object task
export interface Task {
  id: number;
  title: string;
  done: boolean;
  date: Date;
}

export default function App() {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, []);

  //Text input
  const [text, setText] = useState('');

  //Tasks list
  const [tasks, setTasks] = useState<Task[]>([]);

  //State to manage last id
  const [lastId, setLastId] = useState(0);

  //State to manage modal
  const [modalVisible, setModalVisible] = useState(false);

  //Task to delete
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

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
        const highestId = localTasks.length > 0 ? Math.max(...localTasks.map(task => task.id)) : 0;
        setTasks(localTasks);
        setLastId(highestId);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //Load the data at start
  useEffect(() => {
    getData();
    console.log(lastId);
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

    if (text === '') {
      Toast.show("The name of the task shouldn't be empty", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    } else {
      tmp.push(newTask);
      setTasks(tmp);
      setLastId(lastId + 1);
      storeData(tmp);
      setText('');
    }
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

  const openModal = (task: Task) => {
    setModalVisible(true);

    setTaskToDelete(task);
  };

  return (
    //Body
    <View style={styles.container}>
      {/* Modal to confirm remove item */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure that you want to remove "{taskToDelete?.title}"?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setTaskToDelete(null);
                }}>
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalConfirmButton]}
                onPress={() => {
                  removeFunction(taskToDelete!!);
                  setTaskToDelete(null);
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textWhite}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
            <RenderItem item={item} markDone={markDone} openModal={openModal} />
          )}
          data={tasks}
        />
      </View>
    </View>
  );
}
