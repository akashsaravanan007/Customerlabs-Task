import React, { useState } from "react";
import axios from "axios";
import "./Task.css";

function Header() {
  return (
    <div className="header">
      <h1>Saving Segment</h1>
    </div>
  );
}

function Footer({ onSave, onCancel }) {
  return (
    <div className="footer">
      <button className="cancel-button" onClick={onCancel}>
        Cancel
      </button>
      <button className="save-segment-button" onClick={onSave}>
        Save the Segment
      </button>
    </div>
  );
}

function App() {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [schemas, setSchemas] = useState([
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ]);
  const [dropdownButtons, setDropdownButtons] = useState([]);

  const handleSegmentNameChange = (e) => {
    setSegmentName(e.target.value);
  };

  const handleSchemaChange = (e) => {
    setSelectedSchema(e.target.value);
  };

  const handleAddSchema = () => {
    setDropdownButtons((prevButtons) => [
      ...prevButtons,
      { index: prevButtons.length + 1, value: "" },
    ]);
  };

  const handleCancelSchema = (index) => {
    setDropdownButtons((prevButtons) =>
      prevButtons.filter((button) => button.index !== index)
    );
  };

  const finalSubmit = async () => {
    if (segmentName.trim() === "") {
      alert("Please enter the segment name.");
      return;
    }
    const schemaData = dropdownButtons.map((button) => ({
      [button.value]: schemas.find((schema) => schema.value === button.value)
        .label,
    }));
  
    const data = {
      segment_name: segmentName,
      schema: schemaData,
    };
  
    try {
      await axios.post(
        "https://webhook.site/015a570e-3351-441e-b81b-35050fb00460",
        data
      );
      console.log("Segment saved successfully!");
      alert("Segment saved successfully!");
      resetFields();
    } catch (error) {
      console.log("Error saving segment:", error);
      alert("Failed to save segment. Please try again.");
    }
  };
  
  const resetFields = () => {
    setSegmentName("");
    setSelectedSchema("");
    setDropdownButtons([]);
  };
  

  const handleCancel = () => {
    resetFields();
  };

  return (
    <div className="container">
      <Header />

      <div className="segment">
        <h1>Enter the name of the segment</h1>
        <input
          type="text"
          placeholder="Segment Name"
          value={segmentName}
          onChange={handleSegmentNameChange}
        />
      </div>

      <div className="schema">
        <p className="instruction">
          To save your segment, you need to add the schemas to build the query
        </p>

        <div className="schema-buttons">
          {dropdownButtons.map((button) => (
            <div key={button.index}>
              <select
                value={button.value}
                onChange={(e) => {
                  const updatedButtons = dropdownButtons.map((b) => {
                    if (b.index === button.index) {
                      return { ...b, value: e.target.value };
                    }
                    return b;
                  });
                  setDropdownButtons(updatedButtons);
                }}
              >
                <option value={button.value}>{button.value}</option>
                <Task arr={schemas} buttons={dropdownButtons} />
              </select>
              <button onClick={() => handleCancelSchema(button.index)}>
                X
              </button>
            </div>
          ))}
        </div>

        <button className="add-schema-button" onClick={handleAddSchema}>
          + Add new schema
        </button>
      </div>

      <Footer onSave={finalSubmit} onCancel={handleCancel} />
    </div>
  );
}

function Task({ arr, buttons }) {
  const btn = buttons.map((button) => button.value);
  const list = arr.filter((schema) => !btn.includes(schema.value));

  return (
    <>
      {list.map((schema) => (
        <option key={schema.value} value={schema.value}>
          {schema.label}
        </option>
      ))}
    </>
  );
}

export default App;
