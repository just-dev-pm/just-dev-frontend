"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderKanbanIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { baseUrl } from "@/lib/global";

interface Props {}

const formSchema = z.object({
	name: z.string(),
	password: z.string(),
});

function LoginPage(props: Props) {
	const {} = props;
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			password: "",
		},
	});

	const handleSubmit = async (data: any) => {
		console.log(data);

		try {
			const url = `${baseUrl}/m1/4770610-0-default/login`;
			const { name, password } = data;
			const requestOptions = {
				method: "POST",
				headers: {
					"Content-Type": "json",
				},
				body: JSON.stringify({ name, password }),
			};

			const response = await fetch(url, requestOptions);
			if (!response.ok) {
				throw new Error(`Error! status:${response.status}`);
			}

			const responseData = await response.json();
			console.log("send success!");
			console.log(responseData);
			//router.push("/dashboard");
		} catch (error) {
			console.log("Error!", error);
		}
	};

	// function onSubmit(values: z.infer<typeof formSchema>) {
	//   // Do something with the form values.
	//   // ✅ This will be type-safe and validated.
	//   console.log(values);
	//   router.push("/dashboard");
	// }

	return (
		<>
			<FolderKanbanIcon size={50} />
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Login to your Just-Dev accout</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className="flex flex-col gap-4"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder="Username" {...field} />
										</FormControl>
										<FormDescription>
											This is the name you signed up to Just-Dev with.
										</FormDescription>
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
											<PasswordInput placeholder="Password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">Login</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="justify-between">
					<small>Don't have an account?</small>
					<Button asChild variant={"outline"} size="sm">
						<Link href="/sign-up">Sign up</Link>
					</Button>
				</CardFooter>
			</Card>
		</>
	);
}

export default LoginPage;
