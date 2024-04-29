import React, { useEffect, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { Modal } from '@mui/material';

import { fetchData } from '../api/data';
import { columnsTable } from '../helpers/columnsTable';
import { parseDate } from '../helpers/parseDate';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '4px',
  p: '8px',
  color: 'text.primary',
};

function Table() {
  const apiRef = useGridApiRef();
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const handleSortModelChange = (sortModel) => {
    localStorage.setItem('sortModel', JSON.stringify(sortModel));
  };

  const handleFilterModelChange = (filterModel) => {
    localStorage.setItem('filterModel', JSON.stringify(filterModel));
  };

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);
  const columns = useMemo(() => columnsTable(setSelectedRow, setOpenModal), []);

  useEffect(() => {
    const savedSortModel = JSON.parse(localStorage.getItem('sortModel')) || [];
    const savedFilterModel = JSON.parse(localStorage.getItem('filterModel')) || { items: [] };

    fetchData().then((response) => {
      const parsedData = response.map((item) => ({
        ...item,
        release_date: parseDate(item.release_date),
      }));
      setData(parsedData);
      apiRef.current.autosizeColumns({
        includeHeaders: true,
        includeOutliers: true,
      });
      apiRef.current.setSortModel(savedSortModel);
      apiRef.current.setFilterModel(savedFilterModel);
    });
  }, []);

  const formattedDate = (params) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return params?.toLocaleDateString('ru-RU', options);
  };

  return (
    <Box
      sx={{ height: 800, width: '1200px', bgcolor: 'background.default', color: 'text.primary' }}>
      <DataGrid
        apiRef={apiRef}
        rows={data}
        columns={columns}
        onRowClick={handleRowClick}
        onSortModelChange={handleSortModelChange}
        onFilterModelChange={handleFilterModelChange}
        autoPageSize
        disableRowSelectionOnClick
        disableColumnSelector
        disableVirtualization
        getRowHeight={() => 'auto'}
        sx={{
          '& .MuiDataGrid-cell': {
            minHeight: 100,
            maxHeight: 300,
          },
          '& .MuiDataGrid-columnHeader': {
            fontSize: 22,
          },
          '& .MuiTablePagination-displayedRows': {
            fontSize: 20,
          },
        }}
      />
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={styleModal}>
          {selectedRow.name ? (
            <div className="head">
              <img src={selectedRow.image} alt="image" className="modal-image" />
              <div className="title">
                <h2>{selectedRow.name}</h2>
                <h3>Дата выхода: {formattedDate(selectedRow.release_date)}</h3>
                <h3>Рейтинг: {selectedRow.rating}</h3>
                <h3>Жанры: {selectedRow.jenres?.map((person) => person.name).join(', ')}</h3>
                <p className="description">{selectedRow.description}</p>
              </div>
            </div>
          ) : (
            <img src={selectedRow} alt="image" className="modal-image" />
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default Table;
