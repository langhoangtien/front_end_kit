/**
 *
 * ListOfDepartmentPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import {
  Paper,
  Typography,
  Grid,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  Fab,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  TablePagination,
} from '@material-ui/core'; // Card
import { Link } from 'react-router-dom';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { Edit, Delete } from '@material-ui/icons';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectListOfDepartmentPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles';
import data from './data';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class ListOfDepartmentPage extends React.Component {
  state = {
    selected: [],
    // data: [],
    content: '',
    openDialog: false,
    department: '',
    departmentCode: '',
    changeOpen: true,
    No: 0,
    departmentName: '',
    departmentRole: '',
    departmentFunction: '',
    departmentMisson: '',
    departmentNote: '',
    branchCode: '',
    departmentCodeAccounted: '',
    // isDelete: false,
    rowsPerPage: 5,
    page: 0,
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rowsPerPage, page } = this.state;
    const level = 0;
    // if (this.state.changeOpen === true) {
    //   this.state.changeOpen = false;
    // console.log(rowsPerPage * page, rowsPerPage * page + rowsPerPage);
    this.state.content = data.slice(rowsPerPage * page, rowsPerPage * page + rowsPerPage).map(depart => {
      if (depart.subDepartment.length > 0) {
        return (
          <React.Fragment key={depart.id}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox color="primary" />
              </TableCell>
              <TableCell onClick={() => this.clickOpen(depart)}>
                {depart.open ? <ExpandLess /> : <ExpandMore />}
                &nbsp;
                {depart.name}
              </TableCell>
              <TableCell>{depart.code}</TableCell>
              <TableCell>{depart.otherName}</TableCell>
              <TableCell>{depart.stt}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Fab size="small" color="primary">
                  <Edit />
                </Fab>
                &nbsp;
                <Fab size="small" color="secondary">
                  <Delete style={{ color: 'white' }} />
                </Fab>
              </TableCell>
            </TableRow>
            {depart.open ? this.displayTableContent(depart.subDepartment, level + 20) : null}
          </React.Fragment>
        );
      }
      return (
        // <React.Fragment>
        <TableRow key={depart.id}>
          <TableCell padding="checkbox">
            <Checkbox color="primary" />
          </TableCell>
          <TableCell>{depart.name}</TableCell>
          <TableCell>{depart.code}</TableCell>
          <TableCell>{depart.otherName}</TableCell>
          <TableCell>{depart.stt}</TableCell>
          <TableCell style={{ textAlign: 'center' }}>
            <Fab size="small" color="primary">
              <Edit />
            </Fab>
            &nbsp;
            <Fab size="small" color="secondary">
              <Delete style={{ color: 'white' }} />
            </Fab>
          </TableCell>
        </TableRow>
        // </React.Fragment>
      );
    });
    // }
    return (
      <div>
        <Helmet>
          <title>Danh sách phòng ban</title>
          <meta name="description" content="Description of ListOfDepartmentPage" />
        </Helmet>
        {/* <div className={classes.wrap}> */}
        <Paper className={classes.breadcrumbs}>
          <Breadcrumbs aria-label="Breadcrumb">
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/">
              Dashboard
            </Link>
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/system/user">
              Danh sách nhân sự
            </Link>
            <Typography color="textPrimary">Danh sách phòng ban</Typography>
          </Breadcrumbs>
        </Paper>

        {/* </div> */}
        <Grid item container md={12} style={{ marginBottom: 20 }}>
          <Grid item md={6}>
            <Typography variant="h6" className={classes.title}>
              XÂY DỰNG CÂY SƠ ĐỒ TỔ CHỨC
            </Typography>
          </Grid>

          <Grid item container md={5} justify="flex-end">
            <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
              Thêm phòng ban mới
            </Button>
          </Grid>
        </Grid>
        <Paper>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" style={{ width: '50px' }}>
                  <Checkbox color="primary" />
                </TableCell>
                <TableCell component="th">Tên phòng ban</TableCell>
                <TableCell>Mã</TableCell>
                <TableCell>Tên khác</TableCell>
                <TableCell>Thứ tự</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.state.content ? this.state.content : ''}</TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Trang trước',
            }}
            nextIconButtonProps={{
              'aria-label': 'Trang tiếp theo',
            }}
            labelRowsPerPage="Hàng trên mỗi trang: "
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialog}
        >
          <DialogTitle id="alert-dialog-title">Thông tin phòng ban</DialogTitle>
          <DialogContent className={classes.wrapContentDialog}>
            <FormControl>
              <InputLabel htmlFor="departmentBig">Phòng ban cha</InputLabel>
              <Select
                className={classes.select}
                value={this.state.department}
                onChange={this.handleChange}
                inputProps={{
                  id: 'departmentBig',
                }}
              >
                <MenuItem value="">-- Chọn phòng ban --</MenuItem>
                <MenuItem value={10}>Phòng 1</MenuItem>
                <MenuItem value={20}>Phòng 2</MenuItem>
                <MenuItem value={30}>Phòng 3</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Mã phòng ban"
              type="text"
              name="departmentCode"
              className={classes.textField}
              value={this.state.departmentCode}
              onChange={this.handleChange}
            />
            <TextField
              label="Số thứ tự"
              type="number"
              name="No"
              className={classes.textField}
              style={{ marginLeft: '10px' }}
              value={this.state.No}
              onChange={this.handleChange}
            />
            <TextField
              label="Tên phòng ban"
              type="text"
              name="departmentName"
              className={classes.textField2}
              value={this.state.departmentName}
              onChange={this.handleChange}
            />
            <FormControl style={{ marginTop: '10px' }}>
              <InputLabel htmlFor="departmentRole">Chức vụ lãnh đạo</InputLabel>
              <Select
                className={classes.select}
                value={this.state.departmentRole}
                onChange={this.handleChange}
                inputProps={{
                  id: 'departmentRole',
                }}
              >
                <MenuItem value="">-- Chọn chức vụ --</MenuItem>
                <MenuItem value={10}>Giám đốc</MenuItem>
                <MenuItem value={20}>Nhân viên</MenuItem>
                <MenuItem value={30}>Trưởng phòng</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Chức năng"
              multiline
              rows={4}
              rowsMax={4}
              className={classes.textField2}
              name="departmentFunction"
              onChange={this.handleChange}
              value={this.state.departmentFunction}
            />
            <TextField
              label="Nhiệm vụ"
              multiline
              rows={4}
              rowsMax={4}
              className={classes.textField2}
              name="departmentMisson"
              onChange={this.handleChange}
              value={this.state.departmentMisson}
            />
            <TextField
              label="Ghi chú"
              multiline
              rows={4}
              rowsMax={4}
              className={classes.textField2}
              name="departmentNote"
              onChange={this.handleChange}
              value={this.state.departmentNote}
            />
            <TextField
              label="Mã chi nhánh hạch toán"
              type="text"
              name="branchCode"
              className={classes.textField}
              value={this.state.branchCode}
              onChange={this.handleChange}
            />
            <TextField
              label="Mã phòng ban hạch toán"
              type="number"
              name="departmentCodeAccounted"
              className={classes.textField}
              style={{ marginLeft: '10px' }}
              value={this.state.departmentCodeAccounted}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" autoFocus>
              Lưu thông tin
            </Button>
            <Button onClick={this.handleClose} variant="contained" color="default">
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
        {/* <FormattedMessage {...messages.header} /> */}
      </div>
    );
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  };

  displayTableContent = (dataList, level) => {// eslint-disable-line
    this.state.changeOpen = false;
    return dataList.map(department => {
      if (department.subDepartment.length > 0) {
        return (
          <React.Fragment key={department.id}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox color="primary" />
              </TableCell>
              <TableCell onClick={() => this.clickOpen(department)}>
                <span style={{ padding: `${level}px` }} />
                {department.open ? <ExpandLess /> : <ExpandMore />}
                &nbsp;
                {department.name}
              </TableCell>
              <TableCell>{department.code}</TableCell>
              <TableCell>{department.otherName}</TableCell>
              <TableCell>{department.stt}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Fab size="small" color="primary">
                  <Edit />
                </Fab>
                &nbsp;
                <Fab size="small" color="secondary">
                  <Delete style={{ color: 'white' }} />
                </Fab>
              </TableCell>
            </TableRow>

            {department.open ? this.displayTableContent(department.subDepartment, level + 20) : null}
          </React.Fragment>
        );
      }
      return (
        // <React.Fragment>
        <TableRow key={department.id}>
          <TableCell padding="checkbox">
            <Checkbox color="primary" />
          </TableCell>
          <TableCell>
            <span style={{ padding: `${level}px` }} />
            {department.name}
          </TableCell>
          <TableCell>{department.code}</TableCell>
          <TableCell>{department.otherName}</TableCell>
          <TableCell>{department.stt}</TableCell>
          <TableCell style={{ textAlign: 'center' }}>
            <Fab size="small" color="primary">
              <Edit />
            </Fab>
            &nbsp;
            <Fab size="small" color="secondary">
              <Delete style={{ color: 'white' }} />
            </Fab>
          </TableCell>
        </TableRow>
        // </React.Fragment>
      );
    });
  };

  clickOpen = depart => {
    /* eslint-disable */
    if (!depart.open) {
      depart.open = true;
    } else {
      depart.open = false;
    }
    this.setState({changeOpen: true});
    /* eslint-enable */
  };
}

ListOfDepartmentPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listOfDepartmentPage: makeSelectListOfDepartmentPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'listOfDepartmentPage', reducer });
const withSaga = injectSaga({ key: 'listOfDepartmentPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(ListOfDepartmentPage);
