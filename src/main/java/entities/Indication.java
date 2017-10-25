package entities;

import java.sql.Date;

/**
 * Created by Kakim on 06.06.2017.
 */
public class Indication {
    public int id;
    public Date payDate;
    public String elektrPokazanie;
    public String vodaPokazanie;
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

    public String getElektrPokazanie() {
        return elektrPokazanie;
    }

    public void setElektrPokazanie(String elektrPokazanie) {
        this.elektrPokazanie = elektrPokazanie;
    }

    public String getVodaPokazanie() {
        return vodaPokazanie;
    }

    public void setVodaPokazanie(String vodaPokazanie) {
        this.vodaPokazanie = vodaPokazanie;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
