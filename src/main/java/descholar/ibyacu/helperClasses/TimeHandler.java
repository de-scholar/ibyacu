package descholar.ibyacu.helperClasses;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.sql.*;

public class TimeHandler {

    //CONSTRUCTOR


    public TimeHandler() {
    }

    //CONVERTING STRING TO SQL DATE
    public Date convertStringToSqlDate(String date) throws ParseException {
        return new Date(new SimpleDateFormat("yyyy-MM-dd").parse(date).getTime());
    }

    //CONVERTING STRING TO SQL DATETIME
    public Timestamp convertStringToSqlDatetime(String datetime) throws ParseException {
        return new Timestamp(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(datetime)
                .getTime());
    }
}
