import bgBig from "../assets/bgBig.png";
import { useNavigate } from "react-router-dom";

const LoggedOut = () => {
  const navigate = useNavigate();
  return (
    <section
      className="flex flex-col items-center max-w-[1500px] "
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${bgBig})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <h1 className=" text-white mt-20 text-4xl font-normal  md:text-5xl ">
        Du är utloggad
      </h1>
      <h2 className="mt-20 text-white font-medium">Ha en fin dag!</h2>
      <button
        className=" font-medium shadow bg-white text-black rounded w-[173px] h-[55px] mt-10 "
        onClick={() => {
          navigate("/");
        }}
      >
        Gå till Logga in
      </button>
    </section>
  );
};
export default LoggedOut;
