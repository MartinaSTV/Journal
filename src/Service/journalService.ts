import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./Firebase";

// TODO fixa felmedelande

const getTodaysForms = async (
  userId: string
): Promise<IresponseForm[] | undefined> => {
  const forms: IresponseForm[] = [];
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const UserDataForm = query(
      collection(db, "JournalForm"),
      where("userId", "==", userId),
      where("dateTimestamp", ">=", Timestamp.fromDate(today)),
      where("dateTimestamp", "<", Timestamp.fromDate(tomorrow))
    );

    const queryresponse = await getDocs(UserDataForm);
    queryresponse.forEach((form) => {
      forms.push({ formdata: form.data() as IformData, formId: form.id });
    });

    return forms;
  } catch (error) {
    console.error("Error in getForms:", error);
    return undefined;
  }
};

const updateIsFinalised = async (formId: string) => {
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
