"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { NewDraftResponseSchema } from "@/types/NewDraftResponse";
import { useRouter } from "next/navigation";
import { useProjectDraftCreate } from "@/app/api/draft/create-project-draft";
import { useUserDraftCreate } from "@/app/api/draft/create-user-draft";
import { cn } from "@/lib/utils";

export default function NewDraft({ userId, className }: { userId: string; className: string }) {
    const router = useRouter();
    const { trigger } = useUserDraftCreate({
        user_id: userId,
        onSuccess: (data) => {
            if (data) {
                const typedData = NewDraftResponseSchema.parse(data);
                if (typedData) {
                    router.push(`/draft/${typedData.id}`);
                }
            }
        },
    });
    const [draftTitle, setDraftTitle] = useState<string>("");

    async function submitDraft() {
        await trigger({ name: draftTitle });
        setDraftTitle("");
    }

    return (
        <Card className={cn("w-[350px]", className)}>
            <CardHeader>
                <CardTitle>新草稿</CardTitle>
                <CardDescription>立即开始您的思考</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">标题</Label>
                            <Input
                                id="title"
                                placeholder="新草稿"
                                value={draftTitle}
                                onChange={(e) => setDraftTitle(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex items-center justify-center">
                <Button
                    disabled={draftTitle === ""}
                    onClick={async () => await submitDraft()}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    新建
                </Button>
            </CardFooter>
        </Card>
    );
}
