"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useRef, useTransition } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner";
import { Login } from "@/actions/auth"
import Link from "next/link"

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [isPending, startTransition] = useTransition()
    const email = useRef<HTMLInputElement | null>(null)
    const password = useRef<HTMLInputElement | null>(null)
     const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();
        
        startTransition(async () => {
            if (!email.current || !password.current) {
                toast.error("All fields are required");
                return;
            }
            const state = await Login({email: email.current.value, password: password.current.value});
            if(state?.error){
                toast.error(state.error);
                
                return
            }
        });
     }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card  className="shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className=" shadow-none"
                  ref={email}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input ref={password} id="password" className=" shadow-none" type="password" required />
              </div>
              <Button type="submit" className="w-full  bg-gradient-to-br from-custom-primary/70 via-custom-primary/80 to-custom-primary shadow-none ">
              {isPending && <Loader2 className=" animate-spin"/>}  Login
              </Button>
              <Button variant="outline" className="w-full shadow-none">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
