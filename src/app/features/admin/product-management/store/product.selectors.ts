import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProductState =
  createFeatureSelector<ProductState>('adminProducts');

export const selectAllProducts = createSelector(
  selectProductState,
  state => state.products
);

export const selectLoading = createSelector(
  selectProductState,
  state => state.loading
);
