import MenuBig from "../componens/MenyBig";
import MenuBottomBar from "../componens/MenyBottomBar";
import bgBig from "../assets/bgBig.png";

const CompilationJournal = () => {
  return (
    <section
      className="flex flex-col max-w-[1500px] ml-auto mr-auto relative  "
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${bgBig})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <MenuBig />
      <h1 className="text-white text-4xl font-normal mt-10 ml-5 max-w-[300px] md:text-5xl md:max-w-full ">
        Sammanställning
      </h1>
      <article className="text-white min-h-[100vh] "></article>
      <section className="w-full sticky bottom-0 block md:hidden">
        <MenuBottomBar />
      </section>
    </section>
  );
};

export default CompilationJournal;
