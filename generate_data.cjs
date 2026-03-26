const fs = require('fs');
const path = require('path');

const berakahDir = path.join(__dirname, 'public', 'images', 'berakah');
const magicworldDir = path.join(__dirname, 'public', 'images', 'magicworld');

const getJpgFiles = (dir) => {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => {
    const name = f.toLowerCase();
    return f.endsWith('.jpg') && !name.includes('logo') && !name.includes('profile_pic');
  });
};

const berakahFiles = getJpgFiles(berakahDir);
const magicworldFiles = getJpgFiles(magicworldDir);

const generateData = (files, brandFolder, defaultPrice, titlePrefix) => {
  const categories = brandFolder === 'magicworld' 
    ? ['Termos', 'Tuppers', 'Desayuno'] 
    : ['Bolsas', 'Accesorios', 'Especiales'];
    
  return files.map((file, index) => {
    // Assign category based on thirds
    const catIndex = Math.floor((index / files.length) * 3);
    const category = categories[Math.min(catIndex, 2)];
    
    return {
      id: index + 1,
      name: `${titlePrefix} ${index + 1}`,
      price: defaultPrice,
      image: `/images/${brandFolder}/${file}`,
      category: category
    };
  });
};

const berakahObj = generateData(berakahFiles, 'berakah', '$450 MXN', 'Bolso Artesanal');
const magicObj = generateData(magicworldFiles, 'magicworld', '$350 MXN', 'Artículo Magic World');

const content = `
export const berakahData = ${JSON.stringify(berakahObj, null, 2)};

export const magicWorldData = ${JSON.stringify(magicObj, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'src', 'data.js'), content);
console.log(`Generated data.js with ${berakahFiles.length} Berakah items and ${magicworldFiles.length} Magic World items.`);
