import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { ProductDTOResponse } from '../../../../core/models/admin/product';

export interface ProductState {
  products: ProductDTOResponse[];
  loading: boolean;
  error: string | null;
}

export const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,

  on(ProductActions.loadProducts, state => ({
    ...state,
    loading: true,
  })),

  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),

  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
