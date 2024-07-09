import { SWRProvider } from "@/components/providers/swr-provider";

interface ILayout {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: ILayout) {
  return (
    <div>
      <SWRProvider>{children}</SWRProvider>
    </div>
  );
}
