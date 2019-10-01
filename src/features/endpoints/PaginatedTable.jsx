import React from 'react';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const headCells = [
  { id: 'status', numeric: false, disablePadding: false, label: 'ID' },
  { id: 'id', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'iccid', numeric: false, disablePadding: false, label: 'ICCID' },
  { id: 'msisdn', numeric: false, disablePadding: false, label: 'MSISDN' },
  { id: 'ip', numeric: false, disablePadding: false, label: 'IP' },
  { id: 'imeiLock', numeric: false, disablePadding: false, label: 'Lock' },
  { id: 'imei', numeric: false, disablePadding: false, label: 'IMEI' },
  {
    id: 'serviceProfile',
    numeric: false,
    disablePadding: false,
    label: 'Service Profile',
  },
  {
    id: 'tariffProfile',
    numeric: false,
    disablePadding: false,
    label: 'Tariff Profile',
  },
];

function PaginatedTableHeader(props) {
  const { classes, order, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow className={'desktop'}>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 10,
      })}
    >
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          Endpoints
        </Typography>
      </div>
    </Toolbar>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 320,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const EndpointTable = ({
  rows,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  count,
}) => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    const newSelected = [];
    if (selectedIndex === -1) newSelected.push(name);
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);

  const createMobileElement = (label, value) => (
    <p className={'mobile-data-row'}>
      <span className="MuiTableCell-head">{label}</span>
      <br />
      {value}
    </p>
  );

  console.log({ rows });

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className="paginated-table">
          <EnhancedTableToolbar numSelected={selected.length} />
          <div className={classes.tableWrapper}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <TablePagination
                className="mobile"
                rowsPerPageOptions={[2, 5, 10, 25]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'previous page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'next page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
              <PaginatedTableHeader
                classes={classes}
                numSelected={selected.length}
                rowCount={rows.length}
              />
              <TableBody>
                {rows.map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <>
                      <TableRow
                        className="desktop"
                        hover
                        onClick={event => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell align="left">{row.id}</TableCell>
                        <TableCell align="left">
                          {row.statusDescription}
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.iccid}</TableCell>
                        <TableCell align="left">{row.msisdn}</TableCell>
                        <TableCell align="left">{row.ip}</TableCell>
                        <TableCell align="left">
                          {row.imeiLock ? 'lock' : ''}
                        </TableCell>
                        <TableCell align="left">{row.imei}</TableCell>
                        <TableCell align="left">{row.serviceProfile}</TableCell>
                        <TableCell align="left">{row.tariffProfile}</TableCell>
                      </TableRow>
                      <TableRow
                        className="mobile"
                        hover
                        onClick={event => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={'m' + row.id}
                        selected={isItemSelected}
                      >
                        <TableCell align="left">
                          {createMobileElement('Status', row.statusDescription)}
                          {createMobileElement('Name', row.name)}
                          {createMobileElement(
                            'Sim Attached',
                            row.isSim ? 'yes' : 'no',
                          )}
                          {createMobileElement(
                            'IMEI Locked',
                            row.imeiLock ? 'yes' : 'no',
                          )}
                          {createMobileElement('Tags', row.tags)}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'previous page',
            }}
            nextIconButtonProps={{
              'aria-label': 'next page',
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    </div>
  );
};

export default EndpointTable;
