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
            <div>
                <GridList style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    overflow: 'hidden',
                    padding: 10

                }}>
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