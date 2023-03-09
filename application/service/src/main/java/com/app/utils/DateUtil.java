package com.app.utils;

import java.util.Calendar;
import java.util.Date;

public class DateUtil {

  public static Date getEndOfDay(Date source) {
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(source);
    calendar.set(Calendar.HOUR_OF_DAY, 23);
    calendar.set(Calendar.MINUTE, 59);
    calendar.set(Calendar.SECOND, 59);
    calendar.set(Calendar.MILLISECOND, 999);
    return calendar.getTime();
  }
}
