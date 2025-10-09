import {useState, createContext, useContext, useEffect} from "react";

import Confetti from 'react-confetti'
import {useWindowSize} from 'react-use'
// import {useNavigate} from "react-router-dom";
import SetupAccount from './setupAccount.component.tsx'
import SetupIncome from "@/app/firstSetup/incomeInfo.component.tsx";

interface SignUp {
    income: number;
    setIncome: (value: number) => void;
    username: string;
    setUsername: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    payDate: number | null;
    setPayDate: (value: number | null) => void;

    step: number;
    setStep: (value: number) => void;
}

const SignUpContext = createContext<SignUp | undefined>(undefined);

export const useSignUp = () => {
    const context = useContext(SignUpContext);
    if (!context) {
        throw new Error("useSignUp must be used within a SignUpProvider");
    }
    return context;
};

function WelcomePage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [income, setIncome] = useState(0)
    const [payDate, setPayDate] = useState<number | null>(null);

    const [step, setStep] = useState(1);

    const { width, height } = useWindowSize()
    // const nav = useNavigate()

    // const handleSubmit = async (e: { preventDefault: () => void; }) => {
    //     e.preventDefault();
    //     if (!username.trim() || !password.trim()) {
    //         setError(true);
    //         setMessage("Please enter a valid username and password.");
    //         return;
    //     }
    //
    //     if (password !== cPassword) {
    //         setError(true);
    //         setMessage("Passwords don't match");
    //         return;
    //     }
    //
    //     // Clear any previous errors
    //     setError(false);
    //     setMessage('');
    //
    //     const result = await window.auth.createUser(username, password).then()
    //
    //     console.log(result.success)
    //
    //     if (result.success) {
    //         nav('/dashboard')
    //     }
    //
    //     // Handle login logic here
    //     console.log('Sign Up attempt:', { username, password });
    // };

    return (
        <SignUpContext.Provider
            value={{ username, setUsername, password, setPassword, income, setIncome, payDate, setPayDate, step, setStep }}
        >
            <div className="fixed inset-0 -z-10 pointer-events-none">
                {/* -- spiral -- */}
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
            </div>

            <div className="flex justify-center items-center min-h-screen w-full">
                {step === 1 && <SetupAccount />}
                {step === 2 && <SetupIncome />}
                {/*{step === 3 && <FinalReview />}*/}
            </div>
        </SignUpContext.Provider>
    )
}

export default WelcomePage;