import { Component, NgZone, OnInit, inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { StateService } from '../state.service'; // Ajusta la ruta según la ubicación real del servicio
import { NavController } from '@ionic/angular';
import { TareasService } from '../servicios/tareas.service';
import { AlumnosService } from '../servicios/alumnos.service';
import Alumnos from '../interfaces/alumnos.interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UtilsService } from '../servicios/utils.service';
import { user } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { Asistencia } from '../interfaces/asistencia.interfaces';
import { DialogService } from '../core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Tab2ModalComponent } from './tab2-modal.component';
import {
  Barcode,
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';

let navigationExtras: NavigationExtras = {};

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

  public readonly barcodeFormat = BarcodeFormat;
  public readonly lensFacing = LensFacing;

  angularfire = inject(AngularFirestore)
  utilService = inject(UtilsService)

  username = '';
  
  asistencias: Asistencia[] = []

  public formGroup = new UntypedFormGroup({
    formats: new UntypedFormControl([]),
    lensFacing: new UntypedFormControl(LensFacing.Back),
    googleBarcodeScannerModuleInstallState: new UntypedFormControl(0),
    googleBarcodeScannerModuleInstallProgress: new UntypedFormControl(0),
  });
  public barcodes: Barcode[] = [];
  public isSupported = true;
  public isPermissionGranted = true;




 


  //alumnos: Alumnos[];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alumnosService: AlumnosService,
    private stateService: StateService,
    private alertController: AlertController,
    private readonly dialogService: DialogService,
    private readonly ngZone: NgZone

  ) {}

  public ngOnInit(): void {
    var val = localStorage.getItem('alumnos')!;
    var object = JSON.parse(val);
    this.username = object.name;

    //BarcodeScanner.isSupported().then((result) => {
    //  this.isSupported = result.supported;
    //});
    //BarcodeScanner.checkPermissions().then((result) => {
    //  this.isPermissionGranted = result.camera === 'granted';
    //});
    BarcodeScanner.removeAllListeners().then(() => {
      BarcodeScanner.addListener(
        'googleBarcodeScannerModuleInstallProgress',
        (event) => {
          this.ngZone.run(() => {
            console.log('googleBarcodeScannerModuleInstallProgress', event);
            const { state, progress } = event;
            this.formGroup.patchValue({
              googleBarcodeScannerModuleInstallState: state,
              googleBarcodeScannerModuleInstallProgress: progress,
            });
          });
        }
      );
    });
  }

  ionViewWillEnter() {
    this.getAsistencia()
  }

  onClick() {
    this.alumnosService.logOut()
      
  }

  obtenerDato() {
    var val = localStorage.getItem('alumnos')!;
    var object = JSON.parse(val);
    console.log(object.name)
  }

  getAsistencia(){
    var val = localStorage.getItem('alumnos')!;
    var object = JSON.parse(val);
    let path = `alumnos/${object.uid}`
    let sub = this.alumnosService.getSubcollection(path, 'asistencia').subscribe({
      next: (res: Asistencia[] | any) => {
        console.log(res)
        this.asistencias = res
        sub.unsubscribe()
      }
    })
  }

  getPorcentaje(asistencia: Asistencia){
    return this.utilService.getProcentaje(asistencia)
  }

  public async startScan(): Promise<void> {
    const formats = this.formGroup.get('formats')?.value || [];
    const lensFacing =
      this.formGroup.get('lensFacing')?.value || LensFacing.Back;
    const element = await this.dialogService.showModal({
      component: Tab2ModalComponent,
      // Set `visibility` to `visible` to show the modal (see `src/theme/variables.scss`)
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: formats,
        lensFacing: lensFacing,
      },
    });
    element.onDidDismiss().then((result) => {
      const barcode: Barcode | undefined = result.data?.barcode;
      if (barcode) {
        this.barcodes = [barcode];
      }
    });
  }

  //para leer de imagenes !!!!sacar luego
  public async readBarcodeFromImage(): Promise<void> {
    const { files } = await FilePicker.pickImages({ multiple: false });
    const path = files[0]?.path;
    if (!path) {
      return;
    }
    const formats = this.formGroup.get('formats')?.value || [];
    const { barcodes } = await BarcodeScanner.readBarcodesFromImage({
      path,
      formats,
    });
    this.barcodes = barcodes;
  }

  public async scan(): Promise<void> {
    const formats = this.formGroup.get('formats')?.value || [];
    const { barcodes } = await BarcodeScanner.scan({
      formats,
    });
    this.barcodes = barcodes;
  }

  public async openSettings(): Promise<void> {
    await BarcodeScanner.openSettings();
  }

  public async installGoogleBarcodeScannerModule(): Promise<void> {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }

  public async requestPermissions(): Promise<void> {
    await BarcodeScanner.requestPermissions();
  }


}

  

