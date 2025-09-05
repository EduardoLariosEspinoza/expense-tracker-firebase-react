import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import "./styles.css";

function Auth() {
  const navigate = useNavigate();

  const { isAuth } = useGetUserInfo();

  const authWithGoogle = async () => {
    // This is going to return the information of the user that just signed in
    const result = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: result.user.uid,
      name: result.user.displayName,
      profilePhoto: result.user.photoURL,
      isAuth: true,
    };

    localStorage.setItem("auth", JSON.stringify(authInfo));

    navigate("/expense-tracker");
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="login-page">
      <button className="login-with-google-btn" onClick={authWithGoogle}>
        Sign In with Google
      </button>
    </div>
  );
}

export default Auth;
