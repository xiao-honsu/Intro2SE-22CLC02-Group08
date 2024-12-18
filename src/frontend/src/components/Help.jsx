import React, { useState } from "react";
import "../styles/Help.scss"; 
import Support from "./Support";

const HelpButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setShowTooltip(true); 
  };

  const handleMouseLeave = () => {
    setShowTooltip(false); 
  };

  return (
    <div className="help-button-container">
      <div  
        className="help-button" 
        onClick={toggleOpen} style={{ cursor: "pointer" }}
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        Help
      </div>
      {showTooltip && <div className="tooltip">Get support from Admin!</div>}
      {isOpen && (
        <Support />
      )}
    </div>
  );
};

export default HelpButton;
