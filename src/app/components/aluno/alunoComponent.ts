import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Aluno } from '../../services/aluno-service';
import { alunoModel } from '../../models/alunoModel';

@Component({
  selector: 'app-aluno',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './aluno-component.html',
  styleUrl: './aluno-component.css'
})
export class alunoComponent implements OnInit {

  private service = inject(Aluno);

  alunos: alunoModel[] = [];
  novoNome = '';
  novocurso = '';
  novotelefone = '';
  erro = '';
  ok = '';


  loading = false;
  ngOnInit() {
    this.carregar();
  }


  carregar() {
    this.loading = true;  //faz a inscrição para reagir ao resultado do Observable
    this.service.listar().subscribe({
      next: itens => {
        this.alunos = itens; this.loading = false;
      },
      error: er => {
        this.erro = er.message;
        this.loading = false;
      }
    })
  }

  adicionar() {
    this.erro = '';
    const nome = this.novoNome.trim();
    const cnpj = this.novocurso.trim();
    const telefone = this.novotelefone.trim();
    
    if (!this.novoNome || this.novoNome.length < 3) {
      this.erro = 'O nome é obrigatório e deve ter no mínimo 3 caracteres.';
      return;
    }

    if (!this.novocurso || this.novocurso.length < 3) {
      this.erro = 'O curso é obrigatório e deve ter no mínimo 3 caracteres.';
      return;
    }
    if (!nome) {
      this.erro = 'Informe os valores do campo nome';
      return;
    }
    if (!cnpj) {
      this.erro = 'Informe o curso';
      return;
    }
    if (!telefone) {
      this.erro = 'Informe um telefone';
      return;
    }
    

    const payload : alunoModel={
      id : '',
      nome: nome,
      curso: telefone,
      telefone: telefone
    }

    this.loading = true;
    this.service.adicionar(payload).subscribe({
      

      next: (p) => {
        this.ok = `aluno ${p.nome} salvo com sucesso`;
        this.loading = false;
        this.novoNome = '';
        this.novocurso = '';
        this.novotelefone = '';
        this.carregar();
        
          setTimeout(() => this.ok = '', 3000);
      },
      error: (e) => {
        this.erro = e.message || 'falha ao salvar o aluno';
        this.loading = false;
        setTimeout(() => this.erro = '', 3000);
      }
  })
}



  remover(id: string){
    this.service.remover(id).subscribe({
      next: (msg: string) => {
        this.ok = msg || "Aluno apagado com sucesso";
        this.carregar();
        setTimeout(() => this.ok = '' ,3000);
      },
      error: e => {
        this.erro = e.message || "Erro ao deletar o Aluno";
      }
    })
    
  }

}


