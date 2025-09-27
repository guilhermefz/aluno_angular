import { Routes } from '@angular/router';
import { alunoComponent } from './components/aluno/alunoComponent';
import { Aluno } from './services/aluno-service';
import { Home } from './components/home/home';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'alunos', component: alunoComponent }
];
