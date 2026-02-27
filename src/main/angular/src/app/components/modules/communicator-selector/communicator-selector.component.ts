import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialog-data';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'app-communicator-selector',
  templateUrl: './communicator-selector.component.html',
  styleUrls: ['./communicator-selector.component.scss']
})
export class CommunicatorSelectorComponent implements OnInit {


  ports: string[] = [];

  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<CommunicatorSelectorComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder, private communicatorService: CommunicatorService) { }

  ngOnInit(): void {
    this.ports = this.data.ports;

    this.form = this.formBuilder.group({
      port: ['', Validators.required]
    });

    this.communicatorService.disconnect();
  }

  connect() {
    this.communicatorService.onMessage(this.form.controls.port.value).subscribe((status) => {
      this.dialogRef.close(status);
    });
  }

}
