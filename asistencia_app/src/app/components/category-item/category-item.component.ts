import { Component, Input } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryItemModule } from './category-item.module';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent {
  @Input() item!: Category;
}
