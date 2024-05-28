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
import { SetStateAction } from "react";

//TODO skapa forms på ett bättre sätt prestanda
//TODO andra dagen så skapas dubbla formulär?? Dubbelkolla detta varför??

const createForm = async (
  userId: string,
  setUpdate: { (value: SetStateAction<boolean>): void; (arg0: boolean): void }
) => {
  const userForms: string[] | undefined = await getUserFormIdInUser(userId);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (userForms !== undefined) {
    if (userForms.length === 0) {
      console.log("Längden är noll");
      await createsAndSavesFormsToUserIfNotExist(userId, today);
    } else {
      // här kan du testa att göra en mer specifik query i getForms och ändra logiken
      const formsExist = await getForms(userId);
      const todayExist: number[] = [];
      formsExist?.forEach((form) => {
        const formDate = new Date(form.formdata.date);
        formDate.setHours(0, 0, 0, 0);

        if (formDate.getTime() === today.getTime()) {
          todayExist.push(1);
          console.log("today exist");
        } else {
          //console.log(`Form date ${formDate} is not equal to today ${today}`);
        }
      });
      console.log(todayExist.length);

      if (todayExist.length === 0) {
        console.log("todayExist är lika med noll");
        await createsAndSavesFormsToUserIfNotExist(userId, today);
        setUpdate(true);
      } else {
        console.log("Användarformulär är undefined eller null.");
      }
    }
  } else {
    console.log("Användarformulär är undefined eller null.");
  }
};

const createsAndSavesFormsToUserIfNotExist = async (
  userId: string,
  today: Date
) => {
  console.log(
    "createsAndSavesFormsToUserIfNotExist anropas med userId:",
    userId,
    "Mer än en gång??"
  );
  try {
    const formattedFormDate = `${today.getFullYear()} ${
      today.getMonth() + 1
    } ${today.getDate()}`;

    const forms = [
      { title: "Morgon", show: "07.30" },
      { title: "Förmiddag", show: "11.30" },
      { title: "Eftermiddag", show: "15.00" },
      { title: "Kväll", show: "20.00" },
    ];

    const answer = [
      { qustion: "" },
      {
        qustion: "",
        subquestions: [
          { subquestion: "" },
          {
            subquestion: "",
            checkBox: ["", "", "", ""],
            textfield: "",
          },
          {
            subquestion: "",
            checkBox: ["", "", "", "", ""],
            textfields: [
              { textfield: "" },
              { textfield: "" },
              { textfield: "" },
              { textfield: "" },
              { textfield: "" },
            ],
          },
        ],
      },
    ];

    const formPromises = forms.map((form) => {
      const formData = {
        userId: userId,
        date: formattedFormDate,
        answer: answer,
        title: form.title,
        show: form.show,
        finalised: false,
      };
      console.log(`Skapar formulär: ${form.title} för ${formattedFormDate}`);
      return saveForms(formData);
    });

    await Promise.all(formPromises);
    await saveFormIdsToUser(userId);
  } catch (error) {
    console.log(error, "Kunde inte skapa form och spara till användare");
  }
};

// TODO lägg till limit för hur många som kan hämtas
const getForms = async (
  userId: string
): Promise<IresponseForm[] | undefined> => {
  const forms: IresponseForm[] = [];
  try {
    const UserDataForm = query(
      collection(db, "JournalForm"),
      where("userId", "==", userId)
    );
    const queryresponse = await getDocs(UserDataForm);
    queryresponse.forEach((form) => {
      forms.push({ formdata: form.data() as IformData, formId: form.id });
    });
    return forms;
  } catch (error) {
    console.log(error, "kunde inte hämta forms");
  }
};

const saveForms = async (formData: any) => {
  try {
    await addDoc(collection(db, "JournalForm"), formData);
    console.log("added form to db");
  } catch (error) {
    console.log("Error", error);
  }
};

const saveFormIdsToUser = async (userId: string) => {
  const formIds: string[] | undefined = await getFormsIdConnectedToUser(userId);
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
