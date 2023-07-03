/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React from 'react';
import {Document, Page, View, StyleSheet } from '@react-pdf/renderer';
import {DetailTable} from '.';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  view: {
    flexDirection: 'row',
    margin: 5
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 5,
    width: 100
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
});

const ReportPDF = ({rowData}) => (
  <Document>
    <Page size="A1" orientation="landscape" style={styles.page} wrap>
      <DetailTable datas={rowData} />
    </Page>
  </Document>
);

export default ReportPDF;
