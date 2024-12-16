import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './apiServices/api.service';
import { CommonModule } from '@angular/common';
import { PotatoDiseaseClassificationComponent } from './potato-disease-classification/potato-disease-classification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,PotatoDiseaseClassificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  data: any = [];  // Variable to store data

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Fetch data from the Flask API when the component initializes
    this.apiService.getData().subscribe(
      (response) => {
        this.data = response;  // Assign the fetched data to the variable
        console.log(this.data); // Log data to the console
      },
      (error) => {
        console.error('Error fetching data from Flask API', error);
      }
    );
  }
}
