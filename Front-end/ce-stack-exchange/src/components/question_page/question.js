import React from 'react'
import { Paper, Tooltip } from '@material-ui/core';
import Icon from '@material-ui/core/Icon'
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt'
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt'
import Check from '@material-ui/icons/Check'

const GREEN_COLOR = "#7fc91e"
const RED_COLOR = "#b3004a"

class QuestionPart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            likeColor: "grey",
            dislikeColor: "grey"
        }
    }

    like = () => {
        if (this.state.likeColor == GREEN_COLOR) {
            this.setState({
                likeColor: "grey"
            })
            //TODO remove upvote
        } else {
            this.setState({
                likeColor: GREEN_COLOR,
                dislikeColor: "grey"
            })
            //TODO add upvote
        }
    }

    dislike = () => {
        if (this.state.dislikeColor == RED_COLOR) {
            this.setState({
                dislikeColor: "grey"
            })
            //TODO remove downvote
        } else {
            this.setState({
                dislikeColor: RED_COLOR,
                likeColor: "grey"
            })
            //TODO add downvote
        }
    }

    render() {
        return (
            <div>
                <Paper elevation={1} style={{ margin: 10, padding: 15, backgroundColor: "#f5f5f5" }}>
                    <div style={{ display: "flex" }}>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingTop: 15, paddingBottom: 15 }}>
                            <Tooltip title="این سوال برایم مفید بود" placement="right" arrow onClick={this.like}>
                                <ThumbUpAlt fontSize="large" style={{ color: this.state.likeColor }} />
                            </Tooltip>
                            {/* <Check fontSize="large" color="action" /> */}
                            <Tooltip title="این سوال برایم مفید نبود" placement="right" arrow onClick={this.dislike}>
                                <ThumbDownAlt fontSize="large" style={{ color: this.state.dislikeColor }} />
                            </Tooltip>
                        </div>
                        <div style={{ marginRight: 20 }}>
                            <h2>{this.props.question.title}</h2>
                            <h5>پرسیده شده در {this.props.question.time} توسط {this.props.question.userId}</h5>
                        </div>
                    </div>
                    {this.props.question.body.split('\n').map(i => {
                        return <p>{i}</p>
                    })}
                </Paper>
            </div>
        );
    }
}

export default QuestionPart