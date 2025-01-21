import React, { useState } from "react";

function UserDataForm(){
    const [username, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    const handleAddUser = async () => {
        try {
            const responce = await fetch("http://localhost:5000/api/auth/adduserdata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, phoneNo }),
            });
            const data = await responce.json();
            console.log(data);
            if (data.success) {
                alert("User Added Successfully");
            } else {
                alert("User Added Failed");
            }
        } catch (error) {
            console.log(error);
         }
    }


  return (
    <div className="relative flex flex-col items-center mt-6 rounded-xl bg-transparent">
      <p className="text-slate-500 font-light">
        Enter Users Details.
      </p>
      <form className="mx-auto max-w-[24rem] text-left w-80">
        <div className="mb-1 flex flex-col gap-6">
          <div className="w-full max-w-sm min-w-[200px]">
            <label className="block mb-2 text-sm text-slate-600">Name</label>
            <input
              type="text"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Name"
              value={username}
              onChange={(e) => setuserName(e.target.value)}

            />
          </div>
          <div className="w-full max-w-sm min-w-[200px]">
            <label className="block mb-2 text-sm text-slate-600">Email</label>
            <input
              type="email"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Your Email"
              value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full max-w-sm min-w-[200px]">
            <label className="block mb-2 text-sm text-slate-600">phone No</label>
            <input
              type="phone"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Your phone"
              value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>
        </div>
        <button
          className="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={handleAddUser}
        >
          Add user
        </button>
      </form>
    </div>
  );
};

export default UserDataForm;
