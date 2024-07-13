import { SWRProvider } from "@/components/providers/swr-provider";

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SWRProvider>{children}</SWRProvider>;
}
