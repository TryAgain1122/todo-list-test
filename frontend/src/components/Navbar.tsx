import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

interface NavbarProps {
  setQuery: (query: string) => void;
}

const Navbar = ({setQuery}:NavbarProps) => {
  const { user, logout } = useAuth();

  
const handleLogout = () => {
  logout();
  window.location.reload();
}

  return (
    <div className="p-5 bg-slate-500">
      <div className="flex justify-between items-center gap-2">
        <span className="text-2xl text-white font-semibold">NOTE APP</span>

        <input
          type="text"   
          name=""
          id=""
          placeholder="Search Notes..."
          className="p-2 rounded-md shadow-md border border-gray-300 focus:ring-1 focus:ring-blue-300"
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex justify-between gap-3 items-center">
          {!user ? (
            <>
            <Link to={'/login'}>
              <button className="border border-blue-300 bg-blue-600 px-3 py-2 text-white rounded-lg hover:bg-blue-500">
                Login
              </button>
              </Link>
            <Link to={'/sign-up'}>
              <button className="border border-green-300 bg-green-600 px-3 py-2 text-white rounded-lg hover:bg-green-500">
                SIgn Up
              </button>
            </Link>
            </>
          ) : (
            <>
            <span className="text-white">{user.name}</span>
            <button className="border border-red-300 bg-red-600 px-3 py-2 text-white rounded-lg hover:bg-red-500"
              onClick={handleLogout}
            >
              Logout
            </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
