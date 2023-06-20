import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Card = ({ imageSource, title, description }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    marginTop: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 220,
    marginBottom: 8,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Card;
