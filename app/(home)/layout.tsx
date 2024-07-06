import MainMenu from "./home/components/main-menu";

interface ILayout {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: ILayout) {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <MainMenu />
      <div className="overflow-auto p-4">{children}</div>
    </div>
  );
}
