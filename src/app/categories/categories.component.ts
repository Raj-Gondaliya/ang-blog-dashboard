import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryArray: any[] = [];
  formCategory: string = "";
  formStatus: string = "Add";
  categoryId: string = "";
  
  constructor(private categoryService: CategoriesService) {  }
  
  ngOnInit(): void {
    this.categoryService.loadData().subscribe( val => {
      console.log(val);
      this.categoryArray = val;
    })
  }

  onSubmit(formData: any){
    let categoryData: Category ={
      category: formData.value.category
    }
    if (this.formStatus == "Add") {
      this.categoryService.saveData(categoryData)
    } else if (this.formStatus == "Edit") {
      this.categoryService.UpdateData(this.categoryId, categoryData);
      this.formStatus = "Add"
    }
    formData.reset();
  }

  onEdit(category: string, id: string){
    this.formCategory = category;
    this.formStatus = "Edit";
    this.categoryId = id
  }

  onDelete(id: string){
    this.categoryService.DeleteData(id);
  }
}
