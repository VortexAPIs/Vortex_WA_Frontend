import React, { useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

const MultiSelectDropdown = ({ options, label, onSelectionChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (eventKey, event) => {
    event.stopPropagation(); // Prevent the dropdown from closing

    let selected = [...selectedOptions];
    if (selected.includes(eventKey)) {
      selected = selected.filter(option => option !== eventKey);
    } else {
      selected.push(eventKey);
    }
    setSelectedOptions(selected);
    if (onSelectionChange) {
      onSelectionChange(selected);
    }
  };

  return (
    <Form.Group controlId="multiSelect">
      <Form.Label className='lable'>{label}</Form.Label>
      <Dropdown>
        <Dropdown.Toggle className="shadow input-company"  variant="outline" id="uuid" style={{minWidth:'100%', whiteSpace:'wrap', display:'flex', flexDirection:'row'}}>
          {selectedOptions.length > 0
            ? selectedOptions.join(', ')
            : 'Select Users'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {options.map((option, index) => (
            <Dropdown.Item
              key={index}
              eventKey={option.uuid + ' - ' + option.name}
              as="div" // Prevents the default anchor behavior
              onClick={(e) => handleSelect(option.uuid + ' - ' + option.name, e)}
              className="d-flex align-items-center"
            >
              <Form.Check
                type="checkbox"
                checked={selectedOptions.includes(option.uuid + ' - ' + option.name)}
                readOnly
                className="me-2"
              />
              <span>{option.uuid + ' - ' + option.name}</span>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Form.Group>
  );
};

export default MultiSelectDropdown;
