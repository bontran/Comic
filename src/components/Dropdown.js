import React from "react";
import "./Dropdown.css";

const Dropdown = ({ label, value, options, onChange, width }) => {
    return (
        <div>
            <label style={{ width: "100%" }}>
                <b>{label}</b>
                <select value={value} onChange={onChange} className="option-border">
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};
export default Dropdown;