import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import componentStyles from "assets/theme/components/admin-footer.js";

const useStyles = makeStyles(componentStyles);

const Footer = () => {
  const classes = useStyles();
  return (
    <Box component="footer" width="100%" padding="2.5rem 0">
      <Grid container classes={{ root: classes.justifyContentCenter }}>
        

        <Grid
          item
          xl={6}
          component={Box}
          display="flex"
          justifyContent="flex-end"
        >
          <Box
            component={List}
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.flexDirectionColumn}
          >
            <ListItem
              component="a"
             // href="https://www.creative-tim.com?ref=adr-admin-footer"
              rel="noopener noreferrer"
              target="_blank"
              classes={{
                root: classes.listItemRoot,
              }}
            >
             
            </ListItem>

            <ListItem
              component="a"
              href="https://chat.whatsapp.com/7qp6xJaYnv0IWuUL2e4QS8"
              rel="noopener noreferrer"
              target="_blank"
              classes={{
                root: classes.listItemRoot,
              }}
            >
             ബേബിച്ചേട്ടൻ്റെ പ്രാർത്ഥനഗ്രൂപ്പിൽപ്പെട്ടവരുള്ള Whatsapp ഗ്രൂപ്പിൽ ചേരുവാൻ ഇവിടെ ക്ലിക്ക് ചെയ്യുക.              
            </ListItem>
            <Box
          item
          xs={12}
          xl={6}
          component={Grid}
          display="flex"
          alignItems="center"
          className={classes.justifyContentCenter}
        >
          <div className={classes.copyrightWrapper}>
            © {new Date().getFullYear()}{" "}
            <a
              className={classes.copyrightLink}
              // href="https://www.creative-tim.com?ref=adr-admin-footer"
              rel="noopener noreferrer"
              target="_blank"
            >
              Prayerguru Admin
            </a>
          </div>
        </Box>
           
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
