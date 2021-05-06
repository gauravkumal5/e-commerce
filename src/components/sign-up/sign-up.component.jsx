import React from "react";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-up.styles.scss";

class SignUp extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         displayName: "",
         email: "",
         password: "",
         confirmPassword: "",
      };
   }
   handleSubmit = async (event) => {
      event.preventDefault();
      const { displayName, email, password, confirmPassword } = this.state;
      console.log(password);

      if (password !== confirmPassword) {
         alert("passwords don't match");
         return;
      }
      try {
         const { user } = await auth.createUserWithEmailAndPassword(email, password);
         this.setState({
            displayName: "",
            email: "",
            password: "",
            confirmPassword: "",
         });
         createUserProfileDocument(user, { displayName });
      } catch (error) {
         console.log(error);
      }
   };
   handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
   };

   render() {
      const { displayName, email, password, confirmPassword } = this.state;
      return (
         <div className="sign-up">
            <h2 className="title">I do not have a account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={this.handleSubmit} className="sign-up-form">
               <FormInput
                  type="text"
                  name="displayName"
                  value={displayName}
                  handleChange={this.handleChange}
                  label="Display Name"
                  required
               />
               <FormInput
                  type="email"
                  name="email"
                  value={email}
                  handleChange={this.handleChange}
                  label="Email"
                  required
               />
               <FormInput
                  type="password"
                  name="password"
                  value={password}
                  handleChange={this.handleChange}
                  label="Password"
                  required
               />
               <FormInput
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  handleChange={this.handleChange}
                  label="Confirm Password"
                  required
               />
               <CustomButton type="submit">Sign Up</CustomButton>
            </form>
         </div>
      );
   }
}

export default SignUp;
