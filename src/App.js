import { useAuth } from "./context/AuthContext";
import OTPForm from "./components/OTPForm";
import LoginSuccess from "./components/LoginSuccess";

function App() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <LoginSuccess /> : <OTPForm />;
}

export default App;
