import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MotiView, MotiText } from 'moti';

const statusbarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function Header({ name }) {
  const [inputName, setInputName] = useState(name);

  return (
    <View style={styles.container}>
      <MotiView
        style={styles.content}
        from={{
          translateY: -150,
          opacity: 0,
        }}
        animate={{
          translateY: 0,
          opacity: 1,
        }}
        transition={{
          type: 'timing',
          duration: 800,
          delay: 300,
        }}>
        <View style={styles.userContainer}>
          <MotiText
            style={styles.username}
            from={{
              translateX: -300,
            }}
            animate={{
              translateX: 0,
            }}
            transition={{
              type: 'timing',
              duration: 800,
              delay: 800,
            }}>
            {name}
          </MotiText>

          <TouchableOpacity activeOpacity={0.9} style={styles.buttonUser}>
            <Feather name="user" size={27} color="#FFF" />
          </TouchableOpacity>
        </View>
      </MotiView>

      {/* Adicionado o input de nome */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          value={inputName}
          onChangeText={(text) => setInputName(text)}
          placeholderTextColor="#8000ff"  // Defina a cor roxa desejada
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8000ff',
    paddingTop: statusbarHeight,
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 20,
  },
  content: {
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  buttonUser: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 44 / 2,
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#FFF',
    borderRadius: 8,
    color: '#8000ff', 
  },
});
