import PropertyGrid from "./liveProperty/PropertyGrid";
import StatsGrid from "./stats/StatsGrid";
import AvgCallDurationChart from "./analytics/Avgcalldurationchart";
import BotUsageChart from "./analytics/Botusagechart";
import CallBusinessRateChart from "./analytics/CallBusinessRateChart";
import ConcurrentCallsChart from "./analytics/Concurrentcallschart";
import DiaporCallControlChart from "./analytics/Diaporcallcontrolchart";
import ProductUsageChart from "./analytics/Productusagechart";
import UserEngagementChart from "./analytics/Userengagementchart";
import VoicemailChart from "./analytics/Voicemailchart";

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
