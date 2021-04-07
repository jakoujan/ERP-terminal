import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Item } from 'src/app/interfaces/item';

export const ERRORS: Array<Item> = [
  { id: 'required', description: 'Campo requerido' },
  { id: 'email', description: 'Correo electronico requerido' },
  { id: 'usernameExists', description: 'El usuario ya existe en el sistema'},
  { id: 'ipExists', description: 'La ip ya esta en el sistema'},
  { id: 'validIp', description: 'La ip es incorrecta'},
  { id: 'min', description: 'Menor al valor minimo'},
  { id: 'max', description: 'Mayor al valor maximo'},
  { id: 'onlyNumber', description: 'El valor no es un numero'},
  { id: 'noImagesFromCamera', description: 'No se ha obtenido imágenes del circuito de cámaras'},
  { id: 'invalidImagesNumber', description: 'No se completaron correctamente el numero de imágenes de cámara'}
]


@Component({
  selector: 'custom-mat-error',
  templateUrl: './custom-mat-error.component.html',
  styleUrls: ['./custom-mat-error.component.scss']
})
export class CustomMatErrorComponent implements OnInit {
  @Input()
  control: FormControl;
  errors = ERRORS;
  hidden: boolean = true;
  constructor() { }

  ngOnInit(): void {

  }

  get message(): string {
    if (this.control.errors) {
      const errors = this.control.errors;
      const firstKey = Object.keys(errors)[0];
      const message = this.errors.filter(message => message.id === firstKey)[0];
      return message ? message.description : 'Error indefinido';
    }
    return '';
  }

}
