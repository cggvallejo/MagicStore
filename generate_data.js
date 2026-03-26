import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const berakahDir = path.join(__dirname, 'public', 'images', 'berakah');
const magicworldDir = path.join(__dirname, 'public', 'images', 'magicworld');

const getJpgFiles = (dir) => {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));
};

const berakahFiles = getJpgFiles(berakahDir);
const magicworldFiles = getJpgFiles(magicworldDir);

const generateData = (files, brandFolder, defaultPrice, titlePrefix) => {
  return files.map((file, index) => ({
    id: index + 1,
    name: `${titlePrefix} ${index + 1}`,
    price: defaultPrice,
    image: `/images/${brandFolder}/${file}`
  }));
};

const berakahObj = generateData(berakahFiles, 'berakah', '$450 MXN', 'Bolso Artesanal');
const magicObj = generateData(magicworldFiles, 'magicworld', '$350 MXN', 'Artículo Magic World');

const content = `
export const berakahData = ${JSON.stringify(berakahObj, null, 2)};

export const magicWorldData = ${JSON.stringify(magicObj, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'src', 'data.js'), content);
console.log(\`Generated data.js with \${berakahFiles.length} Berakah items and \${magicworldFiles.length} Magic World items.\`);
