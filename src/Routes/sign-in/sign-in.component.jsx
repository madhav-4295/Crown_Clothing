import { signInWIthGooglePopup,createUserDocFromAuth } from "../../utils/firebase/firebase.utlis";
 
const SignIn = () => {
    const logGoogleUSer = async () =>{
        const resp = await signInWIthGooglePopup();
        console.log(resp);
        const userDocRef = await createUserDocFromAuth(resp.user)
    }
  return (
    <div>
      <h1>SIGNIN</h1>
      <button onClick={logGoogleUSer}>Sign in with google</button>
    </div>
  );
};
export default SignIn;
