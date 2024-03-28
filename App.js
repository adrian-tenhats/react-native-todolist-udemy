import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { s } from "./App.style";
import { Header } from './components/Header/Header';
import { CardToDo } from './components/CardToDo/CardToDo';
import { useState } from 'react';


export default function App() {
  const  [todoList, setTodoList] = useState(
    [
      { id : 1, title:"Walk the dog", isCompleted:true },
      { id : 2, title:"Eat lunch", isCompleted:false },
      { id : 3, title:"Go jogging", isCompleted:false } 
    ]
  );

  function renderTodoList() {
    return todoList.map((todo) => 
    <View key={todo.id} style={s.cardItem} >
      <CardToDo todo={todo} /> 
    </View>    
  );}

  return (
    <>
    <SafeAreaProvider>
      <SafeAreaView style={s.app}>
        <View style={s.header}>
          <Header /> 
        </View>
        <View style={s.body}>
         {renderTodoList()} 
        </View>
        
      </SafeAreaView>
    </SafeAreaProvider>
    <View style={s.footer}>
      <Text>Footer</Text> 
    </View>
    </>
  );
}

