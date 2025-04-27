import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Link, useNavigate } from "@tanstack/react-router";
import { login } from "@/api/login";
import { loginSchema } from "./schemas";
import { CookieHelper } from "@/lib/cookie_helper";

export function LoginForm() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (_data, variables) => {
      toast("Login Successful!", {
        description: `Welcome! ${variables.username}`,
      });
    },
    onError: (error) => {
      toast("Something went wrong!", {
        description: `Error ${error.message}`,
      });
    },
  });

  if (mutation.isSuccess) {
    const authCookie = new CookieHelper(import.meta.env.VITE_AUTH_COOKIE);
    authCookie.setCookie(mutation.data.token);
    navigate({
      from: "/",
      to: "/scienceplan",
    });
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Logging in..." : "Login"}
        </Button>
        <div className="text-center text-sm">
          Forgot your password?{" "}
          <Link
            to="/"
            className="underline underline-offset-4 hover:text-primary"
          >
            Reset your password
          </Link>
        </div>
      </form>
    </Form>
  );
}
