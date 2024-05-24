import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import User from "../atoms/user";
import { getForms } from "../Service/createForm";
import { onChangeAuth } from "../Service/LoginService";
import UserAtom from "../atoms/user";
import bgBig from "../../public/bgBig.png";
import MenuBig from "../componens/MenyBig";
import AllFormsBtn from "../componens/AllFormsBtn";
import MenuBottomBar from "../componens/MenyBottomBar";

const AllJournals = () => {
  const [userId] = useRecoilState(User);
  const [allForms, setAllForms] = useState<IresponseForm[]>([]);
  const [allFormsCopy, setAllFormsCopy] = useState<IresponseForm[]>([]);
  const [, setUserId] = useRecoilState(UserAtom);
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  onChangeAuth(setUserId);

  useEffect(() => {
    const getData = async () => {
      const forms = await getForms(userId);
      if (forms !== undefined) {
        setAllForms([...forms]);
        setAllFormsCopy([...forms]);
      }
    };
    getData();
  }, []);

  const FilterByDate = () => {
    const filteredByDate = allFormsCopy.filter((form) => {
      const formDate = new Date(form.formdata.date);
      formDate?.setHours(0, 0, 0, 0);
      fromDate?.setHours(0, 0, 0, 0);
      toDate?.setHours(0, 0, 0, 0);

      if (formDate >= fromDate && formDate <= toDate) {
        return form;
      }
    });
    filteredByDate.sort((a, b) => {
      const parseTime = (timeStr: any) => {
        const [hours, minutes] = timeStr.split(".").map(Number);
        return hours * 60 + minutes; // Omvandlar tiden till minuter
      };
      const timeA = parseTime(a.formdata.show);
      const timeB = parseTime(b.formdata.show);

      return timeA - timeB;
    });
    setAllForms(filteredByDate);
  };

  return (
    <section
      className="flex flex-col max-w-[1500px] relative "
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${bgBig})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <MenuBig />
      <h1 className="text-white text-4xl font-normal mt-10 ml-5 md:text-5xl ">
        Dina dagboksinlägg
      </h1>
      <article className="flex flex-col  ml-5 mr-5 mb-10 mt-10 md:items-center text-white font-medium">
        <div className="flex flex-col w-[213px] ">
          <label htmlFor="fromDate">Från datum</label>
          <input
            onChange={(e) => {
              const date: Date = new Date(e.target.value);
              setFromDate(date);
            }}
            id="fromDate"
            type="date"
            className="text-black rounded h-[52px] p-2"
          />
        </div>
        <div className="flex flex-col  w-[213px]">
          <label htmlFor="ToDate">Till datum</label>
          <input
            onChange={(e) => {
              const date: Date = new Date(e.target.value);
              setToDate(date);
            }}
            id="ToDate"
            type="date"
            className="text-black rounded h-[52px] p-2"
          />
        </div>
        <button
          onClick={() => {
            FilterByDate();
          }}
          className="border max-w-[339px] shadow-lg text-black mt-5 h-[70px] flex items-center justify-center bg-[#F5F5F5] rounded text-xl font-medium md:w-[339px]"
        >
          Sök
        </button>
      </article>

      <section className="flex flex-col mb-30  md:items-center">
        <h2 className="text-white font-medium ml-5 mr-auto text-xl">
          Dagboksinlägg
        </h2>
        <div className="max-h-[400px] overflow-auto w-full ">
          {allForms?.length > 0 &&
            allForms.map((data, idx) => (
              <AllFormsBtn key={idx + "allforms"} data={data} />
            ))}
        </div>
      </section>
      <section className="w-full sticky bottom-0 block md:hidden">
        <MenuBottomBar />
      </section>
    </section>
  );
};
export default AllJournals;
