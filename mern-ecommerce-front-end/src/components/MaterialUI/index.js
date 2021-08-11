import React, { useState } from "react";
import "./style.css";

/**
 * @author Rizwan Khan
 * @function
 **/

const Modal = (props) => {
  if (!props.visible) {
    return null;
  }
  return (
    <>
      <div className="modalFixedBg">
        <div style={{ position: "relative" }}>
          <div
            className="modalClose"
            onClick={props.onClose}
            style={{ cursor: "default" }}
          >
            X
          </div>
          <div className="modalContainer">{props.children}</div>
        </div>
      </div>
    </>
  );
};

const MaterialInput = (props) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className="materialInput">
      <label
        className={`label ${focus ? "focus" : ""}`}
        style={{
          top: 0,
          lineHeight: "none",
        }}
      >
        {props.label}
      </label>
      <div
        style={{
          display: "flex",
        }}
      >
        <input
          className="input"
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          onFocus={(e) => {
            setFocus(true);
          }}
          onBlur={(e) => {
            if (e.target.value === "") {
              setFocus(false);
            }
          }}
        />
        {props.rightElement ? props.rightElement : null}
      </div>
    </div>
  );
};

const MaterialButton = (props) => {
  const onClick = () => {
    props.onClick && props.onClick();
  };

  return (
    <div style={{ width: "100%", ...props.style }}>
      <button
        className="materialButton"
        style={{
          color: props.textColor,
          background: props.bgColor,
        }}
        onClick={onClick}
      >
        {props.icon && props.icon}
        {props.title && props.title}
      </button>
    </div>
  );
};

const DropdownMenu = (props) => {
  return (
    <div className="headerDropdownContainer">
      {props.menu}
      <div className="dropdown">
        <div className="upArrowContainer">
          <div className="upArrow"></div>
        </div>
        <div className="dropdownMenu">
          {props.firstMenu}
          <ul className="headerDropdownMenu">
            { props.menus &&
              props.menus.map((item, index) => (
                <li key={index}>
                  <a
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick && item.onClick();
                      }
                    }}
                    href={`${item.href}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Anchor = (props) => {
  return (
    <button {...props} className="anchorButton">
      {props.name}
    </button>
  );
};

const Breed = (props) => {
  return (
    <div className="breed">
      <ul>
        {props.breed &&
          props.breed.map((item, index) => (
            <li key={index}>
              <a href={item.href}>{item.name}</a>
              {props.breedIcon}
            </li>
          ))}
      </ul>
    </div>
  );
};

export { Modal, MaterialInput, MaterialButton, DropdownMenu, Anchor, Breed };
