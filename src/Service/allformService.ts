import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./Firebase";

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

const deleteForm = async (
  data: IresponseForm,
  setUpdate: (udate: string) => void
) => {
  const formId = data.formId;
  try {
    await deleteDoc(doc(db, "JournalForm", `${formId}`));
    setUpdate("Tagit bort dagboksinlägg");
  } catch (error) {
    setUpdate("Kunde inte ta bort dagboksinlägg");
  }
};
export { getForms, deleteForm };
