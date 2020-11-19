import { Component, OnInit } from '@angular/core';
import { List } from './list';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  entryname: string;
  entryprice: number;
  
  successMessage: string;

  entrylist : List[];

  constructor(
    private listService: ListService
  ) { }

  ngOnInit(): void {
    this.handleListEntries();
  }

  handleAddEntry(){
    if (this.entryname == "" || this.entryprice == null) {
      alert("One or more empty fields! Fill all before posting!");
      return false;
    } else {
      this.listService.addListitem(this.entryname, this.entryprice).subscribe((result)=> {
        this.successMessage = this.entryname + ' added successfully!';
      }, () =>{
      })
      this.handleListEntries();
      this.entryname = "";
      this.entryprice = null;
    }
  }

  handleListEntries(){
    if (this.listService.getList() != null){
      let resp = this.listService.getList();
      resp.subscribe(data=>this.entrylist=data);
    }
  }
}
