import { useState } from "react";
import "./App.css";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import useToken from "./contexts/TokenContext";

const BACKEND_URL = "http://localhost:8080";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { saveToken, token } = useToken();

  async function handleLogin() {
    const response = await axios.post(`${BACKEND_URL}/auth/login`, {
      email: email,
      password: password,
    });

    saveToken(response.data.token);
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Login
      </h2>
      <div className="space-y-4">
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
          onClick={handleLogin}
        >
          Log in
        </button>
        {token && <StudentForm />}
      </div>
    </div>
  );
}

export default App;
