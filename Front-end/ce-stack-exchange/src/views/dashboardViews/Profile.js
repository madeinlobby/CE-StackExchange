import React, { useEffect, useState } from "react";
import { Tabs, Tab, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PersonalInfo from "../../components/DashboardComponents/profile/PersonalInfo";
import EditPassword from "../../components/DashboardComponents/profile/EditPassword";
import EditPersonalInfo from "../../components/DashboardComponents/profile/EditPersonalInfo";

const useStyles = makeStyles((theme) => ({
  tabView: {
    padding: 50,
  },
}));

export default function Profile() {
  const classes = useStyles();

  const [userData, setUserData] = useState({
    isForOwn: false,
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    aboutMe: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "url" +
            "/user/profile" +
            `?username=${localStorage.getItem("current-username")}`,
          {
            header: {
              "Content-Type": "application/json",
              "Authorization": "Bearer" + localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) {
          throw Error(response.statusText);
        }
        const data = await response.json();

        setUserData({
          isForOwn: data["is for own"],
          username: data.username,
          firstname: data["first name"],
          lastname: data["last name"],
          email: data.email,
          aboutMe: data["about me"],
        });

        //TODO : catch error message
      } catch (error) {
        //TODO : handle errors
      }
    };

    fetchData();
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPaneL = (props) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        {...other}
        style={{ width: "100%" }}
      >
        {value === index && (
          <div style={{ paddingRight: 40, paddingLeft: 40, width: "100%" }}>
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <Tabs
        className={classes.tabView}
        value={value}
        onChange={handleChange}
        variant="scrollable"
      >
        <Tab label="مشخصات فردی" />
        <Tab
          style={{ display: userData.isForOwn ? "initial" : "none" }}
          label="ویرایش مشخصات فردی"
        />
        <Tab
          style={{ display: userData.isForOwn ? "initial" : "none" }}
          label="تغییر رمز عبور"
        />
      </Tabs>
      <TabPaneL value={value} index={0}>
        <PersonalInfo
          username={userData.username}
          firstname={userData.firstname}
          lastname={userData.lastname}
          aboutMe={userData.aboutMe}
        />
      </TabPaneL>
      <TabPaneL value={value} index={1}>
        <EditPersonalInfo
          username={userData.username}
          firstname={userData.firstname}
          lastname={userData.lastname}
          email={userData.email}
          aboutMe={userData.aboutMe}
        />
      </TabPaneL>
      <TabPaneL value={value} index={2}>
        <EditPassword />
      </TabPaneL>
    </div>
  );
}
