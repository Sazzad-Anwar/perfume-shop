import { useEffect, useState } from "react";
import { motion } from 'framer-motion'

const Input = ({ value, setValue, type, name, placeholder, error, setError }) => {

    const [showPassword, setShowPassword] = useState(false);

    let passwordRule = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}/g
    let emailRule = /([@])/g

    const handleSetValue = (e) => {

        if (e.target.name === name && e.target.value === '') {
            setError(`${name} is required`)
        } else {
            setError('')
            setValue(e.target.value)
        }
    }

    if (type === 'password') {

        const handleSetValue = (e) => {
            setValue(e.target.value);

            if (e.target.value !== '' && !passwordRule.test(e.target.value)) {
                setError('Password must be at least 6 characters and contain at least one number and a special character')
            }
            else if (e.target.value === '') {
                setError('Password is required')
            }
            else {
                setError('')
            }
        }

        return (
            <div className="my-2">
                <div className="flex justify-between items-center">
                    <input
                        className="w-full text-base text-purple-800 my-1 border-t border-b border-l border-purple-500 rounded-r-none rounded-md py-3 normal-transition pl-5 focus:outline-none mr-0"
                        type={showPassword ? 'text' : type}
                        value={value}
                        onChange={handleSetValue}
                        name={name}
                        placeholder={placeholder}
                    />
                    <i onClick={() => setShowPassword(!showPassword)} className={!showPassword ? "bi bi-eye-fill text-xl text-purple-800 normal-transition cursor-pointer py-2.5 border-t border-b border-r border-l-0 pr-3 border-purple-500 rounded-md rounded-l-none" : "bi bi-eye-slash-fill text-xl text-purple-800 normal-transition cursor-pointer py-2.5 border-t border-b border-r border-l-0 pr-3 border-purple-500 rounded-md rounded-l-none"}></i>
                </div>
                {error &&
                    <motion.p
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-purple-800 mt-0">
                        {error}
                    </motion.p>
                }
            </div>
        );
    }

    if (type === 'email') {

        const handleSetValue = (e) => {

            setValue(e.target.value);

            if (e.target.name === 'email' && e.target.value !== '' && !emailRule.test(e.target.value)) {
                setError('Email is not valid')
            }
            else if (e.target.name === 'email' && e.target.value === '') {
                setError('Email is required')
            }
            else {
                setError('')
            }
        }

        return (
            <div className="my-2">
                <input
                    type={type}
                    value={value}
                    onChange={handleSetValue}
                    name={name}
                    autoComplete="off"
                    className="w-full text-base text-purple-800 my-2 border border-purple-500 rounded-md py-3 focus:outline-none normal-transition px-5"
                    placeholder={placeholder}
                />
                {error &&
                    <motion.p
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-purple-800 mt-0">
                        {error}
                    </motion.p>
                }
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
                className="w-full text-base text-purple-800 my-2 border border-purple-500 rounded-md py-3 focus:outline-none normal-transition px-5"
                placeholder={placeholder}
            />
            {error &&
                <motion.p
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-purple-800 mt-0">
                    {error}
                </motion.p>
            }
        </div>
    );
};

export default Input;
