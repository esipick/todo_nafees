import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-animations-example',
  templateUrl: './dialog-animations-example.component.html',
  styleUrls: ['./dialog-animations-example.component.css']
})
export class DialogAnimationsExampleComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { enterAnimationDuration: string, exitAnimationDuration: string, 
      onSaveForm: (data: any, existingData: any) => void, existingData: any 
    }
  ) {}
  formValues = {
    title: this.data.existingData?.title || "",
    priority: this.data.existingData?.priority || "",
    status: this.data.existingData?.status || ""
  }

  onSubmitForm(){
    this.data.onSaveForm(this.formValues, this.data.existingData)
  }

}
