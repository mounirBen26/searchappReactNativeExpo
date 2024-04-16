import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import {useState, useEffect } from 'react'
export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    const response = fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((json) => setResults(json.products))
  },[])
  const filteredResults = results.filter(result => result.title.toLowerCase().includes(searchTerm.toLowerCase()))
  
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 18}}>Search App</Text>
      <TextInput
       style={styles.input}
        placeholder='Enter Search Term'
        value={searchTerm}
        onChangeText={(text)=>setSearchTerm(text)}
        />
      {results && <FlatList style={{width: 260}}
      data={filteredResults}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => <Text style={{fontWeight: 'bold'}}>{item.title}</Text>}
      />}

      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 5,
    padding: 8,
    margin: 10,
    width: 260,
    backgroundColor:'lightgray' 
  }
});
