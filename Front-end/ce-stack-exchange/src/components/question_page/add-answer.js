import React from 'react'
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Send from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

class AddAnswer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            classes: useStyles
        }
    }

    render() {
        return (
            <div>
                <TextField
                    style={{ margin: 10, width: "90%" }}
                    id="outlined-multiline-static"
                    label="پاسخ شما"
                    multiline
                    rows={7}
                    placeholder="پاسخ خود را اینجا بنویسید..."
                    variant="outlined"
                />
                <Button
                    variant="contained"
                    color="secondary"
                    className={this.state.classes.button}
                    startIcon={<Send />}
                    style={{ margin: 10 }}
                >
                    ثبت پاسخ
                </Button>
            </div>
        );
    }
}

export default AddAnswer