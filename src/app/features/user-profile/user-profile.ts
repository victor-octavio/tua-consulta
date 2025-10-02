import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Endereco {
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface Saude {
  tipoSanguineo: string;
  alergias?: string;
  condicoesCronicas?: string;
}

interface User {
  nome: string;
  cpf: string;
  email: string;
  dataNascimento: string;
  sexo: 'M' | 'F' | 'O';
  telefone: string;
  endereco: Endereco;
  saude: Saude;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfile {
  editMode = false;
  
  // Dados mockados do usuário
  user: User = {
    nome: 'João Silva Santos',
    cpf: '123.456.789-00',
    email: 'joao.silva@email.com',
    dataNascimento: '1990-05-15',
    sexo: 'M',
    telefone: '(51) 99999-9999',
    endereco: {
      cep: '91000-000',
      rua: 'Rua das Flores',
      numero: '123',
      complemento: 'Apto 101',
      bairro: 'Centro',
      cidade: 'Porto Alegre',
      estado: 'RS'
    },
    saude: {
      tipoSanguineo: 'O+',
      alergias: 'Penicilina',
      condicoesCronicas: 'Hipertensão controlada'
    }
  };

  // Backup para cancelar edições
  private userBackup!: User;

  /**
   * Obtém as iniciais do nome do usuário
   */
  getInitials(): string {
    const names = this.user.nome.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return (names[0][0] + names[0][1]).toUpperCase();
  }

  /**
   * Alterna entre modo de visualização e edição
   */
  toggleEditMode(): void {
    if (!this.editMode) {
      // Entrando em modo de edição - salva backup
      this.userBackup = JSON.parse(JSON.stringify(this.user));
      this.editMode = true;
    } else {
      // Salvando alterações
      this.saveChanges();
    }
  }

  /**
   * Salva as alterações feitas no perfil
   */
  saveChanges(): void {
    console.log('Alterações salvas:', this.user);
    alert('Perfil atualizado com sucesso!');
    this.editMode = false;
  }

  /**
   * Cancela a edição e restaura os dados originais
   */
  cancelEdit(): void {
    if (this.userBackup) {
      this.user = JSON.parse(JSON.stringify(this.userBackup));
    }
    this.editMode = false;
  }

  /**
   * Formata a data para o padrão brasileiro
   */
  formatDate(dateString: string): string {
    if (!dateString) return '-';
    
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  /**
   * Retorna o label do sexo
   */
  getSexoLabel(): string {
    const labels: { [key: string]: string } = {
      'M': 'Masculino',
      'F': 'Feminino',
      'O': 'Outro'
    };
    return labels[this.user.sexo] || '-';
  }

  /**
   * Abre diálogo para alteração de senha
   */
  changePassword(): void {
    const senhaAtual = prompt('Digite sua senha atual:');
    if (!senhaAtual) return;

    const novaSenha = prompt('Digite sua nova senha:');
    if (!novaSenha) return;

    const confirmarSenha = prompt('Confirme sua nova senha:');
    if (novaSenha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    console.log('Senha alterada com sucesso!');
    alert('Senha alterada com sucesso!');
  }

  /**
   * Solicita confirmação para excluir a conta
   */
  deleteAccount(): void {
    const confirmed = confirm(
      'ATENÇÃO: Tem certeza que deseja excluir sua conta?\n\n' +
      'Esta ação não pode ser desfeita e todos os seus dados serão permanentemente removidos.'
    );
    
    if (!confirmed) return;

    const doubleCheck = prompt('Digite "EXCLUIR" para confirmar:');
    if (doubleCheck !== 'EXCLUIR') {
      alert('Operação cancelada.');
      return;
    }

    console.log('Conta excluída');
    alert('Conta excluída com sucesso. Você será redirecionado para a página inicial.');
  }
}