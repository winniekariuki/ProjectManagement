import React from "react";

export default function Opportunity({
  name,
  account,
  amountStage
}) {
  return (
      <div>
        <div className="card">
          <div className="container">
            <h4>
           <b>{name}</b>
            </h4>
         <p>{account.name}</p>
         <p>{account.address}</p>
         <p>{amountStage}</p>
          </div>
        </div>
      </div>
   )
  }