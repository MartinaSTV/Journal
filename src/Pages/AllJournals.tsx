import { useState } from "react";
import { useRecoilState } from "recoil";
import User from "../atoms/user";

const AllJournals = () => {
  const [userId] = useRecoilState(User);
  const [allForms, setAllForms] = useState<IformData[]>([]);

  /*   useEffect(() => {
    //varför har den inte permissions?
    const getData = async () => {
      const forms = await getForms(userId);
      console.log(forms);
      if (forms !== undefined) setAllForms([...forms]);
    };
    getData();
    console.log(allForms);
  }, []); */

  return (
    <>
      <h1>Alla Dagboksinlägg</h1>
    </>
  );
};
export default AllJournals;
