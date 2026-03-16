import DashboardShell from "../../components/dashboard/shell/DashboardShell.jsx";

export const metadata = {
  title: "Voxworks",
};

export default function DashboardLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>;
}