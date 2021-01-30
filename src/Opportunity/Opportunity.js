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
            <p>
           <b>Opportunity Name:{name}</b>
            </p>
         <p> Account Name: {account.name}</p>
         <p>Account Address: {account.address}</p>
         <p>Opportunity amountStage:{amountStage}</p>
          </div>
        </div>
      </div>
   )
  }