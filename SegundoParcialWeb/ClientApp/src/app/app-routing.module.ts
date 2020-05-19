import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PersonaConsultaComponent } from './Apoyopersona/persona-consulta/persona-consulta.component';
import { PersonaRegistroComponent } from './Apoyopersona/persona-registro/persona-registro.component';


const routes: Routes = [
 {path: 'personaConsulta', component: PersonaConsultaComponent},
 {path: 'personaRegistro',component: PersonaRegistroComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
