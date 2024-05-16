import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./Firebase";

// fixa felmedelande
const getTodaysForms = async (
  userId: string
): Promise<IformData[] | undefined> => {
  const today = new Date();
  const formattedDateToday = `${today.getFullYear()} ${today.getMonth()} ${today.getDate()}`;
  const forms: IformData[] = [];

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
        forms.push(form.data() as IformData);
      }
    });
    return forms;
  } catch (error) {
    console.log(error, "kunde inte hämta forms");
  }
};
export { getTodaysForms };
