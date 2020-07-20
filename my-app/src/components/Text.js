import React from "react";
import "../assets/styles/components/text.scss";

export default ({ linkActiveStatus, label, linkAddress, linkLabel, className }) => {
  return (
    <div className={className}>
      <span>{label}</span>
      <a
        href={linkAddress}
        clicked={linkActiveStatus? ' ' :  null}
      >
        {linkLabel}
      </a>
    </div>
  );
};
