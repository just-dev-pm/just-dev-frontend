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
import { useRouter } from "next/navigation";
import useRequirementCreate from "@/app/api/requirements/create-requirement";
import { useState } from "react";
import { NewRequirementResponseSchema } from "@/types/requirements/NewRequirementResponse";

export default function NewRequirement({ projectId }: { projectId: string }) {
    const router = useRouter();
    const { trigger } = useRequirementCreate({
        project_id: projectId,
        onSuccess: (data) => {
            if (data) {
                const typedData = NewRequirementResponseSchema.parse(data);
                if (typedData) {
                    router.push(
                        `/projects/${projectId}/requirements/${typedData.id}`
                    );
                }
            }
        },
    });
    const [requirementTitle, setRequirementTitle] = useState<string>("");

    async function submitRequirement() {
        await trigger({ name: requirementTitle, content: "" });
        setRequirementTitle("");
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>新需求</CardTitle>
                <CardDescription>立即制定项目目标</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">标题</Label>
                            <Input
                                id="title"
                                placeholder="新需求"
                                value={requirementTitle}
                                onChange={(e) =>
                                    setRequirementTitle(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex items-center justify-center">
                <Button
                    disabled={requirementTitle === ""}
                    onClick={async () => await submitRequirement()}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    新建
                </Button>
            </CardFooter>
        </Card>
    );
}
