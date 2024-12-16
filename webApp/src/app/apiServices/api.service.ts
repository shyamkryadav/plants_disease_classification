import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private getDataUrl = 'http://127.0.0.1:5000/get_data'; // Flask API URL for fetching data
  private uploadUrl = 'http://127.0.0.1:5000/upload_images'; // Flask API URL for image upload
  private getImagesUrl = 'http://127.0.0.1:5000/get_images'; // Flask API for fetching images

  constructor(private http: HttpClient) {}

  // Method to fetch data from Flask API
  getData(): Observable<any> {
    return this.http.get(this.getDataUrl);
  }

  // Method to upload images to Flask API
  uploadImages(files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file); // Use the 'images' key
    });
    return this.http.post(this.uploadUrl, formData);
  }

    // Method to fetch all images
    getImages(): Observable<any> {
      return this.http.get(this.getImagesUrl);
    }
}
