import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';

const Summary = () => {

  // This section is currently still being worked on.
  // This is the work so far for the summary page where the user will be able to see their summary for their heart rate, blood presure, calorie intake, and their water intake.
  const username = '[USERNAME]';  // Currently hardcoded to [USERNAME], but can be changed to any user that is logged in. 

  const [userData, setUserData] = useState({
    // The user data is initialized to an empty object.
    heart_rate: [],
    blood_pressure: [],
    calorie_intake: 0,
    water_intake: 0,
  });

  useEffect(() => {
    // Fetches the user data from the server to be set for the summary page.
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://xxx.xxx.x.xx:3000/users/summary`);
        
        if (!response.ok) {
          throw new Error('User not found');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  // Styling for the Summary Page
  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>User Summary</Text>

        {/* Heart Rate Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Heart Rate</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.text}>
              <Text style={styles.bold}>Heart Rate:</Text> {userData.heart_rate.join(', ')}
            </Text>
          </View>
        </View>

        {/* Blood Pressure Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Blood Pressure</Text>
          <View style={styles.dataContainer}>
            {userData.blood_pressure.map((entry, index) => (
              <Text key={index} style={styles.text}>
                <Text style={styles.bold}>{entry.systolic}/{entry.diastolic}</Text> ({entry.timestamp})
              </Text>
            ))}
          </View>
        </View>

        {/* Calorie Intake Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calorie Intake</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.text}>
              <Text style={styles.bold}>Calories Intake:</Text> {userData.calorie_intake} kcal
            </Text>
          </View>
        </View>

        {/* Water Intake Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Water Intake</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.text}>
              <Text style={styles.bold}>Water Intake:</Text> {userData.water_intake} gallons
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },

  dataContainer: {
    paddingLeft: 10,
    paddingTop: 5,
  },

  text: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 5,
  },

  bold: {
    fontWeight: 'bold',
    color: '#FF8C00', 
  },

});

export default Summary;