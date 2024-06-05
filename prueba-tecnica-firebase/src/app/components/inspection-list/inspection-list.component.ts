import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import Inspection from '../../interfaces/inspection.interface';
import { InspectionsService } from '../../services/inspections.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';



@Component({
  selector: 'app-inspection-list',
  templateUrl: './inspection-list.component.html',
  styleUrls: ['./inspection-list.component.css']
})
export class InspectionListComponent implements OnInit {

  inspections: Inspection[] = [];
  filteredInspections: Inspection[] = [];
  formulario!: FormGroup;
  editedInspection: Inspection | null = null;
  filter: string = 'Todos';

  constructor(
    private inspectionsService: InspectionsService,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage 
  ) {}

  ngOnInit(): void {
    this.createForm(); 
    this.inspectionsService.getInspections().subscribe(inspections => {
      this.inspections = inspections;
      this.applyFilter();
    });
  }

  createForm() {
    this.formulario = this.formBuilder.group({
      Type_of_inspection: ['', Validators.required], 
      date: ['', Validators.required], 
      latitude: ['', Validators.required], 
      longitude: ['', Validators.required], 
      result: ['', Validators.required], 
      image: ['']
    });
  }

  async onClickDelete(inspection: Inspection) {
    const response = await this.inspectionsService.deleteInspection(inspection);
    console.log(response);
  }

  onClickUpdate(inspection: Inspection) {
    this.editedInspection = inspection;
    this.formulario.patchValue({
      Type_of_inspection: inspection.Type_of_inspection,
      date: inspection.date,
      latitude: inspection.latitude,
      longitude: inspection.longitude,
      result: inspection.result,
      image: inspection.image
    });
  }

  async onSubmitUpdate() {
    if (this.editedInspection) {
      try {
        const updatedData = this.formulario.value;
        const response = await this.inspectionsService.updateInspection(this.editedInspection, updatedData);
        console.log("Respuesta del servicio:", response);
        this.editedInspection = null;
      } catch (error) {
        console.error("Error al actualizar la inspección:", error);
      }
    } else {
      console.error("La inspección editada es nula. No se puede actualizar la inspección.");
    }
  }

  updateFilter(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.filter = selectElement.value;
    this.applyFilter();
  }

  applyFilter() {
    if (this.filter === 'Todos') {
      this.filteredInspections = this.inspections;
    } else {
      this.filteredInspections = this.inspections.filter(inspection => inspection.Type_of_inspection === this.filter);
    }
  }

  // Método para manejar la selección de archivos
onFileSelected(event: any) {
  const file = event.target.files[0]; // Obtiene el archivo seleccionado

  // Si el usuario ha seleccionado un archivo
  if (file) {
      const filePath = 'carpeta_principal/' + file.name; // Define la ruta de almacenamiento de la imagen
      const fileRef = this.storage.ref(filePath); // Crea una referencia al archivo en Firebase Storage
      const uploadTask = this.storage.upload(filePath, file); // Sube el archivo a Firebase Storage

      // Observa el estado de la carga del archivo y maneja los eventos
      uploadTask.snapshotChanges().pipe(
          finalize(() => {
              fileRef.getDownloadURL().subscribe(downloadURL => {
                  // Actualiza el valor del campo de imagen en tu formulario con la URL de descarga de la imagen
                  this.formulario.patchValue({ image: downloadURL });
              });
          })
      ).subscribe();
  }
}
}
