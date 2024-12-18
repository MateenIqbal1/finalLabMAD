import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, FlatList } from 'react-native';
import  supabase  from '../../supabase'; // Import Supabase client

const AttemptQuiz = ({ navigation }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuizzes = async () => {
      const { data, error } = await supabase
        .from('quizzes') // Replace 'quizzes' with your table name if different
        .select('id, text, option1, option2, option3, correct_option');
  
      if (error) {
        console.error('Error fetching quizzes:', error.message);
        Alert.alert('Error', 'Failed to fetch quizzes. Please try again later.');
        return;
      }
  
      const formattedQuizzes = data.map((quiz) => ({
        id: quiz.id.toString(), // Ensure `id` is a string for FlatList
        question: quiz.text, // Map `text` to `question`
        options: [quiz.option1, quiz.option2, quiz.option3],
        correctOption: quiz.correct_option, // Storing correct option for future use
      }));
  
      setQuizzes(formattedQuizzes);
    };
  
    fetchQuizzes();
  }, []);
  

  const handleAnswerChange = (quizId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [quizId]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== quizzes.length) {
      Alert.alert('Incomplete!', 'Please answer all the questions before submitting.');
      return;
    }

    Alert.alert('Congratulations!', 'You have completed the quiz!', [
      {
        text: 'Go to Home',
        onPress: () => navigation.navigate('home'),
      },
    ]);
  };

  const renderQuizItem = ({ item }) => (
    <View style={styles.quizCard}>
      <Text style={styles.question}>{item.question}</Text>
      <View style={styles.separator}></View>
      <Picker
        selectedValue={answers[item.id] || ''}
        onValueChange={(value) => handleAnswerChange(item.id, value)}
        style={styles.picker}
      >
        <Picker.Item label="Select an answer" value="" />
        {item.options.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );

  if (quizzes.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading quizzes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attempt Quiz</Text>
      <FlatList
        data={quizzes}
        renderItem={renderQuizItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  quizCard: {
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
  },
});

export default AttemptQuiz;
