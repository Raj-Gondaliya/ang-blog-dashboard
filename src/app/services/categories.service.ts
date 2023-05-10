import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  saveData(data: any) {
    this.afs.collection('categories').add(data).then(docRef => {
      console.log(docRef);

      this.toastr.success('Data Insert Successfully ...!')
    })
      .catch(err => {
        console.log(err);
        this.toastr.error('Data Not Inserted ...!');
      })
  }

  loadData() {
    return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }

  UpdateData(id: string, editData: Category) {
    this.afs.doc(`categories/${id}`).update(editData).then(docRef => {
      this.toastr.success("Data Updated Successfully ...!");
    });
  }

  DeleteData(id: string) {
    this.afs.doc(`categories/${id}`).delete().then(docRef => {
      this.toastr.success("Data Deleted Successfully ...!");
    });
  }
}
