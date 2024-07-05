import { Button } from "@/components/ui/button";
import { FolderKanbanIcon } from "lucide-react";
import Link from "next/link";

export default function Landing() {
	return (
		<>
			<h1 className="flex gap-2 items-center">
				<FolderKanbanIcon size={50} className="text-pink-500" />
				Just Dev
			</h1>
			<p>The best dashboard to manage or paticipate in your project</p>
			<div className="flex gap-2 items-center">
				<Button asChild>
					<Link href="/login">Log in</Link>
				</Button>
				<small>or</small>
				<Button asChild variant={"outline"}>
					<Link href="/sign-up">Sign up</Link>
				</Button>
			</div>
		</>
	);
}
