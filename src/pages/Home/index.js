import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert } from 'react-native';
import Header from '../../components/Header';
import Balance from '../../components/Balance';
import Movements from '../../components/Movements';
import Actions from '../../components/Actions';

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState('0'); // Inicializado com zero
  const [expenses, setExpenses] = useState('0'); // Inicializado com zero

  const [newTransaction, setNewTransaction] = useState({
    id: '',
    label: '',
    value: '',
    date: '',
    type: 0,
  });

  const validateLabel = () => /^[a-zA-Z0-9]+$/.test(newTransaction.label);
  const validateValue = () => /^[0-9]+$/.test(newTransaction.value);
  const validateDate = () => /^\d{2}\/\d{2}\/\d{4}$/.test(newTransaction.date);

  const addTransaction = () => {
    if (!validateLabel()) {
      Alert.alert('Erro', 'O campo "Despeza" deve conter apenas letras ou números.');
      return;
    }

    if (!validateValue()) {
      Alert.alert('Erro', 'O campo "Valor" deve conter apenas números.');
      return;
    }

    if (!validateDate()) {
      Alert.alert('Erro', 'O campo "Data" deve ter o formato DD/MM/YYYY.');
      return;
    }

    const newId = transactions.length + 1;
    const newValue = parseFloat(newTransaction.value.replace(',', '.')) || 0; // Convertendo para número
    const updatedExpenses = parseFloat(expenses.replace(',', '.')) + newValue;

    setTransactions([
      ...transactions,
      {
        id: newId,
        ...newTransaction,
      },
    ]);
    setExpenses(updatedExpenses.toFixed(2)); // Limitando para 2 casas decimais
    setNewTransaction({ label: '', value: '', date: '', type: 0 });
  };

  const removeTransaction = (id) => {
    const updatedTransactions = transactions.filter((item) => item.id !== id);
    setTransactions(updatedTransactions);

    // Atualizar os gastos após remover a transação
    const updatedExpenses = updatedTransactions.reduce((total, item) => {
      return total + parseFloat(item.value.replace(',', '.')) || 0;
    }, 0);

    setExpenses(updatedExpenses.toFixed(2));
  };

  useEffect(() => {
    const totalBalance = parseFloat(balance.replace(',', '.')) - parseFloat(expenses.replace(',', '.'));

    setBalance(totalBalance.toFixed(2)); // Limitando para 2 casas decimais
  }, [expenses]);

  return (
    <View style={styles.container}>
      <Header name="Matheus Granda" />
      <Balance saldo={balance.toString()} gastos={expenses.toString()} />

      <Actions />

      <Text style={styles.title}>Últimas movimentações</Text>

      <FlatList
        style={styles.list}
        data={transactions}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Movements data={item} onRemove={() => removeTransaction(item.id)} />}
      />

      <View style={styles.addTransactionContainer}>
        <TextInput
          style={styles.input}
          placeholder="Despeza"
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
        <TextInput
          style={styles.input}
          placeholder="Data"
          value={newTransaction.date}
          onChangeText={(text) => setNewTransaction({ ...newTransaction, date: text })}
        />
        <Button title="Adicionar despeza" onPress={addTransaction} />
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
  addTransactionContainer: {
    margin: 14,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});

export default Home;
