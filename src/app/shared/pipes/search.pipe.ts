import { Pipe, PipeTransform } from '@angular/core';
import {IUser} from "../interfaces/user.interface";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Array<IUser>, searchName: string| undefined): any {
    if(!value) {
      return []
    }
    if (!searchName) {
      return  value
    }
    return  value.filter(user => user.name.toLowerCase().includes(searchName.toLowerCase()) || user.lastname.toLowerCase().includes(searchName.toLowerCase()) || user.number.toLowerCase().includes(searchName.toLowerCase())  )
  }

}
