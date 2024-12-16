import { Component } from '@angular/core';
import { ApiService } from '../apiServices/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-potato-disease-classification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './potato-disease-classification.component.html',
  styleUrls: ['./potato-disease-classification.component.css'],
})
export class PotatoDiseaseClassificationComponent {
  images: string[] = [];
  selectedFiles: File[] = [];

  constructor(private apiService: ApiService) {}

  // Handle file selection
  onFilesSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFiles = Array.from(target.files);
    }
  }

  // Upload selected images
  uploadImages() {
    if (this.selectedFiles.length > 0) {
      this.apiService.uploadImages(this.selectedFiles).subscribe({
        next: (response) => {
          console.log('Upload successful:', response);
          // this.getImages(); // Refresh images after upload
        },
        error: (error) => console.error('Upload failed:', error),
      });
    } else {
      console.error('No files selected!');
    }
  }

  // Fetch all images
  getImages() {
    this.apiService.getImages().subscribe({
      next: (response) => {
        this.images = response.images;
      },
      error: (error) => console.error('Error fetching images:', error),
    });
  }
}