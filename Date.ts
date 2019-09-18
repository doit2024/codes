/** 星期 */
type WeekDay = 1 | 2 | 3 | 4 | 5 | 6 | 7
/** 月份 */
type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

class Util {
  /** num 在 arr 的哪个区间 */
  public static getIndexAndRemainder (num: number, arr: number[]) {
    let index = 0
    let remainder = num
    for (let i=0; i < arr.length; i++) {
      if (remainder < arr[i]) {
        index = i
        break
      }
      remainder -= arr[i]
    }
    return [index, remainder]
  }
}

class StaticDt {
  protected static readonly commonYearMonthDays = { 0: 31, 1: 28, 2: 31, 3: 30, 4: 31, 5: 30, 6: 31, 7: 31, 8: 30, 9: 31, 10: 30, 11: 31 }
  protected static readonly leapYearMonthDays = { ...StaticDt.commonYearMonthDays, 1: 29 }
  protected static readonly commonYearMonthDaysArr = Object.values(StaticDt.commonYearMonthDays)
  protected static readonly leapYearMonthDaysArr = Object.values(StaticDt.leapYearMonthDays)
  protected static readonly commonYearDays = 365
  protected static readonly leapYearDay = 366
  protected static readonly weekDays = 7
  protected static readonly dayToMsec = 24 * 60 * 60 * 1000
  protected static readonly startTime = { year: 1970, month: 1, date: 1, weekDay: 3 }
  protected static isLeapYear (year: number) {
    const tail = year%100 ? year%4 : year%400
    return tail === 0
  }
  protected static getYearDays (year: number) {
    return StaticDt.isLeapYear(year) ? StaticDt.leapYearDay : StaticDt.commonYearDays
  }
}

class Dt extends StaticDt {
  /** 总毫秒数 */
  public msec: number
  /** 总天数 */
  public days: number
  /** 年份 */
  public year: number
  /** 当前年第多少天 */
  public daysFromThisYear: number
  /** 月份 */
  public month: Month
  /** 日期 */
  public date: number
  /** 星期 */
  public weekDay: WeekDay
  /** 当前年月份数组 */
  private yearMonthDaysArr: number[]
  public constructor (msecOrYear: number = 0, month?: Month, date?: number) {
    super();
    (month === undefined && date === undefined)
      ? this.initIfGetMsec(msecOrYear)
      : this.initIfGetDate(msecOrYear, month, date)
    this.weekDay = this.getWeekDayByDays(this.days)
  }
  private getYearMonthDaysArr (year: number): number[] {
    return StaticDt.isLeapYear(year)
      ? StaticDt.leapYearMonthDaysArr
      : StaticDt.commonYearMonthDaysArr
  }
  private initIfGetMsec (msec: number) {
    this.msec = msec;
    this.days = this.getDaysByMsec(this.msec);
    [this.year, this.daysFromThisYear] = this.getYearAndDaysByDays(this.days);
    this.yearMonthDaysArr = this.getYearMonthDaysArr(this.year);
    [this.month, this.date] = this.getMonthAndDate(this.daysFromThisYear, this.yearMonthDaysArr);
  }
  private initIfGetDate (year: number, month: Month, date: number) {
    this.year = year
    this.month = month
    this.date = date
    this.yearMonthDaysArr = this.getYearMonthDaysArr(this.year)
    this.daysFromThisYear = this.getDaysByMonthDate(this.month, this.date, this.yearMonthDaysArr)
    this.days = this.getDaysByYear(this.year) + this.daysFromThisYear
    this.msec = this.getMsecByDays(this.days)
  }
  private getDaysByMonthDate (month: Month, date: number, yearMonthDaysArr: number[]): number {
    const monthDays = yearMonthDaysArr.slice(0, month).reduce((p, c) => (p + c))
    return monthDays + date
  }
  private getDaysByYear (year: number): number {
    let yearDays = 0
    for (let y = StaticDt.startTime.year; y < year; y++) {
      yearDays += StaticDt.getYearDays(y)
    }
    return yearDays
  }
  private getMsecByDays (days: number): number {
    return days * StaticDt.dayToMsec
  }
  private getDaysByMsec (msec: number): number {
    return ~~(msec / StaticDt.dayToMsec)
  }
  private getWeekDayByDays (days: number) {
    return (days%StaticDt.weekDays + StaticDt.startTime.weekDay)%StaticDt.weekDays as WeekDay
  }
  private getYearAndDaysByDays (days: number): [number, number] {
    let { year } = StaticDt.startTime
    let daysFromThisYear = days
    let nextYearDays = StaticDt.getYearDays(year)
    while (daysFromThisYear > nextYearDays) {
      daysFromThisYear = daysFromThisYear - nextYearDays
      nextYearDays = StaticDt.getYearDays(++year)
    }
    return [year, daysFromThisYear]
  }
  private getMonthAndDate (daysFromThisYear: number, yearMonthDaysArr: number[]): [Month, number] {
    if (daysFromThisYear <= 31) {
      return [0, daysFromThisYear]
    } else {
      return Util.getIndexAndRemainder(daysFromThisYear, yearMonthDaysArr) as [Month, number]
    }
  }
}

export default Dt
