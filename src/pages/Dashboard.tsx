import React, { useState } from "react";
import useAuthFirebase from "../hooks/useAuthFirebase";

export default function Dashboard() {
  const { login, signup, currentUser, signout } = useAuthFirebase();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const handleSignUp = async () => {
    try {
      await signup(email, password, username);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleConfirm = () => {
    if (showRegister) {
      handleSignUp();
    } else {
      login(email, password);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-around">
      {currentUser ? (
        <>
          <div className="bg-black text-white text-xl h-[10%] w-[30%] border-white border-4 rounded-xl flex flex-col items-center justify-center font-bold">
            Dashboard
          </div>
          <div
            onClick={() => signout()}
            className="bg-white hover:bg-[#FD0001] transition-colors duration-300 ease-in-out text-xl h-[10%] w-[30%] border-black border-4 rounded-xl flex items-center justify-center font-bold"
          >
            Logout
          </div>
        </>
      ) : (
        <>
          <div className="bg-black text-white text-xl h-[10%] w-[30%] border-white border-4 rounded-xl flex flex-col items-center justify-center font-bold">
            {showRegister ? "Register" : "Login"}
          </div>
          {showRegister && (
            <div className="flex flex-row items-center w-[30%] justify-around my-2">
              <input
                className="border-2 border-black rounded-md p-2 w-full"
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          <div className="flex flex-row items-center w-[30%] justify-around my-2">
            <input
              className="border-2 border-black rounded-md p-2 w-full"
              type="text"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-row items-center w-[30%] justify-around my-2">
            <input
              className="border-2 border-black rounded-md p-2 w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            onClick={() => handleConfirm()}
            className="bg-white hover:bg-[#FD0001] transition-colors duration-300 ease-in-out text-xl h-[10%] w-[30%] border-black border-4 rounded-xl flex items-center justify-center font-bold"
          >
            Confirm
          </div>
          <div
            onClick={() => setShowRegister(!showRegister)}
            className="bg-white hover:bg-[#FD0001] transition-colors duration-300 ease-in-out text-xl h-[10%] w-[30%] border-black border-4 rounded-xl flex items-center justify-center font-bold"
          >
            {showRegister
              ? "Already registerd? Login"
              : "New User? Register Now!"}
          </div>
        </>
      )}
    </div>
  );
}
