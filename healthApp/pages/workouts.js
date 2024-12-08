import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ImageBackground } from 'react-native';

const Workout_Tracker = () => {

  // Stating the variables for the workout tracker section
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [workoutSelections, setWorkoutSelections] = useState({
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: '',
    Sunday: '',
  });

  //Types of workouts that user can select from
  const workouts = ['Push', 'Pull', 'Leg', 'Rest'];
  const handleWorkoutSelect = (workout) => {
    // Updates the workout selections for the user on the server / database.
    setWorkoutSelections({
      ...workoutSelections,
      [selectedDay]: workout,
    });
    setModalVisible(false);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  // Styling for the Workout Tracker Page
  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.container}>
      <Text style={styles.title}>Workout Tracker</Text>

      {/* Layout for Days */}
      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
        <View key={index} style={styles.workoutContainer}>
          <Text style={styles.dayText}>{day}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleDaySelect(day)}>
            <Text style={styles.buttonText}>
              {workoutSelections[day] ? workoutSelections[day] : 'Click to Select Workout'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Modal for Workout Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select a Workout for {selectedDay}</Text>
            {workouts.map((workout, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalButton}
                onPress={() => handleWorkoutSelect(workout)}>
                <Text style={styles.modalButtonText}>{workout}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2196F3', 
  },

  workoutContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },

  dayText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', 
  },

  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2196F3', 
    borderRadius: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },

  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },

  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 10,
    backgroundColor: '#2196F3', 
    borderRadius: 5,
    width: '100%',
  },

  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },

  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f44336', 
    borderRadius: 5,
  },

  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },

});

export default Workout_Tracker;