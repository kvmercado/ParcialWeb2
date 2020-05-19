import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-persona-registro',
  templateUrl: './persona-registro.component.html',
  styleUrls: ['./persona-registro.component.css']
})
export class PersonaRegistroComponent implements OnInit {
  persona: Persona;
  formGroup: FormGroup;
  submitted = false;

  constructor(private personaService: PersonaService,
    private formBuilder: FormBuilder,) { }

  ngOnInit(){
    this.buildForm();
  }
  

  private buildForm() {
    this.persona = new Persona();
    this.persona.identificacion = '';
    this.persona.nombre = '';
    this.persona.apellido = '';
    this.persona.sexo = '';
    this.persona.edad = 0;
    this.persona.departamento = '';
    this.persona.ciudad = '';
    

    this.formGroup = this.formBuilder.group({
      identificacion: [this.persona.identificacion, Validators.required],
      nombre: [this.persona.nombre, Validators.required],
      apellido: [this.persona.apellido, Validators.required],
      sexo: [this.persona.sexo, [Validators.required, this.validaSexo]],
      edad: [this.persona.edad, [Validators.required, Validators.min(1)]],
      departamento: [this.persona.departamento, Validators.required],
      ciudad: [this.persona.ciudad, Validators.required],
    });
  }

  private validaSexo(control: AbstractControl) {
    const sexo = control.value;
    if (sexo.toLocaleUpperCase() !== 'M' && sexo.toLocaleUpperCase() !== 'F') {
      return {
        validSexo: true, messageSexo: 'Sexo no Valido' 	};
      }
      return null;
  }

  get control() {
    return this.formGroup.controls;
  }

  onSubmit() {
    if (this.formGroup.invalid) {
    return;  
    }  
    this.add();  
    }

  add() {
    this.personaService.post(this.persona).subscribe(p => {
    if (p != null) {   
    alert('Persona creada!'); 
    this.persona = p;    
    }   
    });
  }

}
