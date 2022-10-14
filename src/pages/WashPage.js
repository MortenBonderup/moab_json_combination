import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function WashPage() {
  const params = useParams();
  const currentuser = JSON.parse(params.user);

  const [wms, setWms] = useState([]);
  const [users, setUsers] = useState([]);

  async function getWms() {
    const url = "http://localhost:3000/wm.json";
    const response = await fetch(url);
    const data = await response.json();
    setWms(data.wms);
  }

  async function getUsers() {
    const url = "http://localhost:3000/users.json";
    const response = await fetch(url);
    const data = await response.json();
    setUsers(data.users);
  }

  useEffect(() => {
    getWms();
    getUsers();
  }, []);

  return (
    <>
      <article>
        <h1>Washing overview</h1>
        <p>You are logged in as {currentuser.username}</p>
        <div style={{ display: "flex", flexDirection: "column", width: "70%" }}>
          {wms.map((wms) => (
            <PostCard key={wms.wmid} wms={wms} users={users} />
          ))}
        </div>
      </article>
    </>
  );
}

