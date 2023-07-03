/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold',
  },
  description: {
    width: '100px',
    textAlign: 'left',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
});

const DetailTableRow = ({items}) => (
  <Fragment>
    {_.map(items, (item, idx) => (
      <View style={styles.row} key={idx}>
        {_.map(item, (val, idx) => (
          <Text style={styles.description} key={idx}>{val}</Text>
        ))}
      </View>
    ))}
  </Fragment>
);

export default DetailTableRow;
