import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import Alumnos from '../interfaces/alumnos.interfaces';
import { Observable } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, getAuth, sendPasswordResetEmail } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UtilsService } from './utils.service';


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  angularfire = inject(AngularFirestore)
  utilService = inject(UtilsService)

  user = getAuth().currentUser

  constructor(private firestore: Firestore, private auth: Auth) { }

  addAlumno(alumnos: Alumnos) {
    const alumnosRef = collection(this.firestore, 'alumnos');
    return addDoc(alumnosRef, alumnos)
  }

  getAlumnos(): Observable<Alumnos[]>{
    const alumnosRef = collection(this.firestore, 'alumnos');
    return collectionData(alumnosRef, {idField: 'id'}) as Observable<Alumnos[]>
    
  }

  // ========== Autenticación ========== //

  getAuth(){
    return getAuth()
  }

  register({email, password}: any){ 
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  login ({email, password}: any){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  logOut() {
    signOut(this.auth);
    localStorage.removeItem('alumnos')
    this.utilService.routerLink('/tabs/tab1')
  }

  updateUsuario(displayName: string){
    return updateProfile(this.auth.currentUser!, {displayName})
  }


  sendRecoveryEmail(email: string){
    return sendPasswordResetEmail(this.auth, email)
  }


  // ========= base de datos ======== //

  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data)
  }

  async getDocument(path: string){
    return (await getDoc(doc(getFirestore(), path))).data()
  }

  getSubcollection(path: string, subCollectionName: string){
    return this.angularfire.doc(path).collection(subCollectionName).valueChanges({idField: 'id'})
  }

  updateDocument(path: string, object: any){
    return this.angularfire.doc(path).update(object)
  }



}
