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
      localStorage.setItem("user", user);

      // ✅ CHECK REDIRECT (priority: query param > localStorage > home)
      const queryRedirect = searchParams.get("redirect");
      const savedRedirect = localStorage.getItem("redirectAfterLogin");

      // ✅ CLEAR SAVED REDIRECT (prevent stale data)
      localStorage.removeItem("redirectAfterLogin");

      const redirect = queryRedirect || savedRedirect || "/";

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