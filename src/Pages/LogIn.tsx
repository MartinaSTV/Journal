import { useState } from "react";
import bgBig from "../assets/bgBig.png";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import Token from "../atoms/Token";
import letter from "../assets/Icons/material-symbols_mail-outline.svg";
import lock from "../assets/Icons/lock.svg";
import { createUserAccount, logInAccount } from "../Service/LoginService";
import Loading from "../componens/Loading";
//import UserDataAtom from "../atoms/userData";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPasword] = useState("");
  const [, setToken] = useRecoilState(Token);
  //const [, setAllUserData] = useRecoilState(UserDataAtom);
  const [type, setType] = useState(false);
  const [ErrMsg, setErrMsg] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handelOnLogIn = async () => {
    //setAllUserData({ userName: username });
    const token = await logInAccount(username, password, setToken, setErrMsg);
    token ? navigate("/Journal") : navigate("/");
  };

  const handleOnCreateAccont = async () => {
    setloading(true);
    try {
      const token = await createUserAccount(
        username,
        password,
        setToken,
        setErrMsg
      );
      setloading(false);
      token ? navigate("/Journal") : navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      className="flex flex-col max-w-[1500px] ml-auto mr-auto "
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${bgBig})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <button
        type="submit"
        className=" font-bold shadow bg-white text-black rounded w-[173px] h-[55px] mt-10 ml-auto mr-4"
        onClick={() => {
          setErrMsg("");
          setloading(false);
          type ? setType(false) : setType(true);
        }}
      >
        {type ? "Gå tillbaka" : "Skapa nytt konto"}
      </button>
      <div className="w-screen flex mt-20 ">
        <h1 className=" text-white m-auto text-4xl font-normal  md:text-5xl md:mr-auto md:mr-auto ">
          Ångest Dagbok
        </h1>
      </div>
      {ErrMsg !== "" && (
        <h3 className="text-white ml-auto mr-auto mt-10">{ErrMsg}!</h3>
      )}
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className=" tracking-wide p-5 text-white font-medium flex flex-col max-w-[335px] mt-10 mb-auto md:mr-auto md:ml-auto md:min-w-[400px]"
      >
        <div className="flex flex-col ">
          <div className="flex items-center">
            <img src={letter} alt="Ikon Brev" />
            <label className="ml-2 " htmlFor={`username+${type}`}>
              Emailadress
              <span className="font-light text-xs ml-2">
                {" "}
                ex: namn@gmail.com
              </span>
            </label>
          </div>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
            type="text"
            id={`username+${type}`}
            placeholder="namn@hotmail.com"
            className=" pl-2 font-light shadow h-[40px] text-black max-w-[350px] rounded"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center mt-5 mb-2">
            <img src={lock} alt="" />
            <label className="ml-2" htmlFor="password">
              Lösenord
            </label>
          </div>

          <input
            onChange={(e) => {
              setPasword(e.target.value);
            }}
            required
            type="text"
            id="password"
            className=" pl-2 font-light text-black shadow h-[40px] max-w-[350px] rounded"
            placeholder="Lösenord"
          />
        </div>
        <button
          type="submit"
          className=" shadow bg-white text-black rounded w-[173px] h-[55px] mt-10 ml-auto"
          onClick={() => {
            type ? handleOnCreateAccont() : handelOnLogIn();
          }}
        >
          {!type ? "Logga in" : "Skapa konto"}
        </button>
        <div className="mt-10">
          {loading && <Loading text={"Loggar in.."} />}
        </div>
      </form>
    </section>
  );
};
export default LogIn;
