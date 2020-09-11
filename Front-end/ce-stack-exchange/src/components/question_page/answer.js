import React from 'react'
import { Paper, Tooltip } from '@material-ui/core';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt'
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt'
import Comment from './comment'

const GREEN_COLOR = "#7fc91e"
const RED_COLOR = "#b3004a"

class Answer extends React.Component {
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
                <Paper elevation={1} style={{ width: "90%", padding: 1, margin: 5, paddingRight: 10, backgroundColor: "#f5f5f5" }}>
                    <div style={{ display: "flex" }}>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 15, paddingBottom: 15, paddingLeft: 15 }}>
                            <Tooltip title="این پاسخ برایم مفید بود" placement="right" arrow onClick={this.like}>
                                <ThumbUpAlt fontSize="small" style={{ color: this.state.likeColor, marginBottom: 10 }} />
                            </Tooltip>
                            {/* <Check fontSize="large" color="action" /> */}
                            <Tooltip title="این پاسخ برایم مفید نبود" placement="right" arrow onClick={this.dislike}>
                                <ThumbDownAlt fontSize="small" style={{ color: this.state.dislikeColor, marginTop: 10 }} />
                            </Tooltip>
                        </div>
                        <p className="listItem">
                            {this.props.answer.body.split('\n').map(i => {
                                return <p>{i}</p>
                            })}
                        </p>
                    </div>

                </Paper>
                {this.props.answer.comments.map((comment) => {
                    return (
                        <Comment comment={comment} />
                    );
                })}
            </div>
        );
    }
}

export default Answer