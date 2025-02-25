import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigator = useNavigate();

  const postSigninData = (email: any, password: any) => {
    axios
      .post(
        "http://api.alikooshesh.ir:3000/api/users/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            api_key:
              "farzaneh-1240z5mHL4Z06oIYz9yMtealUlZf0Q25zN9IYQU4mQ2cv5RiWTF4zlVkAW0VIJGu46xGh18zW6duhSjVj5i7lXz9RPKPPWpBCRkjGkSwLmkzaoI4G1YH6t3",
          },
        }
      )
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        navigator("/weather_page");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <FormControl className="flex flex-col justify-center items-center gap-6">
        <div>
          <FormLabel color="white">Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-white"
          />
        </div>
        <div>
          <FormLabel color="white">Password</FormLabel>
          <Input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-white"
          />
        </div>
        <button
          onClick={() => postSigninData(email, Password)}
          className="border border-white rounded-full px-8 py-3 mt-5 text-white "
        >
          Sign In
        </button>
      </FormControl>
    </div>
  );
}
