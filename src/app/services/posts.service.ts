import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage: AngularFireStorage, private afs: AngularFirestore, private toastr: ToastrService, private router: Router) { }

  uploadImage(selectedImage: any, postData: any, formStatus: string, id: string) {
    const filePath = `postIMG/${Date.now()}`

    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('Post image uploaded successfully.');

      this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
        postData.postImgPath = URL;
        if (formStatus == "Edit") {
          this.updateData(id, postData);
        } else {
          this.saveData(postData);
        }
      })
    })
  }

  saveData(postData: any) {
    this.afs.collection('posts').add(postData).then(docRef => {
      this.toastr.success('Data Insert Successfully');
      this.router.navigate(['/posts'])
    });
  }

  loadPostsData() {
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, data }
        })
      })
    )
  }

  loadPostData(id: string) {
    return this.afs.doc(`posts/${id}`).valueChanges();
  }

  updateData(id: string, postData: any) {
    this.afs.doc(`posts/${id}`).update(postData).then(() => {
      this.toastr.success('Data Updated Successfully');
      this.router.navigate(['/posts']);
    });
  }

  deleteImage(postImgPath: string, id: string) {
    this.storage.storage.refFromURL(postImgPath).delete().then(() => {
      this.deleteData(id);
    });
  }

  deleteData(id: string) {
    this.afs.doc(`posts/${id}`).delete().then(() => {
      this.toastr.warning('Data Delete ...!!')
    })
  }

  markFeatured(id: string, featuredData: any) {
    this.afs.doc(`posts/${id}`).update(featuredData).then(() => {
      this.toastr.info('Featured Status Updated');
    })
  }
}
