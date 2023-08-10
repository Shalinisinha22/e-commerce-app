import React, { useState, useEffect } from "react";

function Feedback() {
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSub] = useState("");
  const [feedback, setFeed] = useState("");
  const [err, setErr] = useState("");
  const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const handleSubmit = (e) => {
    if (!number.match(phoneno)) {
      setErr("Enter valid mobile number");
      setTimeout(() => {
        setErr("");
      }, 2000);
    } else {
      e.preventDefault();
      setNumber("");
      setEmail("");
      setSub("");
      setFeed("");
      alert("Feedback received");
      console.log(
        `Mobile Number: ${number} , Email: ${email}, Subject: ${subject}, Feedback: ${feedback} `
      );
      localStorage.setItem(
        "feedback",
        JSON.stringify(
          `number: ${number}, Email: ${email}, subject: ${subject}, feedback: ${feedback}`
        )
      );
    }
  };

  return (
    <div
      className="feedback-container"
      style={{ margin: "2rem", display: "flex", flexDirection: "column" }}
    >
      <h3 style={{ color: "#4cd137" }}>Write Your Feedback</h3>

      <div className="form-cont" style={{ margin: "2rem" }}>
        <form>
          <div class="row">
            <div class="col-12 col-md-6" style={{ marginBottom: "1rem" }}>
              <input
                type="tel"
                id="phone"
                spellCheck="false"
                name="phone"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                class="form-control"
                placeholder={err ? err : "Mobile Number"}
              />
            </div>
            {/* {err && <p style={{color:"red",fontSize:"0.75rem"}} >{err}</p>} */}
            <div class="col-12 col-md-6">
              <input
                type="email"
                spellCheck="false"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="form-control"
                placeholder="Email"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input
                type="text"
                spellCheck="false"
                value={subject}
                onChange={(e) => setSub(e.target.value)}
                class="form-control"
                placeholder="Subject"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <textarea
                type="text"
                spellCheck="false"
                rows="5"
                value={feedback}
                onChange={(e) => setFeed(e.target.value)}
                class="form-control"
                placeholder="Feedback"
              />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <button
                style={{
                  width: "80%",
                  height: "2.5rem",
                  borderRadius: "2rem",
                  background: "#44bd32",
                  color: "white",
                }}
                type="button"
                class="btn"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
