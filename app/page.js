export default function Home() {
  const videoId = "ze8-jLDDZ7Q"; // Define the video ID

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 text-white h-[44vh]">
        <div className="font-bold text-5xl flex gap-2 font-abc">
          GetMeaChai <span><img className="mix-blend-mode bg-transparent rounded-2xl" width={45} src="./logo.gif" alt="" /></span>
        </div>

        <p className="text-sm font-Poppins"> A crowd Funding platform for creator. Get Funded and Start to develop their Own Business ideas!!!</p>
        <div>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 f">Start Now!</button>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
        </div>
      </div>

      <div className="bg-white h-1 rounded-full opacity-10"></div>

      <div className="text-white container mx-auto pb-32 pt-14">
        <h1 className="text-2xl font-bold my-10 text-center font-abc">Your Fan Can Buy Your Chai</h1>
        <div className="flex justify-around gap-5">
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img width={100} className="bg-slate-400 rounded-lg text-black" src="./gp321.png" alt="" />
            <p className="font-bold">Fan want to Help</p>
            <p className="text-center">Your Fan are available to help</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img width={150} className="bg-slate-400 rounded-lg text-black" src="./coin.gif" alt="" />
            <p className="font-bold">Fan want to Help</p>
            <p className="text-center">Your Fan are available to help</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img width={100} className="bg-slate-400 rounded-lg p-2 text-black" src="./boyqq.png" alt="" />
            <p className="font-bold">Fan want to Help</p>
            <p className="text-center">Your Fan are available to help</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 rounded-full opacity-10"></div>

      <div className="text-white container  mx-auto pb-32 pt-14">
        <h1 className="text-2xl font-bold my-10 text-center md-30 font-abc">Learn more about Us</h1>
       <div className="flex justify-center items-center">
       <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}?si=74IjB9qVogwoGR30`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
       </div>
      </div>
    </>
  );
}
