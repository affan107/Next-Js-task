"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_USERS } from "./auth/mockUsers";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      router.push("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECEEF8]">
      <div className="w-full max-w-sm px-4">
        {/* Logo */}
        <div className="text-center mb-6">
          <span className="text-3xl font-bold bg-gradient-to-r from-[#240EB3] to-[#24A5ED] bg-clip-text text-transparent">
            vox
          </span>
          <span className="text-3xl font-normal text-[#9B9B9B]">works</span>
        </div>

        <Card className="rounded-2xl shadow-sm border-0">
          <CardHeader className="space-y-1 pb-4 pt-6 px-6">
            <CardTitle className="text-lg font-semibold text-center text-[#1E293B]">
              Sign in to your account
            </CardTitle>
            <CardDescription className="text-center text-xs text-slate-500">
              Welcome back! Please enter your details
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            <form className="space-y-4" onSubmit={handleLogin}>
              {/* Email */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-[#4A24AB]">
                  Email
                </Label>
                <Input
                  type="email"
                  placeholder="Email"
                  className="h-10 border-[#CBD5E1] focus-visible:ring-[#4A24AB]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-[#4A24AB]">
                  Password
                </Label>
                <Input
                  type="password"
                  placeholder="Password"
                  className="h-10 border-[#CBD5E1] focus-visible:ring-[#4A24AB]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
               <div className="space-y-1.5">
                <a
                  class="text-slate-500 inline-flex cursor-pointer items-center justify-center font-medium decoration-primary underline-offset-4  text-xs  w-full text-right underline"
                  type="button"
                  href="/auth/reset-password"
                >
                  Forgot Password?
                </a>
              </div>
              <Button
                type="submit"
                className="w-full h-10 bg-[#4A24AB] text-white rounded-lg font-medium"
              >
                Sign in with Email
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-slate-500 uppercase tracking-wide">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google button */}
              <Button
                variant="outline"
                className="w-full h-10 rounded-lg border-gray-200"
                type="button"
              >
                <svg className="mr-2 h-4 w-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </Button>

              <Link
                href="/auth/register"
                className="block w-full text-center text-xs text-slate-800 pt-1"
              >
                Don't have an account yet?
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
