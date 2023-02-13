//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react';
import { Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {
  //käyttäjän laittama euroiksi muutettava arvo
  const [arvo, setArvo] = useState("");
  //käyttäjän valitsema valuutta
  const [valuutta, setValuutta]=useState("");
  //kaikki valuutat, jotka haetaan
  const [valuutat, setValuutat]=useState({});
  //käyttäjälle näkyvö vastaus
  const [vastaus, setVastaus]=useState("");

//headerin arvot
 var myHeaders = new Headers();
myHeaders.append("apikey", "mTw6DgpRbcEojx2HVDT8vvhO7gVfZIkp");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

/*fetch("https://api.apilayer.com/exchangerates_data/latest?symbols={symbols}&base={base}", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
*/

  const getValuutat = () => {  
    fetch(`https://api.apilayer.com/exchangerates_data/latest`, requestOptions)  
    .then(response => response.json())  
    .then(data => setValuutat(data.rates))  
    .catch(error => {         
        Alert.alert('Error', error);   
      });
    }
  
    //onPress muunnin
    const muunnaEuroiksi =()=>{
      const euro= valuutta * arvo;
      setVastaus(euro + " euroa")
    }

  console.log(valuutat)
  return (
    <View style={styles.container} >

      <Text style={styles.otsikko}>Euromuunnin</Text>

    <View style= {styles.haku}>

       <TextInput
      style={styles.input}
      onChangeText={text=> setArvo(text)}
      value={arvo}
      keyboardType={'numeric'}/>

      <Picker
        onChange={getValuutat}
        selectedValue={valuutta}
        onValueChange={(itemValue, itemIndex) =>
          setValuutta(itemValue)
        }>
        <Picker.Item label={Object.keys(valuutat)} value={Object.keys(valuutat)} />
      
      </Picker>
      </View>

      <Button title="Convert" color='pink' onPress={muunnaEuroiksi}/>

      <Text> {vastaus}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  haku: {
    flexDirection: 'row',
    marginTop: 30
  },
  input: {
    fontSize:18, 
    width: 200, 
    borderColor: 'black', 
    borderWidth:2
  },
  otsikko: {
    fontSize: 25, 
    fontWeight: 'bold'
  }
});