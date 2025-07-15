
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Eye, EyeOff, Lock, User, Mail, AlertCircle, CheckCircle2, Shield } from "lucide-react"

import axios from "axios"
import AuthLayout from "../../../components/auth/AuthLayout";
import {useTranslation} from "react-i18next";

const SignUpPage = () => {

    const {t} = useTranslation();

    const schema = yup.object({
        username: yup.string().required(t("Username is required")),
        password: yup
            .string()
            .required(t("Password is required"))
            .min(6, t("Password must be at least 6 characters"))
            .matches(/[A-Z]/, t("Password must contain at least one uppercase letter"))
            .matches(/[a-z]/, t("Password must contain at least one lowercase letter"))
            .matches(/[0-9]/, t("Password must contain at least one number"))
            .matches(/[!@#$%^&*(),.?\":{}|<>]/, t("Password must contain at least one special character")),
        confirmpassword: yup
            .string()
            .oneOf([yup.ref("password")], t("Passwords do not match"))
            .required(t("Confirm password is required")),
    });


    // useForm dùng schema này
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const password = watch("password");
    const apiURL = process.env.REACT_APP_API_URL;

    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, label: "", color: "" };

        let strength = 0;
        if (password.length >= 6) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

        const labels = [
            t("Very Weak"),
            t("Weak"),
            t("Fair"),
            t("Strong"),
            t("Very Strong")
        ];

        const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];

        return {
            strength,
            label: labels[strength - 1] || "",
            color: colors[strength - 1] || "bg-gray-500",
        };
    };

    const passwordStrength = getPasswordStrength(password);

    const handleSignUp = async (values) => {
        if (!acceptTerms) {
            setErrorMessage(t("Please agree to the terms of service"));
            return;
        }

        setLoading(true);
        setErrorMessage("");

        try {
            const payload = {
                full_name: values.fullname,
                username: values.username,
                email: values.email,
                password: values.password,
                role: false,
            };

            const response = await axios.post(`${apiURL}/api/auth/register`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 201) {
                const serverMessage = response.data.message || "Registration successful!";
                alert(serverMessage);
                navigate("/auth/sign-in", { state: { message: serverMessage } });
            } else {
                setErrorMessage(t("Registration failed. Please try again."));
            }
        } catch (error) {
            console.error("Error:", error);

            if (error.response) {
                let errorMsg = t("An error occurred during registration. Please try again.");
                const errorData = error.response.data;

                if (typeof errorData === "string") {
                    errorMsg = errorData;
                } else if (errorData?.message && typeof errorData.message === "string") {
                    errorMsg = errorData.message;
                } else if (errorData?.detail) {
                    if (typeof errorData.detail === "string") {
                        errorMsg = errorData.detail;
                    } else if (Array.isArray(errorData.detail)) {
                        errorMsg = errorData.detail
                            .map((err) => {
                                if (typeof err === "string") return err;
                                if (err.msg) return err.msg;
                                return JSON.stringify(err);
                            })
                            .join(", ");
                    } else if (typeof errorData.detail === "object") {
                        errorMsg = errorData.detail.msg || JSON.stringify(errorData.detail);
                    }
                }
                setErrorMessage(errorMsg);
            } else if (error.request) {
                setErrorMessage(t("Cannot connect to the server. Please check your network and try again."));
            } else {
                setErrorMessage(t("An unknown error occurred. Please try again."));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title={t('Sign Up')}>
            <form onSubmit={handleSubmit(handleSignUp)} className="space-y-6">
                {/* Error Message */}
                {errorMessage && (
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-500/20 rounded-xl blur-sm"></div>
                        <div className="relative bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-4 rounded-xl text-sm flex items-center space-x-3 backdrop-blur-sm">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="font-medium">{errorMessage}</span>
                        </div>
                    </div>
                )}

                {/* Username */}
                <div className="space-y-2">
                    <label className="text-slate-300 text-sm font-medium flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{t("Username")}</span>
                    </label>
                    <div className="relative group">
                        <input
                            {...register("username")}
                            type="text"
                            className="w-full bg-slate-800/50 border border-slate-600/50 text-white px-4 py-4 rounded-xl focus:bg-slate-800/70 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-slate-400 transition-all duration-300 group-hover:border-slate-500/70"
                            placeholder={t("Enter your username")}
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-focus-within:from-blue-500/10 group-focus-within:via-blue-500/5 group-focus-within:to-blue-500/10 transition-all duration-500 pointer-events-none"></div>
                    </div>
                    {errors.username && (
                        <p className="text-red-400 text-sm flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.username.message}</span>
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label className="text-slate-300 text-sm font-medium flex items-center space-x-2">
                        <Lock className="w-4 h-4" />
                        <span>{t("Password")}</span>
                    </label>
                    <div className="relative group">
                        <input
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            className="w-full bg-slate-800/50 border border-slate-600/50 text-white px-4 py-4 pr-12 rounded-xl focus:bg-slate-800/70 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-slate-400 transition-all duration-300 group-hover:border-slate-500/70"
                            placeholder={t("Enter your password")}
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-300 p-1"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-focus-within:from-blue-500/10 group-focus-within:via-blue-500/5 group-focus-within:to-blue-500/10 transition-all duration-500 pointer-events-none"></div>
                    </div>

                    {/* Password Strength */}
                    {password && (
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <div className="flex-1 bg-slate-700 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-500 ${passwordStrength.color}`}
                                        style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs text-slate-400 font-medium min-w-[80px]">
                {passwordStrength.label}
              </span>
                            </div>
                        </div>
                    )}

                    {errors.password && (
                        <p className="text-red-400 text-sm flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.password.message}</span>
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label className="text-slate-300 text-sm font-medium flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>{t("Confirm Password")}</span>
                    </label>
                    <div className="relative group">
                        <input
                            {...register("confirmpassword")}
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-full bg-slate-800/50 border border-slate-600/50 text-white px-4 py-4 pr-12 rounded-xl focus:bg-slate-800/70 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-slate-400 transition-all duration-300 group-hover:border-slate-500/70"
                            placeholder={t("Re-enter your password")}
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-300 p-1"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-focus-within:from-blue-500/10 group-focus-within:via-blue-500/5 group-focus-within:to-blue-500/10 transition-all duration-500 pointer-events-none"></div>
                    </div>
                    {errors.confirmpassword && (
                        <p className="text-red-400 text-sm flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.confirmpassword.message}</span>
                        </p>
                    )}
                </div>

                {/* Terms */}
                <div className="space-y-4">
                    <label className="flex items-start space-x-3 cursor-pointer group">
                        <div className="relative mt-0.5">
                            <input
                                type="checkbox"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                className="sr-only"
                            />
                            <div
                                className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                                    acceptTerms ? "bg-blue-500 border-blue-500" : "border-slate-500 group-hover:border-slate-400"
                                }`}
                            >
                                {acceptTerms && <CheckCircle2 className="w-3 h-3 text-white m-0.5" />}
                            </div>
                        </div>
                        <span className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
  {t("I agree to the") + " "}
                            <a href="#" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
    {t("Terms of Service")}
  </a>{" "}
                            {t("and") + " "}
                            <a href="#" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
    {t("Privacy Policy")}
            </a>
          </span>
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading || !acceptTerms}
                    className="relative w-full group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 rounded-xl transition-all duration-300 group-hover:from-blue-500 group-hover:via-blue-400 group-hover:to-blue-500 group-disabled:opacity-50"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-white/20 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/25 group-disabled:opacity-50 group-disabled:cursor-not-allowed">
                        {loading ? (
                            <div className="flex items-center justify-center space-x-3">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>{t("Registering...")}</span>
                            </div>
                        ) : (
                            <span>{t("Create Account")}</span>
                        )}
                    </div>
                </button>

                {/* Sign In Link */}
                <div className="text-center pt-6 border-t border-slate-700/50">
                    <p className="text-slate-400 text-sm">
                        {t("Already have an account?")}
                        <Link
                            to="/auth/sign-in"
                            className="text-white hover:text-blue-400 font-semibold transition-colors duration-300 hover:underline underline-offset-2"
                        >
                            {t("Sign in now")}
                        </Link>
                    </p>
                </div>


            </form>
        </AuthLayout>
    );

}

export default SignUpPage
