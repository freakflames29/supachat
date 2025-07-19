import { View, Text, Button, TextInput, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import supabase from './supabase/supaClient';

const Chat = () => {
  const [userId, setUserId] = useState<number>(1);
  const [msg, setMsg] = useState([]);

  const [sender, setSender] = useState<number>();
  const [reciever, setReciever] = useState<number>();

  const [enteredMsg, setEnteredMsg] = useState<string>('');

  const becomeSourav = () => {
    console.log("You are sourav")
    setSender(1);
    setReciever(2);
    setUserId(1);
  };
  const becomeKrishna = () => {
    console.log("Yu are krishn")
    setSender(2);
    setReciever(1);
    setUserId(2);
  };

  const fetchMsg = async () => {
    const { data, error } = await supabase.from('msg').select('*');

    if (data) {
      setMsg(data);
    }
    if (error) {
      console.log('Error in msg fetch', error);
    }
  };

  const sendMsg = async () => {
    
    const payload = { msg: enteredMsg, sender_id: sender, reciever_id: reciever }
    console.log("Payload >>>>",payload)
    const { data, error } = await supabase
      .from('msg')
      .insert([payload])
      .select()

      if(data){
        console.log("THe data which added to supbase ",data)
      }
    if (error) {
      console.log('Error sending msg', error);
    }
    setEnteredMsg("")
  };

  useEffect(() => {
    fetchMsg();

    const channel = supabase
      .channel('todos-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'msg',
        },
        payload => {
          console.log('Changes recieved ', payload);
          // setMsg(prev=>[...prev,payload])
          fetchMsg();
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <Button title="Become sourav" onPress={becomeSourav} />
      <Button title="Become Krihsna" onPress={becomeKrishna} />

      <Text>You are {userId === 1 ? 'Sourav' : 'Krishna'}</Text>
      <TextInput
        placeholder="Enter msg"
        style={{ backgroundColor: '#FBF5DE' }}
        value={enteredMsg}
        onChangeText={t=>setEnteredMsg(t)}
      />
      <Button title="Send" onPress={sendMsg}/>

      <FlatList
        style={{ marginVertical: 10 }}
        data={msg}
        renderItem={({ item }) => (
          <>
            <Text>
              {item.sender_id === 2 ? 'Krishna ' : 'Sourav'}: {item.msg}
            </Text>
          </>
        )}
      />
    </View>
  );
};

export default Chat;
