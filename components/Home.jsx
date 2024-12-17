import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import supabase from '../supabase'; // Supabase configuration file

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newEnrolled, setNewEnrolled] = useState('false');
  const [editingId, setEditingId] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEnrolled, setUpdatedEnrolled] = useState('false');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('ProjectNative').select('*');
        if (error) throw error;
        setProjects(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!newName) return Alert.alert('Error', 'Name is required');
    try {
      const enrolledValue = newEnrolled === 'true';
      const { data, error } = await supabase.from('ProjectNative').insert([{ name: newName, enrolled: enrolledValue }]);
      if (error) throw error;
      setProjects([...projects, ...data]);
      setNewName('');
      setNewEnrolled('false');
    } catch (error) {
      console.error('Error adding project:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from('ProjectNative').delete().eq('id', id);
      if (error) throw error;
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error.message);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setUpdatedName(project.name);
    setUpdatedEnrolled(project.enrolled.toString());
  };

  const handleUpdate = async () => {
    if (!updatedName) return Alert.alert('Error', 'Name is required');
    try {
      const enrolledValue = updatedEnrolled === 'true';
  
      // Log to ensure the ID and values are correct
      console.log('Editing ID:', editingId, 'Updated Name:', updatedName, 'Enrolled:', enrolledValue);
  
      // Perform the update query
      const { error } = await supabase
        .from('ProjectNative')
        .update({ name: updatedName, enrolled: enrolledValue })
        .eq('id', editingId);
  
      if (error) throw error;
  
      // Update the local state
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === editingId
            ? { ...project, name: updatedName, enrolled: enrolledValue }
            : project
        )
      );
  
      // Reset editing state
      setEditingId(null);
      setUpdatedName('');
      setUpdatedEnrolled('false');
    } catch (error) {
      console.error('Error updating project:', error.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects</Text>

      <FlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.projectName}>{item.name}</Text>
              <Picker
                selectedValue={item.enrolled ? 'true' : 'false'}
                style={styles.dropdown}
                enabled={false} // Disable dropdown for viewing
              >
                <Picker.Item label="True" value="true" />
                <Picker.Item label="False" value="false" />
              </Picker>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleEdit(item)} style={styles.button}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.buttonDelete}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Add New Project */}
      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          placeholder="Project Name"
          value={newName}
          onChangeText={setNewName}
        />
        <Picker selectedValue={newEnrolled} style={styles.dropdown} onValueChange={(value) => setNewEnrolled(value)}>
          <Picker.Item label="False" value="false" />
          <Picker.Item label="True" value="true" />
        </Picker>
        <Button title="Add Project" onPress={handleAdd} />
      </View>

      {/* Edit Project */}
      {editingId && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Updated Name"
            value={updatedName}
            onChangeText={setUpdatedName}
          />
          <Picker
            selectedValue={updatedEnrolled}
            style={styles.dropdown}
            onValueChange={(value) => setUpdatedEnrolled(value)}
          >
            <Picker.Item label="False" value="false" />
            <Picker.Item label="True" value="true" />
          </Picker>
          <Button title="Update Project" onPress={handleUpdate} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  card: { backgroundColor: '#fff', padding: 10, marginVertical: 5, borderRadius: 8, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  projectName: { fontSize: 18, fontWeight: 'bold', flex: 1 },
  dropdown: { height: 30, width: 100, marginHorizontal: 10 },
  buttonContainer: { flexDirection: 'row' },
  button: { backgroundColor: '#4CAF50', padding: 5, marginHorizontal: 5, borderRadius: 5 },
  buttonDelete: { backgroundColor: '#F44336', padding: 5, borderRadius: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  addContainer: { marginTop: 10 },
  editContainer: { marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 5, borderRadius: 5 },
});
