import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./Firebase";

//TODO remove empty forms
const createForm = async (userId: string) => {
  const userForms: string[] | undefined = await getUserFormIdInUser(userId);
  const today = new Date();
  const formattedDateToday = `${today.getFullYear()} ${today.getMonth()} ${today.getDate()}`;
  let todayExist = true;

  if (userForms !== undefined) {
    if (userForms.length === 0) {
      await createsAndSavesFormsToUserIfNotExist(userId);
      // Hur många forms sparas vid första inloggning?
    } else {
      const formsExist = await getForms(userId);
      formsExist?.forEach((form) => {
        const formDate = new Date(form.date);
        const formattedFormDate = `${formDate.getFullYear()} ${formDate.getMonth()} ${formDate.getDate()}`;
        if (formattedFormDate === formattedDateToday) {
          todayExist = true;
        } else {
          console.log("Finns inga med dagens datum");
          todayExist = false;
        }
      });
    }

    if (!todayExist) {
      await createsAndSavesFormsToUserIfNotExist(userId);
    }
  } else {
    console.log("Användarformulär är undefined eller null.");
  }
};

const createsAndSavesFormsToUserIfNotExist = async (userId: string) => {
  const formDate = new Date();
  const formattedFormDate = `${formDate.getFullYear()} ${
    formDate.getMonth() + 1
  } ${formDate.getDate()}`;
  const hours = formDate.getHours();
  const minuts = formDate.getMinutes();

  const forms = [
    { title: "Morgon", show: "07.30" },
    { title: "Förmiddag", show: "11.30" },
    { title: "Eftermiddag", show: "15.00" },
    { title: "Kväll", show: "20.00" },
  ];

  for (const form of forms) {
    const formData = {
      userId: userId,
      date: formattedFormDate,
      answer: "",
      title: form.title,
      time: `${hours}.${minuts}`,
      show: form.show,
      finalised: false,
    };
    await saveForms(formData);
  }
  await saveFormIdsToUser(userId);
};

// TODO lägg till limit för hur många som kan hämtas
const getForms = async (userId: string): Promise<IformData[] | undefined> => {
  const forms: IformData[] = [];
  try {
    const UserDataForm = query(
      collection(db, "JournalForm"),
      where("userId", "==", userId)
    );
    const queryresponse = await getDocs(UserDataForm);
    queryresponse.forEach((form) => {
      forms.push(form.data() as IformData);
    });
    return forms;
  } catch (error) {
    console.log(error, "kunde inte hämta forms");
  }
};

const saveForms = async (formData: IformData) => {
  try {
    await addDoc(collection(db, "JournalForm"), formData);
    console.log("added form to db");
  } catch (error) {
    console.log("Error", error);
  }
};

const saveFormIdsToUser = async (userId: string) => {
  const formIds: string[] | undefined = await getFormsIdConnectedToUser(userId);
  console.log(formIds);
  if (formIds !== undefined) await saveIdFormToUser(userId, formIds);
};

const getFormsIdConnectedToUser = async (
  userId: string
): Promise<string[] | undefined> => {
  const formIdToAdd: string[] = [];
  try {
    const UserDataForm = query(
      collection(db, "JournalForm"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(UserDataForm);
    querySnapshot.forEach((doc) => {
      formIdToAdd.push(doc.id);
    });
  } catch (error) {
    console.log("Error", error);
  }
  return formIdToAdd;
};

const saveIdFormToUser = async (
  userId: string,
  formIds: string[]
): Promise<void> => {
  const contactsRef = query(
    collection(db, "users"),
    where("userId", "==", userId)
  );
  let userIdForUserCollection: string = "";
  const querySnapshot = await getDocs(contactsRef);
  querySnapshot.forEach((element) => {
    userIdForUserCollection = element.id;
  });

  const contactUpdate = doc(db, "users", `${userIdForUserCollection}`);
  for (const formId of formIds) {
    try {
      await updateDoc(contactUpdate, {
        forms: arrayUnion(formId),
      });
    } catch (error) {
      console.error("Error updating user document:", error);
      break;
    }
  }
};

const getUserFormIdInUser = async (
  UserId: string
): Promise<string[] | undefined> => {
  let userFormsAndData: string[] | undefined = undefined;
  try {
    const UserDataForm = query(
      collection(db, "users"),
      where("userId", "==", UserId)
    );
    const querySnapshot = await getDocs(UserDataForm);
    querySnapshot.forEach((doc) => {
      const formData = doc.data().forms;
      if (Array.isArray(formData)) {
        userFormsAndData = formData;
      } else {
        console.log("Forms is not an array:", formData);
      }
    });
  } catch (error) {
    console.log("Error", error);
  }
  return userFormsAndData;
};

export { createForm, getForms };
