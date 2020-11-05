import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  toggledPassword: boolean = false;
  toggledUserName: boolean = false;
  username: string;
  password: string;
  task: AngularFireUploadTask;
 percentage: Observable<number>;
 snapshot: Observable<any>;
 downloadURL: Observable<string>;
  constructor(public service: MainService, 
    private dialogRef: MatDialogRef<EditprofileComponent>,private _snackBar: MatSnackBar, private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  changeUserName(): void{
    this.toggledUserName = !this.toggledUserName;
  }

  changePassword(): void{
    this.toggledPassword = !this.toggledPassword;
  }

  resetUserName(): void {
    this.service.isLoading = true;
    this.service.resetName(this.username).then(() => {
      this.service.isLoading = false;
      this.dialogRef.close();
      this.openSnackBar('Updated username successfully','Ok','success');
    }).catch(e => {
      this.openSnackBar(e,'Ok','error');
    });
  }

  resetPassword(): void {
    this.service.isLoading = true;
    this.service.resetPassword(this.password).then(() => {
      this.service.isLoading = false;
      this.dialogRef.close();
      this.openSnackBar('Updated password successfully','Ok','success');
    }).catch(e => {
      this.openSnackBar(e,'Ok','error');
    });
  }

  openSnackBar(message: string, action: string, status: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: status
    });
  }
  
  handleChange(e: FileList){
    this.service.isLoading = true;
    const file = e.item(0);
    const filePath = `profiles/${new Date().getTime()}_${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.percentage = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            this.service.updatePhoto(url);
            this.openSnackBar('Updated photo successfully','Ok','success');
            this.service.isLoading = false;
          });

        } )
        
     )
    .subscribe();
  }
}
