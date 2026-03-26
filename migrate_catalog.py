import os
import shutil
import json

# Paths
BASE_DIR = r"c:\Users\carl2\.gemini\antigravity\scratch\berakah_magic_world"
PRODUCTS_ASSETS = os.path.join(BASE_DIR, "src", "assets", "products")
FOLDER_1 = r"C:\Users\carl2\OneDrive\Escritorio\Desktop\magicworld8381\1"
FOLDER_2 = r"C:\Users\carl2\OneDrive\Escritorio\Desktop\magicworld8381\2"

if not os.path.exists(PRODUCTS_ASSETS):
    os.makedirs(PRODUCTS_ASSETS)

products_list = []

def process_folder(folder_path, brand, prefix):
    if not os.path.exists(folder_path):
        print(f"Folder {folder_path} NOT FOUND")
        return
    
    files = [f for f in os.listdir(folder_path) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    print(f"Processing {len(files)} files for {brand}")
    
    for i, filename in enumerate(files):
        ext = os.path.splitext(filename)[1]
        new_filename = f"{prefix}-{i}{ext}"
        src_path = os.path.join(folder_path, filename)
        dst_path = os.path.join(PRODUCTS_ASSETS, new_filename)
        
        # Copy file
        shutil.copy2(src_path, dst_path)
        
        # Determine likely type/name based on filename or brand
        name = f"{brand} Exclusive Piece #{i+1}"
        p_type = "Bolsas" if brand == "Berakah" else "Trends"
        if "lele" in filename.lower():
            p_type = "Bolsas Bordadas"
            name = f"Bolsa Lele Artesanal - {brand}"
        elif "yute" in filename.lower():
            p_type = "Bolsas de Yute"
            name = f"Bolsita de Yute {brand}"
            
        products_list.append({
            "id": f"{prefix}-{i}",
            "name": name,
            "price": 450.00 if brand == "Magic World" else 350.00, # Estimates
            "brand": brand,
            "type": p_type,
            "category": brand,
            "image": new_filename,
            "description": f"Producto auténtico de la colección {brand}. Elaborado con materiales de alta calidad."
        })

process_folder(FOLDER_1, "Magic World", "mw")
process_folder(FOLDER_2, "Berakah", "bk")

# Write data.js
data_js_content = f"""const products = {json.dumps(products_list, indent=4, ensure_ascii=False)};

if (typeof window !== 'undefined') {{
    window.products = products;
}}
"""

with open(os.path.join(BASE_DIR, "src", "data.js"), "w", encoding="utf-8") as f:
    f.write(data_js_content)

print(f"Done! Generated data.js with {len(products_list)} products.")
