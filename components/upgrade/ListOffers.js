import pricingData from "@/data/upgrade/pricingData";
import React, { useState } from "react";

export default function ListOffers() {
  const [monthlyOrYearly, setMontlhyOrYearly] = useState(false);

  const handleSwitchMonthlyYearly = (e) => {
    setMontlhyOrYearly(e.target.checked);
  };

  return (
    <section className="flex flex-col gap-10 md-w-full md:px-4 lg:px-0 lg:w-4/5 items-center py-20 lg:py-40 mx-auto">
      <label class="switch">
        <input
          onChange={handleSwitchMonthlyYearly}
          type="checkbox"
          id="selector-annually-monthly"
        />
        <span class="slider round bg-neutral-200"></span>
      </label>

      <div className="flex flex-col md:flex-row items-center gap-8 ">
        {pricingData.map((x) => (
          <div
            className={` duration-150 shadow-md hover:shadow-xl rounded-md flex flex-col p-10 gap-3 items-center ${
              x.name === "Pro"
                ? "py-16 bg-darkPurple text-white"
                : "bg-neutral-100"
            }`}
          >
            <h2 className="font-bold text-xl">{x.name}</h2>
            <p className="text-center">{x.description}</p>
            <span className="flex flex-col items-center my-6">
              <span className="text-3xl font-thin">
                ${monthlyOrYearly ? `${x.price.annual}` : `${x.price.month}`}
              </span>
              <span className="time">
                per {monthlyOrYearly ? "year" : "month"}{" "}
              </span>
            </span>
            <button
              disabled={true}
              className={`w-full py-4 font-thin ${
                x.name === "Pro"
                  ? " bg-white text-darkPurple rounded-lg duration-150 hover:scale-105 "
                  : " bg-darkPurple text-white duration-150 rounded-lg hover:scale-105 "
              }`}
            >
              Not available
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
