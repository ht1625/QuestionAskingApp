import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

const { width } = Dimensions.get('window');

  const cards = [
    {
      id: 1,
      text: 'Biyoloji, yaşamın yapılarını, işleyişini ve etkileşimlerini inceleyen bilim dalıdır. Canlı organizmaların anatomisi, fizyolojisi, genetikleri ve çevreleriyle olan ilişkileri biyolojinin konuları arasında yer alır.',
      branch: 'Biyoloji',
      iconName: 'heart',
    },
    {
      id: 2,
      text: 'Kimya, maddenin yapısını, bileşimini, özelliklerini ve dönüşümlerini inceleyen bilim dalıdır. Kimya, elementlerin, bileşiklerin ve karışımların özelliklerini ve tepkimelerini araştırır.',
      branch: 'Kimya',
      iconName: 'flask',
    },
    {
      id: 3,
      text: 'Fizik, doğadaki madde ve enerjinin davranışını ve etkileşimlerini inceleyen bilim dalıdır. Fizik, hareket, enerji, kuvvet, ışık, ses, elektrik ve manyetizma gibi konuları kapsar.',
      branch: 'Fizik',
      iconName: 'target',
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
        {cards.map((card, index) => (
          <View key={card.id} style={[styles.card, { zIndex: index === activeCard ? 1 : 0 }]}>
            <Icon
              name={card.iconName}
              type="feather"
              size={28}
              color={index === activeCard ? '#723CEC' : 'gray'}
              containerStyle={styles.iconContainer}
            />
            <Text style={styles.cardText}>{card.text}</Text>
            {index === activeCard && (
              <Text style={styles.branchText}>{card.branch}</Text>
            )}
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
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  cardText: {
    fontSize: 15,
  },
  branchText: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    color: '#723CEC',
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
    marginBottom: 5
  },
  activeIndicator: {
    backgroundColor: '#723CEC',
  },
});

export default SliderCard;
