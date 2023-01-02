import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "assets/theme/theme.js";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

// import ListCoursesComponent from "./component/ListCoursesComponent";

// import CourseComponent from "./component/CourseComponent";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Route path="/admin" render={(props) => <index {...props} />} />
        {/* <Route path="/courses" exact component={ListCoursesComponent} />
        <Route path="/courses/:id" component={CourseComponent} />
        <Route path="/" exact component={ListCoursesComponent} /> */}
        <Redirect from="/" to="/admin/index" />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>,
  document.querySelector("#root")
);
