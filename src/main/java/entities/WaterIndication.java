package entities;

import java.sql.Date;

/**
 * Created by Kakim on 11.06.2017.
 */
public class WaterIndication {
    public int id;
    public Date payDate;
    public String waterIndicationInfo;
    public String name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getPayDate() {
        return payDate;
    }

    public void setPayDate(Date payDate) {
        this.payDate = payDate;
    }

    public String getWaterIndicationInfo() {
        return waterIndicationInfo;
    }

    public void setWaterIndicationInfo(String waterIndicationInfo) {
        this.waterIndicationInfo = waterIndicationInfo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
