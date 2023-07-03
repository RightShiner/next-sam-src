/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import DetailTableHeader from './DetailTableHeader'
import DetailTableRow from './DetailTableRow'

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#bff0fd',
  },
});

const DetailTable = ({datas}) => (
  <View style={styles.tableContainer}>
    <DetailTableHeader />
    <DetailTableRow items={datas} />
  </View>
);

export default DetailTable;
