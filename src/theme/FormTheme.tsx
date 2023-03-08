import {StyleSheet} from 'react-native';

export const userForm = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    height: 600,
    marginBottom: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 25,
  },
  inputText: {
    color: 'white',
    fontSize: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  registerButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  registerButtoncontainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
});

export const ActivityForm = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    height: 600,
    marginBottom: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 25,
  },
  inputText: {
    color: 'black',
    fontSize: 20,
    flex: 1,
  },
  inputContainer: {
    height: 50,
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
});
