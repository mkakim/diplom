package rest;

import entities.PayObject;
import managers.PaymentManager;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by Kakim on 13.06.2017.
 */

@Path("payment")
public class PaymentREST {

    @Path("pay/{iin}")
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response save(@PathParam("iin") String iin, PayObject payObject) {
        PaymentManager manager = new PaymentManager();

        manager.savePayInfo(iin);
        return null;
    }
}
