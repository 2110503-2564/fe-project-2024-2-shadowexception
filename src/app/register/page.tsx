"use client";
import { useState } from "react";
import userSignUp from "@/libs/userSignUp";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button, Typography, TextField } from "@mui/material";

export default function RegisterPage() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userRole, setUserRole] = useState("user");
    const [userPassword, setUserPassword] = useState("");
    const [userTel, setUserTel] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const handleSignUp = async () => {
        try {
            const result = await userSignUp(
                userName,
                userEmail,
                userRole,
                userPassword,
                userTel
            );

            console.log(result);

            // Sign in the user after successful registration
            const signInResult = await signIn("credentials", {
                email: userEmail,
                password: userPassword,
                redirect: false, // Prevent automatic redirect
            });

            if (signInResult?.error) {
                setErrorMessage("Login Failed! " + signInResult.error);
            } else {
                // Redirect to the callbackUrl after successful login
                router.push(callbackUrl);
                router.refresh(); // Refresh หน้าเพื่อโหลดข้อมูลใหม่
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);  // Set error message from backend
            } else {
                setErrorMessage("An unexpected error occurred");
            }
        }
    };

    return (
        <Box className="flex justify-center items-center min-h-screen bg-gray-100">
            <Box className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <Typography className="text-2xl font-bold text-center text-blue-600 mb-6">Sign Up</Typography>

                {errorMessage && (
                    <Typography className="text-red-500 text-sm text-center mb-4">{errorMessage}</Typography>
                )}

                <Box className="space-y-4">
                    <Typography className="text-xl font-bold text-blue-600">Name</Typography>
                    <TextField
                        type="text"
                        placeholder="Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    
                    <Typography className="text-xl font-bold text-blue-600">Email</Typography>
                    <TextField
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                    
                    <Typography className="text-xl font-bold text-blue-600">Password</Typography>
                    <TextField
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setUserPassword(e.target.value)}
                    />

                    <Typography className="text-xl font-bold text-blue-600">Telephone Number</Typography>
                    <TextField
                        type="text"
                        placeholder="Tel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setUserTel(e.target.value)}
                    />
                </Box>

                <Button
                    onClick={handleSignUp}
                    className="w-full mt-6 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Register
                </Button>
            </Box>
        </Box>
    );
}
