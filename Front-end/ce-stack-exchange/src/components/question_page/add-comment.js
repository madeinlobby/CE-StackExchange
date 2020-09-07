import React from 'react'
import { TextField, Button } from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

class AddComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            classes: useStyles
        }
    }

    render() {
        return (
            <div>
                <h4>نظر شما</h4>
                <div style={{ display: "flex" }}>
                    <TextField
                        style={{ marginLeft: 10, marginRight: 10, width: "70%" }}
                        id="outlined-multiline-static"
                        multiline
                        label="نظر شما"
                        placeholder="نظر خود را اینجا بنویسید..."
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        className={this.state.classes.button}
                        startIcon={<Send />}
                        style={{ marginTop: 3, marginBottom: 3 }}
                    >
                        ثبت نظر
                </Button>
                </div>
            </div>
        );
    }
}

export default AddComment