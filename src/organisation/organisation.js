import React from "react";

export default function Organisation({
  name,
  address
}) {
  return (
      <div>
        <div class="card">
          <div class="container">
            <h4>
           <b>{name}</b>
            </h4>
         <p>{address}</p>
          </div>
        </div>
      </div>
   )
  }