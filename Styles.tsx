import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  //Contaniers
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: 'white',
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollContainer: {
    marginTop: 20,
  },
  itemContainer: {
    paddingVertical: 20,
    borderBottomColor: 'slategray',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  //Text
  title: {
    fontSize: 30,
    color: 'slategray',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  textDone: {
    fontSize: 16,
    color: 'black',
    textDecorationLine: 'line-through',
  },
  textWhite: {
    fontSize: 16,
    color: 'white',
  },
  textInput: {
    width: Dimensions.get('screen').width * 0.6,
    fontSize: 16,
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
  },

  //Buttons
  addButton: {
    width: Dimensions.get('screen').width * 0.25,
    backgroundColor: 'royalblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  removeButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
  },

  //Modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.9,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    opacity: 1,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
  modalButtonContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
  },
  modalCancelButton: {
    backgroundColor: 'lightgrey',
  },
  modalConfirmButton: {
    backgroundColor: 'red',
  },
});

export default styles;
