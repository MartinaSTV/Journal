interface PropsLoading {
  text: string;
}

const Loading = ({ text }: PropsLoading) => {
  return (
    <section className="bg:opacity-100  flex flex-col items-center">
      <figure className="mb-5">
        <div className="border h-[40px] w-[40px] rounded-full border-4 border-white border-t-[#0F69BD] animate-spin"></div>
      </figure>
      <p className="text-[16px] text-white">{text}</p>
    </section>
  );
};
export default Loading;
