import { 
    getProducts, 
    saveProduct, 
    deleteProduct, 
    initLocalStorage 
} from './storage.js';

// Inicializar datos si es ncesario
initLocalStorage();

document.addEventListener('DOMContentLoaded', () => {
    checkLogin();
    setupAdminUI();
});

function checkLogin() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    const loginOverlay = document.getElementById('login-overlay');
    const dashboard = document.getElementById('dashboard');

    if (isLoggedIn === 'true') {
        loginOverlay.style.display = 'none';
        dashboard.style.display = 'block';
        renderProducts();
        updateStats();
    }
}

// Login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === 'admin' && pass === 'admin') {
        localStorage.setItem('adminLoggedIn', 'true');
        location.reload();
    } else {
        const err = document.getElementById('login-error');
        err.style.display = 'block';
    }
});

function setupAdminUI() {
    // Buscador en tiempo real
    const searchInput = document.getElementById('admin-search');
    searchInput.addEventListener('input', (e) => {
        renderProducts(e.target.value.toLowerCase());
    });

    // Modal forms
    const editForm = document.getElementById('edit-form');
    editForm.addEventListener('submit', handleSaveProduct);

    // Image preview Logic
    const imgInput = document.getElementById('edit-img');
    const filePicker = document.getElementById('file-picker');
    const preview = document.getElementById('admin-img-preview');
    const placeholder = document.getElementById('preview-placeholder');

    filePicker.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target.result;
                imgInput.value = base64String;
                updatePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    });

    // Logout global (ya definido en HTML, pero por si acaso)
    window.logout = () => {
        localStorage.removeItem('adminLoggedIn');
        window.location.reload();
    };

    // Global markers for modal functions
    window.closeModal = closeModal;
    window.openAddModal = openAddModal;
    window.editProduct = editProduct;
    window.confirmDelete = confirmDelete;
}

function updatePreview(url) {
    const preview = document.getElementById('admin-img-preview');
    const placeholder = document.getElementById('preview-placeholder');
    if (url) {
        const isExternal = url.startsWith('http') || url.startsWith('data:');
        preview.src = isExternal ? url : `assets/products/${url}`;
        preview.style.display = 'block';
        placeholder.style.display = 'none';
    } else {
        preview.style.display = 'none';
        placeholder.style.display = 'block';
    }
}

function updateStats() {
    const products = getProducts();
    const brands = new Set(products.map(p => p.brand));
    const avg = products.length > 0 
        ? products.reduce((acc, p) => acc + p.price, 0) / products.length 
        : 0;

    document.getElementById('stat-total-products').textContent = products.length;
    document.getElementById('stat-total-brands').textContent = brands.size;
    document.getElementById('stat-avg-price').textContent = `$${Math.round(avg)}`;
}

function renderProducts(filter = "") {
    const products = getProducts();
    const tbody = document.getElementById('product-list-body');
    tbody.innerHTML = '';

    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(filter) || 
        p.brand.toLowerCase().includes(filter)
    );

    filtered.forEach(product => {
        const tr = document.createElement('tr');
        const isExternal = product.image && (product.image.startsWith('http') || product.image.startsWith('data:'));
        const displayImg = isExternal ? product.image : `assets/products/${product.image}`;
        
        tr.innerHTML = `
            <td>
                <img src="${displayImg}" 
                     style="width: 48px; height: 48px; object-fit: cover; border-radius: 8px; border: 1px solid var(--admin-border);"
                     onerror="this.src='https://placehold.co/100?text=Error'">
            </td>
            <td>
                <div style="font-weight: 600;">${product.name}</div>
                <div style="font-size: 0.75rem; opacity: 0.5;">ID: ${product.id}</div>
            </td>
            <td><span style="opacity: 0.8;">${product.brand}</span></td>
            <td><span style="color: var(--admin-accent); font-weight: 600;">$${product.price.toFixed(2)}</span></td>
            <td>
                <div style="display: flex; gap: 8px;">
                    <button class="btn-icon-small" onclick="editProduct('${product.id}')" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon-small delete" onclick="confirmDelete('${product.id}')" title="Eliminar">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openAddModal() {
    const modal = document.getElementById('edit-modal');
    document.getElementById('modal-title').textContent = "NUEVO PRODUCTO";
    document.getElementById('edit-form').reset();
    document.getElementById('edit-id').value = "";
    document.getElementById('edit-img').value = "";
    updatePreview(null);
    modal.style.display = 'flex';
}

function editProduct(id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);
    if (!product) return;

    const modal = document.getElementById('edit-modal');
    document.getElementById('modal-title').textContent = "EDITAR PRODUCTO";
    document.getElementById('edit-id').value = product.id;
    document.getElementById('edit-name').value = product.name;
    document.getElementById('edit-brand').value = product.brand;
    document.getElementById('edit-price').value = product.price;
    document.getElementById('edit-desc').value = product.description;
    document.getElementById('edit-img').value = product.image;
    
    updatePreview(product.image);
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function handleSaveProduct(e) {
    e.preventDefault();
    const productData = {
        id: document.getElementById('edit-id').value || Date.now().toString(),
        name: document.getElementById('edit-name').value,
        brand: document.getElementById('edit-brand').value,
        price: parseFloat(document.getElementById('edit-price').value),
        description: document.getElementById('edit-desc').value,
        image: document.getElementById('edit-img').value
    };

    saveProduct(productData);
    closeModal();
    renderProducts();
    updateStats();
    showToast(productData.id ? "Producto actualizado" : "Producto creado");
}

function confirmDelete(id) {
    if (confirm("¿Estás seguro de eliminar este producto del catálogo?")) {
        deleteProduct(id);
        renderProducts();
        updateStats();
        showToast("Producto eliminado", "danger");
    }
}

function showToast(msg, type = "success") {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.style.background = type === "success" ? "var(--admin-accent)" : "var(--admin-danger)";
    toast.style.color = type === "success" ? "black" : "white";
    toast.style.transform = "translateY(0)";
    
    setTimeout(() => {
        toast.style.transform = "translateY(150%)";
    }, 3000);
}
