import React, { useEffect, useState, useCallback } from "react";
import { Table } from "react-bootstrap";
const Dashboard = (props) => {
  const [listUser, setListUser] = useState([]);

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch(
        "https://ebookreader-5bd9b-default-rtdb.asia-southeast1.firebasedatabase.app/UserProfile.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      const data = await response.json();

      const loadUser = [];

      for (const key in data) {
        loadUser.push({
          data: data[key],
        });
      }
      setListUser(loadUser);
      console.log(listUser);
    } catch (err) {}
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <h4 className="my-4">Danh sách người dùng</h4>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên người dùng</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {listUser.map((user, idx) => {
            const data = user.data;
            return (
              <tr>
                <td>{++idx}</td>
                <td>{data.userName}</td>
                <td>{data.email}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Dashboard;
