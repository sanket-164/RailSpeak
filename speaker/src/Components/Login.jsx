import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signIn } from "../utils/dataPoster";
import { Person } from "@mui/icons-material";

function Login() {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: (res) => {
      if (res.token) {
        toast.success("Login Successfully!");
        localStorage.setItem("broadcaster_token", res.token);
        navigate("/");
      }
    },
    onError: () => {
      toast.error("Invalid Credentials");
    },
  });

  const onSubmit = (data) => {
    mutate({
      username: data.username,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="h-screen w-screen overflow-hidden flex flex-col justify-center items-center select-none">
        <div className="card w-[500px] gap-4 p-14 border-2 rounded-lg shadow-lg overflow-hidden">
          <img
            src="./logo.png"
            className="w-72 h-52 mx-auto pointer-events-none"
          />

          <label
            className={`input input-bordered flex items-center ${
              errors.username ? "input-error" : ""
            }`}
          >
            <Person />
            <input
              type="text"
              name="username"
              className="grow ml-2"
              placeholder="Username"
              {...register("username", {
                required: "Email is Required!",
              })}
            />
          </label>
          {errors.username && (
            <div className="text-red-500 mx-2 my-1">
              {errors.username.message}
            </div>
          )}
          <label
            className={`input input-bordered flex items-center ${
              errors.password ? "input-error" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password"
              className="grow ml-2"
              placeholder="Password"
              {...register("password", {
                required: "Password is Required!",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters!",
                },
              })}
            />
          </label>
          {errors.password && (
            <div className="text-red-500 mx-2 my-1">
              {errors.password.message}
            </div>
          )}

          <button
            className="btn btn-success w-full mt-6 hover:opacity-85"
            disabled={isPending}
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
