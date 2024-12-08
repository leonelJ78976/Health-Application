import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation, route }) => {
  // A 2 X 6 Grid layout for the home screen.
  // Each grid is a button for the user to click on in which the user will be navigated to the corresponding page.
  /*                Example of Layout
  *                   [X] [X]
  *                   [X] [X]
  *                   [X] [X]
  */

  //Gets the username from the navigation params, (From the login page) and is displayed on the top left of the screen.
  const { username } = route.params; 

  return (
    <ImageBackground source={require('./assets/background.png')} style={styles.container}>
      {/* Greeting Section */}
      <Text style={styles.greetingText}>Hello, {username}!</Text>
      <View style={styles.gridContainer}>
        <View style={styles.row}>


          {/* HeartRate Section */}
          <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('HeartRate')}>
            <Text style={styles.gridText}>Heart Rate</Text>
          </TouchableOpacity>



          {/* BloodPressure Section */}
          <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('BloodPressure')}>
            <Text style={styles.gridText}>Blood Pressure</Text>
          </TouchableOpacity>
        </View>



        <View style={styles.row}>
          {/* Calorie Intake Section */}
          <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('CalorieTracker')}>
            <Text style={styles.gridText}>Calorie Intake</Text>
          </TouchableOpacity>



          {/* Water Intake Section */}
          <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('WaterTracker')}>
            <Text style={styles.gridText}>Water Intake</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>


          {/* Workouts Section */}
          <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Workouts')}>
            <Text style={styles.gridText}>Workouts</Text>
          </TouchableOpacity>

          {/* Summary Section */}
          <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Summary')}>
            <Text style={styles.gridText}>Summary</Text>
          </TouchableOpacity>


        </View>
      </View>



      {/* Settings Button */}
      <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.settingsButtonText}>Settings</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },

  greetingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    position: 'absolute',
    top: '10%', 
    left: 25,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  gridContainer: {
    flex: 1,
    marginTop: '25%', 
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 15,
  },

  gridItem: {
    flex: 1,
    //Sets the height of the grid items to be 1/4 of the screen height
    height: height / 4 - 20,
    backgroundColor: '#4A90E2', 
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  gridText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '600',
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

export default HomeScreen;