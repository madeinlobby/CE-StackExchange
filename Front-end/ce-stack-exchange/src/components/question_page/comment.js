import React from 'react'
import { Paper } from '@material-ui/core';

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Paper elevation={1} style={{ width: "70%", padding: 1, margin: 5, paddingRight: 10, backgroundColor: "#f5f5f5" }}>
                    <p className="listItem">
                        {this.props.comment.body}
                    </p>
                </Paper>
            </div>
        );
    }
}

export default Comment