import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons components
// import ArrowDownward from "@material-ui/icons/ArrowDownward";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import EmojiEvents from "@material-ui/icons/EmojiEvents";
// import GroupAdd from "@material-ui/icons/GroupAdd";
// import InsertChartOutlined from "@material-ui/icons/InsertChartOutlined";
// import PieChart from "@material-ui/icons/PieChart";

// core components
import CardStats from "components/Cards/CardStats.js";

import componentStyles from "assets/theme/components/header.js";
import MarqueeText from 'react-marquee-text-component';

const useStyles = makeStyles(componentStyles);

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const text =" നവവത്സരാശംസകൾ! ഈ വെബ്സൈറ്റിന്റ്റെ പ്രവർത്തനം പുരോഗമിച്ചുകൊണ്ടിരിക്കുന്നു! ദയവായി കാത്തിരിക്കുക!"
  return (
    <>
      <div className={classes.header}>
        <Container
          maxWidth={false}
          component={Box}
          classes={{ root: classes.containerRoot }}
        >
          <div>
            <Grid container>
              <Grid item xl={12} lg={12} xs={12}>
                <CardStats
                
                  subtitle="ബേബിച്ചേട്ടൻ, പ്രാർത്ഥനയുടെ ആചാര്യൻ "
                  title={<MarqueeText text={text}/>}
                  // icon={InsertChartOutlined}
                  // color="bgError"
                  // footer={
                  //   <>
                  //     {/* <Box
                  //       component="span"
                  //       fontSize=".875rem"
                  //       color={theme.palette.success.main}
                  //       marginRight=".5rem"
                  //       display="flex"
                  //       alignItems="center"
                  //     >
                  //       <Box
                  //         component={ArrowUpward}
                  //         width="1.5rem!important"
                  //         height="1.5rem!important"
                  //       />{" "}
                  //       3.48%
                  //     </Box> */}
                  //     {/* <Box component="span" whiteSpace="nowrap">
                  //       Since last month
                  //     </Box> */}
                  //   </>
                  // }
                />                
              </Grid>

            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;