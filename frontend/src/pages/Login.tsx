import axios from "axios";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const navigate = useNavigate();
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          email,
          password,
        }
      );
      if (data.success) {
        const userData = data.user
        login(userData)
        
        localStorage.setItem("token", data.token);

        toast.success(`Welcome ${email}`);
        
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid Username or password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="w-[400px] h-[400px] flex justify-center flex-col items-center border border-gray-300 p-5 rounded-lg">
          <h2 className="text-2xl font-bold">Login</h2>
          <div className="max-w-7xl w-full h-[400px] flex flex-col">
            <div className="mb-3 flex flex-col mt-5">
              <span>Email</span>
              <input
                type="email"
                required
                className="px-2 py-3 border border-gray-300 focus:ring-gray-500 focus:ring-1"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3 flex flex-col">
              <span>Password</span>
              <input
                type="password"
                required
                className="px-2 py-3 border border-gray-300 focus:ring-gray-500 focus:ring-1"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="border border-gray-300 p-3 rounded-md hover:bg-blue-400 hover:text-white"
            >
              { loading ? 'Loading...' : 'Login'}
            </button>
            <Link to={"/sign-up"}>
              <span className="mt-2 cursor-pointer hover:underline">
                Register here{" "}
              </span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
