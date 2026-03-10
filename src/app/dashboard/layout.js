import DashboardShell from "./components/DashboardShell";

export const metadata = {
  title: "Voxworks",
};

export default function DashboardLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>;
}