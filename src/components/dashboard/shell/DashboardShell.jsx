import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";

export default function DashboardShell({ children }) {
  return (
    <div className="flex h-screen  overflow-hidden">
      {/* Fixed icon sidebar */}
      <Sidebar />

      {/* Main column: topbar + scrollable content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
