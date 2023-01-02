import React from "react";
// @material-ui/core components
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
import Form from "react-jsonschema-form";

class EditSecrets extends Component {
  constructor(props) {
    super(props);

    this.showResult = this.showResult.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      error: null,
      uiSchema: null,
      loadingUiSchema: true,
      errorLoadingUiSchema: null,
      dataSchema: null,
      loadingDataSchema: true,
      errorLoadingDataSchema: null,
      insertingSecret: false,
      errorInserting: null
    };
  }

  showResult(data) {
    this.setState({
      statusText:
        "The secrets for the " +
        this.props.location.state.connectorId +
        " connector with this id " +
        this.props.location.state.configId +
        " was successfully updated."
    });

    this.props.history.push({
      pathname: "/Results",
      state: {
        statusText: this.state.statusText,
        connectorId: this.props.location.state.connectorId,
        configId: this.props.location.state.configId,
        connectors: this.props.location.state.connectors,
        erCode: this.props.location.state.erCode
      }
    });
  }

  replaceWorkdayPasswords(formData) {
    //From Kelli/Jill:  Essentially, if you see a password with the value in the
    //right column (such as &quot; ), the value you see in the left column
    //(such as  " ) is the one that was provided on the password and had to be
    // manually replaced.

    // "      &quot;
    // '      &apos;
    // <      &lt;
    // >      &gt;
    // &      &amp;
    // \      &bsol;

    // Only do this for workday (has -wd- in the connector id) because on the
    // mulesoft side, the passwords are not encoded correctly for workday's xml
    // web service.  If we get to a point where we are encoding passwords
    // correctly on the muleside, we can remove this code.  It's just a quick fix.

    //test example:
    //te<<st"6'lld8&l3d&amp;3<77ss>kkd\
    //te&lt;&lt;st&quot;6&apos;lld8&amp;l3d&amp;3&lt;77ss&gt;kkd&bsol;

    if (this.props.location.state.connectorId.includes("-wd-")) {
      var passwordFields = [];

      console.log(
        "Replacing special characters in password fields for a config of type: " +
          this.props.location.state.connectorId +
          "."
      );

      // loop around the keys of the ui-schema
      for (let [key, value] of Object.entries(this.state.uiSchema.secrets)) {
        if (value["ui:widget"] === "password") {
          passwordFields.push(key);
        }
      }

      passwordFields.forEach(function(passwordField) {
        console.log("Replacing special characters in " + passwordField + ".");
        var passwordValue = formData.formData.secrets[passwordField];

        //in case someone already did the ampersand replace manually, set it
        //back to & and then do the replace.  This way, we don't end up with
        //&amp;amp;
        passwordValue = passwordValue.replace(/&amp;/g, "&");
        passwordValue = passwordValue.replace(/&/g, "&amp;");
        passwordValue = passwordValue.replace(/"/g, "&quot;");
        passwordValue = passwordValue.replace(/'/g, "&apos;");
        passwordValue = passwordValue.replace(/</g, "&lt;");
        passwordValue = passwordValue.replace(/>/g, "&gt;");
        passwordValue = passwordValue.replace(/\\/g, "&bsol;");

        formData.formData.secrets[passwordField] = passwordValue;
      });
    }
  }

  onSubmit(formData) {
    this.replaceWorkdayPasswords(formData);

    const data = SerializationHelper.StringifyInOrder(formData.formData);

    const postUri =
      config.OPS_CON_CONFIG_SERVICE +
      "connectors/" +
      this.props.location.state.connectorId +
      "/configs/" +
      this.props.location.state.configId +
      "/secrets";

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    this.setState({ insertingSecret: true });

    axios
      .post(postUri, data, { headers: headers })
      .then(response => {
        return response.data;
      })
      .then(data => this.showResult(data))
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          this.setState({
            error:
              error.response.data === ""
                ? error.response.status + " - " + error.response.statusText
                : JSON.stringify(error.response.data),
            isLoading: false
          });
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          this.setState({ error: NO_RESPONSE });
        } else {
          // Something happened in setting up the request that triggered an Error
          this.setState({ error: error.message });
        }
      });
  }

  componentDidMount() {
    this.setState({ loadingDataSchema: true, loadingUiSchema: true });

    if (STATIC_SCHEMAS) {
      // While enabling a new secret for Ops Console, we can test the hard-code schemas making the STATIC_SCHEMAS: True
      this.setState({
        dataSchema: Utility.GetSecretsPostDataSchema(),
        loadingDataSchema: false
      });
    } else {
      const dataSchemaUrl =
        config.OPS_CON_CONFIG_SERVICE +
        "connectors/" +
        this.props.location.state.connectorId +
        "/data-schema/secrets";

      axios
        .get(dataSchemaUrl)
        .then(response =>
          this.setState({ dataSchema: response.data, loadingDataSchema: false })
        )
        .catch(errorLoadingDataSchema => {
          if (errorLoadingDataSchema.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            this.setState({
              errorLoadingDataSchema: JSON.stringify(
                errorLoadingDataSchema.response.data
              ),
              loadingDataSchema: false
            });
          } else if (errorLoadingDataSchema.request) {
            // The request was made but no response was received
            // `errorLoadingDataSchema.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            this.setState({
              errorLoadingDataSchema: NO_RESPONSE,
              loadingDataSchema: false
            });
          } else {
            // Something happened in setting up the request that triggered an errorLoadingDataSchema
            this.setState({
              errorLoadingDataSchema: errorLoadingDataSchema.message,
              loadingDataSchema: false
            });
          }
        });
    }

    if (STATIC_SCHEMAS) {
      this.setState({
        uiSchema: Utility.GetSecretsPostUiSchema(),
        loadingUiSchema: false
      });
    } else {
      const uiSchemaUrl =
        config.OPS_CON_CONFIG_SERVICE +
        "connectors/" +
        this.props.location.state.connectorId +
        "/ui-schema/secrets";

      axios
        .get(uiSchemaUrl)
        .then(response =>
          this.setState({ uiSchema: response.data, loadingUiSchema: false })
        )
        .catch(errorLoadingUiSchema => {
          if (errorLoadingUiSchema.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            this.setState({
              errorLoadingUiSchema: JSON.stringify(
                errorLoadingUiSchema.response.data
              ),
              loadingUiSchema: false
            });
          } else if (errorLoadingUiSchema.request) {
            // The request was made but no response was received
            // `errorLoadingDataSchema.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            this.setState({
              errorLoadingUiSchema: NO_RESPONSE,
              loadingUiSchema: false
            });
          } else {
            // Something happened in setting up the request that triggered an errorLoadingDataSchema
            this.setState({
              errorLoadingUiSchema: errorLoadingUiSchema.message,
              loadingUiSchema: false
            });
          }
        });
    }
  }

  render() {
    const {
      error,
      uiSchema,
      loadingUiSchema,
      errorLoadingUiSchema,
      dataSchema,
      loadingDataSchema,
      errorLoadingDataSchema,
      insertingSecret,
      errorInserting
    } = this.state;

    // Below Data is not available yet
    if (error) {
      return (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      );
    }

    if (errorLoadingUiSchema) {
      return (
        <div className="alert alert-danger" role="alert">
          {errorLoadingUiSchema}
        </div>
      );
    }

    if (errorLoadingDataSchema) {
      return (
        <div className="alert alert-danger" role="alert">
          {errorLoadingDataSchema}
        </div>
      );
    }

    if (errorInserting) {
      return (
        <div className="alert alert-danger" role="alert">
          An error occurred while inserting the secret.
          <div>{errorInserting}</div>
        </div>
      );
    }

    if (loadingUiSchema) {
      return (
        <div className="alert alert-info" role="alert">
          Loading ui schema...
        </div>
      );
    }

    if (loadingDataSchema) {
      return (
        <div className="alert alert-info" role="alert">
          Loading data schema...
        </div>
      );
    }

    if (Object.keys(dataSchema).length === 0) {
      return (
        <div className="alert alert-info" role="alert">
          There are no secrets for this connector.
        </div>
      );
    }

    if (insertingSecret) {
      return (
        <div className="alert alert-info" role="alert">
          Inserting the secret...
        </div>
      );
    }

    return (
      <div className="nav">
        <div className="form-Align inputAlign configForm">
          <React.Fragment>
            <ErrorBoundary>
              <Form
                onSubmit={this.onSubmit}
                uiSchema={uiSchema}
                schema={dataSchema}
                formData={this.state.formData}
                widgets={{
                  PasswordWidget: PasswordWidget
                }}
              >
                <div>
                  <button className="btn btn-info" type="submit">
                    Save
                  </button>
                </div>
              </Form>
            </ErrorBoundary>
          </React.Fragment>
        </div>
      </div>
    );
  }
}

export default EditSecrets;
