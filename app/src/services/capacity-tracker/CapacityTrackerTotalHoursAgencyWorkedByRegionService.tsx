import { generateBarchartSvg } from "../charts/BarchartService";
import { BarchartData } from "../../data/interfaces/BarchartData";
import { CapacityTrackerTotalHoursAgencyWorkedByRegionData } from "../../data/interfaces/CapacityTrackerTotalHoursAgencyWorkedByRegionData";
import { MetricCardData } from "../../data/interfaces/MetricCardData";

class CapacityTrackerTotalHoursAgencyWorkedByRegionService {
  private capacityTrackerData: BarchartData[];

  constructor(data: CapacityTrackerTotalHoursAgencyWorkedByRegionData[]) {
    this.capacityTrackerData = this.transformToChartData(data);
  }

  public getCapacityTrackerData() {
    return this.capacityTrackerData;
  }

  public getMetricCardData(): MetricCardData {
    const barchart = generateBarchartSvg({
      data: this.capacityTrackerData,
      width: 270,
      height: 200,
      xLabel: "",
      yLabel: "",
      title: "",
      barColor: "#1d70b8",
      medianLineColor: "#000000",
      showLegend: false,
      showToolTip: false,
      shortenLabels: true,
      tickCount: 5,
      yAxisAsPercentage: true,
    });

    return {
      title: "Percentage of total hours worked that are agency by region",
      svg: barchart,
      description: "lorem lorem lorem lorem lorem lorem lorem lorem",
      sourceUrl: "#",
      metricDetailPageUrl: "metric/capacity-tracker-total-hours-by-agency",
      sourceLinkString: "XXX",
      limitationDescription: "lorem lorem lorem lorem lorem lorem",
    };
  }

  private transformToChartData(
    data: CapacityTrackerTotalHoursAgencyWorkedByRegionData[]
  ): BarchartData[] {
    return data.map(
      (entry: CapacityTrackerTotalHoursAgencyWorkedByRegionData) => ({
        xAxisValue: entry.location_name,
        metric: entry.metric,
        value: entry.value,
      })
    );
  }
}

export default CapacityTrackerTotalHoursAgencyWorkedByRegionService;
