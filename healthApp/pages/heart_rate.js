import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';

const HeartRate = ({ navigation }) => {
  const [userHeartRate, setUserHeartRate] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [logs, setLogs] = useState([]);

  const username = '[USERNAME]'; // Currently hardcoded to [USERNAME], but can be changed to any user that is logged in. 

  //Section that adds the heart rate, and if successful, alerts the user and updates the heart rate log.
  //If not, the user will be alerted that they need to enter a heart rate. 
  const addHeartRate = async () => {
    if (!userHeartRate) {
      Alert.alert('Error', 'Please enter your heart rate.');
      return;
    }

    try {
      const response = await fetch('http://xxx.xxx.x.xx:3000/update-heart-rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          heartRate: userHeartRate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage('Heart rate saved successfully!');
        setLogs(prevLogs => [
          ...prevLogs,
          { time: new Date().toLocaleString(), heartRate: userHeartRate },
        ]);
        Alert.alert('Success', `Heart rate of ${userHeartRate} bpm has been logged.`);
      } else {
        setResponseMessage('Error saving heart rate.');
        Alert.alert('Error', data.message || 'Failed to log heart rate');
      }
    } catch (error) {
      setResponseMessage('Network request failed');
      Alert.alert('Error', 'Something went wrong, please try again.');
      console.error('Error:', error);
    }

    setUserHeartRate('');
  };

  // Styling for the Heart Rate Monitor Page
  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Heart Rate Monitor</Text>
        
        {/* Input Section */}
        <TextInput
          style={styles.input}
          placeholder="Enter your heart rate"
          keyboardType="numeric"
          value={userHeartRate}
          onChangeText={setUserHeartRate}
        />
        
        {/* Save Button */}
        <TouchableOpacity style={styles.button} onPress={addHeartRate}>
          <Text style={styles.buttonText}>Save Heart Rate</Text>
        </TouchableOpacity>
        
        {/* Response Message */}
        {responseMessage ? (
          // If the response message contains an Error, the text will be red. Otherwise, it will be green.
          <Text style={[styles.responseText, responseMessage.includes('Error') ? styles.errorText : styles.successText]}>
            {responseMessage}
          </Text>
        ) : null}

        {/* Logs Section */}
        <ScrollView style={styles.logsContainer}>
          {logs.length > 0 ? (
            logs.map((log, index) => (
              // If the index is even, the log will be blue. If the index is odd, the log will be light blue.
              //This is done to make the logs more readable. 
              <View key={index} style={[styles.logEntry, index % 2 === 0 ? styles.evenLog : styles.oddLog]}>
                <Text style={styles.logText}>Time: {log.time}</Text>
                <Text style={styles.logText}>Heart Rate: {log.heartRate} bpm</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noLogsText}>No heart rate logs yet.</Text>
          )}
        </ScrollView>

        {/* Settings Button */}
        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
          // When the user clicks on the settings button, they will be navigated to the settings page.
          <Text style={styles.settingsButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60, 
  },
  
  overlay: {
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderRadius: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20, 
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    textAlign: 'center',
  },

  input: {
    width: '85%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  button: {
    backgroundColor: '#1e90ff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom: 20,
    elevation: 3,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },

  responseText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Roboto',
    width: '90%',
  },

  successText: {
    color: 'green',
  },

  errorText: {
    color: 'red',
  },

  logsContainer: {
    width: '100%',
    marginTop: 20,
    paddingBottom: 20,
  },

  logEntry: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    width: '100%',
    elevation: 2,
  },

  evenLog: {
    backgroundColor: '#f0f8ff',
  },

  oddLog: {
    backgroundColor: '#e6f7ff',
  },

  logText: {
    fontSize: 16,
    fontFamily: 'Roboto',
  },

  noLogsText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },

  settingsButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#FF8C00',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  settingsButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
export default HeartRate;