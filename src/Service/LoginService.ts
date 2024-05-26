import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app, db } from "../Service/Firebase";
import { addDoc, collection } from "firebase/firestore";

interface IuserData {
  userName: string;
  userId: string;
  forms: string[];
}

const createUserAccount = async (
  email: string,
  password: string,

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

    console.log(user, "User", user.uid, "test", user.tenantId);

    const userData: IuserData = {
      userName: "Ditt Namn",
      userId: user.uid,
      forms: [],
    };
    saveUserToDb(userData);
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorMessage, errorCode);
    setErrMsg("Kunde inte logga in");
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
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    setErrMsg("kunde inte logga in");
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

export { createUserAccount, logInAccount, onChangeAuth, logOut };
