import React, { useEffect } from "react";
import LoggedUser from "./LoggedUser";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";

function Users() {
  const users = useSelector((state) => state.users);
  const loginUser = useSelector((state) => state.login);

  console.log(users.name);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>Blog App</h1>
      <LoggedUser />
      <h1>Users</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
