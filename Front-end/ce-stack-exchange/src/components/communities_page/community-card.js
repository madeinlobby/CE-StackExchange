import React from 'react'
import { Paper, Card, CardActionArea, CardContent, Typography, CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        [theme.breakpoints.down("sm")]: {
            width: "100%"
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: "47%"
        },
        width: "23%",
        margin: 10,
    },
    media: {
        height: "auto",
        padding: 20
    },
});


class CommunityCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    importAll = (r) => {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    images = this.importAll(require.context('../../resources', false, /\.(png|jpe?g|svg)$/));


    render() {
        const { classes } = this.props;
        return (
            <Card
                style={{ backgroundColor: "#f5f3f0" }}
                raised
                className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        image={this.images[this.props.img]}
                        alt="Community Image" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h5">
                            {this.props.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.props.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

export default withStyles(styles)(CommunityCard)