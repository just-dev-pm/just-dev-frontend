import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const terms = [
	{
		title: "接受条款",
		description: "访问或使用 Just Dev，即表示您同意受这些条款和条件的约束。",
	},
	{
		title: "条款变更",
		description: "我们保留随时修改这些条款的权利。任何变更将在发布后立即生效。",
	},
	{
		title: "用户责任",
		description:
			"用户不得滥用平台，包括但不限于参与非法活动、传播恶意软件或对其他用户进行垃圾邮件。",
	},
	{
		title: "内容所有权",
		description: "所有提交到 Just Dev 的内容仍然是提交者的知识产权。",
	},
];

type CardProps = React.ComponentProps<typeof Card>;

export default function TermsPage({ className, ...props }: CardProps) {
	return (
		<div className="p-8 flex flex-col justify-center items-center">
			<h1 className="text-3xl font-bold mb-6">条款和条件</h1>
			<div className="grid gap-6">
				{terms.map((term, index) => (
					<Card key={index} className={cn("w-full", className)} {...props}>
						<CardHeader>
							<CardTitle>{term.title}</CardTitle>
							<CardDescription>{term.description}</CardDescription>
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
}
