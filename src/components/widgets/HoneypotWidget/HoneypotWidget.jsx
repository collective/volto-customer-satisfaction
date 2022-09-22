import React from 'react';
import './honeypot_widget.css';

const HoneypotWidget = ({ updateFormData, field }) => {
  return field ? (
    <div className="hpt_widget">
      <input
        type="text"
        name={field}
        onChange={(e) => {
          updateFormData(field, e.target.value);
        }}
      />
    </div>
  ) : (
    <></>
  );
};

export default HoneypotWidget;
