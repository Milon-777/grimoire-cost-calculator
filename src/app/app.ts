import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Calculator } from "./components/calculator/calculator";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css',
  imports: [CommonModule, Calculator]
})
export class App {
  protected readonly title = signal('Grimoire Cost Calculator');
}
