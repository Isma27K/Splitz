/**
 * setupAccount.component.tsx
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/28/2025 7:19 PM
 */
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";
import PasswordStrengthBar from "react-password-strength-bar";
import {motion} from "motion/react";
import {Button} from "@/components/ui/button.tsx";
import { useSignUp } from "./welcomePage";
import { useState } from "react";

function SetupAccount() {
    const { username, setUsername, password, setPassword, step, setStep } = useSignUp();
    const [cPassword, setCPassword] = useState("");
    const [error, setError] = useState("");

    // Basic validations
    const isUsernameValid = username.trim().length >= 3;
    const isPasswordStrong = password.length >= 8;
    const isMatching = password === cPassword;
    const isValid = isUsernameValid && isPasswordStrong && isMatching;

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isUsernameValid) {
            setError("Username must be at least 3 characters.");
            return;
        }

        if (!isPasswordStrong) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (!isMatching) {
            setError("Passwords don't match.");
            return;
        }

        setError("");
        setStep(step + 1); // 👈 Go to the next component
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.6,
                scale: {
                    type: "spring",
                    visualDuration: 0.6,
                    bounce: 0.5
                },
            }}
        >
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Lets Get Setup 🥳</CardTitle>
                    <CardDescription>
                        Let's get you on board with local account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="login-form" onSubmit={handleNext}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                />
                                {/* Helper text */}
                                <span className="text-xs text-muted-foreground">Minimum 3 characters.</span>
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                                {/* Helper text */}
                                <span className="text-xs text-muted-foreground">Minimum 8 characters.</span>
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="cPassword">Confirm Password</Label>
                                </div>
                                <Input
                                    id="cPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={cPassword}
                                    onChange={e => setCPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>

                {error && (
                    <div className="px-6 pb-4">
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    </div>
                )}

                <CardFooter className="flex-col gap-2">
                    <div className="w-full">
                        <PasswordStrengthBar password={password} />
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 1.0 }}
                        className="w-full"
                    >
                        <Button
                            type="submit"
                            form="login-form"
                            className="w-full"
                            disabled={!isValid}
                        >
                            Next
                        </Button>
                    </motion.div>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

export default SetupAccount;