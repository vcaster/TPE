import React, { Component } from 'react';
import FontAwsomeIcon from '@fortawesome/react-fontawesome'
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp'
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse'


class CollapseCheckbox extends Component {
    state = {
        open:false,
        checked:[]
    }

    componentDidMount(){
        if(this.props.initState){
            this.setState({
                open: this.props.initState
            })
        }
    }

    handleClick =()=> {
        this.setState({
            open: !this.state.open
        })
    }

    handleAngle = () => (
        this.state.open ? 
            <FontAwsomeIcon
                icon={faAngleUp}
                className="icon"
            />
            :
            <FontAwsomeIcon
                icon={faAngleDown}
                className="icon"
            />
    )

    renderList = () => (
        this.props.list ?
            this.props.list.map((value) => (
                <ListItem>
                    <ListItemText primary={ value.lastname ? value.name + ' '+value.lastname : value.name }/>
                    <ListItemSecondaryAction>
                        <Checkbox
                            color="primary"
                            onChange={this.handleToggle(value._id)}
                            checked={this.state.checked.indexOf(value._id) !== -1}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            ))
        :null
    )

    handleToggle = value => () => {

        const { checked } = this.state;
        const currentIndex =  checked.indexOf(value)
        const newChecked = [...checked]

        if(currentIndex === -1){
            newChecked.push(value)
        }else{
            newChecked.splice(currentIndex,1)
        }

        // console.log(newChecked)
        this.setState ({
            checked: newChecked
        },()=>{
            this.props.handleFilters(newChecked)
        })      

    }

    render() {
        return (            
                <List style={{ borderBottom: '1px solid #dbdbdb' }}>
                    <ListItem onClick={this.handleClick} style={{ padding: '10px 23px 10px 0' }}>
                        <ListItemText
                            primary={this.props.title}
                            className="collapse_title"
                        />
                        {this.handleAngle()}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.renderList()}
                        </List>

                    </Collapse>
                </List>
                    
        );
    }
}

export default CollapseCheckbox;