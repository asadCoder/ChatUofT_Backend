import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  const handleSend = () => {
    const message = { text: inputText, sender: 'me', timestamp: Date.now() };
    socket.emit('message', message);
    setMessages([...messages, message]);
    setInputText('');
  };

  return (
    <View>
      <View>
        {messages.map((message, index) => (
          <Text key={index}>{`${message.sender}: ${message.text}`}</Text>
        ))}
      </View>
      <View>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message here"
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

export default ChatScreen;
