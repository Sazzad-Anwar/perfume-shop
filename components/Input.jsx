import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Input = ({
  value,
  setValue,
  type,
  name,
  placeholder,
  error,
  setError,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  let passwordRule = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}/g;
  let emailRule = /([@])/g;

  const handleSetValue = (e) => {
    if (e.target.name === name && e.target.value === "") {
      setError(`${name} is required`);
    } else {
      setError("");
      setValue(e.target.value);
    }
  };

  if (type === "password") {
    const handleSetValue = (e) => {
      setValue(e.target.value);

      if (e.target.value !== "" && !passwordRule.test(e.target.value)) {
        setError(
          "Password must be at least 6 characters and contain at least one number and a special character"
        );
      } else if (e.target.value === "") {
        setError("Password is required");
      } else {
        setError("");
      }
    };

    return (
      <div className="my-2">
        <div className="flex items-center justify-between">
          <input
            className="normal-transition my-1 mr-0 w-full rounded-md rounded-r-none border-t border-b border-l border-purple-500 py-3 pl-5 text-base text-purple-800 focus:outline-none"
            type={showPassword ? "text" : type}
            value={value}
            onChange={handleSetValue}
            name={name}
            placeholder={placeholder}
          />
          <i
            onClick={() => setShowPassword(!showPassword)}
            className={
              !showPassword
                ? "bi bi-eye-fill normal-transition cursor-pointer rounded-md rounded-l-none border-t border-b border-r border-l-0 border-purple-500 py-2.5 pr-3 text-xl text-purple-800"
                : "bi bi-eye-slash-fill normal-transition cursor-pointer rounded-md rounded-l-none border-t border-b border-r border-l-0 border-purple-500 py-2.5 pr-3 text-xl text-purple-800"
            }
          ></i>
        </div>
        {error && (
          <motion.p
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-0 text-purple-800"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }

  if (type === "email") {
    const handleSetValue = (e) => {
      setValue(e.target.value);

      if (
        e.target.name === "email" &&
        e.target.value !== "" &&
        !emailRule.test(e.target.value)
      ) {
        setError("Email is not valid");
      } else if (e.target.name === "email" && e.target.value === "") {
        setError("Email is required");
      } else {
        setError("");
      }
    };

    return (
      <div className="my-2">
        <input
          type={type}
          value={value}
          onChange={handleSetValue}
          name={name}
          autoComplete="off"
          className="normal-transition my-2 w-full rounded-md border border-purple-500 py-3 px-5 text-base text-purple-800 focus:outline-none"
          placeholder={placeholder}
        />
        {error && (
          <motion.p
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-0 text-purple-800"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }

  return (
    <div className="my-2">
      <input
        type={type}
        value={value}
        onChange={handleSetValue}
        name={name}
        autoComplete="off"
        className="normal-transition my-2 w-full rounded-md border border-purple-500 py-3 px-5 text-base text-purple-800 focus:outline-none"
        placeholder={placeholder}
      />
      {error && (
        <motion.p
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-0 text-purple-800"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;
