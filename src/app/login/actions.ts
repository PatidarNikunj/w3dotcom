"use server";

import { redirect } from "next/navigation";
import { verifyCredentials } from "@/lib/auth";

export type LoginState = {
  errors?: { email?: string; password?: string };
  message?: string;
  email?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const trimmedEmail = email.trim();

  const errors: LoginState["errors"] = {};
  if (!trimmedEmail) {
    errors.email = "Email is required";
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = "Enter a valid email address";
  }
  if (!password) {
    errors.password = "Password is required";
  }
  if (errors.email || errors.password) {
    return { errors, email };
  }

  if (!verifyCredentials(email, password)) {
    return { message: "Invalid email or password", email };
  }

  redirect("/welcome");
}
