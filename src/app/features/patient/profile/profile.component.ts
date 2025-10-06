import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Address {
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface Health {
  bloodType: string;
  allergies?: string;
  chronicConditions?: string;
}

interface User {
  name: string;
  cpf: string;
  cns: string;
  email: string;
  birthDate: string;
  gender: 'M' | 'F' | 'O';
  phone: string;
  address: Address;
  health: Health;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  editMode = false;

  // Mock user data
  user: User = {
    name: 'Maria Silva Santos',
    cpf: '123.456.789-00',
    cns: '898 0011 2233 0001',
    email: 'maria.silva@email.com',
    birthDate: '1990-05-15',
    gender: 'F',
    phone: '(51) 99999-9999',
    address: {
      zipCode: '91340-000',
      street: 'Rua São Manoel',
      number: '456',
      complement: 'Apto 302',
      neighborhood: 'Passo da Areia',
      city: 'Porto Alegre',
      state: 'RS'
    },
    health: {
      bloodType: 'O+',
      allergies: 'Penicilina',
      chronicConditions: 'Hipertensão Controlada'
    }
  };

  private userBackup!: User;

  getInitials(): string {
    const names = this.user.name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return (names[0][0] + names[0][1]).toUpperCase();
  }

  toggleEditMode(): void {
    if (!this.editMode) {
      this.userBackup = JSON.parse(JSON.stringify(this.user));
      this.editMode = true;
    } else {
      this.saveChanges();
    }
  }

  saveChanges(): void {
    console.log('Changes saved:', this.user);
    alert('Perfil atualizado com sucesso!');
    this.editMode = false;
  }

  cancelEdit(): void {
    if (this.userBackup) {
      this.user = JSON.parse(JSON.stringify(this.userBackup));
    }
    this.editMode = false;
  }

  formatDate(dateString: string): string {
    if (!dateString) return '-';

    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  getGenderLabel(): string {
    const labels: { [key: string]: string } = {
      'M': 'Masculino',
      'F': 'Feminino',
      'O': 'Outro'
    };
    return labels[this.user.gender] || '-';
  }

  changePassword(): void {
    const currentPassword = prompt('Digite sua senha atual:');
    if (!currentPassword) return;

    const newPassword = prompt('Digite sua nova senha:');
    if (!newPassword) return;

    const confirmPassword = prompt('Confirme sua nova senha:');
    if (newPassword !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    console.log('Password changed successfully!');
    alert('Senha alterada com sucesso!');
  }

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

    console.log('Account deleted');
    alert('Conta excluída com sucesso. Você será redirecionado para a página inicial.');
  }
}
