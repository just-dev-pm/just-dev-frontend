"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, FolderKanbanIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {}

const formSchema = z
	.object({
		name: z.string().refine(name => name, "用户名不能为空"),
		dob: z.date().refine(date => {
			const today = new Date();
			const eighteenYearsAgo = new Date(
				today.getFullYear() - 16,
				today.getMonth(),
				today.getDate()
			);
			return date <= eighteenYearsAgo;
		}, "你至少 16 岁"),
		password: z
			.string()
			.min(8, "密码至少包含 8 个字符")
			.refine(password => {
				// 必须至少包含一个特殊字符和一个大写字母
				return /^(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/.test(password);
			}, "密码必须包含 1 个特殊字符和 1 个大写字母"),
		passwordConfirm: z.string(),
		acceptTerms: z
			.boolean({
				required_error: "你必须勾选同意条款和条件",
			})
			.refine(checked => checked, "你必须勾选同意条款和条件"),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.passwordConfirm) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["passwordConfirm"],
				message: "密码不匹配",
			});
		}
	});

function SignupPage(props: Props) {
	const {} = props;
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			password: "",
			passwordConfirm: "",
		},
	});
	const router = useRouter();

	const dobFromDate = new Date();
	dobFromDate.setFullYear(dobFromDate.getFullYear() - 120);

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
		router.push("/dashboard");
	}

	return (
		<>
			<FolderKanbanIcon size={50} />
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>注册</CardTitle>
					<CardDescription>注册新的 Just Dev 账户</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col gap-4"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>用户名</FormLabel>
										<FormControl>
											<Input placeholder="用户名" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="dob"
								render={({ field }) => (
									<FormItem className="flex flex-col pt-2">
										<FormLabel>生日</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className="normal-case flex justify-between pr-1"
													>
														{!!field.value ? (
															format(field.value, "yyyy年, M月, d日")
														) : (
															<span>选择一个日期</span>
														)}
														<CalendarIcon />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent align="start" className="w-auto p-0">
												<Calendar
													mode="single"
													defaultMonth={field.value}
													selected={field.value}
													onSelect={field.onChange}
													fixedWeeks
													weekStartsOn={1}
													fromDate={dobFromDate}
													toDate={new Date()}
													captionLayout="dropdown-buttons"
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>密码</FormLabel>
										<FormControl>
											<PasswordInput placeholder="••••••••" {...field} />
										</FormControl>
										<FormDescription>
											密码由至少 8 个字符组成, 且至少包含 1 个特殊字符和 1
											个大写字母
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="passwordConfirm"
								render={({ field }) => (
									<FormItem>
										<FormLabel>确认密码</FormLabel>
										<FormControl>
											<PasswordInput placeholder="••••••••" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="acceptTerms"
								render={({ field }) => (
									<FormItem>
										<div className="flex gap-2 items-center">
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<FormLabel>我同意条款和条件</FormLabel>
										</div>
										<FormDescription>
											在注册前你需要同意我们的{" "}
											<Link
												href="/terms"
												className="text-primary hover:underline"
											>
												条款和条件
											</Link>
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">注册</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="justify-between">
					<small>已经拥有账户?</small>
					<Button asChild variant={"outline"} size="sm">
						<Link href="/login">登录</Link>
					</Button>
				</CardFooter>
			</Card>
		</>
	);
}

export default SignupPage;
