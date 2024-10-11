import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const SendMoney = () => {

  let [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name")
  const [amount, setAmount] = useState(0);



  const TransferMoney = () => {

    const data = {
      to: id,
      amount: amount
    }


    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/v1/account/transfer',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzA5MDMwZTE0NTE2Y2EwNmY1MjNlMDEiLCJpYXQiOjE3Mjg2NDM4NTV9.q3U_vFdR0Sua93plKbT-Jqmh4VDYdyMD4KQLHoyb8PY'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

  }



  return <div class="flex justify-center h-screen bg-gray-100">
    <div className="h-full flex flex-col justify-center">
      <div
        class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
      >
        <div class="flex flex-col space-y-1.5 p-6">
          <h2 class="text-3xl font-bold text-center">Send Money</h2>
        </div>
        <div class="p-6">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <span class="text-2xl text-white">A</span>
            </div>
            <h3 class="text-2xl font-semibold">{name}</h3>
          </div>
          <div class="space-y-4">
            <div class="space-y-2">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="amount"
              >
                Amount (in Rs)
              </label>
              <input
                type="number"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="amount"
                placeholder="Enter amount"
                onChange={(e) => {
                  setAmount(e.target.value)
                }}
              />
            </div>
            <button class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              onClick={TransferMoney}

            >
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
}