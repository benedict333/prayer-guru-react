import React from 'react';
import SignUpContainer from "signup/SignUpContainer.js"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";


function Register() {

  return (    
    <MuiThemeProvider>
    <SignUpContainer />
  </MuiThemeProvider>
  );
}

export default Register;
