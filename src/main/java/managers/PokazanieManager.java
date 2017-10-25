package managers;

import db.ConnectionPool;
import entities.ElectrIndication;
import entities.Indication;
import entities.LastAndPreviousIndication;
import entities.WaterIndication;

import java.sql.*;
import java.util.ArrayList;
import java.util.DoubleSummaryStatistics;
import java.util.List;

/**
 * Created by Kakim on 06.06.2017.
 */
public class PokazanieManager {

    public boolean savePokazanie(Indication pokazanie, int payerID) {
        try(Connection con = ConnectionPool.getConnection();) {
            saveElectrIndication(pokazanie,payerID, con);
            int key = saveWaterIndication(pokazanie, payerID, con);
            saveReceiptInfo(key, con);
        }catch (SQLException exc) {
            exc.printStackTrace();
            return false;
        }
        return true;
    }

    private void saveReceiptInfo(int key, Connection con) {
        try (PreparedStatement ps = con.prepareStatement("insert into localhost.receiptinfo (receiptID) values (?);")) {
            ps.setInt(1, key);
            ps.execute();
        }catch (SQLException exc) {
            exc.printStackTrace();
        }
    }

    public int getReceiptID() {
        try (Connection con = ConnectionPool.getConnection();
             PreparedStatement ps = con.prepareStatement("select receiptID from localhost.receiptinfo ORDER BY id DESC limit 1;")) {
            try (ResultSet res = ps.executeQuery()){
                while (res.next()) {
                    return res.getInt(1);
                }
            }
        }catch (SQLException exc) {
            exc.printStackTrace();

        }
        return 0;
    }

    private void saveElectrIndication(Indication pokazanie, int payerID, Connection con) throws SQLException {
        try (PreparedStatement ps = con.prepareStatement("insert into localhost.electrpokazanie (payDate, payerID, name, pokazanie) values (?,?,?,?);")){
            ps.setDate(1, pokazanie.getPayDate());
            ps.setInt(2, payerID);
            ps.setString(3, "Электричество");
            ps.setString(4, pokazanie.getElektrPokazanie());
            ps.execute();
        }
    }

    private int saveWaterIndication(Indication pokazanie, int payerID, Connection con) throws SQLException {
        try (PreparedStatement ps = con.prepareStatement("insert into localhost.vodapokazanie (payDate, payerID, name, pokazanie) values (?,?,?,?);", PreparedStatement.RETURN_GENERATED_KEYS)) {
            ps.setDate(1, pokazanie.getPayDate());
            ps.setInt(2, payerID);
            ps.setString(3, "Водаснабжение");
            ps.setString(4, pokazanie.getVodaPokazanie());
            ps.execute();
            try (ResultSet res = ps.getGeneratedKeys()) {
                if (res.next()) {
                    return res.getInt(1);
                }
            }
        }
        return 0;
    }

    public LastAndPreviousIndication getWaterIndication(int payerID) {
        LastAndPreviousIndication lastAndPreviousIndication = new LastAndPreviousIndication();
        List<WaterIndication> waterIndications = new ArrayList<>();
        try (Connection con = ConnectionPool.getConnection();
             PreparedStatement ps = con.prepareStatement("select * from localhost.vodapokazanie WHERE payerID = ? ;")) {
            ps.setInt(1, payerID);
            try (ResultSet res = ps.executeQuery()){
                while (res.next()) {
                    WaterIndication water = new WaterIndication();
                    water.name = res.getString("name");
                    water.payDate = res.getDate("payDate");
                    water.waterIndicationInfo = res.getString("pokazanie");
                    waterIndications.add(water);
                }
            }
        }catch (SQLException exc) {
            exc.printStackTrace();
        }
        getWaterIndication(lastAndPreviousIndication, waterIndications);

        return lastAndPreviousIndication;
    }

