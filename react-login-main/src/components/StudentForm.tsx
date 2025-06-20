import axios from "axios";
import useToken from "../contexts/TokenContext";

const BACKEND_URL = "http://localhost:8080";

function StudentForm() {
  const { token } = useToken();

  const alumno = {
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    age: 20,
    description: "Computer Science Student",
    password: "securePassword123",
  };

  async function handleButton() {
    const response = await axios.post(`${BACKEND_URL}/student`, alumno, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
  }

  return (
    <button
      className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors duration-200 font-semibold"
      onClick={handleButton}
    >
      Crear alumno
    </button>
  );
}

export default StudentForm;
