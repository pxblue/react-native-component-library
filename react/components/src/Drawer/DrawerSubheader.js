import React from 'react';
import {withStyles} from '@material-ui/core/styles';

class DrawerSubheader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.subheader) {
            return <></>;
        }
        return (
            <div
                className={this.props.classes.drawerWidthFull}
                style={
                    {
                        ...this.props.subheader.styles,
                        flex: '1 1 0px',
                        paddingLeft: '40px',
                        paddingRight: '10px',
                        visibility: (this.props.parentState.drawerOpen ? '' : 'hidden')
                    }}>
                {this.props.subheader.content}
            </div>
        );
    }
}

const styles = theme => ({});

export default withStyles(styles)(DrawerSubheader);
