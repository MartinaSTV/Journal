import { useNavigate } from "react-router-dom";
import { logOut } from "../Service/LoginService";
import { useRecoilState } from "recoil";
import Token from "../atoms/Token";
import UserAtom from "../atoms/user";

const Meny = () => {
  const navigate = useNavigate();
  const [, setToken] = useRecoilState(Token);
  const [, setUserId] = useRecoilState(UserAtom);

  console.log("meny");

  const pages = [
    { title: "Se alla inlägg", url: "/AllJournals" },
    { title: "Sammanställning av svar", url: "/CompilationJournal" },
    { title: "Hem", url: "/Journal" },
    { title: "Ditt konto", url: "/UserAccount" },
    { title: "Logga ut", url: "/LoggedOut" },
  ];
  const setAndNavigate = () => {
    setToken(null);
    setUserId("");
  };

  return (
    <section className="bg-black flex flex-col  min-h-[100vh] opacity-75	">
      <h1 className="text-white text-4xl font-normal mt-10 self-center ">
        Meny
      </h1>
      <nav className="flex flex-col min-h-[100vh]">
        {pages.map((pages, idx) => (
          <a
            className={` flex items-center justify-center font-medium text-2xl bg-white h-[55px] mt-5 w-[300px] ml-auto mr-auto rounded ${
              pages.title === "Logga ut" ? "mt-40" : ""
            }`}
            key={idx}
            onClick={() => {
              if (pages.title === "Logga ut") {
                logOut(setAndNavigate);
                navigate("/loggedOut");
              } else {
                navigate(`${pages.url}`);
              }
            }}
            href=""
          >
            <p> {pages.title}</p>
          </a>
        ))}
      </nav>
    </section>
  );
};
export default Meny;
