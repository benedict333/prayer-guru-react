import React from 'react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import CourseComponent from 'component/CourseComponent.js';
function Register() {

  return (    
    <MuiThemeProvider>
    <CourseComponent />
  </MuiThemeProvider>
  );
}

export default Register;
