import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, AsyncStorage} from 'react-native';

export  default function App() {

    const [estado, setEstado] = useState('leitura');
    const [anotacao, setAnotacao] = useState('');

    useEffect(() => {
     
      (async () => {
          try{
              const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
              setAnotacao(anotacaoLeitura);
          }catch(error){

          }
      })();
    },[])  //Quando inicializar nosso app queremos que leia a key anotação.

    setData = async() => {
      try{
          await AsyncStorage.setItem('anotacao',anotacao);
      }catch(error){

    }
    alert('Sua anotação foi salva!');
  }

    function atualizarText(){
        setEstado('leitura');
        setData();
    }
 
      if(estado == 'leitura'){
      return(
          <View style={{flex:1}}>
            <StatusBar hidden />
            
           <View><Text style={styles.Titulo}>Grimório</Text></View>

           {
            (anotacao != '')
              ?
           <View><Text style={styles.Anotar}>{anotacao}</Text></View>
              :
            <View style={{opacity:0.3}}><Text style={styles.Anotar}>Nenhuma Anotação Encontrada :(</Text></View>
          }

           <TouchableOpacity onPress={() => setEstado('atualizando')} style={styles.Acrescentar}>
             {
               (anotacao == "")
               ?
             <Text style={styles.AcrescentarTexto}>+</Text>
               :
             <Text style={{fontSize:12,color:'white',textAlign:'center',top:15.5}}>Editar</Text>
             }
             </TouchableOpacity>
          </View>
        )
      }else if(estado == 'atualizando'){
        return(
        <View style={{flex:1}}>
              <StatusBar hidden />
                <View><Text style={styles.Titulo}>Grimório</Text></View>

                <TextInput autoFocus={true} onChangeText={(text)=>setAnotacao(text)} style={{padding:10,height:900000, textAlignVertical:'top'}} multiline={true} numberOfLines={5} value={anotacao}></TextInput>

                <TouchableOpacity onPress={() => atualizarText()} style={styles.btnSalvar}>
                  <Text style={styles.btnText}>Salvar</Text>
                  </TouchableOpacity>
      </View>
      );
      }
}


const styles = StyleSheet.create({
      Titulo:{
        width:'100%',
        textAlign:'center',
        backgroundColor:'purple',
        padding:20,
        fontSize:30,
        color:'white',
        fontFamily:'Roboto'
        
      },
      Acrescentar:{
        position:'absolute',
        right:20,
        bottom:20,
        width:50,
        height:50,
        backgroundColor:'purple',
        borderRadius:25
        
      },
      AcrescentarTexto:{
        color:'white',
        position:'relative',
        textAlign:'center',
        fontSize:30,
        top:5.5
        

      },
      Anotar:{
        fontSize:15,
        padding:8
      },

      btnSalvar:{
        position:'absolute',
        right:20,
        bottom:20,
        width:100,
        height:50,
        backgroundColor:'purple',
        borderRadius:20
        
      },
      btnText:{
        color:'white',
        position:'relative',
        textAlign:'center',
        fontSize:30,
        top:5.5
      }

})





