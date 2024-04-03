import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, View } from 'react-native';
import { s } from "./App.style";
import { Header } from './components/Header/Header';
import { CardToDo } from './components/CardToDo/CardToDo';
import { TabBottomMenu } from './components/TabBottomMenu/TabBottomMenu';
import { useState } from 'react';


export default function App() {
  const  [todoList, setTodoList] = useState(
    [
      { id : 1, title:"Walk the dog", isCompleted:true },
      { id : 2, title:"Eat lunch", isCompleted:false },
      { id : 3, title:"Go jogging", isCompleted:false },
      { id : 4, title:"Walk the dog", isCompleted:true },
      { id : 5, title:"Eat lunch", isCompleted:false },
      { id : 6, title:"Go jogging", isCompleted:false }  
    ]
  );

  const [selectedTabName, setSelectedTabName]= useState("all");

  function getFilteredList(){
    switch (selectedTabName){
      case "all":
        return todoList
      case "inProgress":
        return todoList.filter((todo)=> !todo.isCompleted)
      case "done":
        return todoList.filter((todo)=> todo.isCompleted)
    }

  }

  function renderTodoList() {
    return getFilteredList().map((todo) => 
    <View key={todo.id} style={s.cardItem} >
      <CardToDo onPress={updateTodo} todo={todo} /> 
    </View>    
  );}

  function updateTodo(todo){    
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
    
    const updatedTodoList = [...todoList];
    const indexToUpdate = updatedTodoList.findIndex(
        (t) => t.id === updatedTodo.id
      );
    
    updatedTodoList[indexToUpdate] = updatedTodo;    
    setTodoList(updatedTodoList);    
  }

  return (
    <>
    <SafeAreaProvider>
      <SafeAreaView style={s.app}>
        <View style={s.header}>
          <Header /> 
        </View>
        <View style={s.body}>
          <ScrollView>{renderTodoList()}</ScrollView>
        </View>
        
      </SafeAreaView>
    </SafeAreaProvider>
    <View style={s.footer}>
      <TabBottomMenu 
        todoList={todoList}
        onPress={setSelectedTabName} 
        selectedTabName={selectedTabName}>
      </TabBottomMenu> 
    </View>
    </>
  );
}

