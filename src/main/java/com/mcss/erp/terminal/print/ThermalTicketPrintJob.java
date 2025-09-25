/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mcss.erp.terminal.print;

import com.github.anastaciocintra.escpos.EscPos;
import com.github.anastaciocintra.escpos.EscPosConst;
import com.github.anastaciocintra.escpos.Style;
import com.github.anastaciocintra.escpos.barcode.BarCode;
import com.github.anastaciocintra.escpos.image.BitImageWrapper;
import com.github.anastaciocintra.escpos.image.Bitonal;
import com.github.anastaciocintra.escpos.image.BitonalOrderedDither;
import com.github.anastaciocintra.escpos.image.CoffeeImageImpl;
import com.github.anastaciocintra.escpos.image.EscPosImage;
import com.github.anastaciocintra.output.PrinterOutputStream;
import com.ispc.slibrary.helper.NumberToLetterHelper;
import com.mcss.erp.terminal.configuration.TicketConfig;
import com.mcss.erp.terminal.data.entity.ProductOrder;
import com.mcss.erp.terminal.data.entity.SaleOrder;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Iterator;
import javax.imageio.ImageIO;
import javax.print.PrintService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author edgar
 */
public class ThermalTicketPrintJob implements PrintJob {

    private static final Logger LOGGER = LoggerFactory.getLogger(ThermalTicketPrintJob.class);
    private final TicketConfig config;

    public ThermalTicketPrintJob(TicketConfig config) {
        this.config = config;
    }

