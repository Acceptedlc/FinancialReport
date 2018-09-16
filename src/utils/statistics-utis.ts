export class StatisticsUtis {
  static growthRate(currentPeriod: number, basePeriod: number): number {
    return (currentPeriod - basePeriod) / basePeriod;
  }
}