"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  address: z
    .string()
    .min(1, {
      message: "Please fill the address",
    })
    .regex(/^(0x)?[0-9a-fA-F]{40}$|.+(\.[eE][tT][hH])$/, {
      message: "Please enter a valid Ethereum address",
    }),
});

export default function Home() {
  const [address, setAddress] = useState("");
  const [data, setData] = useState(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    router.push(`/${values.address}`);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f2f4f6]">
      <h1 className="text-2xl font-bold mb-4">Ethereum Address Explorer</h1>
      0x99705ACb6343840483442eDcbD4772c7DE354794
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter an Ethereum address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Fetch</Button>
        </form>
      </Form>
      {data && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Address Data</h2>
          <p>Balance: {data} ETH</p>
          {/* Add more data fields as needed */}
        </div>
      )}
    </div>
  );
}
