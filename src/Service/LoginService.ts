import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app, db } from "../Service/Firebase";
import { addDoc, collection } from "firebase/firestore";
import defaulImg from "../assets/cartoon-character-with-handbag-sunglasses(1).jpg";

interface IuserData {
  userName: string;
  userId: string;
  forms: string[];
  imgUrl: string;
}

const createUserAccount = async (
  email: string,
  password: string,
  setToken: (token: string) => void,
  setErrMsg: (errMsg: string) => void
) => {
  const auth = getAuth(app);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userData: IuserData = {
      userName: email,
      userId: user.uid,
      forms: [],
      imgUrl: defaulImg,
    };
    const accessToken = await user.getIdToken();
    saveUserToDb(userData);
    setToken(accessToken);
    return accessToken;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorMessage, errorCode);
    setErrMsg(errorMessage);
  }
};

const saveUserToDb = async (userData: IuserData) => {
  try {
    const resp = await addDoc(collection(db, "users"), userData);
    console.log(resp, "added user to db");
  } catch (error) {
    console.log("Error", error);
  }
};
const logInAccount = async (
  email: string,
  password: string,
  setToken: (token: string) => void,
  setErrMsg: (errMsg: string) => void
) => {
  const auth = getAuth(app);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const accessToken = await user.getIdToken();
    setToken(accessToken);

    return accessToken;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    setErrMsg(errorMessage);
  }
};

const onChangeAuth = (setUserId: (uid: string) => void) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setUserId(uid);
      // ...
    } else {
      // User is signed out
      console.log("NoUser");
    }
  });
};

const logOut = async (setAndNavigate: () => void) => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      setAndNavigate();
    })
    .catch((error) => {
      console.log(error);
    });
};

const resetPasswordSendMail = (
  email: string,
  setResetPassword: (msg: string) => void
) => {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      setResetPassword(
        "Länk skickat till din mail för att återställa ditt lösenord"
      );
      setTimeout(() => {
        setResetPassword("");
      }, 2000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      setResetPassword("Kunde inte återställa ditt lösenord");
      setTimeout(() => {
        setResetPassword("");
      }, 2000);
    });
};

export {
  createUserAccount,
  logInAccount,
  onChangeAuth,
  logOut,
  resetPasswordSendMail,
};
