import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function ExpenseTracker() {

    const authWithGoogle = async () => {
        // This is going to return the information of the user that just signed in
        const result = await signInWithPopup(auth, provider);
        const authInfo = {
            userID: result.user.uid,
            name: result.user.displayName,
            profilePhoto: result.user.photoURL,
            isAuth: true,
        }
        localStorage.setItem("auth", JSON.stringify(authInfo));
    }

  return (
    <div className="login-page">
      <button className="login-with-google-btn" onClick={authWithGoogle}>Sign In with Google</button>
    </div>
  );
}

export default ExpenseTracker;
