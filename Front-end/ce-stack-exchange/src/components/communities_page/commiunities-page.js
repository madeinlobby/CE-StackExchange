import React from 'react'
import { Grid, GridList, Paper } from '@material-ui/core';
import SampleCommunities from '../../sampleDB.json'
import CommunityCard from './community-card';

class CommunityPage extends React.Component {

    SampleCommunities = SampleCommunities.commiunities

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                overflow: 'hidden',
            }}>
                <GridList>
                    {this.SampleCommunities.map((community) => {
                        return (
                            <CommunityCard name={community.name} description={community.discription} img={community.imgurl} />
                        );
                    })}
                </GridList>
            </div>
        );
    }
}

export default CommunityPage