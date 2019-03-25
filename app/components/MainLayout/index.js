// /**
//  *
//  * MainLayout
//  *
//  */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// material core
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
// material icon
import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/More';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import { Dashboard, BorderAll, Slideshow, Apps, People } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo-1-Copy.png';
import styles from './styles';
import image from '../../images/sidebar-4.jpg';
const mainRoutes = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <Dashboard />,
    exact: true,
  },
  {
    title: 'CRM',
    path: '/crm',
    icon: <People />,
    exact: true,
  },
  {
    title: 'Kho',
    path: '/stock',
    icon: <BorderAll />,
    exact: true,
  },
  {
    title: 'Công việc, dự án',
    path: '/tasks',
    icon: <Slideshow />,
    exact: true,
  },
  {
    title: 'Thiết lập',
    path: '/setting',
    icon: <Apps />,
    name: 'systemOpen',
    subItem: [
      {
        title: 'Cấu hình chung',
        path: '/setting/general',
        icon: 'CH',
        // exact: true,
      },
      {
        title: 'Biểu mẫu động',
        path: '/setting/template',
        icon: 'BM',
        // exact: true,
      },
      {
        title: 'Email - SMS',
        path: '/setting/email',
        icon: 'EM',
        // exact: true,
      },
      {
        title: 'Tự động',
        path: '/setting/automation',
        icon: 'TD',
        // exact: true,
      },
      {
        title: 'WorkFlow',
        path: '/setting/workflow',
        icon: 'WF',
        // exact: true,
      },
      {
        title: 'Phân quyền',
        path: '/setting/roles',
        icon: 'PQ',
        // exact: true,
      },
      {
        title: 'Thuộc tính',
        path: '/setting/properties',
        icon: 'TT',
        // exact: true,
      },
    ],
  },
];
class MainLayout extends React.Component {
  state = {
    open: true,
    anchorEl: null,
    systemOpen: false,
    // mobileMoreAnchorEl: null,
  };

  componentWillMount() {
    if (window.screen.width <= 600) {
      this.state.open = false;
    }
  }

  componentDidMount() {
    const sefl = this;
    window.addEventListener('resize', () => {
      if (window.screen.width <= 600) {
        sefl.setState({ open: false });
      }
    });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
    document.querySelector('#table-full-width').style.width = `${document.querySelector('#table-full-width').clientWidth - 200}px`;
  };

  handleClick = name => {
    this.setState(state => ({ [name]: !state[name] }));
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
    document.querySelector('#table-full-width').style.width = `${document.querySelector('#table-full-width').clientWidth + 200}px`;
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  render() {
    const { anchorEl } = this.state;
    const { classes, theme, children } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const sidebar = mainRoutes.map(item => {
      if (!item.subItem) {
        return (
          <ListItem
            title={item.title}
            key={item.title}
            button
            exact={item.exact}
            className={classes.item}
            component={NavLink}
            to={item.path}
            activeClassName={classNames(classes.active, {
              [classes.close]: this.state.open,
            })}
            onClick={this.handleClickItem}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <span>{item.title}</span>
          </ListItem>
        );
      }
      return (
        <div key={item.title}>
          <ListItem
            button
            key={item.title}
            title={item.title}
            component={NavLink}
            activeClassName={classes.active}
            to={item.path}
            className={classes.item}
            onClick={() => this.handleClick(item.name)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <span>{item.title}</span>

            {this.state.open ? this.state[item.name] ? <ArrowDropDown /> : <ArrowDropUp /> : null}
          </ListItem>
          <Collapse in={this.state[item.name]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subItem.map(sub => (
                <ListItem
                  title={item.title}
                  key={sub.title}
                  button
                  className={classes.subItem}
                  component={NavLink}
                  to={sub.path}
                  activeClassName={classes.active}
                  onClick={this.handleClickItem}
                >
                  <ListItemIcon style={{ fontSize: 12 }}>{sub.icon}</ListItemIcon>
                  <span>{sub.title}</span>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      );
    });
    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Tìm kiếm"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          id="drawer"
          style={{ backgroundImage: `url(${image})` }}
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <img style={{ height: 50, zIndex: 4 }} src={logo} alt="logo lifetek" />
            <IconButton style={{ zIndex: 4 }} onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />

          <List>{sidebar}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  children: PropTypes.array,
};

export default withStyles(styles, { withTheme: true })(MainLayout);
