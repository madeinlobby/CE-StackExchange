import React from "react";
import { Tabs, Tab } from "@material-ui/core";
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPaneL = (props) => {
    const { children, value, index, ...other } = props;
    return (
      <div role="tabpanel" hidden={value !== index} {...other}>
        {value === index && (
          <div style={{ paddingRight: 40, paddingLeft: 40 }}>{children}</div>
        )}
      </div>
    );
  };

  return (
    <>
      <Tabs className={classes.tabView} value={value} onChange={handleChange}>
        <Tab label="مشخصات فردی" />
        <Tab label="ویرایش مشخصات فردی" />
        <Tab label="تغییر رمز عبور" />
      </Tabs>
      <TabPaneL value={value} index={0}>
        <PersonalInfo />
      </TabPaneL>
      <TabPaneL value={value} index={1}>
        <EditPersonalInfo />
      </TabPaneL>
      <TabPaneL value={value} index={2}>
        <EditPassword />
      </TabPaneL>
    </>
  );
}
