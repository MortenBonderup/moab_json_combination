import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 📁 pages/HomePage.js
export default function HomePage() {
  // Defines initial states of data values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();


// Fetch is run to get list of users from 
// users.json file in public folder  
  const getUsers = () => {
    fetch("http://localhost:3000/users.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setUsers(myJson);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  // When the form is submitted, an object is created (formData)...
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      username: username,
      password: password,
    };

    // Check to see if all fields were filled. If not, show an
    // error message. If everything is good, loop though the
    // list of users to find a match. If match, navigate to wash
    // overview and transfer user information as props.
    const validForm = formData.username && formData.password;
    if (validForm) {
      for (const user of users.users) {
        if (formData.username === user.username && formData.password === user.password) {
            console.log("bingo");
            const currentuser = {
              userid: user.userid,
              username: user.username
            }
            navigate(`wash/${JSON.stringify(currentuser)}`);
        }
      }
    } else {
      setErrorMessage("Please, fill in all fields.");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset style={{ width: "250px" }}>
          <legend>Log in</legend>
          <label>
            Username{" "}
            <input
              type="text"
              name="username"
              placeholder="Type in username"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </label>
          <label>
            Password&nbsp;{" "}
            <input
              type="password"
              name="password"
              placeholder="Type in password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <br></br>
            <br></br>
            <p>{errorMessage}</p>
            <button style={{ float: "right" }}>Login</button>
            <button type="reset" style={{ float: "right" }}>
              Reset
            </button>
          </label>
        </fieldset>
      </form>
      <p>Her: Nina, hello123</p>
      <p>Him: Morten, hi123</p>
    </>
  );
}


