import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HomeComponent} from "../../page/home/home.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../../shared/interfaces/user.interface";
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-OpenDialogComponent',
  templateUrl: './OpenDialogComponent.components.html',
  styleUrls: ['./OpenDialogComponent.components.scss']
})

export class OpenDialogComponent implements OnInit {

  userAray: Array<IUser> = [];
  isbutton: boolean = false;

  formUser = this.formBolider.group({
    name: new FormControl('', Validators.required ),
    lastname: new FormControl('', Validators.required ),
    number: new FormControl('', Validators.required),
    dateBirth: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required)
  })

  constructor(
    private formBolider :FormBuilder,
    public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {user: IUser , id:number, toggle: boolean},
  ) {}

  ngOnInit(): void {
    this.getLocalStorage()
    this.editUser()
  }

  editUser() :void {
    if(this.data.user) {
      this.formUser.patchValue({...this.data.user})
      this.isbutton = true
    }
  }


  getLocalStorage(): void {
    if(JSON.parse(<string>localStorage.getItem('user'))   ) {
      this.userAray =  JSON.parse(<string>localStorage.getItem('user'))
    }
  }

  get getText(): string {
   return  this.isbutton? 'Сохранити' : 'Добавити'
  }

  addUser( {name, number, lastname, dateBirth, city} : IUser): void {
    if(!this.isbutton) {
      const user = new User(1 ,name,lastname,number,dateBirth,city)
      if(this.userAray.length > 0) {
        user.id = this.userAray.slice(-1)[0].id +1
      }
      this.userAray.push(user)
      localStorage.setItem('user', JSON.stringify(this.userAray))
      this.dialogRef.close(this.userAray)
    } else  {
      this.userAray[this.data.id] = {id:this.data.user.id, ...this.formUser.value}
      localStorage.setItem('user', JSON.stringify(this.userAray))
      this.dialogRef.close(this.userAray)
    }

  }

}
