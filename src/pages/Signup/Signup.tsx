import { useAppDispatch } from "@hooks/useAppDispatch";
import { signupThunk } from "@thunk/authThunk";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const onSubmitHandler = (values: any) => {
    console.log(values);
    dispatch(signupThunk(values));
    // navigate(location?.state?.from?.pathname || "/", { replace: true });
  };

  return (
    <div>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        name="password"
        id="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        onClick={(e) => {
          e.preventDefault()
          onSubmitHandler({
            email: email,
            password: password,
          });
        }}
      >
        submit
      </button>
    </div>
  );
};

export default Signup;
