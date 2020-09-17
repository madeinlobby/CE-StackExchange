import React from "react";
import { GridList } from "@material-ui/core";
import SampleCommunities from "../../sampleDB.json";
import CommunityCard from "./community-card";
import Footer from "../general/website_footer";
import Header from "../general/website_header";

class CommunityPage extends React.Component {
  SampleCommunities = SampleCommunities.commiunities;

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <GridList
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            overflow: "hidden",
            padding: 10,
          }}
        >
          {this.SampleCommunities.map((community) => {
            return (
              <CommunityCard
                name={community.name}
                description={community.discription}
                img={community.imgurl}
              />
            );
          })}
        </GridList>
        <Footer />
      </div>
    );
  }
}

export default CommunityPage;
