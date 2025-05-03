// src/types/index.ts
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image1: string;
    image2?: string; // Opcional
    category: string;
    material: string;
    type: string;
  }
  
  export interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
  }
  
  export interface User {
    id: number;
    username: string;
    email?: string;
    role: string;
  }