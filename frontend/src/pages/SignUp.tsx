import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const SigUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/create`, {
        email,
        password,
        firstname,
        lastname,
      });

      toast.success("Registered Successfully");
      setEmail("");
      setPassword("");
      setFirstname("");
      setLastname("");
    } catch (error) {
      toast.error("Invalid")
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="w-[400px] h-[600px] flex justify-center flex-col items-center border border-gray-300 p-5 rounded-lg">
          <h2 className="text-2xl font-bold">Sign Up</h2>
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
            <div className="mb-3 flex flex-col">
              <span>Firstname</span>
              <input
                type="text"
                required
                className="px-2 py-3 border border-gray-300 focus:ring-gray-500 focus:ring-1"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="mb-6 flex flex-col">
              <span>Lastname</span>
              <input
                type="text"
                required
                className="px-2 py-3 border border-gray-300 focus:ring-gray-500 focus:ring-1"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="border border-gray-300 p-3 rounded-md hover:bg-blue-400 hover:text-white"
              disabled={loading}
            >
              {loading ? "loading..." : "Sign Up"}
            </button>
            <Link to={"/login"}>
              <span className="mt-2 cursor-pointer hover:underline">
                Already have an Account ?{" "}
              </span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SigUp;
