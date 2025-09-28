/**
 * incomeInfo.component.tsx
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/28/2025 7:14 PM
 */
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {motion} from "motion/react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useSignUp} from "@/app/firstSetup/welcomePage.tsx";
import { DayPicker } from "@/components/peice/dayDatePicker";
import {Button} from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";



function SetupIncome() {

    const { income, setIncome, payDate, setPayDate, username, password,  } = useSignUp();
    const [error, setError] = useState('');

    const nav = useNavigate()

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if(payDate == null) {
            setError('Please pick a date');
            return;
        }

        if(income < 100) {
            setError('Broo, you sure that is your income. i mean im not dumb 🗿');
            return;
        }

        // Clear any previous errors
        setError('');

        const result = await window.auth.createUser(username, password, income, payDate).then()

        console.log(result.success)

        if (result.success) {
            nav('/dashboard')
        }

        // Handle login logic here
        console.log('Sign Up attempt:', { username, password });
    };


    return (
        <>
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
                        <CardTitle>Lets Get Setup 💰</CardTitle>
                        <CardDescription>
                            One more thing, we need your income information for calculating purposes 🤣
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            id="income-form"
                            onSubmit={handleSubmit}
                            // onSubmit={(e) => {
                            //     e.preventDefault(); // 🚫 stops the refresh
                            //     console.log("fucker hitterr");
                            // }}
                        >                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="income">Income / month (Rm)</Label>
                                    <Input
                                        id="income"
                                        type="number"
                                        placeholder="Enter your income"
                                        value={income}
                                        onChange={e => setIncome(Number(e.target.value))}
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="payDate">What day is your payday</Label>
                                    <DayPicker day={payDate} onDayChange={setPayDate} />
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
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 1.0 }}
                            className="w-full"
                        >
                            <Button
                                type="submit"
                                form="income-form"
                                className="w-full"
                            >
                                Next
                            </Button>
                        </motion.div>
                    </CardFooter>
                </Card>
            </motion.div>
        </>
    )
}

export default SetupIncome;
