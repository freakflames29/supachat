/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-url-polyfill/auto';
import { NewAppScreen } from '@react-native/new-app-screen';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import supabase from './src/supabase/supaClient';
import { useEffect, useState } from 'react';
import Chat from './src/Chat';

interface TodoType {
  id: number;
  created_at: string;
  todo: string;
  status: string;
}
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [todos, setTodos] = useState<TodoType[]>();

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setTodos(data);
    }
    console.log(data);
  };

  useEffect(() => {
    console.log('SUpabase client ', supabase);
    fetchTodos();

    const channel = supabase
      .channel('todos-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'todos',
        },
        payload => {
          console.log('Changes recieved ', payload);
          fetchTodos();
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <Text style={styles.title}>Realtime Todos</Text>
      <FlatList
        style={{ flex: 1 }}
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.todo}>
            {item.todo} {item.status ? '✅' : ''}
          </Text>
        )}
      /> */}

      <Chat/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 100 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  todo: { fontSize: 18, paddingVertical: 6 },
});

export default App;
