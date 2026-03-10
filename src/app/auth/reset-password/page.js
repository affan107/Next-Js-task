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
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECEEF8]">
      <div className="w-full max-w-sm px-4">
        {/* Logo above card */}
        <div className="text-center mb-6">
          <span className="text-3xl font-bold bg-gradient-to-r from-[#240EB3] to-[#24A5ED] bg-clip-text text-transparent">
            vox
          </span>
          <span className="text-3xl y font-normal text-[#9B9B9B]">works</span>
        </div>

        <Card className="rounded-2xl shadow-sm border-0">
          <CardHeader className="space-y-2 pb-4 pt-6 px-6">
            <CardTitle className="text-xl font-semibold text-center text-gray-900">
              Reset Password
            </CardTitle>
            <CardDescription className="text-left text-sm text-gray-500 leading-relaxed">
              Enter your email address below. You will receive a link to reset
              your password.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            <form className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-[#4A24AB]"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="h-10 rounded-lg border-gray-200 placeholder:text-gray-400 focus-visible:ring-[#4B3FD4]"
                  required
                />
              </div>

              {/* Reset button */}
              <Button
                type="submit"
                className="w-full h-10 bg-[#4A24AB] text-white rounded-lg font-medium"
              >
                Reset Password
              </Button>

              {/* Footer */}
              <Link
                href="/auth/login"
                className="block w-full text-center text-xs text-slate-800 pt-1"
              >
                Password recovered?{" "}
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
