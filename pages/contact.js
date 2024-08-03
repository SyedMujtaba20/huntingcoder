import React, { useState } from "react";
import styles from "@/styles/Contact.module.css";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { name, email, phone, desc };
    fetch("http://localhost:3000/api/postcontact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success", data);
        alert("thanks for contacting us.");
        setName("");
        setEmail("");
        setDesc("");
        setPhone("");
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleChange = (e) => {
    if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "desc") {
      setDesc(e.target.innerText);
    } else if (e.target.name == "name") {
      setName(e.target.value);
    }
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [desc, setDesc] = useState("");
  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label htmlFor="name" className={styles.htmlFormlabel}>
            Enter your name
          </label>
          <input
            type="text"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            value={name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="email" className={styles.htmlFormlabel}>
            Email address
          </label>
          <input
            type="email"
            className={styles.input}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={email}
            onChange={handleChange}
            required
          />
          <div id="emailHelp" className={styles.formtext}>
            We will never share your email with anyone else.
          </div>
        </div>
        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.htmlFormlabel}>
            Phone
          </label>
          <input
            type="text"
            className={styles.input}
            id="phone"
            name="phone"
            value={phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="desc" className={styles.formlabel}>
            Elaborate your concern
          </label>
          <textarea
            className={styles.input}
            id="desc"
            onChange={handleChange}
            required
          >
            {desc}
          </textarea>
        </div>
        <button type="submit" className={styles.btn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
