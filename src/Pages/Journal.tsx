import { useRecoilState } from "recoil";
import bgBig from "../assets/bgBig.png";
import { onChangeAuth } from "../Service/LoginService";
import { createForm } from "../Service/createForm";
import MenuBottomBar from "../componens/MenyBottomBar";
import { useEffect, useState } from "react";
import MenuBig from "../componens/MenyBig";
import { getTodaysForms } from "../Service/journalService";
import FormExistButton from "../componens/FormExistButton";
import UserAtom from "../atoms/user";
import Loading from "../componens/Loading";

const JournalLandingPage = () => {
  const [allForms, setAllForms] = useState<IresponseForm[]>([]);
  const [userId, setUserId] = useRecoilState(UserAtom);
  const [update, setUpdate] = useState(false);
  const [loading, setloading] = useState(false);
  onChangeAuth(setUserId);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        setloading(true);
        try {
          await createForm(userId, setUpdate);
          await getTodaysFormsData();
          setloading(false);
        } catch (error) {
          console.error("Error in fetchUserData:", error);
          setloading(false);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getTodaysFormsData();
    }
  }, [userId, update]);
  useEffect(() => {
    if (userId) {
      getTodaysFormsData();
    }
  }, []);

  const getTodaysFormsData = async () => {
    const forms = await getTodaysForms(userId);
    console.log(forms);
    if (forms !== undefined) {
      forms.sort((a, b) => {
        const parseTime = (timeStr: any) => {
          const [hours, minutes] = timeStr.split(".").map(Number);
          return hours * 60 + minutes;
        };
        const timeA = parseTime(a.formdata.show);
        const timeB = parseTime(b.formdata.show);
        return timeA - timeB;
      });
      setAllForms([...forms]);
    }
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
        Hem
      </h1>
      <div className="m-5 text-[#F5F5F5] max-w-[339px] md:mr-auto md:ml-auto">
        <p className="font-semibold ">Hej {"Anton"}</p>
        <p className="">
          Fyll i din dagbok genom att klicka nedanför. Fyll i ett formulär i
          taget. Du kan se på klockslaget när formuläret öppnas och kan fyllas
          i.
        </p>
      </div>
      {loading && <Loading text={"Hämtar dagens formulär..."} />}
      <section className="flex flex-col mb-30 md:items-center">
        {allForms.length > 0 ? (
          allForms.map((form, idx) => (
            <FormExistButton key={idx + "forms"} formData={form} />
          ))
        ) : (
          <div>
            <h2 className="text-white text-2xl mt-10 ">
              Finns inga dagboksinlägg att fylla i
            </h2>
          </div>
        )}
      </section>

      <section className="w-full absolute bottom-0 block md:hidden">
        <MenuBottomBar />
      </section>
    </section>
  );
};
export default JournalLandingPage;
