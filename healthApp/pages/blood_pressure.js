import React, { useState } from 'react';
import {View,Text,StyleSheet,Alert,TextInput,TouchableOpacity,ScrollView,FlatList,ImageBackground} from 'react-native';

const BloodPressure = () => {
  const [systolic, setSystolic] = useState('');
  const [bloodPressureLog, setBloodPressureLog] = useState([]);

  const handleSubmit = async () => {
    if (!systolic) {
      Alert.alert('Error', 'Please enter systolic value');
      return;
    }

    // Currently hardcoded to [USERNAME], but can be changed to any user that is logged in. 
    const username = '[USERNAME]';

    try {
      const response = await fetch('http://xxx.xxx.x.xx:3000/update-blood-pressure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          systolic,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', `Blood pressure systolic value of ${systolic} mmHg has been logged.`);
        setSystolic('');
      } else {
        Alert.alert('Error', data.message || 'Failed to log blood pressure');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong, please try again.');
      console.error('Error:', error);
    }

    // Add to local log
    const timestamp = new Date().toLocaleString();
    const newEntry = {
      systolic,
      time: timestamp,
    };
    setBloodPressureLog([...bloodPressureLog, newEntry]);
  };
  
  // Styling for the Blood Pressure Page 
  return (
    <ImageBackground 
      source={require('../assets/background.png')} 
      style={styles.container}
      >
      <View style={styles.overlay}>
        <Text style={styles.title}>Blood Pressure Monitor</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Systolic (EX: 120)"
          value={systolic}
          onChangeText={setSystolic}
          keyboardType="numeric"
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Save Blood Pressure</Text>
        </TouchableOpacity>

        <ScrollView style={styles.logsContainer}>
          <Text style={styles.logTitle}>Blood Pressure Log</Text>
          {bloodPressureLog.length > 0 ? (
            <FlatList
              data={bloodPressureLog}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.logEntry}>
                  <Text style={styles.logText}>
                    {item.systolic} mmHg - {item.time}
                  </Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noLogText}>
              No blood pressure entries yet.
            </Text>
          )}
        </ScrollView>
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

  logsContainer: {
    width: '100%',
    marginTop: 20,
    paddingBottom: 20,
  },

  logTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  logEntry: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    width: '100%',
    backgroundColor: '#f0f8ff',
    elevation: 2,
  },

  logText: {
    fontSize: 16,
  },

  noLogText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  
});

export default BloodPressure;