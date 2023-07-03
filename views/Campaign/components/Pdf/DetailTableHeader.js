/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    backgroundColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    textAlign: 'center',
    fontStyle: 'bold',
    flexGrow: 1,
  },
  description: {
    width: '100px',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
});

const columns = [
  'Username',
  'Channel URL',
  'Country',
  'Fullname',
  '#Subscribers/YT',
  '%ER',
  '%Male',
  '%Female',
  '%Male18-24',
  '%Male25-34',
  '%3Male35-44',
  '%Female13-17',
  '%Female18-24',
  '%Female25-34',
  '%Female35-44',
  '%Top1_Cntr',
  '%Top2_Cntr',
  '%Top3_Cntr',
  '%Notable Subscribers',
  'Avg likes',
  'Avg dislikes',
  'Avg views',
  'Avg comments',
  'Contacts'
];

const DetailTableHeader = () => (
  <View style={styles.container}>
    {_.map(columns, (itm, idx) => (
      <Text style={styles.description} key={idx}>{itm}</Text>  
    ))}
  </View>
);

export default DetailTableHeader;
