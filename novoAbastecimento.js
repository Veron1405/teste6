import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, TextInput, Modal, TouchableWithoutFeedback, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import backgroundImage from './assets/background.png';
import adicionarImagem from './assets/adicionar.png'; // Importe a imagem adicionar.png
import NewItem from './novoAbastecimento'; // Importe o novo componente

export default function App() {
  const [items, setItems] = useState([]); // Estado para gerenciar os containers
  const [valueText, setValueText] = useState(''); // Estado para o texto do campo Valor
  const [dateText, setDateText] = useState(''); // Estado para o texto do campo Data
  const [isInputVisible, setIsInputVisible] = useState(false); // Estado para controlar a visibilidade do campo de entrada

  const addNewItem = () => {
    if (valueText.trim() && dateText.trim()) {
      setItems([...items, { value: valueText, date: dateText }]);
      setValueText(''); // Limpar o texto de entrada após adicionar o item
      setDateText(''); // Limpar o texto de entrada após adicionar o item
      setIsInputVisible(false); // Ocultar o campo de entrada após adicionar o item
    }
  };

  const handleChangeText = (index, newText, field) => {
    const updatedItems = [...items];
    updatedItems[index][field] = newText;
    setItems(updatedItems);
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
    >
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Gasolina</Text>
        <TouchableOpacity>
          <Icon name="notifications" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.belowHeaderContainer}>
        <Text style={styles.belowHeaderText}>Gastos e consumo!</Text>
        <Text style={styles.belowHeaderText2}>Últimos abastecimentos:</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.centeredContainer}>
          <View style={styles.centeredContainerText}>
            <Text style={styles.centeredText}>Valores:</Text>
            <Text style={styles.centeredText}>Data:</Text>
          </View>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {items.map((item, index) => (
              <NewItem
                key={index}
                text={`${item.value} - ${item.date}`}
                onChangeText={(newText, field) => handleChangeText(index, newText, field)}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.bottomWrapper}>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => setIsInputVisible(true)} style={styles.addButtonWrapper}>
            <View style={styles.addButtonContainer}>
              <Image source={adicionarImagem} style={styles.addButtonImage} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={isInputVisible}
        animationType="slide"
        onRequestClose={() => setIsInputVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsInputVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.textoInput1}>Valor:</Text>
              <TextInput
                style={styles.input}
                value={valueText}
                onChangeText={setValueText}
                placeholder="Valor"
                autoFocus
              />
              <Text style={styles.textoInput1}>Data:</Text>
              <TextInput
                style={styles.input}
                value={dateText}
                onChangeText={setDateText}
                placeholder="Data"
              />
              <TouchableOpacity onPress={addNewItem} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  header: {
    width: '100%',
    height: 110,
    backgroundColor: '#EFEDED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingTop: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  backIcon: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  belowHeaderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  belowHeaderText: {
    color: '#000',
    fontSize: 25,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  belowHeaderText2: {
    color: '#000',
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  centeredContainer: {
    width: '85%',
    padding: 20,
    backgroundColor: '#EFEDED',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    height: 570,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginLeft: 30,
  },
  scrollViewContent: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  addButtonContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonWrapper: {
    marginHorizontal: 10,
    marginBottom: 40,
  },
  addButtonImage: {
    width: 130, // Defina o tamanho da imagem
    height: 130,
    resizeMode: 'contain', // Para garantir que a imagem se encaixe adequadamente
  },
  bottomWrapper: {
    position: 'absolute',
    bottom: -50,
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  bottomContainer: {
    width: '85%',
    height: 140,
    padding: 20,
    backgroundColor: '#EFEDED',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo desfocado
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  centeredContainerText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  centeredText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoInput1: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

