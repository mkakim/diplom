package managers;

import entities.Payer;

/**
 * Created by Kakim on 13.06.2017.
 */
public class PaymentManager {

    PayerManager payerManager = new PayerManager();

    public boolean savePayInfo(String iin) {
        Payer payer = payerManager.getPayerByIIN(iin);


        return true;
    }
}
