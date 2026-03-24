"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

//  Validation schema
const SignUpSchema = Yup.object({
  phone: Yup.string()
    .matches(
      /^\+?[0-9\s\-().]{7,20}$/,
      "Enter a valid phone number (e.g. +61 412 345 678)"
    )
    .required("Phone number is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

function FieldError({ msg }) {
  if (!msg) return null;
  return <p className="text-[11px] text-red-500 mt-0.5">{msg}</p>;
}

// Reusable field with error highlight 
function FormField({ label, name, type = "text", placeholder, formik }) {
  const touched  = formik.touched[name];
  const error    = formik.errors[name];
  const hasError = touched && error;

  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-[#4A24AB]">{label}</Label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`h-10 focus-visible:ring-[#4A24AB] ${
          hasError
            ? "border-red-400 focus-visible:ring-red-400"
            : "border-[#CBD5E1]"
        }`}
      />
      {touched && <FieldError msg={error} />}
    </div>
  );
}

export default function CreateAccountPage() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { phone: "", email: "", password: "", confirmPassword: "" },
    validationSchema: SignUpSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Register:", values);
        router.push("/dashboard");
        setSubmitting(false);
      }, 400);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECEEF8]">
      <div className="w-full max-w-sm px-4">
        <div className="text-center mb-6">
          <span className="text-3xl font-bold bg-gradient-to-r from-[#240EB3] to-[#24A5ED] bg-clip-text text-transparent">vox</span>
          <span className="text-3xl font-normal text-[#9B9B9B]">works</span>
        </div>

        <Card className="rounded-2xl shadow-sm border-0">
          <CardHeader className="space-y-1 pb-4 pt-6 px-6">
            <CardTitle className="text-lg font-semibold text-center text-gray-900">
              Create an account
            </CardTitle>
            <CardDescription className="text-center text-xs text-gray-500">
              Fill the form below to create an account.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            <form className="space-y-4" onSubmit={formik.handleSubmit} noValidate>

              <FormField label="Phone Number"   name="phone"           type="tel"      placeholder="+61 412 345 678" formik={formik} />
              <FormField label="Email"          name="email"           type="email"    placeholder="Email"           formik={formik} />
              <FormField label="Password"       name="password"        type="password" placeholder="Password"        formik={formik} />

              {formik.values.password && !formik.errors.password && (
                <p className="text-[11px] text-green-600 -mt-2">✓ Password looks good</p>
              )}

              <FormField label="Re-Type Password" name="confirmPassword" type="password" placeholder="Re-Type Password" formik={formik} />

              <Button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full h-10 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white rounded-lg font-medium mt-2 disabled:opacity-60"
              >
                {formik.isSubmitting ? "Creating account…" : "Sign up with Email"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><Separator className="w-full" /></div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-gray-400 uppercase tracking-wide">Or continue with</span>
                </div>
              </div>

              <Button variant="outline" className="w-full h-10 rounded-lg border-gray-200 text-gray-700 font-medium hover:bg-gray-50" type="button">
                <svg className="mr-2 h-4 w-4 shrink-0" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign in with Google
              </Button>

              <Link href="/auth/login" className="block w-full text-center text-xs text-slate-800 pt-1 hover:underline">
                Already have an account?
              </Link>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}