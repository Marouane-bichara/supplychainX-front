/**
 * Represents the base Product data used for creation/updates
 * Corresponds to org.marouane.supplychainx2.Production.DTO.ProductDTO
 */
export interface ProductDTO {
  name: string;
  productionTime: number;
  cost: number;
  stock: number;
}

/**
 * Represents the Product data returned from the backend (includes ID)
 * Corresponds to org.marouane.supplychainx2.Production.DTO.response.product.ProductDTOResponse
 */
export interface ProductDTOResponse extends ProductDTO {
  idProduct: number;
}