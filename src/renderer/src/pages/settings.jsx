import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';


import Sidemenu from "../components/sidemenu";
import Sidemenu_small from "../components/sidemenu_small";


function Settings() {
  //define states
  const [user, setUser] = useState({});

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [lang, setLang] = useState("");

  const [newEmail, setNewEmail] = useState("");
  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newLang, setNewLang] = useState("");

  const [isEmailModified, setIsEmailIsModified] = useState(false);
  const [isFirstnameIsModified, setIsFirstnameIsModified] = useState(false);
  const [isLastnameIsModified, setIsLastnameIsModified] = useState(false);


  const [errorMessage, setErrorMessage] = useState({
    email: false,
    firstname: false,
    lastname: false
  });


  //fethch user data
  useEffect(() => {

    let user_id = localStorage.getItem("user_id");
    // fetch user data
    const fetchUser = async () => {
      try {
        const usersData = await window.api.getUser(user_id); // Fetch users data from main process
        console.log('Users Data:', usersData); // Log the users data
        setUser(usersData.user);
        setEmail(usersData.user.email);
        setFirstname(usersData.user.firstname);
        setLastname(usersData.user.lastname);
        setCity(usersData.user.city);
        setLang(usersData.user.lang);
        console.log(usersData.user);

        localStorage.setItem("user_lang", usersData.user.lang);
        console.log(usersData.user.lang);

      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };
    fetchUser();

  }, [])


  const refreshUser = async () => {
    let user_id = localStorage.getItem("user_id");

    try {
      const usersData = await window.api.getUser(user_id); // Fetch users data from main process
      console.log('Users Data:', usersData); // Log the users data
      setUser(usersData.user);
      setEmail(usersData.user.email);
      setFirstname(usersData.user.firstname);
      setLastname(usersData.user.lastname);
      setCity(usersData.user.city);
      setLang(usersData.user.lang);
      console.log(usersData.user);

      localStorage.setItem("user_lang", usersData.user.lang);
      console.log(usersData.user.lang);

    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };


  const handleEmailChange = () => {
    setErrorMessage({ ...errorMessage, email: false });
  }
  const handleFirstnameChange = () => {
    setErrorMessage({ ...errorMessage, firstname: false });
  }
  const handleLastnameChange = () => {
    setErrorMessage({ ...errorMessage, lastname: false });
  }


  // Function to handle update operation
  const handleUpdate = async () => {

    const updatedFields = {};
    updatedFields.city = newCity !== "" ? newCity : user.city;
    updatedFields.email = newEmail !== "" ? newEmail : user.email;
    updatedFields.firstname = newFirstname !== "" ? newFirstname : user.firstname;
    updatedFields.lastname = newLastname !== "" ? newLastname : user.lastname;
    updatedFields.lang = newLang !== "" ? newLang : user.lang;
    updatedFields.user_id = user.user_id;
    console.log(updatedFields);

   // Check if email field is empty
if (!newEmail && isEmailModified) {
  setErrorMessage(prevState => ({ ...prevState, email: true }));
}
// Check if firstname field is empty
if (!newFirstname && isFirstnameIsModified) {
  setErrorMessage(prevState => ({ ...prevState, firstname: true }));
}
// Check if lastname field is empty
if (!newLastname && isLastnameIsModified) {
  setErrorMessage(prevState => ({ ...prevState, lastname: true }));
}



    try {
      const response = await window.api.editUser(updatedFields);
      console.log(response);
      refreshUser();

    } catch (error) {

    }
  };




  return (
    <div className="settings-wrapper">
      <div className="settings-content">
        <div className="header">
          <h5><FontAwesomeIcon icon={faCog} className="icons mr-2" /> Settings</h5>
          <p>Here you can change your user setting</p>
        </div>

        <div className="my-4">
          <div>
            <label>Email:</label>
            <div>
              <input className={`form-input-field-fp ${errorMessage.email ? "error-border" : ""}`} type="email" defaultValue={email} placeholder="New email" onChange={(e) => { setNewEmail(e.target.value); handleEmailChange(e.target.value) }}   onBlur={(e) => { if (e.target.value !== email) setIsEmailIsModified(true); }} />
            </div>
          </div>
          <div>
            <label>Firstname:</label>
            <div>
              <input className={`form-input-field-fp ${errorMessage.firstname ? "error-border" : ""}`} type="text" defaultValue={firstname} placeholder="New first name" onChange={(e) => { setNewFirstname(e.target.value); handleFirstnameChange(e.target.value) }}   onBlur={(e) => { if (e.target.value !== firstname) setIsFirstnameIsModified(true); }}/>
            </div>
          </div>
          <div>
            <label>Lastname:</label>
            <div>
              <input className={`form-input-field-fp ${errorMessage.lastname ? "error-border" : ""}`} type="text" defaultValue={lastname} placeholder="New last name" onChange={(e) => { setNewLastname(e.target.value); handleLastnameChange(e.target.value) }}   onBlur={(e) => { if (e.target.value !== lastname) setIsLastnameIsModified(true); }}/>
            </div>
          </div>
          <div>
            <label>City:</label>
            <div>
              <input className="form-input-field-fp" type="text" defaultValue={city} placeholder="New city" onChange={(e) => setNewCity(e.target.value)} />
            </div>
          </div>
          <div>
            <label>Language:</label>
            <div style={{ width: "20em" }}>
              <select className="form-input-field-fp" defaultValue={lang} onChange={(e) => setNewLang(e.target.value)}>
                <option value="DK" selected={user.lang === "DN"}>Danish</option>
                <option value="SE" selected={user.lang === "SE"}>Swedish</option>
                <option value="NO" selected={user.lang === "NO"}>Norwegian</option>
                <option value="FI" selected={user.lang === "FI"}>Finnish</option>
              </select>
            </div>
          </div>

          <button className="button mt-3" onClick={handleUpdate}>Update</button>

        </div>
      </div>
      <Sidemenu />
      <Sidemenu_small />
    </div>
  );

};

export default Settings;