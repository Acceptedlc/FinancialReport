export class StatisticsUtis {
  static growthRate(currentPeriod: number, basePeriod: number): number {
    return (currentPeriod - basePeriod) / basePeriod;
  }

  static mean(data: number[]): number {
    let sum = 0;
    data.forEach(e => sum += e);
    return sum / data.length;
  }

  static median(data: number[]): number {
    let sortData: number[] = data.sort();
    let size: number = data.length;
    if (size % 2) {
      return (sortData[size / 2] + sortData[size / 2 + 1]) / 2;
    } else {
      return sortData[size / 2 + 1];
    }
  }
}