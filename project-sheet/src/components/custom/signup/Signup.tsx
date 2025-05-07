"use client";
import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { SignupData } from "@/actions/auth";
import { toast } from "sonner";

export default function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isPending, setIsPending] = useState(false);

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!usernameRef.current || !emailRef.current || !passwordRef.current) {
        toast.error("All fields are required ");
        return;
    }
    
    setIsPending(true);
    
    const formData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const state = await SignupData(formData);
    if(state?.error){
        toast.error("All fields are required");
    }
    setIsPending(false);
    
    
  };

  return (
    <Card className="w-full max-w-md mx-auto my-10 border border-gray-100">
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl">Sign Up</CardTitle>
        <CardDescription>Sign up to access your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <form onSubmit={handleSignup}>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              className="mt-2 h-12 bg-gray-100 focus:ring"
              required
              ref={usernameRef}
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Info@example.com"
              className="mt-2 h-12 bg-gray-100 focus:ring"
              required
              ref={emailRef}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              className="mt-2 h-12 bg-gray-100 focus:ring"
              required
              ref={passwordRef}
            />
          </div>
          <Button
            type="submit"
            className="mt-5 w-full bg-gradient-to-br from-custom-primary/80 to-custom-primary"
            disabled={isPending}
          >
            {isPending && <Loader2 className="animate-spin mr-2" />} Get Started
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}