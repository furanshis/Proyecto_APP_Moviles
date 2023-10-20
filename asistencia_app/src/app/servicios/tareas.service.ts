import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';



interface Student {
  direccion: string;
  edad: number;
  nombre: string;
}




@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private firestore: AngularFirestore) { }

  createStudent(record: Student) {
    // Proporciona el nombre de la colección directamente, sin usar 'path:'
    return this.firestore.collection('Student').add(record);
  }

}