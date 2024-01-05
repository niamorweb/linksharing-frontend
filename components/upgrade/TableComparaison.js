import features from "@/data/upgrade/features";
import React from "react";

export default function TableComparaison() {
  return (
    <section className="w-4/5 py-20 lg:py-40 mb-20 mx-auto flex flex-col gap-8">
      <div>
        <span className="text-3xl font-semibold">Comparaison</span>
      </div>
      <div className="">
        <div className="border-b-2 text-xs md:text-base py-2 flex justify-between items-center gap-10 border-b-black">
          <span className=" w-2/5">THE FEATURES</span>
          <ul className="flex w-3/5 items-center gap-10">
            <li className="w-1/3 text-center">BASIC</li>
            <li className="w-1/3 text-center">PRO</li>
            <li className="w-1/3 text-center">BUSINESS</li>
          </ul>
        </div>

        {features.map((elem) => {
          return (
            <div className="flex items-center gap-3 text-xs md:text-base">
              <span className="py-2 w-2/5">{elem.name}</span>
              <ul className="flex w-3/5 items-center gap-4">
                <li className="w-1/3 flex justify-center items-center">
                  {elem.basic ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                </li>
                <li className="w-1/3 flex justify-center items-center">
                  {elem.pro ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                </li>
                <li className="w-1/3 flex justify-center items-center">
                  {elem.business ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
