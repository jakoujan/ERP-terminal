import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IConfiguration } from 'src/app/interfaces/configuration';
import { CatalogsService } from 'src/app/services/catalogs.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { SerialPortData } from '../../common/serial/serial-port-data';
import { ISerialPortItem } from '../../common/serial/serial-port-item';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  printers: Array<String> = [];
  form: FormGroup;
  printerForm: FormGroup;
  scaleForm: FormGroup;
  configuration: IConfiguration;
  baudrates: Array<number> = SerialPortData.BAUDRATES;
  databits: Array<number> = SerialPortData.DATABITS;
  parities: Array<ISerialPortItem> = SerialPortData.PARITY;
  stopbits: Array<ISerialPortItem> = SerialPortData.STOPBITS;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private catalogService: CatalogsService,
    private configurationService: ConfigurationService, private dialogRef: MatDialogRef<ConfigurationComponent>) { }

  ngOnInit(): void {
    this.catalogService.getPrinters().subscribe(printers => this.printers = printers);

    this.form = this.formBuilder.group({
      printer: [undefined, Validators.required],
      host: [undefined, Validators.required]
    });

    this.configurationService.get().subscribe(configuration => {
      this.configuration = configuration;
      this.form.get('printer').setValue(configuration.printer);
      this.form.get('host').setValue(configuration.host);
    });
  }

  public save() {
    this.configuration.printer = this.form.get('printer').value;
    this.configuration.host = this.form.get('host').value;
    this.configurationService.save(this.configuration).subscribe(response => {
      this.dialogRef.close();
      this.snackBar.open(response.message, 'Cerrar', {
        duration: 1500
      });
    })
  }

}
