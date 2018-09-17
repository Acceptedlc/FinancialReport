export class StatisticsUtis {
  static growthRate(currentPeriod: number, basePeriod: number): number {
    return Math.round((currentPeriod - basePeriod) / basePeriod * 100);
  }

  static mean(data: number[]): number {
    let sum = 0;
    data.forEach(e => sum += e);
    return sum / data.length;
  }

  static median(data: number[]): number {
    let sortData: number[] = data.sort();
    let size: number = data.length;
    if (size % 2 === 0) {
      return (sortData[Math.ceil(size / 2 - 1)] + sortData[Math.ceil(size / 2)]) / 2;
    } else {

      return sortData[Math.floor(size / 2)];
    }
  }
}