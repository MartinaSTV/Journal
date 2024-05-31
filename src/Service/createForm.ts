import {
  Timestamp,
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
import { getTodaysForms } from "./journalService";

//TODO skapa forms på ett bättre sätt prestanda mässigt
//TODO skapas dubbleter om man är inloggad och väntar en dag

const createForm = async (
  userId: string,
  setUpdate: { (value: SetStateAction<boolean>): void; (arg0: boolean): void }
) => {
  console.log(userId);
  const userForms: string[] | undefined = await getUserFormIdInUser(userId);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (userForms !== undefined) {
    if (userForms.length === 0) {
      console.log("Längden är noll");
      await createsAndSavesFormsToUserIfNotExist(userId, today);
      setUpdate(true);
    } else {
      const formsExit = await getTodaysForms(userId);
      console.log(formsExit, "formExistresp", today, "idag");
      if (formsExit && formsExit?.length > 0) {
        console.log("form exist");
      } else {
        await createsAndSavesFormsToUserIfNotExist(userId, today);
        setUpdate(true);
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
        dateTimestamp: Timestamp.fromDate(new Date()),
        answer: answer,
        title: form.title,
        show: form.show,
        finalised: false,
      };
      console.log(`Skapar formulär: ${form.title} för ${formattedFormDate}`);
      return saveForms(formData);
    });

    const formIds: any = await Promise.all(formPromises);
    if (formIds !== undefined) {
      await saveIdFormToUser(userId, formIds);
    }
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
    const formCreated = await addDoc(collection(db, "JournalForm"), formData);
    console.log("added form to db");
    return formCreated.id;
  } catch (error) {
    console.log("Error", error);
  }
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
