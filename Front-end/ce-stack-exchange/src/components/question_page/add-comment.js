import React from 'react'
import { TextField, Button, Collapse } from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

class AddComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            classes: useStyles,
            commentValue: '',
            commentSubmitted: '',
            open: false,
            buttonDisplay: "block"
        }
    }

    onCommentChange = (event) => {
        this.setState({
            commentValue: event.target.value
        })
    }

    onSubmitComment = () => {
        this.setState({
            commentSubmitted: this.state.commentValue
        })
    }

    openCollapse = () => {
        this.setState({
            open: true,
            buttonDisplay: "none"
        })
    }

    cancel = () => {
        this.setState({
            open: false,
            buttonDisplay: "block"
        })
    }

    render() {
        return (
            <div style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
                <div style={{ marginRight: "2em", display: this.state.buttonDisplay }} onClick={this.openCollapse}>
                    <Button>افزودن نظر</Button>
                </div>
                <Collapse in={this.state.open}>
                    <h4>نظر شما</h4>
                    <div style={{ display: "flex" }}>
                        <TextField
                            onChange={this.onCommentChange}
                            style={{ marginLeft: 10, marginRight: 10, width: "70%" }}
                            id="outlined-multiline-static"
                            multiline
                            label="نظر شما"
                            placeholder="نظر خود را اینجا بنویسید..."
                            variant="outlined"
                        />
                        <Button
                            onClick={this.onSubmitComment}
                            variant="contained"
                            color="secondary"
                            className={this.state.classes.button}
                            startIcon={<Send />}
                            style={{ marginTop: 3, marginBottom: 3 }}
                        >
                            ثبت نظر
                        </Button>
                        <Button
                            onClick={this.cancel}
                            variant="contained"
                            className={this.state.classes.button}
                            startIcon={<DeleteIcon />}
                            style={{ marginTop: 3, marginBottom: 3, marginRight: "1em", backgroundColor: "#f53867", color: "white" }}
                        >
                            لغو
                        </Button>
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default AddComment