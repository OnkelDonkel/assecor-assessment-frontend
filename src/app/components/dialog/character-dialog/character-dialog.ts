import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-character-dialog',
  imports: [
    FormsModule
  ],
  templateUrl: './character-dialog.html',
  styleUrl: './character-dialog.scss'
})
export class CharacterDialog {
  characterData = {
    name: '',
    size: '',
    mass: '',
    hairColor: '',
    eyeColor: '',
    birthYear: '',
    gender: ''
  };

  constructor(public dialogRef: MatDialogRef<CharacterDialog>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.characterData);
  }
}
