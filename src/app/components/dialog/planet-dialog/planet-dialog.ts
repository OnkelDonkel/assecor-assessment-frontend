import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-planet-dialog',
  imports: [
    FormsModule
  ],
  templateUrl: './planet-dialog.html',
  styleUrl: './planet-dialog.scss'
})
export class PlanetDialog {
  planetData = {
    name: '',
    type: 'desert',
    createdBy: 'George Lucas',
    genre: 'Science fiction',
    races: ''
  };

  constructor(public dialogRef: MatDialogRef<PlanetDialog>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.planetData);
  }
}
