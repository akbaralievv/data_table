export const columnsTable = (setSelectedRow, setOpenModal) => [
  {
    field: 'id',
    headerName: '№',
    width: 90,
    minWidth: 90,
    renderCell: (params) => <div className="idStyle">{params.value}</div>,
  },
  {
    field: 'name',
    headerName: 'Название',
    minWidth: 200,
    maxWidth: 300,
    renderCell: (params) => <div className="nameStyle">{params.value}</div>,
  },
  {
    field: 'image',
    headerName: 'Изображение',
    minWidth: 200,
    maxWidth: 300,
    sortable: false,
    filterable: false,
    hideable: false,
    renderCell: (params) => (
      <img
        src={params.value}
        alt="Movie"
        className="table-image"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedRow(params.value);
          setOpenModal(true);
        }}
      />
    ),
  },
  {
    field: 'rating',
    headerName: 'Рейтинг',
    type: 'number',
    minWidth: 200,
    maxWidth: 300,
    renderCell: (params) => <div className="raitingStyle">{params.value}</div>,
  },
  {
    field: 'release_date',
    headerName: 'Дата выхода',
    description: 'This column has a value getter and is not sortable.',
    minWidth: 200,
    maxWidth: 300,
    renderCell: (params) => <div className="dateStyle">{params.formattedValue}</div>,
    valueFormatter: (params) => {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return params?.toLocaleDateString('ru-RU', options);
    },
  },
];
