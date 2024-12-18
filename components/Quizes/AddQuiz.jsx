import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import  supabase  from '../../supabase';  // Ensure you have initialized supabaseClient

const AddQuiz = () => {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [correctOption, setCorrectOption] = useState('');

  const handleAddQuiz = async () => {
    if (question && option1 && option2 && option3 && correctOption) {
      // Insert quiz data into Supabase
      const { data, error } = await supabase
        .from('quizzes') // Replace with your actual table name
        .insert([
          {
            text: question,
            option1: option1,
            option2: option2,
            option3: option3,
            correct_option: correctOption, // Store correct option as a string (1, 2, or 3)
          },
        ]);

      if (error) {
        console.error('Error inserting quiz:', error.message);
        Alert.alert('Error', 'Failed to add quiz. Please try again later.');
      } else {
        Alert.alert('Quiz Added Successfully!');
        // Reset input fields
        setQuestion('');
        setOption1('');
        setOption2('');
        setOption3('');
        setCorrectOption('');
      }
    } else {
      Alert.alert('Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter question"
        value={question}
        onChangeText={setQuestion}
        style={styles.input}
      />
      <TextInput
        placeholder="Option 1"
        value={option1}
        onChangeText={setOption1}
        style={styles.input}
      />
      <TextInput
        placeholder="Option 2"
        value={option2}
        onChangeText={setOption2}
        style={styles.input}
      />
      <TextInput
        placeholder="Option 3"
        value={option3}
        onChangeText={setOption3}
        style={styles.input}
      />
      <TextInput
        placeholder="Correct Option (1, 2, or 3)"
        value={correctOption}
        onChangeText={setCorrectOption}
        style={styles.input}
      />
      <Button title="Add Quiz" onPress={handleAddQuiz} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default AddQuiz;
