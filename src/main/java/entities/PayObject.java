package entities;

/**
 * Created by Kakim on 13.06.2017.
 */
public class PayObject {
    public String personalAccount;
    public int amountToGrid;
    public String paymentSelect;

    public String getPersonalAccount() {
        return personalAccount;
    }

    public void setPersonalAccount(String personalAccount) {
        this.personalAccount = personalAccount;
    }

    public int getAmountToGrid() {
        return amountToGrid;
    }

    public void setAmountToGrid(int amountToGrid) {
        this.amountToGrid = amountToGrid;
    }

    public String getPaymentSelect() {
        return paymentSelect;
    }

    public void setPaymentSelect(String paymentSelect) {
        this.paymentSelect = paymentSelect;
    }
}
