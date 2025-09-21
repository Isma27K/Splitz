import {useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../../components/ui/card"
import {Input} from "../../components/ui/input"
import {Label} from "../../components/ui/label"
import {Button} from "../../components/ui/button"
import {Alert, AlertDescription, AlertTitle} from "../../components/ui/alert"
import {motion} from "motion/react"
import Confetti from 'react-confetti'
import {useWindowSize} from 'react-use'
import PasswordStrengthBar from 'react-password-strength-bar';



function WelcomePage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [isError, setError] = useState(false)
    const [message, setMessage] = useState('')
    const { width, height } = useWindowSize()


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            setError(true);
            setMessage("Please enter a valid username and password.");
            return;
        }

        if (password !== cPassword) {
            setError(true);
            setMessage("Passwords don't match");
            return;
        }

        // Clear any previous errors
        setError(false);
        setMessage('');

        // Handle login logic here
        console.log('Sign Up attempt:', { username, password });
    };

    return (
        <>
            <div className="fixed inset-0 -z-10 pointer-events-none">
                {/* -- spriral -- */}
                <Confetti
                    width={width}
                    height={height}
                    className="w-full h-full"
                    drawShape={ctx => {
                        ctx.beginPath()
                        for (let i = 0; i < 22; i++) {
                            const angle = 0.35 * i
                            const x = (0.2 + (1.5 * angle)) * Math.cos(angle)
                            const y = (0.2 + (1.5 * angle)) * Math.sin(angle)
                            ctx.lineTo(x, y)
                        }
                        ctx.stroke()
                        ctx.closePath()
                    }}

                />

                {/*<Confetti*/}
                {/*    width={width}*/}
                {/*    height={height}*/}
                {/*/>*/}
            </div>


            <div className="flex justify-center items-center min-h-screen w-full">
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
                            <form id="login-form" onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input
                                            id="username"
                                            type=""
                                            placeholder="Enter your username"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            required
                                        />
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

                        {isError && (
                            <div className="px-6 pb-4">
                                <Alert variant="destructive">
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{message}</AlertDescription>
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
                                >
                                    Login
                                </Button>
                            </motion.div>

                            <motion.div
                                // disable it for now
                                // whileHover={{ scale: 1.05 }}
                                // whileTap={{ scale: 1.0 }}
                                className="w-full"
                            >
                                <Button type="button" variant="outline" className="w-full" disabled>
                                    Login with Google (Soon)
                                </Button>
                            </motion.div>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>

        </>
    )
}

export default WelcomePage;