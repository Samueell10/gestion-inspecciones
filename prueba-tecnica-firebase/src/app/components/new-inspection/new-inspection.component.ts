import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InspectionsService } from '../../services/inspections.service';

@Component({
  selector: 'app-new-inspection',
  templateUrl: './new-inspection.component.html',
  styleUrls: ['./new-inspection.component.css']
})
export class NewInspectionComponent implements OnInit {

  formulario: FormGroup;
  mensaje: string = ''; 

  constructor(
    private inspectionsService: InspectionsService,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      Type_of_inspection: ['', Validators.required], 
      date: ['', Validators.required], 
      latitude: ['', Validators.required], 
      longitude: ['', Validators.required], 
      result: ['', Validators.required], 
      image: [''] 
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    if (this.formulario.valid) {
      try {
        const response = await this.inspectionsService.addInspection(this.formulario.value);
        this.mensaje = '¡La inspección se ha enviado con éxito!';
        console.log("Respuesta del servicio:", response);
      } catch (error) {
        this.mensaje = 'Error al enviar la inspección. Inténtalo de nuevo más tarde.';
        console.error("Error al enviar la inspección:", error);
      }
    } else {
      this.mensaje = 'Por favor, completa todos los campos obligatorios.';
    }
  }
}
