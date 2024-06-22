import { useState,useContext} from "react";
import FormInput from "../form-input/form-input";
import Button from "../button/button.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
  signInWIthGooglePopup,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utlis";
import { UserContext } from "../../context/user.context";
import "./signin-form.styles.scss";
const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const {setCurrentUser} = useContext(UserContext);
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const signInWithGoogle = async () => {
    const { user } = await signInWIthGooglePopup();
    await createUserDocFromAuth(user);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password)
      setCurrentUser(user)
      resetFormFields();
    } catch (error) {
      console.log(error.code)
      switch(error.code){
        case 'auth/invalid-credential':
          alert('incorrect password');
          break;
        case 'auth/user-not-found':
          alert('no user found');
          break;
        case 'auth/popup-closed-by-use':
          console.log('popup closed');    
        default:
          console.log("error found")
      }
    }
  };
  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">SIGN IN</Button>
          <Button buttonType="google" onClick={signInWithGoogle} type="button">
            Google Sign In
          </Button>
        </div>
    
      </form>
    </div>
  );
};

export default SignInForm;