    @Override
    public void print(SaleOrder order) throws FileNotFoundException, IOException {
        LOGGER.info("Impresión iniciada");
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        SimpleDateFormat hourformatter = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        NumberFormat currencyFormat = new DecimalFormat("#,###.00");

        Style titleStyle = new Style()
                .setFontSize(Style.FontSize._1, Style.FontSize._1)
                .setBold(true)
                .setJustification(EscPosConst.Justification.Center);

        Style subtitleStyle = new Style()
                .setFontSize(Style.FontSize._1, Style.FontSize._1)
                .setJustification(EscPosConst.Justification.Center);
        Style centerLabelStyle = new Style()
                .setFontSize(Style.FontSize._1, Style.FontSize._1)
                .setJustification(EscPosConst.Justification.Center);
        Style centerLabelStyleBolded = new Style()
                .setFontSize(Style.FontSize._1, Style.FontSize._1)
                .setJustification(EscPosConst.Justification.Center)
                .setBold(true);

        Style labelStyle = new Style()
                .setFontSize(Style.FontSize._1, Style.FontSize._1)
                .setBold(true);

        PrintService writeService = PrinterOutputStream.getPrintServiceByName(config.getPrinter());
        PrinterOutputStream writerOutputStream = new PrinterOutputStream(writeService);

        Bitonal algorithm = new BitonalOrderedDither();
        BufferedImage image = ImageIO.read(new File(config.getLogoPath()));
        String saleDate = hourformatter.format(order.getOrderDate());

        try (EscPos ps = new EscPos(writerOutputStream)) {
            BitImageWrapper imageWrapper = new BitImageWrapper().setJustification(EscPosConst.Justification.Center);
            EscPosImage escposImage = new EscPosImage(new CoffeeImageImpl(image), algorithm);
            ps.feed(1);
            ps.write(imageWrapper, escposImage);
            ps.feed(2);
            ps.writeLF(titleStyle, config.getBussinesName().toUpperCase());
            ps.writeLF(titleStyle, config.getTaxSegment().toUpperCase());
            Arrays.asList(config.getAddress().split("@@")).forEach(line -> {
                try {
                    ps.writeLF(centerLabelStyle, line.toUpperCase());
                } catch (IOException ignore) {
                }
            });
            ps.writeLF(titleStyle, config.getTaxId().toUpperCase());
            ps.feed(1);
            ps.writeLF(centerLabelStyle, config.getTelephone());
            if (config.getShowTermsOfSale()) {
                Arrays.asList(config.getTermsOfSale().split("@@")).forEach(line -> {
                    try {
                        ps.writeLF(centerLabelStyleBolded, line.toUpperCase());
                    } catch (IOException ignore) {
                    }
                });
            }
            ps.feed(1);
            ps.writeLF(subtitleStyle, "TELS.: 5557897887, 5557045743");
            ps.writeLF("------------------------------------------------");
            ps.feed(1);
            ps.write(labelStyle, "Folio: ");
            ps.write(order.getId());
            ps.write(labelStyle, "     Fecha: ");
            ps.writeLF(saleDate);
            ps.write(labelStyle, "Venta a:  ");
            ps.writeLF(order.getSaleType().getType());
            ps.write(labelStyle, "Vendedor: ");
            ps.writeLF(order.getUser().getName());
            ps.write(labelStyle, "Cliente:  ");
            ps.writeLF(order.getCustomer().getBusinessName());
            ps.feed(1);
            ps.writeLF("CONCEPTO");
            ps.writeLF("PIEZAS     CANTIDAD    IMPORTE      TOTAL");
            ps.writeLF("------------------------------------------------");

            Iterator<ProductOrder> pits = order.getProducts().iterator();
            BigDecimal kilos = BigDecimal.ZERO;
            while (pits.hasNext()) {
                ProductOrder p = pits.next();
                kilos = kilos.add(p.getQuantity());
                ps.writeLF(labelStyle, p.getProduct().getLongDescription());
                ps.write(fixedLengthString(p.getPieces() != null ? p.getPieces().toString() : "", 10));
                ps.write(fixedLengthString(p.getQuantity().toString(), 10));
                ps.write(fixedLengthString("$" + currencyFormat.format(p.getPrice()) + checkIfEdited(p), 12));
                ps.writeLF(fixedLengthString("$" + currencyFormat.format(p.getAmount().setScale(2, RoundingMode.HALF_UP)), 12));
                ps.writeLF("················································");
            }
            if (order.getProducts().size() > 1) {
                ps.feed(1);
                ps.write("KILOS: ");
                ps.write(kilos.setScale(2, RoundingMode.HALF_UP).toString());
            }
            ps.feed(1);
            ps.write(labelStyle, "FAVOR DE PAGAR EN CAJA     TOTAL: ");
            ps.writeLF(labelStyle, "$" + currencyFormat.format(order.getTotal().setScale(0, RoundingMode.HALF_UP)));
            ps.feed(1);
            var ttl = order.getTotal().setScale(2, RoundingMode.HALF_UP).toString().replace(',', '.');
            LOGGER.info(ttl);
            LOGGER.info(order.getTotal().setScale(2, RoundingMode.HALF_UP).toString());
            String convertNumberToLetter = NumberToLetterHelper.convertNumberToLetter(ttl);
            ps.writeLF("(" + convertNumberToLetter + ")");
            ps.feed(1);
            BigDecimal q = order.getTotal().setScale(0, RoundingMode.HALF_UP);
            if (q.compareTo(BigDecimal.ZERO) >= 1) {
                String qs = NumberToLetterHelper.convertNumberToLetter(q.toString());
                ps.feed(1);
                ps.write("POR ESTE PAGARE PROMETO(EMOS) INCONDICIONALMENTE PAGAR EN " + this.config.getAddress().replace("##", "").toUpperCase() + "  A LA ORDEN DE " + this.config.getBussinesName().replace("##", "").toUpperCase() + ",");
                ps.write("LA CANTIDAD DE $ " + currencyFormat.format(q.setScale(0, RoundingMode.HALF_UP)) + "(" + qs + "), LA SUMA ANTES MENCIONADA SE CUBRIRA EL DIA " + saleDate + ", LA FALTA PUNTUAL DE PAGO QUE AMPARA ESTE DOCUMENTO, ");
                ps.writeLF("CAUSARA INTERESES MORATORIOS A RAZON DEL 8% MENSUAL PAGADERO JUNTAMENTE CON EL PRINCIPAL QUE SE CONMUTARA SOBRE SALDOS INSOLUTOS");
                ps.feed(3);
                ps.writeLF(subtitleStyle, "__________________________________");
                ps.writeLF(subtitleStyle, "NOMBRE Y FIRMA DE ACEPTACION");
            }
            ps.feed(3);
            Arrays.asList(config.getFooter().split("##")).forEach(line -> {
                try {
                    ps.writeLF(subtitleStyle, line.toUpperCase());
                } catch (IOException ex) {

                }
            });
            ps.feed(2);
            //ps.writeLF(subtitleStyle, "ESTE NO ES UN COMPROBANTE DE PAGO");
            //ps.feed(2);

            /*ps.feed(1);
            ps.writeLF("------------------------------------------------");
            ps.writeLF(subtitleStyle, "Se requiere factura favor de mandar sus datos al siguiente número whatsapp");
            ps.writeLF(subtitleStyle, "TEL.: 55560918085");
            ps.writeLF("------------------------------------------------");
            ps.feed(1);*/
            BarCode barcode = new BarCode()
                    .setBarCodeSize(4, 120)
                    .setJustification(EscPosConst.Justification.Center);
            ps.write(barcode, order.getId());
            ps.feed(5);
            ps.cut(EscPos.CutMode.FULL);
        }
    }

    private String checkIfEdited(ProductOrder p) {
        return p.getEdited() ? "*" : "";
    }

    public String fixedLengthString(String string, int count) {
        int length = string.length();

        if (length <= count) {
            for (int i = length; i <= count; i++) {
                string = string.concat(" ");
            }
            return string;
        } else {
            return string.substring(0, count);
        }
    }

}
