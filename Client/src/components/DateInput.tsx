import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateInput({ setSelectedDate, selectedDate }) {
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="mb-3">
      <label htmlFor="datePicker" className="form-label">
        Select a Deadline for applications
      </label>
      <DatePicker
        id="datePicker"
        selected={selectedDate}
        onChange={(date) => handleDateChange(date)}
        dateFormat="dd/MM/yyyy" // Customize date format
        className="form-control"
        placeholderText="Select a date"
      />
    </div>
  );
}
