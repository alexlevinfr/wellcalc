import React, { useEffect, useState } from "react";
import { render } from "react-dom";


const Subscribe = () => {
  const [inputValue, setInputValue] = useState("");
  const [submitValue, setSubmitValue] = useState("");
  const [isEmail, setIsEmail] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Subscribed");

    if (isEmail) {
      setSubmitValue(inputValue);
    } else {
      setIsEmail(false);
    }
  };

  const handleChange = e => {
    console.log("on input change value");
    const currentValue = e.target.value;

    setInputValue(currentValue);
    setSubmitValue(currentValue);

    const isEmailValid = currentValue.includes("@");

    if (isEmailValid) {
      console.log("includes");
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
 };

  return (
    <div className="container">
      <h2>Subscribe Functional Component</h2>
      <form onSubmit={handleSubmit} className="subscribe">
        <label>
          Email:
          <input
            onChange={handleChange}
            value={inputValue}
            type="email"
            className={`subscribe__email ${isEmail ? "success" : "error"}`}
          />
        </label>
        <input
          type="submit"
          value="Submit"
          aria-label="submit button"
          className={`subscribe__submit ${isEmail ? "" : "not-allowed"}`}
          disabled={isEmail ? false : true}
        />
      </form>
      <p>
        Input value: {inputValue} <br />
        Input value length: {inputValue.length}
      </p>
      <p>
        Submit value: {submitValue} <br />
        Submit value length: {submitValue.length}
      </p>
      <p  className={`${isEmail ? "success" : "error"}`}>
        {`Email correct: ${isEmail}`}
      </p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Why is STATE giving me the wrong value?</h1>
      <Subscribe />
    </div>
  );
};

render(<App />, document.getElementById("root"));