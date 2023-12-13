import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import Balance from '../../components/Balance';
import Movements from '../../components/Movements';
import Actions from '../../components/Actions';

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState('0');
  const [expenses, setExpenses] = useState('0');

  const [newTransaction, setNewTransaction] = useState({
    id: '',
    label: '',
    value: '',
    type: 0,
  });

  const validateLabel = () => /^[a-zA-Z0-9]+$/.test(newTransaction.label);
  const validateValue = () => /^[0-9]+$/.test(newTransaction.value);

  const addTransaction = () => {
    if (!validateLabel()) {
      Alert.alert('Erro', 'O campo "Despesa" deve conter apenas letras ou números.');
      return;
    }

    if (!validateValue()) {
      Alert.alert('Erro', 'O campo "Valor" deve conter apenas números.');
      return;
    }

    const newId = transactions.length + 1;
    const newValue = parseFloat(newTransaction.value.replace(',', '.')) || 0;
    const updatedExpenses = parseFloat(expenses.replace(',', '.')) + newValue;

    setTransactions([
      ...transactions,
      {
        id: newId,
        ...newTransaction,
      },
    ]);
    setExpenses(updatedExpenses.toFixed(2));
    setNewTransaction({ label: '', value: '', type: 0 });
  };

  const removeTransaction = (id) => {
    const updatedTransactions = transactions.filter((item) => item.id !== id);
    setTransactions(updatedTransactions);

    const updatedExpenses = updatedTransactions.reduce((total, item) => {
      return total + parseFloat(item.value.replace(',', '.')) || 0;
    }, 0);

    setExpenses(updatedExpenses.toFixed(2));
  };

  const editBalance = () => {
    Alert.prompt(
      'Editar Saldo',
      'Insira o novo valor do saldo:',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Salvar',
          onPress: (value) => {
            const newBalance = parseFloat(value.replace(',', '.')) || 0;
            setBalance(newBalance.toFixed(2));
          },
        },
      ],
      'plain-text',
      balance
    );
  };

  useEffect(() => {
    const totalBalance = parseFloat(balance.replace(',', '.')) - parseFloat(expenses.replace(',', '.'));

    setBalance(totalBalance.toFixed(2));
  }, [expenses]);

  return (
    <View style={styles.container}>
      <Header name="Matheus Granda" />
      <TouchableOpacity onPress={editBalance}>
        <Balance saldo={balance.toString()} gastos={expenses.toString()} />
      </TouchableOpacity>

      <Actions />

      <Text style={styles.title}>Últimas movimentações</Text>

      <FlatList
        style={styles.list}
        data={transactions}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Movements data={item} />
            <TouchableOpacity onPress={() => removeTransaction(item.id)}>
              <Text style={styles.removeButton}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.addTransactionContainer}>
        <TextInput
          style={styles.input}
          placeholder="Despesa"
          value={newTransaction.label}
          onChangeText={(text) => setNewTransaction({ ...newTransaction, label: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor"
          value={newTransaction.value}
          onChangeText={(text) => setNewTransaction({ ...newTransaction, value: text })}
          keyboardType="numeric"
        />
        <Button title="Adicionar despesa" onPress={addTransaction} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14,
  },
  list: {
    marginStart: 14,
    marginEnd: 14,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  removeButton: {
    color: 'red',
    fontWeight: 'bold',
  },
  addTransactionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 14,
  },
  input: {
    height: 40,
    width: '80%',  
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});

export default Home;
