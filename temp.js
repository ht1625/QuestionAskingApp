import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

const { width } = Dimensions.get('window');

const cards = [
  {
    id: 1,
    text: 'Biyoloji, yaşamın yapılarını, işleyişini ve etkileşimlerini inceleyen bilim dalıdır. Canlı organizmaların anatomisi, fizyolojisi, genetikleri ve çevreleriyle olan ilişkileri biyolojinin konuları arasında yer alır.',
  },
  {
    id: 2,
    text: 'Kimya, maddenin yapısını, bileşimini, özelliklerini ve dönüşümlerini inceleyen bilim dalıdır. Kimya, elementlerin, bileşiklerin ve karışımların özelliklerini ve tepkimelerini araştırır.',
  },
  {
    id: 3,
    text: 'Fizik, doğadaki madde ve enerjinin davranışını ve etkileşimlerini inceleyen bilim dalıdır. Fizik, hareket, enerji, kuvvet, ışık, ses, elektrik ve manyetizma gibi konuları kapsar.',
  },
];

const SliderCard = () => {
  const [activeCard, setActiveCard] = useState(0);

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const pageIndex = Math.round(contentOffset.x / width);
    setActiveCard(pageIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {cards.map((card) => (
          <View key={card.id} style={styles.card}>
            <Icon
              name="info"
              type="feather"
              size={24}
              color="white"
              containerStyle={styles.iconContainer}
            />
            <Text style={styles.cardText}>{card.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {cards.map((card, index) => (
          <View
            key={card.id}
            style={[
              styles.indicator,
              activeCard === index ? styles.activeIndicator : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    width: 350,
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  cardText: {
    fontSize: 15,
    color: 'white',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: 'gray',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#723CEC',
  },
});

export default SliderCard;
