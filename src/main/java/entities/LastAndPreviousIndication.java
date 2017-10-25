package entities;

import java.sql.Date;

/**
 * Created by Kakim on 12.06.2017.
 */
public class LastAndPreviousIndication {
    public String lastIndication;
    public String previousIndication;
    public double indication;
    public String name;
    public Date payDate;

    public String getLastIndication() {
        return lastIndication;
    }

    public void setLastIndication(String lastIndication) {
        this.lastIndication = lastIndication;
    }

    public String getPreviousIndication() {
        return previousIndication;
    }

    public void setPreviousIndication(String previousIndication) {
        this.previousIndication = previousIndication;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getPayDate() {
        return payDate;
    }

    public void setPayDate(Date payDate) {
        this.payDate = payDate;
    }

    public double getIndication() {
        return indication;
    }

    public void setIndication(double indication) {
        this.indication = indication;
    }
}
