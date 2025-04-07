"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"  // Changed this line
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { useToast } from "../hooks/use-toast"
import React from "react"



const formSchema = z.object({
  username: z.string().min(1, {
    message: "Please enter a username.",
  }),
  password: z.string().min(1, {
    message: "You must enter a password.",
  })
})

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Replace with actual API call.
    /* setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Account Created! ",
        description: `sent: ${values.email}: ${values.password}`,
      })
      console.log(values)
    }, 1000) */
   

    fetch('http://localhost:8080/api/v1/user/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(response => {
      if (response.ok) {
        toast({
          title: "Login Successful! ",
          description: `Welcome! ${values.username}`,
        })
        setIsLoading(false)
      } else {
        toast({
          title: "Something went wrong!",
          description: `Error Code: ${response.status}!`,
          variant: "destructive",
        })
        setIsLoading(false)
      }  
    })
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
        <div className="text-center text-sm">
          Forgot your password?{" "}
          <a href="/login" className="underline underline-offset-4 hover:text-primary">
            Reset your password
          </a>
        </div>
      </form>
    </Form>
  )
}

