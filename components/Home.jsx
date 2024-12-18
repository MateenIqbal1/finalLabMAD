import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Quiz App</Text>

      {/* Custom Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddQuiz')}
      >
        <Text style={styles.buttonText}>Add Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AttemptQuiz')}
      >
        <Text style={styles.buttonText}>Attempt Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('QuizReport')}
      >
        <Text style={styles.buttonText}>Your Quizzes Report</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 8,
    width: '100%',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4CAF50', // Green color
    paddingVertical: 15, // Same vertical padding for all buttons
    width: '80%', // Ensure buttons are the same width
    alignItems: 'center', // Center the text
    borderRadius: 5, // Rounded corners
    marginVertical: 10, // Space between buttons
  },
  buttonText: {
    color: '#fff', // White text
    fontSize: 16, // Consistent text size
    fontWeight: 'bold',
  },
});

export default Home;
