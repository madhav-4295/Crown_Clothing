import SignUpForm from "../../Components/sign-up-form/signup-form";
import SignInForm from "../../Components/sign-in-form/signin-form";
import './authentication.styles.scss';
const Authentication = () => { 
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};
export default Authentication;
