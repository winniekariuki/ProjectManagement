import React from "react";

export default function Organisation({ name, address }) {
  return (
    <div class="col">
    <div class="card">
      <div class="card-body">
        <p class="card-title"> Account Name:
            <b>{name}</b></p>
        <p class="card-text">Account address: {address}</p>
      </div>
    </div>
  </div>
   
  );
}
