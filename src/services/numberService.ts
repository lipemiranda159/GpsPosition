class numberService {
  public static hexTobin(hex: string) {
    return ("00000000" + parseInt(hex, 16).toString(2)).substr(-8);
  }

  public static hexToInt(hex: string) {
    return parseInt(hex, 16);
  }
}
