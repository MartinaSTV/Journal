import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./Firebase";

// fixa felmedelande

const getTodaysForms = async (
  userId: string
): Promise<IresponseForm[] | undefined> => {
  const today = new Date();
  const formattedDateToday = `${today.getFullYear()} ${today.getMonth()} ${today.getDate()}`;
  const forms: IresponseForm[] = [];

  try {
    const UserDataForm = query(
      collection(db, "JournalForm"),
      where("userId", "==", userId)
    );
    const queryresponse = await getDocs(UserDataForm);
    queryresponse.forEach((form) => {
      const formDate = new Date(form.data().date);
      const formattedFormDate = `${formDate.getFullYear()} ${formDate.getMonth()} ${formDate.getDate()}`;

      if (formattedFormDate === formattedDateToday) {
        forms.push({ formdata: form.data() as IformData, formId: form.id });
      }
    });

    return forms;
  } catch (error) {
    console.log(error, "kunde inte hämta forms");
  }
};

// funkar ej, varför?
const updateIsFinalised = async (formId: string) => {
  const JournalRef = doc(db, "journalForm", `${formId}`);
  await updateDoc(JournalRef, {
    finalised: true,
  });
};

const UpdateFormAnswer = () => {};

export { getTodaysForms, updateIsFinalised, UpdateFormAnswer };
