import MainMenu from "./components/main-menu";
import { SWRProvider } from "@/components/providers/swr-provider";

interface ILayout {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: ILayout) {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <MainMenu />
      <div className="overflow-auto p-4">
        <SWRProvider>{children}</SWRProvider>
      </div>
    </div>
  );
}
