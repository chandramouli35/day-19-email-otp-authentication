import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function OTPForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { setIsAuthenticated } = useAuth();
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOtpSent && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isOtpSent) {
      clearInterval(timerRef.current);
      toast.warning("OTP expired!");
    }
    return () => clearInterval(timerRef.current);
  }, [isOtpSent, timeLeft]);

  const handleSendOTP = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format!");
      return;
    }
    setTimeLeft(90);
    setIsOtpSent(true);
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("mockOtp", newOtp);
    toast.success(`OTP ${newOtp} sent to ${email}!`); // Debug OTP
    console.log("Send OTP triggered, stored OTP:", newOtp);
  };

  const handleResendOTP = () => {
    handleSendOTP();
    toast.info("Resending OTP...");
  };

  const validateOTP = () => {
    const storedOtp = localStorage.getItem("mockOtp");
    console.log("Validating OTP:", otp, "vs Stored:", storedOtp);
    if (!/^[0-9]{6}$/.test(otp)) {
      toast.error("OTP must be 6 digits!");
      return false;
    }
    if (otp !== storedOtp) {
      toast.error("Invalid OTP, please retry!");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    console.log("Verify OTP clicked with OTP:", otp);
    if (validateOTP()) {
      setIsAuthenticated(true);
      toast.success("Logged In!");
    } else {
      // Ensure toast is triggered even if validation fails
      if (!/^[0-9]{6}$/.test(otp)) {
        toast.error("OTP must be 6 digits!");
      } else {
        toast.error("Invalid OTP, please retry!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">OTP Login</h1>
        {!isOtpSent ? (
          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleSendOTP}
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-center">Time Left: {timeLeft} seconds</p>
            <input
              type="text"
              value={otp}
              onChange={(e) => {
                const newOtp = e.target.value
                  .slice(0, 6)
                  .replace(/[^0-9]/g, "");
                setOtp(newOtp);
                console.log("OTP input:", newOtp);
              }}
              placeholder="Enter 6-digit OTP"
              className="w-full p-2 border border-gray-300 rounded"
              maxLength={6}
            />
            <button
              onClick={handleSubmit}
              className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
              disabled={!/^[0-9]{6}$/.test(otp) || timeLeft === 0}
            >
              Verify OTP
            </button>
            {timeLeft === 0 && (
              <button
                onClick={handleResendOTP}
                className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Resend OTP
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OTPForm;
