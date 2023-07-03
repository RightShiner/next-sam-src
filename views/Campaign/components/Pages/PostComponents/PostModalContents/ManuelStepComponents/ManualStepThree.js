import React, { useState, useEffect, useMemo } from 'react';
import { Box, Stack, Table, TableContainer, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import {
  propertyKeys,
  mainPropertyKeys,
  audiencePropertyKeys,
} from 'constants/propertyKeys';
import { StatisticsTableBody, StatisticsTableHead } from './components';

const ManualStepThree = ({ catType, property, handleProperty }) => {
  const [columns, setColumns] = useState(1);

  // useEffect(() => {
  //   setColumns((property?.statistics ?? [{}]).length);
  // }, []);

  const handleAddColumn = () => {
    setColumns((prev) => prev + 1);
    handleProperty('statistics', [...property.statistics, { audience: {} }]);
  };

  const handleChange = (type, i, key, val) => {
    let temp = [...(property?.statistics ?? [{ audience: {} }])];
    if (type === 'main') {
      temp[i][key] = val;
    } else {
      temp[i].audience[key] = val;
    }
    handleProperty('statistics', temp);
  };

  return (
    <Stack spacing={2}>
      <Box className="table_button_container">
        <TableContainer sx={{ minWidth: 420 }}>
          <Table
            size="small"
            stickyHeader
            aria-label="a dense table sticky table"
          >
            <StatisticsTableHead
              kind="edit"
              columns={columns}
              property={property}
              handleChange={handleChange}
              title={catType === 'instagram' ? '項目' : 'パフォーマンス'}
            />
            <StatisticsTableBody
              kind="edit"
              type="main"
              columns={columns}
              property={property}
              handleChange={handleChange}
              rows={catType === 'instagram' ? propertyKeys : mainPropertyKeys}
            />
          </Table>
        </TableContainer>
        <Button className="add_item" onClick={handleAddColumn}>
          <AddIcon />
        </Button>
      </Box>
      {catType !== 'instagram' && (
        <Box className="table_button_container">
          <TableContainer sx={{ minWidth: 420 }}>
            <Table
              size="small"
              stickyHeader
              aria-label="a dense table sticky table"
            >
              <StatisticsTableHead
                title="視聴者"
                kind="edit"
                columns={columns}
                property={property}
                handleChange={handleChange}
              />
              <StatisticsTableBody
                type="audience"
                kind="edit"
                columns={columns}
                property={property}
                rows={audiencePropertyKeys}
                handleChange={handleChange}
              />
            </Table>
          </TableContainer>
          <Button className="add_item" onClick={handleAddColumn}>
            <AddIcon />
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default ManualStepThree;
