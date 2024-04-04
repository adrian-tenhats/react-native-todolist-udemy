import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Alert, ScrollView, Text, View } from 'react-native';
import { s } from "./App.style";
import { Header } from './components/Header/Header';
import { CardToDo } from './components/CardToDo/CardToDo';
import { TabBottomMenu } from './components/TabBottomMenu/TabBottomMenu';
import { useState } from 'react';
import { ButtonAdd } from './components/ButtonAdd/ButtonAdd';
import Dialog from 'react-native-dialog';
import uuid from 'react-native-uuid';

export default function App() {
  const  [todoList, setTodoList] = useState([]);
  const [selectedTabName, setSelectedTabName]= useState("all");
  const [isShowAddDialogDisplayed, setIsShowAddDialogDisplayed] = useState(false);
  const [inputValue, setInputValue] = useState("");

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

  function deleteTodo(todoToDelete){
    Alert.alert("Delete todo",
    "Are you sure you want to delete this todo?",
    [
      {text: "Delete", style:"destructive", onPress:()=> {
        setTodoList(todoList.filter(t => t.id !== todoToDelete.id));
      }},
      {text: "Cancel", style: "cancel"}
    ]
    )
  }

  function renderTodoList() {
    return getFilteredList().map((todo) => 
    <View key={todo.id} style={s.cardItem} >
      <CardToDo onLongPress={deleteTodo} onPress={updateTodo} todo={todo} /> 
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

  function addTodo(){
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setIsShowAddDialogDisplayed(false);
    setInputValue("");
  }

  
  function renderAddDialog(){
    return (
      <Dialog.Container visible={isShowAddDialogDisplayed} onBackdropPress={() => setIsShowAddDialogDisplayed(false)}>
        <Dialog.Title>Add Todo</Dialog.Title>
        <Dialog.Description>
          Choose a name for your Todo.
        </Dialog.Description>
        <Dialog.Input onChangeText={(text)=> setInputValue(text)} placeholder='Ex: Walk the dog' />
        <Dialog.Button 
          label="Cancel" 
          color="grey" 
          onPress={() => setIsShowAddDialogDisplayed(false)}
        />
        <Dialog.Button 
          disabled={inputValue.length === 0} 
          label="Save" 
          onPress={addTodo}
        />
      </Dialog.Container>
    );    
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

          <ButtonAdd onPress={() => setIsShowAddDialogDisplayed(true)}/>
          
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <TabBottomMenu 
          todoList={todoList}
          onPress={setSelectedTabName} 
          selectedTabName={selectedTabName}>
        </TabBottomMenu> 
      </View>  
      {renderAddDialog()}    
    </>
  );
}

