import React, { useState, useEffect } from 'react';
import './PinnedUsers.css'
const Panel = ({ options, update }) => {
  const [toRender, setToRender] = useState([]);

  useEffect(() => {
    console.log("in component: ");
    console.log(options);

    const renderedOptions = options.slice(0, 5).map((option) => (
      <li className="element" key={option[1]} onClick={() => update(option[0])}>
        {option[0]}
      </li>
    ));

    setToRender(renderedOptions);
  }, [options]);

  return (
    <div className="suggestion-panel">
      {options.length > 0 && (
        <ul className="panel">
          {toRender}
        </ul>
      )}
    </div>
  );
};

export default Panel;
