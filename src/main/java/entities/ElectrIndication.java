package entities;

import java.sql.Date;

/**
 * Created by Kakim on 11.06.2017.
 */
public class ElectrIndication {
    public int id;
    public Date payDate;
    public String electrIndicationInfo;
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

    public String getElectrIndicationInfo() {
        return electrIndicationInfo;
    }

    public void setElectrIndicationInfo(String electrIndicationInfo) {
        this.electrIndicationInfo = electrIndicationInfo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
