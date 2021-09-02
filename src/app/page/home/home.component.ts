import {Component,OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {OpenDialogComponent} from "../../components/OpenDialog/OpenDialogComponent.components";
import {IUser} from "../../shared/interfaces/user.interface";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  value: string | undefined;
  isView = false

  displayedColumns: string[] = ['name', 'lastname', 'number', 'view', 'edit', 'delete'];
  userAray: Array<IUser> = []

  constructor(public dialog: MatDialog) {}


  ngOnInit(): void {
    this.getLocalStorage()
  }

  getLocalStorage(){
    this.userAray = JSON.parse(<string>localStorage.getItem('user'))
  }

  view(bollean: boolean): void {
    this.isView = bollean
  }

  openDialog(user?:IUser, index?:number): void {
    const dialogRef = this.dialog.open(OpenDialogComponent, {
      width: '30%',
      data: {user: user, id: index, toggle: this.isView}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.userAray = result
      }
    });
  }

  userDelete(user:IUser) {
    const aray = this.userAray.filter(el => el.id != user.id)
    this.userAray = aray
    localStorage.setItem('user', JSON.stringify(aray))
  }



}
