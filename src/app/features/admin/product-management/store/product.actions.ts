import { createAction, props } from '@ngrx/store';
import { ProductDTOResponse } from '../../../../core/models/admin/product';

export const loadProducts = createAction(
  '[Admin Product] Load Products'
);

export const loadProductsSuccess = createAction(
  '[Admin Product] Load Products Success',
  props<{ products: ProductDTOResponse[] }>()
);

export const loadProductsFailure = createAction(
  '[Admin Product] Load Products Failure',
  props<{ error: string }>()
);
