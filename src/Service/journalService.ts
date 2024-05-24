import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./Firebase";

// TODO fixa felmedelande

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
      console.log(form.data().date);
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

  /* const forms: IresponseForm[] = [];
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const UserDataForm = query(
      collection(db, "JournalForm"),
      where("userId", "==", userId),
      where("date", ">=", Timestamp.fromDate(today)),
      where("date", "<", Timestamp.fromDate(tomorrow))
    );

    const queryresponse = await getDocs(UserDataForm);
    queryresponse.forEach((form) => {
      forms.push({ formdata: form.data() as IformData, formId: form.id });
    });

    return forms;
  } catch (error) {
    console.error("Error in getForms:", error);
    return undefined;
  } */
};

const updateIsFinalised = async (formId: string) => {
  console.log(formId);
  const JournalRef = doc(db, "JournalForm", `${formId}`);
  try {
    const res = await updateDoc(JournalRef, {
      finalised: true,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

const updateFormAnswer = async (formId: string, answer: Ianswear[]) => {
  const JournalRef = doc(db, "JournalForm", `${formId}`);
  try {
    await updateDoc(JournalRef, {
      answer: answer,
    });
  } catch (error) {
    console.log(error);
  }
};
export { getTodaysForms, updateIsFinalised, updateFormAnswer };
