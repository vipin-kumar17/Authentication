import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">AuthApp</h1>

      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/signup" className="hover:underline">Signup</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;
