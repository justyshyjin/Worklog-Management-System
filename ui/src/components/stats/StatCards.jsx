import "../../styles/StatCards.css";
import { useEffect, useState } from "react";

export default function StatCards({
  stats = []
}) {

  
  return (
    <div className="stats-grid">

      {stats.map((item) => (

        <div
          className="stat-card"
          key={item.title}
        >

          <div
            className="stat-title"
            style={{
              color: item.color
            }}
          >
            {item.title}
          </div>

          <div className="stat-value">
            {item.value}
          </div>

        </div>

      ))}

    </div>
  );
}