import { products as initialProducts } from './data.js';

const STORAGE_KEY = 'mw_products_v2';

export function getProducts() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialProducts;
}

export function saveProduct(product) {
    const products = getProducts();
    const index = products.findIndex(p => p.id === product.id);
    
    if (index !== -1) {
        products[index] = product;
    } else {
        products.push(product);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    notifyUpdate(); // Actualizar otras pestañas si es necesario
}

export function deleteProduct(id) {
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    notifyUpdate();
}

export function initLocalStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
    }
}

function notifyUpdate() {
    // Disparar evento personalizado para que main.js pueda reaccionar si es necesario
    window.dispatchEvent(new Event('storage-update'));
}
