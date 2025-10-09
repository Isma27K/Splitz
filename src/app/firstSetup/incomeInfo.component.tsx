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

    const minIncome = 100;
    const hasPayDate = payDate !== null;
    const isIncomeValid = typeof income === 'number' && income >= minIncome;
    const isValid = hasPayDate && isIncomeValid;

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if(!hasPayDate) {
            setError('Please pick a payday.');
            return;
        }

        if(!isIncomeValid) {
            setError(`Income must be at least ${minIncome}.`);
            return;
        }

        // Clear any previous errors
        setError('');

        const result = await window.auth.createUser(username, password, income, payDate!).then()

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
                        <CardTitle>Account Preferences</CardTitle>
                        <CardDescription>
                            Tell us your monthly income and payday.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form id="income-form" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="income">What is your monthly income</Label>
                                    <Input
                                        id="income"
                                        type="number"
                                        placeholder={`Enter your income (min ${minIncome})`}
                                        value={income}
                                        onChange={e => setIncome(Number(e.target.value))}
                                        required
                                    />
                                    <span className="text-xs text-muted-foreground">Minimum {minIncome}.</span>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="payDate">What day is your payday</Label>
                                    <DayPicker day={payDate} onDayChange={setPayDate} />
                                    <span className="text-xs text-muted-foreground">Pick a date.</span>
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
                                disabled={!isValid}
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
