/**
 *
 * UsersPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  DragDropProvider,
  Table,
  TableHeaderRow,
  TableColumnReordering,
  TableColumnResizing,
  TableFixedColumns,
  // PagingPanel,
  // SelectionState,
  // TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui';
import {
  Button,
  TablePagination,
  Checkbox,
  Fab,
  List,
  ListItem,
  ListItemSecondaryAction,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
} from '@material-ui/core';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import GridUI from '@material-ui/core/Grid';
import { Settings, Edit, Delete } from '@material-ui/icons';
import { NavLink, Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUsersPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchAllUserAction, fetchConfigAction, fetchUpdateConfigAction, fetchDeleteUsersAction } from './actions';
import styles from './styles';
/* eslint-disable react/prefer-stateless-function */

let allId = [];
export class UsersPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [], // các cột được hiển thị
      defaultOrder: [], // sắp xếp thứ tự hiển thị của các cột
      rows: [], // dữ liệu hiển thị
      //   pageSizes: [5, 10, 15],
      rowsPerPage: 5, // số hàng hiển thị trên một bảng
      page: 0, // trang hiện tại
      openDialogTableSetting: false, // hiển thị dialog
      selected: [], // các hàng được lựa chọn
      defaultColumnWidths: [], // chiều ngang mặc định của các cột
      // leftColumns: ['checkbox'], //  cột fixed bên trái
      rightColumns: ['action'], // cột fixed bên phải
    };
  }

  addResetBtn = ({ index }) => (
    <Fab
      color="primary"
      // onClick={this.handleResetClick.bind(this, { index })}
      size="small"
      onClick={() => this.handleResetClick(index)}
    >
      <Edit />
    </Fab>
  );

  addCheckBox = name => <Checkbox value={name} checked={this.state.selected.includes(name)} onClick={this.handleSelectClick} />;

  addCheckBoxAll = () => <Checkbox onClick={this.handleSelectAllClick} />;

  // Lựa chọn 1 hàng
  handleSelectClick = e => {
    const { selected } = this.state;
    if (e.target.checked) {
      selected.push(e.target.value);
    } else {
      const index = selected.findIndex(item => e.target.value === item);
      selected.splice(index, 1);
    }
    this.setState(selected);
  };

  // Lựa chọn tất cả các hàng
  handleSelectAllClick = e => {
    if (e.target.checked) {
      this.setState({ selected: allId });
    } else {
      this.setState({ selected: [] });
    }
  };

  handleResetClick = ({ index }) => {
    const { rows } = this.state;
    rows[index].car = '';
    this.setState({ rows });
  };

  // Thay đổi  trang
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  // Thay đổi số dòng trên một trang
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  // Thay đổi số dòng hiển thị trên trang
  handleOnChange = (event, name) => {
    const { columns } = this.state;
    const currentColumns = columns.find(item => item.name === name);
    currentColumns.title = event.target.value;
    this.setState({ columns });
  };

  // xóa các dòng đã chọn
  handleDeletes = () => {
    this.props.onDeleteUsers(this.state.selected);
  };

  // Thay đổi các trường hiện trên table
  handleChangeDialogTableSetting = (open, save) => {
    this.setState({ openDialogTableSetting: !open });
    if (save) {
      const { usersPage } = this.props;
      const { config } = usersPage;
      const body = config.viewconfigs[0];

      body.columns = this.state.columns.filter(item => item.name !== 'checkbox' && item.name !== 'stt' && item.name !== 'action');
      this.props.onUpdateConfig(body);
    }
  };

  // Lựa chọn các dòng hiện trên bảng
  handleSelectConfigTable = (e, value) => {
    const currentColumnChecked = this.state.columns;
    currentColumnChecked.forEach((item, index) => {
      if (item.name === value) {
        currentColumnChecked[index].checked = e.target.checked;
      }
    });
    const newCol = [];
    currentColumnChecked.forEach(item => {
      newCol.push(item);
    });
    this.setState({ columns: newCol });
  };

  componentDidMount() {
    this.props.onGetConfig();
    this.props.onGetAllUser();
  }

  componentWillUpdate(props) {
    const { usersPage } = props;
    const arrUser = usersPage.arrUser || [];
    const { config } = usersPage;
    if (this.props.usersPage.success) {
      this.props.onGetAllUser();
    }
    if (config) {
      const { columns } = config.viewconfigs[0];
      const defaultColumnWidths = [];
      this.state.rows = arrUser || [];
      if (columns) {
        const defaultOrder = [];

        columns.forEach(item => {
          defaultOrder.push(item.name);
        });
        defaultOrder.push('action');
        defaultOrder.splice(0, 0, 'stt');
        defaultOrder.splice(0, 0, 'checkbox');

        const newColumns = [];
        columns.forEach(item => {
          newColumns.push(item);
          defaultColumnWidths.push({ columnName: item.name, width: 200 });
        });

        newColumns.push({ name: 'checkbox', title: this.addCheckBoxAll(), checked: true });
        newColumns.push({ name: 'action', title: 'Thao tác', checked: true });
        defaultColumnWidths.push({ columnName: 'checkbox', width: 70 });
        defaultColumnWidths.push({ columnName: 'action', width: 70 });

        this.state.columns = newColumns || [];
        this.state.defaultOrder = defaultOrder;
        this.state.defaultColumnWidths = defaultColumnWidths;
      }
    }
  }

  render() {
    const { rows, columns, tableColumnExtensions, rowsPerPage, page, defaultOrder } = this.state;
    const { classes } = this.props;
    allId = [];
    const data = rows.slice(rowsPerPage * page, rowsPerPage * page + rowsPerPage).map((item, index) => {
      const newItem = {};
      defaultOrder.forEach(key => {
        if (key === 'status') {
          if (item[key] === 0) {
            newItem[key] = 'Hoạt động';
          }
          if (item[key] === 3) {
            newItem[key] = 'Đã xóa';
          }
        } else if (key === 'language') {
          if (item[key] === 'vn') {
            newItem[key] = 'Tiếng Việt';
          }
        } else {
          newItem[key] = item[key];
        }
      });
      /* eslint no-underscore-dangle: 0 */
      newItem.checkbox = this.addCheckBox.call(this, item._id);
      newItem.action = this.addResetBtn.call(this, index);
      newItem.stt = rowsPerPage * page + 1 + index;
      allId.push(item._id);
      return newItem;
    });
    const showCulumns = [];
    columns.forEach(item => {
      if (item.checked) showCulumns.push(item);
    });
    return (
      <div>
        <Helmet>
          <title>Nhân sự phòng ban</title>
          <meta name="description" content="Description of AddUserPage" />
        </Helmet>
        <Paper className={classes.breadcrumbs}>
          <Breadcrumbs aria-label="Breadcrumb">
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/">
              Dashboard
            </Link>
            <Typography color="textPrimary">Danh sách nhân sự</Typography>
          </Breadcrumbs>
        </Paper>
        <GridUI container md={12}>
          <GridUI item md={11}>
            <Button style={{ marginBottom: 10, marginRight: 10 }} variant="contained" color="primary">
              Phân quyền nhóm
            </Button>
            <Button component={NavLink} to="/system/department" style={{ marginBottom: 10, marginRight: 10 }} variant="contained" color="primary">
              DS phòng ban
            </Button>
            <Button component={NavLink} to="/system/user/add" style={{ marginBottom: 10, marginRight: 10 }} variant="contained" color="primary">
              Thêm mới nhân sự
            </Button>
          </GridUI>
          <GridUI container justify="flex-end" item md={1}>
            {this.state.selected.length !== 0 ? (
              <Fab size="small" title="Xóa mục đã chọn" style={{ marginRight: 10 }} color="secondary" onClick={this.handleDeletes}>
                <Delete style={{ color: 'white' }} />
              </Fab>
            ) : null}
            <Fab size="small" title="Thiết lập hiển thị" onClick={() => this.handleChangeDialogTableSetting(this.state.openDialogTableSetting)}>
              <Settings />
            </Fab>
          </GridUI>
        </GridUI>

        <Paper className={classes.tableContainer} id="table-full-width">
          <Grid rows={data} columns={showCulumns}>
            <DragDropProvider />
            <Table columnExtensions={tableColumnExtensions} />
            {defaultOrder.length !== 0 ? <TableColumnReordering defaultOrder={defaultOrder} /> : null}
            {defaultOrder.length !== 0 ? <TableColumnResizing defaultColumnWidths={this.state.defaultColumnWidths} /> : null}

            <TableHeaderRow />
            <TableFixedColumns rightColumns={this.state.rightColumns} />
          </Grid>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Trang trước',
            }}
            nextIconButtonProps={{
              'aria-label': 'Trang tiếp theo',
            }}
            labelRowsPerPage="Hiển thị: "
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
        <Dialog
          fullWidth
          open={this.state.openDialogTableSetting}
          onClose={() => this.handleChangeDialogTableSetting(this.state.openDialogTableSetting)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Thiết lập hiển thị bảng</DialogTitle>
          <DialogContent>
            <List dense>
              {this.state.columns.map(value => {
                if (value.name === 'checkbox') return false;
                return (
                  <ListItem key={value.name} button>
                    {/* <ListItemText primary={value.title} /> */}
                    <TextField value={value.title} name={value.name} onChange={e => this.handleOnChange(e, value.name)} />
                    <ListItemSecondaryAction>
                      <Checkbox checked={value.checked} onClick={e => this.handleSelectConfigTable(e, value.name)} />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => this.handleChangeDialogTableSetting(this.state.openDialogTableSetting)}>
              Hủy
            </Button>
            <Button variant="contained" color="primary" onClick={() => this.handleChangeDialogTableSetting(this.state.openDialogTableSetting, true)}>
              Lưu thay đổi
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

UsersPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onGetAllUser: PropTypes.func.isRequired,
  classes: PropTypes.object,
  onGetConfig: PropTypes.func.isRequired,
  onDeleteUsers: PropTypes.func.isRequired,
  usersPage: PropTypes.string,
  onUpdateConfig: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  usersPage: makeSelectUsersPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onGetAllUser: () => {
      dispatch(fetchAllUserAction());
    },
    onGetConfig: () => {
      dispatch(fetchConfigAction());
    },
    onUpdateConfig: body => {
      dispatch(fetchUpdateConfigAction(body));
    },
    onDeleteUsers: body => {
      dispatch(fetchDeleteUsersAction(body));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'usersPage', reducer });
const withSaga = injectSaga({ key: 'usersPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(UsersPage);
