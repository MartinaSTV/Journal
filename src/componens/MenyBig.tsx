import { useRecoilState } from "recoil";
import homeIcon from "../assets/Icons/clarity_home-line (1).svg";
import logoutIcon from "../assets/Icons/mdi-light_logout.svg";
import { useNavigate } from "react-router-dom";
import Token from "../atoms/Token";
import { logOut } from "../Service/LoginService";
import UserAtom from "../atoms/user";

const MenuBig = () => {
  const [, setToken] = useRecoilState(Token);
  const [, setUserId] = useRecoilState(UserAtom);
  const navigate = useNavigate();

  const pages = [
    { title: "Hem", url: "/Journal" },
    { title: "Se alla inlägg", url: "/AllJournals" },
    { title: "Sammanställning av svar", url: "/CompilationJournal" },
    { title: "Ditt konto", url: "/UserAccount" },
    { title: "Logga ut", url: "/LoggedOut" },
  ];

  const setAndNavigate = () => {
    setToken(null);
    setUserId("");
  };

  return (
    <header className="flex text-white items-center bg-black opacity-85 w-full hidden md:flex ">
      <div className="flex items-center m-5">
        <h1 className=" text-[30px] font-medium">Ångestdagboken</h1>
      </div>
      <nav className="flex max-w-[800px] ml-auto mr-5">
        {pages.map((pages, idx) => (
          <a
            className={`hover:opacity-85 flex items-center justify-center ml-6 border-l-2 pl-4 mt-4 mb-4 text-1xl h-[55px]  ${
              pages.title === "Logga ut" ? "" : ""
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
            {pages.title === "Hem" && (
              <img src={homeIcon} alt="Hus Hem" className="mr-4 h-[30px]" />
            )}
            {pages.title === "Logga ut" && (
              <img
                src={logoutIcon}
                alt="Öppnad dörr ut"
                className="mr-4 h-[30px]"
              />
            )}

            <p className="w-full hover:border-b"> {pages.title}</p>
          </a>
        ))}
      </nav>
    </header>
  );
};
export default MenuBig;
