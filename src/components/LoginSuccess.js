import { useAuth } from "../context/AuthContext";

function LoginSuccess() {
  const { setIsAuthenticated } = useAuth();

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
        <p className="text-gray-600">You are logged in successfully.</p>
        <button
          onClick={handleLogout}
          className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default LoginSuccess;
