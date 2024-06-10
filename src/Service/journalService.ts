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

// TODO fixa bättre felmedelande

const getTodaysForms = async (
  userId: string
): Promise<IresponseForm[] | undefined> => {
  const forms: IresponseForm[] = [];
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const startOfDayTimestamp = Timestamp.fromDate(today);
    const endOfDayTimestamp = Timestamp.fromDate(tomorrow);

    const userDataFormQuery = query(
      collection(db, "JournalForm"),
      where("userId", "==", userId),
      where("dateTimestamp", ">=", startOfDayTimestamp),
      where("dateTimestamp", "<", endOfDayTimestamp)
    );

    const querySnapshot = await getDocs(userDataFormQuery);

    if (querySnapshot.empty) {
      console.log("No forms found for today.");
      return forms;
    }

    querySnapshot.forEach((doc) => {
      forms.push({ formdata: doc.data() as IformData, formId: doc.id });
    });

    return forms;
  } catch (error) {
    console.error("Error in getTodaysForms:", error);
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
