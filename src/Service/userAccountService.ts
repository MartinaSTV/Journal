import { db } from "../Service/Firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const saveUserData = async (updatedUserName: string, userId: String) => {
  const user = query(collection(db, "users"), where("userId", "==", userId));

  try {
    const UserID = await getDocs(user);
    if (!UserID.empty) {
      const updateRef = doc(db, "users", `${UserID.docs[0].id}`);
      await updateDoc(updateRef, {
        userName: updatedUserName,
      });
    } else {
      console.log("No user found with the given userId");
    }
  } catch (error) {
    console.log(error);
  }
};

const saveBlob = async (blob: Blob): Promise<string> => {
  const storage = getStorage();
  const fileName = `images/${Date.now()}.png`; // Skapa ett korrekt filnamn
  const storageRef = ref(storage, fileName);

  // Ladda upp Blob till Firebase Storage
  const snapshot = await uploadBytes(storageRef, blob);
  console.log(snapshot.ref);
  console.log("Uploaded a blob or file!");

  // Hämta URL från Firebase Storage
  const downloadURL = await getDownloadURL(snapshot.ref);
  console.log("Download URL:", downloadURL);
  return downloadURL;
};

const saveUserPicure = async (userData: IUserData, userId: String) => {
  const userQuery = query(
    collection(db, "users"),
    where("userId", "==", userId)
  );

  try {
    const querySnapshot = await getDocs(userQuery);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const updateRef = doc(db, "users", userDoc.id);
      // Uppdatera användarens dokument i Firestore med den nya bild-URL:en
      await updateDoc(updateRef, {
        ImgUrl: userData.imgUrl,
      });

      console.log("Bild-URL uppdaterad i Firestore");
    } else {
      console.log("No user found with the given userId");
    }
  } catch (error) {
    console.error("Fel vid uppdatering av Firestore:", error);
  }
};
export { saveUserData, saveUserPicure, saveBlob };
