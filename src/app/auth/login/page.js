"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_USERS } from "../mockUsers";

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

export default function SignInPage() {
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
                  className="h-10 border-gray-200 focus-visible:ring-[#4A24AB]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-10 bg-[#4A24AB] text-white rounded-lg font-medium"
              >
                Sign in with Email
              </Button>

              {/* Divider */}
              <div className="relative my-2">
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
