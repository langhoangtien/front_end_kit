/**
 *
 * AddUserPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Tabs from '@material-ui/core/Tabs';
import Table from '@material-ui/core/Table';
import Tab from '@material-ui/core/Tab';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import AppBar from '@material-ui/core/AppBar';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Breadcrumbs } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { TextField, Button, List, ListItem, ListItemIcon, Collapse, Paper } from '@material-ui/core';
import CameraAlt from '@material-ui/icons/CameraAlt';
import makeSelectAddUserPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import avatarA from '../../images/avatar.png';
import styles from './styles';
import { addUserAction } from './actions';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const currencies = [
  {
    value: '1',
    label: 'Nhóm 1',
  },
  {
    value: '2',
    label: 'Nhóm 2',
  },
  {
    value: '3',
    label: 'Nhóm 3',
  },
  {
    value: '4',
    label: 'Nhóm 4',
  },
  {
    value: 'Admin',
    label: 'Quản trị viên',
  },
  {
    value: 'user',
    label: 'Quyền Xem',
  },
];
const phanQuyenChucNang = [
  {
    id: 1,
    name: 'Khách hàng',
    xem: true,
    them: true,
    sua: true,
    xoa: true,
    xuat: true,
    inport: true,
  },
  {
    id: 2,
    name: 'Hợp đồng',
    xem: true,
    them: false,
    sua: true,
    xoa: true,
    xuat: false,
    inport: true,
  },
  {
    id: 3,
    name: 'Dịch vụ',
    xem: false,
    them: true,
    sua: false,
    xoa: true,
    xuat: true,
    inport: true,
  },
  {
    id: 4,
    name: 'Báo cáo',
    xem: true,
    them: true,
    sua: true,
    xoa: true,
    xuat: true,
    inport: false,
  },
];
const phanQuyenBaoCao = [
  {
    id: 1,
    name: 'Báo cáo hoạt động kinh doanh',
    xem: true,
    xuat: true,
  },
  {
    id: 2,
    name: 'Báo cáo cá nhân',
    xem: true,
    xuat: true,
  },
  {
    id: 3,
    name: 'Báo cáo quản trị phòng',
    xem: true,
    xuat: true,
  },
];
const BaoCaoPheDuyet = [
  {
    name: 'Phê duyệt báo cáo',
    checked: true,
  },
  {
    name: 'Phê duyệt',
    checked: true,
    childrens: [
      {
        name: 'Phê duyệt nghỉ phép',
        checked: true,
      },
      {
        name: 'Phê duyệt bằng lương',
        checked: false,
      },
      {
        name: 'Phê duyệt chi',
        checked: false,
      },
      {
        name: 'Phê duyệt thu',
        checked: true,
      },
      {
        name: 'Phê duyệt điều chuyển công tác',
        checked: false,
      },
    ],
  },
  {
    name: 'Cảnh báo',
    checked: false,
    childrens: [
      {
        name: 'Cảnh báo nhân sự nghỉ quá nhiều',
        checked: true,
      },
      {
        name: 'Cảnh báo công việc chậm tiến độ',
        checked: false,
      },
    ],
  },
];

/* eslint-disable react/prefer-stateless-function */
export class AddUserPage extends React.PureComponent {
  state = {
    expanded: 'panel1',
    avatarURL: '',
    // avatar: '',
    value: 0,
    // code: '',
    gender: 'Nam',
    // email: '',
    mobileNumber: '',
    name: '',
    dob: '',
    address: '',
    note: '',
    username: '',
    rePassword: '',
    password: '',
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  self = this;

  handleClickAddNewUser = () => {
    const body = {};

    this.props.onAddNewUser(body);
  };

  handleChangeInput = () => {
    // console.log(this.code.value);
    // this.setState({ [e.target.name]: e.target.value });
  };

  onSelectImg = e => {
    // const types = ['image/png', 'image/jpeg', 'image/gif'];
    // const file = e.target.files[0];
    // k có file
    // if (!file) return false;

    // // let checkFile = true;
    // // let txt = '';

    // // // check image type
    // // if (types.every(type => file.type !== type)) {
    // //   checkFile = false;
    // //   txt = 'File bạn vừa chọn không đúng định dạng';
    // //   // check image size > 3mb
    // // } else if (file.size / 1024 / 1024 > 3) {
    // //   checkFile = false;
    // //   txt = 'Dung lượng file tối đa là 3MB';
    // // }

    // // confirm logo
    // if (!checkFile) {
    //   // this.props.enqueueSnackbar(txt, {
    //   //   variant: 'error',
    //   //   anchorOrigin: {
    //   //     vertical: 'bottom',
    //   //     horizontal: 'right',
    //   //   },
    //   //   autoHideDuration: 3000,
    //   // });
    // } else {
    //   const urlAvt = URL.createObjectURL(e.target.files[0]);
    //   this.setState({ avatarURL: urlAvt });
    // }
    const urlAvt = URL.createObjectURL(e.target.files[0]);
    this.setState({ avatarURL: urlAvt });
  };

  render() {
    const { classes } = this.props;
    const { expanded, value } = this.state;
    const showDataTable = data => {
      const tag = [];
      data.forEach(row => {
        tag.push(
          <ListItem>
            <ListItemIcon>
              {/* <InboxIcon /> */}
              <Checkbox checked={row.checked} />
            </ListItemIcon>
            <span style={{ fontSize: '0.75rem' }}>{row.name}</span>
          </ListItem>,
        );
        if (row.childrens)
          row.childrens.forEach(child => {
            tag.push(
              <Collapse style={{ marginLeft: 40 }} in>
                <List component="div" disablePadding>
                  <ListItem button className={{ marginLeft: 10, height: 20 }}>
                    <ListItemIcon>
                      <Checkbox checked={child.checked} />
                    </ListItemIcon>
                    <span style={{ fontSize: '0.75rem' }}>{child.name}</span>
                  </ListItem>
                </List>
              </Collapse>,
            );
          });
      });
      return tag;
    };
    return (
      <div className={classes.root}>
        <Helmet>
          <title>Thêm mới nhân sự</title>
          <meta name="description" content="Description of AddUserPage" />
        </Helmet>
        <Paper className={classes.breadcrumbs}>
          <Breadcrumbs aria-label="Breadcrumb">
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/">
              Dashboard
            </Link>
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/system/user">
              Danh sách nhân sự
            </Link>
            <Typography color="textPrimary">Thêm mới nhân sự</Typography>
          </Breadcrumbs>
        </Paper>
        {/* <Typography h1>Thêm mới nhân sự</Typography> */}
        <Grid container>
          <Grid md={8}>
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Thông tin cơ bản nhân viên</Typography>
                <Typography className={classes.secondaryHeading}>Các trường có dấu * là bắt buộc</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container>
                  <Grid justify="flex-start" md={6}>
                    <TextField
                      id="code"
                      label="Mã nhân sự (*) : "
                      onChange={this.handleChangeInput}
                      type="text"
                      className={classes.textField}
                      name="code"
                      // inputRef={input => (this.code = input)}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />

                    <TextField
                      id="standard-select-currency"
                      select
                      label="Giới tính"
                      name=""
                      className={classes.textField}
                      value={this.state.gender}
                      onChange={this.handleChangeInput}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      // helperText="Please select your currency"
                      margin="normal"
                    >
                      <MenuItem key="Nam" value="Nam" selected>
                        Nam
                      </MenuItem>
                      <MenuItem key="Nam" value="Nam" selected>
                        Nữ
                      </MenuItem>
                    </TextField>
                    <TextField
                      id="email"
                      label="Email : "
                      // inputRef={input => (this.email = input)}
                      type="text"
                      name="email"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <TextField
                      id="phoneNumber"
                      label="Số điện thoại : "
                      value={this.state.mobileNumber}
                      name="mobileNumber"
                      onChange={this.handleChangeInput}
                      type="text"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <TextField
                      id="timeToJoin"
                      label="Thời gian vào VCBS : "
                      type="text"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <TextField
                      id="standard-select-currency"
                      // select
                      label="Cấp bậc :"
                      className={classes.textField}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      // helperText="Please select your currency"
                      margin="normal"
                    />
                  </Grid>
                  <Grid container justify="flex-end" md={6}>
                    <TextField
                      id="name"
                      label="Họ và tên (*) : "
                      value={this.state.name}
                      name="name"
                      onChange={this.handleChangeInput}
                      type="text"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <TextField
                      id="dob"
                      label="Ngày sinh : "
                      name="dob"
                      value={this.state.dob}
                      onChange={this.handleChangeInput}
                      type="date"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <TextField
                      id="cmtnd"
                      label="Số CMND/CCCD : "
                      // value={this.state.age}
                      // onChange={this.handleChange}
                      type="text"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <TextField
                      id="address"
                      label="Địa chỉ liên hệ : "
                      value={this.state.address}
                      name="address"
                      onChange={this.handleChangeInput}
                      type="text"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <TextField
                      id="standard-select-currency"
                      select
                      label="Ngạch"
                      className={classes.textField}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      // helperText="Please select your currency"
                      margin="normal"
                    >
                      {currencies.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="note"
                      label="Ghi chú : "
                      value={this.state.note}
                      onChange={this.handleChangeInput}
                      name="note"
                      type="text"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Thông tin nhân viên đăng nhập</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container>
                  <Grid justify="flex-start" md={6}>
                    <TextField
                      id="username"
                      label="Tài khoản : "
                      value={this.state.username}
                      name="username"
                      onChange={this.handleChange}
                      type="text"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <TextField
                      id="repasss"
                      label="Nhập lại mật khẩu : "
                      value={this.state.rePassword}
                      name="rePassword"
                      onChange={this.handleChange}
                      type="password"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <TextField
                      id="standard-multiline-static"
                      label="Lý do không tham gia hoạt động"
                      multiline
                      rows="4"
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid container justify="flex-end" md={6}>
                    <TextField
                      id="pass"
                      label="Mật khẩu : "
                      value={this.state.password}
                      name="password"
                      onChange={this.handleChange}
                      type="password"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <TextField
                      id="date"
                      label="Ngày kết thúc"
                      type="date"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <div style={{ width: '100%' }}>
                      <FormControlLabel control={<Checkbox color="primary" value="checkedA" />} label="Không hoạt động :" labelPlacement="start" />
                    </div>
                  </Grid>
                  <Grid>
                    <FormGroup row className={classes.tetxCheckBox}>
                      <Typography>Bắt buộc thay đổi mật khẩu khi lần đầu đăng nhập</Typography>
                      <FormControlLabel control={<Checkbox />} />
                      <FormControlLabel control={<Checkbox />} label="Active" labelPlacement="end" />
                      <FormControlLabel control={<Checkbox />} label="Deleted" labelPlacement="end" />
                      <FormControlLabel control={<Checkbox />} label="User cổng thông tin nhân sự" labelPlacement="end" />
                    </FormGroup>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Phân quyền truy cập cho nhân viên</Typography>
                <Typography className={classes.secondaryHeading}>Tích vào các tính năng mà bạn muốn nhân viên truy cập</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid md={12}>
                  <TextField
                    className={classes.textField}
                    id="standard-select-currency"
                    select
                    label="Nhóm phân quyền"
                    value={this.state.currency}
                    onChange={this.handleChange('currency')}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    // helperText="Please select your currency"
                    margin="normal"
                  >
                    {currencies.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <div style={{ width: '100%' }}>
                    <AppBar position="static">
                      <Tabs value={value} onChange={this.handleChangeValue}>
                        <Tab className={classes.btnAppBar} label="Phân quyền chức năng" />
                        <Tab className={classes.btnAppBar} label="Phân quyền phòng ban" />
                        <Tab className={classes.btnAppBar} label="Phân quyền báo cáo" />
                        <Tab className={classes.btnAppBar} label="Phân quyền báo cáo và phê duyệt" />
                      </Tabs>
                    </AppBar>
                    {value === 0 && (
                      <TabContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Phân quyền chức năng</TableCell>
                              <TableCell>Xem</TableCell>
                              <TableCell>Thêm</TableCell>
                              <TableCell>Sửa</TableCell>
                              <TableCell>Xóa</TableCell>
                              <TableCell>Xuất file</TableCell>
                              <TableCell>Infort file</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {phanQuyenChucNang.map(row => (
                              <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>
                                  <Checkbox checked={row.xem} />
                                </TableCell>
                                <TableCell>
                                  <Checkbox checked={row.them} />
                                </TableCell>
                                <TableCell>
                                  <Checkbox checked={row.sua} />
                                </TableCell>
                                <TableCell>
                                  <Checkbox checked={row.xoa} />
                                </TableCell>
                                <TableCell>
                                  <Checkbox checked={row.xuat} />
                                </TableCell>
                                <TableCell>
                                  <Checkbox checked={row.inport} />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TabContainer>
                    )}
                    {value === 2 && (
                      <TabContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Báo cáo</TableCell>
                              <TableCell>Xem</TableCell>
                              <TableCell>Xuất báo cáo</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {phanQuyenBaoCao.map(row => (
                              <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>
                                  <Checkbox checked={row.xem} />
                                </TableCell>
                                <TableCell>
                                  <Checkbox checked={row.xuat} />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TabContainer>
                    )}
                    {value === 1 && <TabContainer>Phân quyền phòng ban</TabContainer>}
                    {value === 3 && (
                      <TabContainer>
                        <TabContainer>{showDataTable(BaoCaoPheDuyet)}</TabContainer>
                      </TabContainer>
                    )}
                  </div>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <Button variant="contained" color="primary" style={{ marginTop: 20 }}>
              Thêm mới
            </Button>
            <Button variant="contained" onClick={() => this.props.history.goBack()} style={{ marginTop: 20, marginLeft: 20 }}>
              Hủy
            </Button>
          </Grid>
          <Grid style={{ height: 200 }} md={4} justify="center" container flexWrap="wrap">
            <Avatar style={{ width: 300, height: 300 }} src={avatarA} className={classes.avatar} srcSet={this.state.avatarURL} />
            <input
              className={classes.textFieldAva}
              onChange={this.onSelectImg}
              accept="image/*"
              name="avatar"
              type="file"
              style={{ cursor: 'pointer', opacity: 0, width: '300px', position: 'absolute', zIndex: '999', margin: '0px' }}
            />
            <span className={classes.spanAva}>
              <CameraAlt className={classes.iconCam} />
            </span>
            <Grid container justify="center">
              <span>Ảnh đại diện</span>
            </Grid>
            <Grid container justify="center">
              <span>(Nhấp vào ảnh để thay đổi ảnh đại diện)</span>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  handleChangeValue = (event, value) => {
    this.setState({ value });
  };
}

AddUserPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onAddNewUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addUserPage: makeSelectAddUserPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onAddNewUser: body => {
      dispatch(addUserAction(body));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'addUserPage', reducer });
const withSaga = injectSaga({ key: 'addUserPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(AddUserPage);
