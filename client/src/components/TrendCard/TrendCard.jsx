import React from "react";
import { TrendData } from "../../Data/TrendData";

const TrendCard = () => {
  return (
    <div className="TrendCard flex flex-col gap-4 bg-[#ffffffa3] p-4 rounded-2xl">
      <h3 className="font-semibold">Trends for you</h3>

      {TrendData.map((trend, idx) => {
        return (
          <div key={idx} className="trend flex flex-col gap-2">
            <span className="font-semibold">#{trend.name}</span>
            <span className="text-sm">{trend.shares}k shares</span>
          </div>
        );
      })}
    </div>
  );
};

export default TrendCard;
