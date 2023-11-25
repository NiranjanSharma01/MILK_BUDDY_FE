import React, { useRef, useState } from 'react';
import { View, StyleSheet, Button, Text, TextInput } from 'react-native';

const Table = ({ dataArray, onCellChange }) => {
    
  const numRows = 11;
  const numColumns = 3;

  const renderTableCell = (value, rowIndex, colIndex) => (
    <TextInput
      style={styles.tableCell}
      value={value}
      onChangeText={(text) => onCellChange(text, rowIndex, colIndex)}
    />
  );

  return (
    <View style={styles.table}>
      {/* Table Header */}
      <View style={styles.tableRow}>
        <Text style={styles.columnHeader}>Column 1</Text>
        <Text style={styles.columnHeader}>Column 2</Text>
        <Text style={styles.columnHeader}>Column 3</Text>
      </View>

      {/* Table Data */}
      {Array.from({ length: numRows }, (_, rowIndex) => (
        <View key={rowIndex} style={styles.tableRow}>
          {Array.from({ length: numColumns }, (_, colIndex) => (
            <React.Fragment key={colIndex}>
              {renderTableCell(dataArray[rowIndex * numColumns + colIndex], rowIndex, colIndex)}
            </React.Fragment>
          ))}
        </View>
      ))}
    </View>
  );
};

const App = () => {
  const [dataArray, setDataArray] = useState(Array(11 * 3).fill(''));
  const tableRef = useRef(null);

  const onCellChange = (text, rowIndex, colIndex) => {
    const updatedArray = [...dataArray];
    updatedArray[rowIndex * 3 + colIndex] = text;
    setDataArray(updatedArray);
  };

  const fillData = () => {
    if (tableRef.current) {
      tableRef.current.fillTableWithData(dataArray);
    }
  };

  return (
    <View style={styles.container}>
      <Table dataArray={dataArray} onCellChange={onCellChange} ref={tableRef} />
      <Button title="Fill Data" onPress={fillData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  columnHeader: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    borderWidth: 1,
  },
});

export default App;
