import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

// Forgot Credentials Page
const ForgotCredentials = () => {
  const [response, setResponse] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(true); 

  const forgotUsername = () => {
    setResponse('Your username has been sent to your registered contact.');
  };

  const forgotPassword = () => {
    setResponse('Instructions to reset your password have been sent to your registered contact.');
  };

  const handleSubmit = () => {
    if (showForgotPassword) {
      forgotPassword();
    } else {
      forgotUsername();
    }
  };

  return (
    <ImageBackground 
      source={require('./assets/background.png')} 
      style={styles.container}
    >
      <Text style={styles.title}>
        {showForgotPassword ? 'Forgot Password' : 'Forgot Username'}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {showForgotPassword ? 'Reset Password' : 'Retrieve Username'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowForgotPassword(!showForgotPassword)}>
        <Text style={styles.toggleText}>
          {showForgotPassword ? 'Need Username? Click Here' : 'Need Password? Click Here'}
        </Text>
      </TouchableOpacity>

      {response ? <Text style={styles.textMessage}>{response}</Text> : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    resizeMode: 'cover', 
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff', 
    marginBottom: 20,
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#0066cc', 
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  buttonText: {
    color: '#fff', 
    fontSize: 18,
    fontWeight: '600',
  },

  toggleText: {
    color: '#ffffff', 
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: 'underline',
  },

  textMessage: {
    marginTop: 20,
    color: '#0066cc', 
    fontSize: 16,
    textAlign: 'center',
  },
  
});

export default ForgotCredentials;