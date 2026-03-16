import PropertyGrid from "../../components/dashboard/liveProperty/PropertyGrid";
import StatsGrid from "../../components/dashboard/stats/StatsGrid";
import AvgCallDurationChart from "../../components/dashboard/analytics/Avgcalldurationchart";
import BotUsageChart from "../../components/dashboard/analytics/Botusagechart";
import CallBusinessRateChart from "../../components/dashboard/analytics/CallBusinessRateChart";
import ConcurrentCallsChart from "../../components/dashboard/analytics/Concurrentcallschart";
import DiaporCallControlChart from "../../components/dashboard/analytics/Diaporcallcontrolchart";
import ProductUsageChart from "../../components/dashboard/analytics/Productusagechart";
import UserEngagementChart from "../../components/dashboard/analytics/Userengagementchart";
import VoicemailChart from "../../components/dashboard/analytics/Voicemailchart";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section>
        <PropertyGrid />
      </section>

      <section>
        <StatsGrid />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-800">Analysis</h2>
        <div className="grid grid-cols-4 gap-4">
          <CallBusinessRateChart />
          <DiaporCallControlChart />
          <AvgCallDurationChart />
          <VoicemailChart />
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <ProductUsageChart />
          <BotUsageChart />
          <UserEngagementChart />
          <ConcurrentCallsChart />
        </div>
      </section>
    </div>
  );
}
