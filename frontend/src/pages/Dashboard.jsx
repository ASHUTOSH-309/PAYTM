import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios";

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {



    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/v1/account/balance',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzA3YjJmMjY3NDQyNmIxMDFiM2FhMTEiLCJpYXQiOjE3Mjg2NjA3NzN9.b6J4PPidIzrlHFsVOm3i7xMc-gAeVoKhAKSbt-pFeLU'
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setBalance(response.data.balance)
      })
      .catch((error) => {
        console.log(error);
      });


  }, [balance])


  return <div>
    <Appbar />
    <div className="m-8">
      <Balance value={balance.toFixed(2)} />
      <Users />
    </div>
  </div>
}