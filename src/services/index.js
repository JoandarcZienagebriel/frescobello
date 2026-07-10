/**
 * Services layer - abstracts all API communication.
 * Currently uses local constants as mock data source.
 * Replace base URL with your backend API (Neon PostgreSQL via serverless functions).
 */

import { PRODUCTS } from '../constants/products';
import { CATEGORIES } from '../constants/categories';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Products service
 */
export const productService = {
  async getAll() {
    if (!API_BASE_URL) return PRODUCTS;
    const res = await fetch(`${API_BASE_URL}/api/products`);
    return res.json();
  },

  async getBySlug(slug) {
    if (!API_BASE_URL) return PRODUCTS.find((p) => p.slug === slug) || null;
    const res = await fetch(`${API_BASE_URL}/api/products/${slug}`);
    return res.json();
  },

  async getByCategory(categorySlug) {
    if (!API_BASE_URL) {
      return PRODUCTS.filter((p) =>
        p.shapes.some((s) => s.toLowerCase().includes(categorySlug.toLowerCase()))
      );
    }
    const res = await fetch(`${API_BASE_URL}/api/products?category=${categorySlug}`);
    return res.json();
  },

  async getBestSellers() {
    if (!API_BASE_URL) return PRODUCTS.filter((p) => p.bestSeller);
    const res = await fetch(`${API_BASE_URL}/api/products?bestSeller=true`);
    return res.json();
  },
};

/**
 * Categories service
 */
export const categoryService = {
  async getAll() {
    if (!API_BASE_URL) return CATEGORIES;
    const res = await fetch(`${API_BASE_URL}/api/categories`);
    return res.json();
  },
};

/**
 * Cart service - for backend sync when authenticated
 */
export const cartService = {
  async sync(userId, items) {
    if (!API_BASE_URL) return null;
    const res = await fetch(`${API_BASE_URL}/api/cart/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, items }),
    });
    return res.json();
  },

  async getCart(userId) {
    if (!API_BASE_URL) return null;
    const res = await fetch(`${API_BASE_URL}/api/cart?userId=${userId}`);
    return res.json();
  },
};

/**
 * Orders service
 */
export const orderService = {
  async create(orderData) {
    if (!API_BASE_URL) return { id: Date.now(), ...orderData, status: 'pending' };
    const res = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    return res.json();
  },

  async getByUser(userId) {
    if (!API_BASE_URL) return [];
    const res = await fetch(`${API_BASE_URL}/api/orders?userId=${userId}`);
    return res.json();
  },
};

/**
 * Contact messages service
 */
export const contactService = {
  async sendMessage(messageData) {
    if (!API_BASE_URL) return { success: true };
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData),
    });
    return res.json();
  },
};

/**
 * Reviews service
 */
export const reviewService = {
  async getByProduct(productId) {
    if (!API_BASE_URL) return [];
    const res = await fetch(`${API_BASE_URL}/api/reviews?productId=${productId}`);
    return res.json();
  },

  async create(reviewData) {
    if (!API_BASE_URL) return { id: Date.now(), ...reviewData };
    const res = await fetch(`${API_BASE_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    return res.json();
  },
};