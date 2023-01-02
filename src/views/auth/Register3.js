import React, { Component } from "react";


import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from "@material-ui/core/Checkbox";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons components
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import School from "@material-ui/icons/School";
//import Form from "react-jsonschema-form";

// core components
// import componentStyles from "assets/theme/views/auth/register.js";







// import Form from "react-jsonschema-form";
// import { SignUpDataSchema } from "schemas/SignUpDataSchema";
// import { SignUpUiSchema } from "schemas/SignUpUiSchema";



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));


class Register extends Component {
  constructor(props) {
    super(props);

    //this.showResult = this.showResult.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      // error: null,
      // uiSchema: null,
      // loadingUiSchema: true,
      // errorLoadingUiSchema: null,
      // dataSchema: null,
      // loadingDataSchema: true,
      // errorLoadingDataSchema: null,
      // insertingSecret: false,
      // errorInserting: null
      classes: null,
      theme: null
    };
  }
  onSubmit(formData) {}
  componentDidMount() {

  }

  //const classes = useStyles();
  // const theme = useTheme();
  render() {
    //const { classes, theme} = this.state;
  const classes = useStyles();
    const theme = useTheme();
    //const { classes } = this.props;
    return (
      <>
      <Grid item xs={12} lg={6} md={8}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader
            className={classes.cardHeader}
            title={
              <Box
                fontSize="80%"
                fontWeight="400"
                component="small"
                color={theme.palette.gray[600]}
              >
                Sign up with
              </Box>
            }
            titleTypographyProps={{
              component: Box,
              textAlign: "center",
              marginBottom: "1rem!important",
              marginTop: ".5rem!important",
              fontSize: "1rem!important",
            }}
            subheader={
              <Box textAlign="center">
                <Box
                  component={Button}
                  variant="contained"
                  marginRight="2rem!important"
                  classes={{ root: classes.buttonRoot }}
                >
                  <Box component="span" marginRight="4px">
                    <Box
                      alt="..."
                      component="img"
                      width="20px"
                      className={classes.buttonImg}
                      src={
                        require("assets/img/icons/common/github.svg").default
                      }
                    ></Box>
                  </Box>
                  <Box component="span" marginLeft=".75rem">
                    Github
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  classes={{ root: classes.buttonRoot }}
                >
                  <Box component="span" marginRight="4px">
                    <Box
                      alt="..."
                      component="img"
                      width="20px"
                      className={classes.buttonImg}
                      src={
                        require("assets/img/icons/common/google.svg").default
                      }
                    ></Box>
                  </Box>
                  <Box component="span" marginLeft=".75rem">
                    Google
                  </Box>
                </Button>
              </Box>
            }
          ></CardHeader>
          <CardContent classes={{ root: classes.cardContent }}>
            <Box
              color={theme.palette.gray[600]}
              textAlign="center"
              marginBottom="1.5rem"
              marginTop=".5rem"
              fontSize="1rem"
            >
              <Box fontSize="80%" fontWeight="400" component="small">
                Or sign up with credentials
              </Box>
            </Box>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1.5rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="text"
                placeholder="Name"
                startAdornment={
                  <InputAdornment position="start">
                    <School />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1.5rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="email"
                placeholder="Email"
                startAdornment={
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1.5rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="password"
                placeholder="Password"
                startAdornment={
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              fontStyle="italic"
              fontSize="1rem"
              color={theme.palette.gray[600]}
              marginBottom=".5rem"
            >
              <Box component="small" fontSize="80%">
                password strength:{" "}
                <Box
                  component="span"
                  fontWeight="700"
                  color={theme.palette.success.main}
                >
                  strong
                </Box>
              </Box>
            </Box>
            <FormControlLabel
              value="end"
              control={<Checkbox color="primary" />}
              label={
                <>
                  I agree with the{" "}
                  <Box
                    color={theme.palette.primary.main}
                    component="a"
                    textDecoration="none"
                  >
                    Privacy Policy
                  </Box>
                </>
              }
              labelPlacement="end"
              classes={{
                root: classes.formControlLabelRoot,
                label: classes.formControlLabelLabel,
              }}
            />
            <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
              <Button color="primary" variant="contained">
                Create account
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
         
    );
  }
}

export default Register;