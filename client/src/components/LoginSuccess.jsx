import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const LoginSuccess = () => {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  useEffect(() => {

    // ✅ GET TOKEN
    const token = searchParams.get("token");

    // ✅ GET USER
    const user = searchParams.get("user");

    if (token && user) {

      // SAVE TOKEN
      localStorage.setItem("token", token);

      // SAVE USER
      localStorage.setItem(
        "user",
        decodeURIComponent(user)
      );

      // ✅ CHECK REDIRECT
      const redirect =
        localStorage.getItem("redirectAfterLogin") ||
        "/";

      // REMOVE STORAGE
      localStorage.removeItem(
        "redirectAfterLogin"
      );

      // REDIRECT
      navigate(redirect);

    } else {

      navigate("/login");

    }

  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-xl font-semibold">
        Logging in...
      </h1>
    </div>
  );
};

export default LoginSuccess;