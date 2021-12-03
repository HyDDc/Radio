import React, { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faMinusSquare } from "@fortawesome/free-solid-svg-icons";

const Radio = (props, ref) => (
  <div className="Radio" ref={ref}>
    <div
      className="player"
      style={{
        display: props.radio.complete ? "flex" : "none"
      }}
    >
      <div
        className="Icon"
        style={{
          visibility: props.radio.firstStation ? "hidden" : "visible"
        }}
      >
        <FontAwesomeIcon
          onClick={props.onBack}
          className="fa-play fa-2x"
          icon={faMinusSquare}
        />
      </div>
      <div>
        <img src={props.radio.image} alt="logo" />
      </div>
      <div
        className="Icon"
        style={{
          visibility: props.radio.lastStation ? "hidden" : "visible"
        }}
      >
        <FontAwesomeIcon
          className="fa-play fa-2x"
          onClick={props.onForward}
          icon={faPlusSquare}
        />
      </div>
    </div>
    <div onClick={props.toggleComplete}>
      <div>
        <div className="Info">
          <p>{props.radio.name}</p>
          <p>{props.radio.frequency}</p>
        </div>
      </div>
      <br />
    </div>
  </div>
);

export default forwardRef(Radio);
