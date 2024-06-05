import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InspectionsService } from '../../services/inspections.service';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // Importa AngularFireStorage

@Component({
  selector: 'app-new-inspection',
  templateUrl: './new-inspection.component.html',
  styleUrls: ['./new-inspection.component.css']
})
export class NewInspectionComponent implements OnInit {

  formulario: FormGroup;
  mensaje: string = ''; 
  imageFile: any; // Variable para almacenar el archivo de imagen seleccionado

  constructor(
    private inspectionsService: InspectionsService,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage // Inyecta AngularFireStorage
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
    if (this.formulario.valid && this.imageFile) { // Asegúrate de que se haya seleccionado una imagen
      try {
        const formData = this.formulario.value;
        const imageName = new Date().getTime().toString(); // Genera un nombre único para la imagen
        const filePath = 'carpeta_principal/' + imageName; // Define la ruta de almacenamiento de la imagen
        const imageRef = this.storage.ref(filePath); // Referencia al archivo en Firebase Storage
        const uploadTask = imageRef.put(this.imageFile); // Sube la imagen a Firebase Storage

        uploadTask.then(async () => {
          // Obtiene la URL de descarga de la imagen
          const imageUrl = await imageRef.getDownloadURL().toPromise();
          // Agrega la URL de la imagen al objeto formData
          formData.image = imageUrl;
          // Agrega el formulario actualizado a Firebase Firestore
          const response = await this.inspectionsService.addInspection(formData);
          this.mensaje = '¡La inspección se ha enviado con éxito!';
          console.log("Respuesta del servicio:", response);
        }).catch(error => {
          // Maneja los errores durante la carga de la imagen
          console.error("Error al cargar la imagen:", error);
          this.mensaje = 'Error al enviar la inspección. Inténtalo de nuevo más tarde.';
        });
      } catch (error) {
        // Maneja los errores durante el proceso de envío del formulario
        console.error("Error al enviar la inspección:", error);
        this.mensaje = 'Error al enviar la inspección. Inténtalo de nuevo más tarde.';
      }
    } else {
      this.mensaje = 'Por favor, completa todos los campos obligatorios y selecciona una imagen.';
    }
  }

  onFileSelected(event: any) {
    // Almacena el archivo seleccionado en la variable imageFile
    this.imageFile = event.target.files[0];
  }
}
