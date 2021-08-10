import React from "react";
import { Link } from 'react-router-dom'


export default function ListMessage(props) {
  return (
    <div>
      <Link to="/chat" onClick={()=> props.remove(props.id)} className=" picture-styling text-center d-inline-block rounded-circle box-chat">
        <i className="fas fa-minus"></i>
      </Link>
      <div className="box-message-styling d-inline-block box-chat">
        <h5 className="pt-3 px-3">{props.fullname}</h5>
        <p className="px-3">{props.message}</p>
      </div>
      {!props.sent && 
        <button className="mx-4" onClick={()=> props.re(props.message, props.fullname)}><i className="fas fa-redo"></i></button>
      }
      <br />
    </div>
  );
}
