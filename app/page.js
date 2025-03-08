import React from "react";
import Link from "next/link";
const page = () => {
  return (
    <>
      <div className="flex flex-col px-6 max-sm:text-center sm:px-2 justify-center items-center gap-4 py-20">
        <div className="flex justify-center items-center gap-2">
          <h1 className="font-bold text-4xl  ">Get Me A Chai</h1>
          <img src="/tea.gif" alt="" className="pb-2" />
        </div>
        <div>
          <p>A croud funding plateform for creaters to fund thier projects.</p>
        </div>
        <div>
          <p>
            A place where your fans can buy u a chai . unlesh the power of your
            fans and get your projcts funded.
          </p>
        </div>
        <div className="flex gap-2">
          <div>
            <Link href="/login">
            <button  className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Start here
            </button>
            </Link>
          </div>
          <div>
            <Link href="/about">
           <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
           Read More 
            </button>
            </Link>
          </div>
        </div>
      </div>
      {/* border line */}
      <div className="bg-slate-500 opacity-30 h-1"></div>

      {/* second div for items */}
      <div className="pt-10 pb-20">
        <div className="text-center pb-10">
          <h1 className="font-bold text-2xl">Your Fans can buy you a Chai</h1>
        </div>
        <div className="flex  justify-center items-center gap-5 px-5 text-center md:gap-20 ">
          <div className="flex flex-col justify-center items-center gap-2">
            <img
              src="/man.gif"
              className="bg-slate-600 p-1 w-15 h-15  rounded-full"
              alt=""
            />
            <p className="font-bold">Fans want to help</p>
            <p>your fans are avalible to support you</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <img
              src="/coin.gif"
              className="bg-slate-600 p-1 w-15 h-15  rounded-full"
              alt=""
            />
            <p className="font-bold">Fans want to contribute</p>
            <p>your fans are willing to support you finalcially</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <img
              src="group.gif"
              className="bg-slate-600 p-1 w-15 h-15  rounded-full"
              alt=""
            />
            <p className="font-bold">fans want to collaborate</p>
            <p>your fans ae redy tp collaborate with you</p>
          </div>
        </div>
      </div>
       {/* border line */}
       <div className="bg-slate-500 opacity-30 h-1"></div>

    </>
  );
};

export default page;
