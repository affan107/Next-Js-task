import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import { TopbarProvider } from "@/context/TopbarContext";


export default function DashboardShell({ children }) {
  return (
    <TopbarProvider>
    <div className="flex h-screen  overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-8">{children}</div>
        </main>
      </div>
    </div>
    </TopbarProvider>
  );
}
