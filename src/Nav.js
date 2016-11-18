import React from 'react';
import AppBar from 'material-ui/AppBar';
import {white} from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const iconStyles = {
  width: '40px',
  height: '40px',
  'marginTop': '3px'
};

const DronesmithIcon = (props) => (
  <SvgIcon {...props}>
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <path style={{fill:'none'}} d="M175,31.73,27.48,116.9V286.1L175,371.27,322.53,286.1V116.9ZM114.56,166.36,54.11,201.5V131.21l60.45-35.14L175,131.21V201.5ZM295.9,271.79l-60.45,35.14L175,271.79V201.5l60.45,35.14L295.9,201.5Z"/>
      <polygon points="175 201.5 175 271.79 235.45 306.93 295.9 271.79 295.9 201.5 235.45 236.64 175 201.5"/>
      <path d="M175,0,0,101V302L175,403,350,302V101ZM322.53,286.1,175,371.27,27.48,286.1V116.9L175,31.73,322.53,116.9V286.1Z"/>
      <polygon points="175 131.21 114.56 96.07 54.11 131.21 54.11 201.5 114.56 166.36 175 201.5 175 131.21"/>
    </svg>
  </SvgIcon>
);

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

    render() {
        return (
          <header>
            <AppBar
              iconElementLeft={<DronesmithIcon style={iconStyles} color={white} />}
              title="Dronesmith Ground Control"
              iconElementRight={<IconButton onTouchTap={this.handleToggle}><MoreVertIcon /></IconButton>}
            />
            <Drawer width={300} openSecondary={true} open={this.state.open} >
              <AppBar
                title={<span>Actions</span>}
                onTitleTouchTap={this.handleToggle}
                iconElementRight={<IconButton onTouchTap={this.handleToggle}><NavigationClose /></IconButton>}
              />
            </Drawer>
          </header>
    );
  }
}

export default Nav;
