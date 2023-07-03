/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from 'react';
import {Button, Box, Paper, Skeleton} from '@mui/material';
import {Document, Page, Font, Text, View, StyleSheet } from '@react-pdf/renderer';
import { saveAs } from 'file-saver'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
  },
  title: {
    margin: 20,
    textAlign: 'center'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
});

const ListPagePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.title}>
        <Text>이이</Text>
      </View>
      <View style={styles.title}>
        <Text>リストページ情報</Text>
      </View>
    </Page>
  </Document>
);

export default ListPagePDF;
