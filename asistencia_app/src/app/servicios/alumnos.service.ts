import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import Alumnos from '../interfaces/alumnos.interfaces';
import { Observable } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(private firestore: Firestore, private auth: Auth) { }

  addAlumno(alumnos: Alumnos) {
    const alumnosRef = collection(this.firestore, 'alumnos');
    return addDoc(alumnosRef, alumnos)
  }

  getAlumnos(): Observable<Alumnos[]>{
    const alumnosRef = collection(this.firestore, 'alumnos');
    return collectionData(alumnosRef, {idField: 'id'}) as Observable<Alumnos[]>
    
  }

  register({email, password}: any){ 
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  login ({email, password}: any){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  logOut() {
    return signOut(this.auth);
  }
}
