import React from "react";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import PasswordStr from "./PasswordStr";
import "./style.css";

const SignUpForm = ({
  history,
  onSubmit,
  onChange,
  errors,
  user,
  score,
  btnTxt,
  type,
  pwMask,
  onPwChange
}) => {
  return (
    <div className="loginBox">
      <p>ദയവായി താഴെക്കൊടുത്തിരിക്കുന്ന ഫോം പൂരിപ്പിക്കുക</p>
      {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

      <form onSubmit={onSubmit}>
        <TextField
          name="userName"
          floatingLabelText="ഉപയോക്തൃനാമം (Username)"
          value={user.userName}
          onChange={onChange}
          errorText={errors.userName}
          style={{position: 'relative', left: '0%'}} 
        />
          <br />
                <TextField
          name="firstName"
          floatingLabelText="firstName"
          value={user.firstName}
          onChange={onChange}
          errorText={errors.userName}
          style={{position: 'relative', left: '0%'}} 
        />
                <TextField
          name="lastName"
          floatingLabelText="lastName"
          value={user.lastName}
          onChange={onChange}
          errorText={errors.lastName}
        />
         
        <TextField
          name="userEmail"
          floatingLabelText="email"
          value={user.userEmail}
          onChange={onChange}
          errorText={errors.userEmail}
        />
       
       
        <TextField         
          name="telephone"
          floatingLabelText="telephone"
          value={user.telephone}
          onChange={onPwChange}
          errorText={errors.telephone}
        />
        <TextField          
          name="age"
          floatingLabelText="age"
          value={user.age}
          onChange={onPwChange}
          errorText={errors.age}
        />
        <TextField          
          name="address"
          floatingLabelText="address"
          value={user.address}
          onChange={onPwChange}
          errorText={errors.address}
        />
         <TextField
          type={type}
          name="password"
          floatingLabelText="password"
          value={user.password}
          onChange={onPwChange}
          errorText={errors.password}
        />

        <TextField
          type={type}
          name="pwconfirm"
          floatingLabelText="confirm password"
          value={user.pwconfirm}
          onChange={onChange}
          errorText={errors.pwconfirm}
        />
                <div className="pwStrRow">
          {score >= 1 && (
            <div>
              <PasswordStr score={score} /> 
              <FlatButton 
                className="pwShowHideBtn" 
                label={btnTxt} onClick={pwMask} 
                style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}} 
              />
            </div>
            )} 
        </div>
                
        <br />
        <RaisedButton
          className="signUpSubmit"
          primary={true}
          type="submit"
          label="submit"
        />
      </form>
      <p>
        Aleady have an account? <br />
        <a href="/">Log in here</a>
      </p>
    </div>
  );
};

export default SignUpForm;
