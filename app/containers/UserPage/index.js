import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  DragDropProvider,
  Table,
  TableHeaderRow,
  TableColumnReordering,
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
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import GridUI from '@material-ui/core/Grid';
import { Settings, Edit } from '@material-ui/icons';
import { Helmet } from 'react-helmet';
// import { generateRows } from '../../../demo-data/generator';
import { NavLink } from 'react-router-dom';
export default class UserPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // mainCulums: [
      //   { name: 'checkbox', title: <Checkbox />, checked: false },
      //   { name: 'stt', title: 'STT', checked: false },
      //   { name: 'idPerson', title: 'Mã nhân viên', checked: true },
      //   { name: 'name', title: 'Họ tên', checked: true },
      //   { name: 'roleInCompany', title: 'Chức vụ', checked: true },
      //   { name: 'email', title: 'Email', checked: false },
      //   { name: 'phone', title: 'Số điện thoại', checked: true },
      //   { name: 'role', title: 'Vai trò', checked: true },
      //   { name: 'status', title: 'Trạng thái', checked: true },
      //   { name: 'action', title: 'Thao tác', checked: true },
      // ],
      columns: [
        { name: 'checkbox', title: <Checkbox />, checked: false },
        { name: 'stt', title: 'STT', checked: true },
        { name: 'idPerson', title: 'Mã nhân viên', checked: false },
        { name: 'name', title: 'Họ tên', checked: false },
        { name: 'roleInCompany', title: 'Chức vụ', checked: true },
        { name: 'email', title: 'Email', checked: false },
        { name: 'phone', title: 'Số điện thoại', checked: false },
        { name: 'role', title: 'Vai trò', checked: true },
        { name: 'status', title: 'Trạng thái', checked: true },
        { name: 'action', title: 'Thao tác', checked: true },
      ],
      rows: [
        {
          checkbox: this.addCheckBox.call(this),
          idPerson: 'PBGD01',
          name: 'Nguyễn Thị Hoa',
          roleInCompany: 'Tổng giám đốc',
          email: 'hoant@gmail.com',
          phone: '0987654321',
          role: '',
          status: 'Active',
          action: this.addResetBtn.call(this, { index: 0 }),
        },
        {
          checkbox: this.addCheckBox.call(this),
          idPerson: 'PBGD01',
          name: 'Nguyễn Thị Hoa',
          roleInCompany: 'Tổng giám đốc',
          email: 'hoant@gmail.com',
          phone: '0987654321',
          role: '',
          status: 'Active',
          action: this.addResetBtn.call(this, { index: 0 }),
        },
        {
          checkbox: this.addCheckBox.call(this),
          idPerson: 'PBGD01',
          name: 'Nguyễn Thị Hoa',
          roleInCompany: 'Tổng giám đốc',
          email: 'hoant@gmail.com',
          phone: '0987654321',
          role: '',
          status: 'Active',
          action: this.addResetBtn.call(this, { index: 0 }),
        },
        {
          checkbox: this.addCheckBox.call(this),
          idPerson: 'PBGD01',
          name: 'Nguyễn Thị Hoa',
          roleInCompany: 'Tổng giám đốc',
          email: 'hoant@gmail.com',
          phone: '0987654321',
          role: '',
          status: 'Active',
          action: this.addResetBtn.call(this, { index: 0 }),
        },
        {
          checkbox: this.addCheckBox.call(this),
          idPerson: 'PBGD01',
          name: 'Nguyễn Thị Hoa',
          roleInCompany: 'Tổng giám đốc',
          email: 'hoant@gmail.com',
          phone: '0987654321',
          role: '',
          status: 'Active',
          action: this.addResetBtn.call(this, { index: 0 }),
        },
        {
          checkbox: this.addCheckBox.call(this),
          idPerson: 'PBGD01',
          name: 'Nguyễn Thị Hoa',
          roleInCompany: 'Tổng giám đốc',
          email: 'hoant@gmail.com',
          phone: '0987654321',
          role: '',
          status: 'Active',
          action: this.addResetBtn.call(this, { index: 0 }),
        },
      ],
      //   pageSizes: [5, 10, 15],
      rowsPerPage: 5,
      page: 0,
      openDialogTableSetting: false,
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

  addCheckBox = () => <Checkbox />;

  handleResetClick = ({ index }) => {
    const { rows } = this.state;
    // const updatedRows = this.state.rows;
    rows[index].car = '';
    this.setState({ rows });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChangeDialogTableSetting = (open, save) => {
    this.setState({ openDialogTableSetting: !open });
    if (save) {
      // console.log(this.state.selectColumns);
    }
  };

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

  render() {
    const { rows, columns, tableColumnExtensions, rowsPerPage, page } = this.state;
    // console.log(columns);
    const data = rows.slice(rowsPerPage * page, rowsPerPage * page + rowsPerPage).map((item, index) => {
      const { checkbox, idPerson, name, roleInCompany, email, phone, role, status, action } = item;
      return {
        checkbox,
        idPerson,
        name,
        roleInCompany,
        email,
        phone,
        role,
        status,
        action,
        stt: rowsPerPage * page + 1 + index,
      };
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
            <Fab size="small" title="Thiết lập hiển thị" onClick={() => this.handleChangeDialogTableSetting(this.state.openDialogTableSetting)}>
              <Settings />
            </Fab>
          </GridUI>
        </GridUI>

        <Paper>
          <Grid rows={data} columns={showCulumns}>
            <DragDropProvider />
            <Table columnExtensions={tableColumnExtensions} />
            <TableColumnReordering defaultOrder={['idPerson', 'name', 'roleInCompany', 'email', 'phone', 'role', 'status', 'action']} />
            <TableHeaderRow />
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
            labelRowsPerPage="Hàng trên mỗi trang: "
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
                    <ListItemText primary={value.title} />
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