    private void getWaterIndication(LastAndPreviousIndication lastAndPreviousIndication, List<WaterIndication> waterIndications) {
        if (waterIndications.size() > 1) {

            String lastIndication = waterIndications.get(waterIndications.size() - 1).waterIndicationInfo;
            String name = waterIndications.get(waterIndications.size() - 1).name;
            Date payDate = waterIndications.get(waterIndications.size() - 1).payDate;
            String previousIndication = waterIndications.get(waterIndications.size() - 2).waterIndicationInfo;
            lastAndPreviousIndication.setLastIndication(lastIndication);
            lastAndPreviousIndication.setPreviousIndication(previousIndication);
            lastAndPreviousIndication.setIndication(Double.parseDouble(lastIndication) - Double.parseDouble(previousIndication));
            lastAndPreviousIndication.setName(name);
            lastAndPreviousIndication.setPayDate(payDate);
        } else if (waterIndications.size() == 1) {
            String lastIndication = waterIndications.get(0).waterIndicationInfo;
            String name = waterIndications.get(0).name;
            Date payDate = waterIndications.get(0).payDate;
            String previousIndication = "0";
            lastAndPreviousIndication.setLastIndication(lastIndication);
            lastAndPreviousIndication.setIndication(Double.parseDouble(lastIndication) - Double.parseDouble(previousIndication));
            lastAndPreviousIndication.setPreviousIndication(previousIndication);
            lastAndPreviousIndication.setName(name);
            lastAndPreviousIndication.setPayDate(payDate);
        }
    }

    public LastAndPreviousIndication getElectrIndication(int payerID) {
        LastAndPreviousIndication lastAndPreviousIndication = new LastAndPreviousIndication();
        List<ElectrIndication> electrIndications = new ArrayList<>();
        try (Connection con = ConnectionPool.getConnection();
             PreparedStatement ps = con.prepareStatement("select * from localhost.electrpokazanie WHERE payerID = ?;")) {
            ps.setInt(1, payerID);
            try (ResultSet res = ps.executeQuery()){
                while (res.next()) {
                    ElectrIndication electr = new ElectrIndication();
                    electr.name = res.getString("name");
                    electr.payDate = res.getDate("payDate");
                    electr.electrIndicationInfo = res.getString("pokazanie");
                    electrIndications.add(electr);
                }
            }
        }catch (SQLException exc) {
            exc.printStackTrace();
        }
        getElectrIndicationInfo(lastAndPreviousIndication, electrIndications);
        return lastAndPreviousIndication;
    }

    private void getElectrIndicationInfo(LastAndPreviousIndication lastAndPreviousIndication, List<ElectrIndication> electrIndications) {
        if (electrIndications.size() > 1) {

            String lastIndication = electrIndications.get(electrIndications.size() - 1).electrIndicationInfo;
            String name = electrIndications.get(electrIndications.size() - 1).name;
            Date payDate = electrIndications.get(electrIndications.size() - 1).payDate;
            String previousIndication = electrIndications.get(electrIndications.size() - 2).electrIndicationInfo;
            lastAndPreviousIndication.setLastIndication(lastIndication);
            lastAndPreviousIndication.setPreviousIndication(previousIndication);
            lastAndPreviousIndication.setIndication(Double.parseDouble(lastIndication) - Double.parseDouble(previousIndication));
            lastAndPreviousIndication.setName(name);
            lastAndPreviousIndication.setPayDate(payDate);
        } else if (electrIndications.size() == 1) {
            String lastIndication = electrIndications.get(0).electrIndicationInfo;
            String name = electrIndications.get(0).name;
            Date payDate = electrIndications.get(0).payDate;
            String previousIndication = "0";
            lastAndPreviousIndication.setLastIndication(lastIndication);
            lastAndPreviousIndication.setPreviousIndication(previousIndication);
            lastAndPreviousIndication.setIndication(Double.parseDouble(lastIndication) - Double.parseDouble(previousIndication));
            lastAndPreviousIndication.setName(name);
            lastAndPreviousIndication.setPayDate(payDate);
        }
    }
}
