import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import Inspection from '../interfaces/inspection.interface';

@Injectable({
  providedIn: 'root'
})
export class InspectionsService {

  constructor(private firestore: AngularFirestore) { }

  addInspection(inspection: Inspection) {
    return this.firestore.collection('inspections').add(inspection);
  }

  getInspections(): Observable<Inspection[]> {
    return this.firestore.collection('inspections').valueChanges({ idField: 'id' }) as Observable<Inspection[]>;
  }

  deleteInspection(inspection: Inspection) {
    return this.firestore.doc(`inspections/${inspection.id}`).delete();
  }

  updateInspection(inspectionId: Inspection, newData: Partial<Inspection>) {
    const { id } = inspectionId; 
    const inspectionRef = this.firestore.doc(`inspections/${id}`);
    return inspectionRef.update(newData);
}


}
