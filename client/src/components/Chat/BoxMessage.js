import React from "react";

export default function BoxMessage() {
  return (
    <div>
      <div className=" picture-styling text-center d-inline-block rounded-circle box-chat">
        <i className="fas fa-minus"></i>
      </div>
      <div className="box-message-styling d-inline-block box-chat">
        <h5 className="pt-3 px-3">Rifky</h5>
        <p className="px-3">Lagi belajar React nih hahaha</p>
        <p className="px-3"> kalau kamu sedang apa</p>
      </div>
      <br />
      <div className=" picture-styling text-center d-inline-block rounded-circle">
        <i className="fas fa-minus"></i>
      </div>
      <div className="box-message-styling d-inline-block">
        <h5 className="pt-3 px-3">ALdi</h5>
        <p className="px-3">Sama dong , susah juga ya haha</p>
      </div>
    </div>
  );
}
