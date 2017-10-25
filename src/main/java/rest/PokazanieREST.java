package rest;

import entities.ElectrIndication;
import entities.Indication;
import entities.LastAndPreviousIndication;
import entities.WaterIndication;
import managers.PokazanieManager;
import rest.utils.RESTUtility;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

/**
 * Created by Kakim on 06.06.2017.
 */
@Path("/pokazanie")
public class PokazanieREST {

    @Path("/savePokazanie/{id}")
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response save(Indication pokazanie, @PathParam("id") int payerID) {
        PokazanieManager manager = new PokazanieManager();

        boolean saved = manager.savePokazanie(pokazanie, payerID);
        return null;
    }

    @Path("/getWaterIndication/{payerID}")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response getWaterIndication(@PathParam("payerID") int payerID) {
        PokazanieManager manager = new PokazanieManager();
        LastAndPreviousIndication lastAndPreviousIndication = manager.getWaterIndication(payerID);
        return RESTUtility.getNoCacheOkResponseJson(lastAndPreviousIndication);
    }

    @Path("/getElectrIndication/{payerID}")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response getElectrIndication(@PathParam("payerID") int payerID) {
        PokazanieManager manager = new PokazanieManager();
        LastAndPreviousIndication lastAndPreviousIndication = manager.getElectrIndication(payerID);
        return RESTUtility.getNoCacheOkResponseJson(lastAndPreviousIndication);
    }

    @Path("/getElectrIndication/getReceiptID")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response getReceiptID() {
        PokazanieManager manager = new PokazanieManager();
        int id = manager.getReceiptID();
        return RESTUtility.getNoCacheOkResponseJson(id);
    }
}
