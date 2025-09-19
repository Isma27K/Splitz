import {useState} from "react";
import {cn} from "../lib/utils"
import {Button} from "../components/ui/button"
import {Input} from "../components/ui/input"
import {Label} from "../components/ui/label"
import { Loader2Icon } from "lucide-react"

declare global {
    interface Window {
        electron: {
            sendLogin: (email: string, password: string) => Promise<void>
        }
    }
}


export function LoginForm({className, ...props}: React.ComponentProps<"form">) {

    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault() // Prevent immediate submission
        setIsLoading(true)

        // Add delay before form submission
        // await delay(2000); // 2 second delay

        await window.electron.sendLogin(email, password)

        // // Now manually submit the form after delay
        // const form = e.target as HTMLFormElement;
        // const formData = new FormData(form);
        //
        // // Submit to your action URL
        // try {
        //     const response = await fetch(form.action, {
        //         method: form.method,
        //         body: formData
        //     });
        //     console.log("Form submitted successfully", response);
        // } catch (error) {
        //     console.error("Form submission error:", error);
        // }

        // Reset loading state
        setIsLoading(false)
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="abc@gmail.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        tabIndex={1}
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                            tabIndex={4}
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        tabIndex={2}
                        required
                        disabled={isLoading}
                    />
                </div>
                <Button type="submit" className="w-full" tabIndex={3} disabled={isLoading}>
                    {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin"/>}
                    Login
                </Button>
                <div
                    className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Upcoming
          </span>
                </div>
                <Button
                    onClick={() => {console.log("Google login coming soon")}}
                    variant="outline"
                    className="w-full"
                    disabled={true}
                    type="button"
                    tabIndex={5}
                >
                    <svg className="mr-2 h-4 w-4" width="201" height="205" viewBox="0 0 201 205" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_106_2044)">
                            <path
                                d="M200.92 104.941C200.92 98.0524 200.253 90.9413 199.142 84.2747H102.92V123.608H158.031C155.809 136.275 148.475 147.386 137.587 154.497L170.475 180.052C189.809 162.052 200.92 135.83 200.92 104.941Z"
                                fill="#4280EF"/>
                            <path
                                d="M102.92 204.497C130.476 204.497 153.587 195.386 170.475 179.83L137.587 154.497C128.476 160.719 116.698 164.275 102.92 164.275C76.2533 164.275 53.8088 146.275 45.5866 122.275L11.8088 148.275C29.1422 182.719 64.2533 204.497 102.92 204.497Z"
                                fill="#34A353"/>
                            <path
                                d="M45.5867 122.053C41.3645 109.386 41.3645 95.6084 45.5867 82.9417L11.8089 56.7195C-2.63552 85.6084 -2.63552 119.608 11.8089 148.275L45.5867 122.053Z"
                                fill="#F6B704"/>
                            <path
                                d="M102.92 40.9418C117.364 40.7195 131.587 46.2751 142.031 56.2751L171.142 26.9418C152.698 9.6084 128.253 0.275064 102.92 0.497287C64.2533 0.497287 29.1422 22.2751 11.8088 56.7195L45.5866 82.9418C53.8088 58.7195 76.2533 40.9418 102.92 40.9418Z"
                                fill="#E54335"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_106_2044">
                                <rect width="200" height="204.444" fill="white"
                                      transform="translate(0.920166 0.275146)"/>
                            </clipPath>
                        </defs>
                    </svg>
                    Login with Google
                </Button>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4" tabIndex={6}>
                    Sign up
                </a>
            </div>
        </form>
    )
}