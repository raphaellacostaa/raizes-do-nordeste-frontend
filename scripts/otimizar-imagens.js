/* Baixa as fotos do cardápio, reduz e converte para WebP em assets/img/.
 * Uso:  npm install  &&  npm run imagens
 * Se algum download falhar (o site bloqueia), salve a foto manualmente em
 * assets/img-original/<id>.jpg (ou .png/.webp) e rode o comando de novo.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'assets', 'img');
const origDir = path.join(root, 'assets', 'img-original');
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(origDir, { recursive: true });

const FOTOS = [
  ['hero', 'https://revistadeguste.com/wp-content/uploads/2025/12/Rico-em-sabores-regionais-o-Cafe-Nordestino-e-servido-com-cuscuz-carne-de-sol-na-nata-ovos-mexidos-tapioca-queijo-coalho-e-bolo-de-coco-scaled-e1766579979303.jpg'],
  ['tapioca-carne', 'https://media-cdn.tripadvisor.com/media/photo-s/0a/67/35/c2/tapioca-de-carne-de-sol.jpg'],
  ['cuscuz-ovos', 'https://media.licdn.com/dms/image/v2/D4D12AQFOaws7jAOYug/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1705430491841?e=2147483647&t=UQyUPDyHIikt9i2d7BJbioBdeH1Deuimz6nfI54asN8&v=beta'],
  ['bolo-macaxeira', 'https://uploads.folhavitoria.com.br/2025/09/Como-fazer-bolo-de-mandioca-molhadinho-que-nunca-seca-e-dura-dias-sem-perder-sabor.webp'],
  ['cafe-coado', 'https://lavaive.com/wp-content/uploads/2022/06/Color-del-cafe-filtrado-y-su-parecido-con-el-color-de-un-vino-tinto.-scaled.jpg'],
  ['suco-caja', 'https://thumb-cdn.soluall.net/prod/shp_products/sp1280fw/fe774d96-08e9-4d6d-b12c-ac00649f6e84/61b0eff9-1b38-45b9-8689-660bac1e09ff.jpg'],
  ['tapioca-queijo', 'https://media-cdn.tripadvisor.com/media/photo-s/14/79/77/ed/tapioca-com-queijo-coalho.jpg'],
  ['cuscuz-completo', 'https://www.tnh1.com.br/media/_versions/2022/05/carroc%CC%A7a2-1024x576-1_widexl.jpeg'],
  ['combo-manha', 'https://lirp.cdn-website.com/686c7aa5/dms3rep/multi/opt/cafe%2B%283%29-762h.jpg'],
  ['cartola', 'https://irp.cdn-website.com/33406c6e/dms3rep/multi/cartola.jpg'],
  ['bolo-rolo', 'https://www.dicasonline.com/wp-content/uploads/bolo-de-rolo-pernambucano.jpg'],
  ['agua-coco', 'https://imagenes.eltiempo.com/files/image_600_455/uploads/2023/09/26/65138729482a3.jpeg'],
  ['tapioca-banana', 'https://static.wixstatic.com/media/e015d9_32d50cf5ab264885a7e491f9c90e59ef~mv2.jpg/v1/fill/w_980%2Ch_654%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/mel.jpg']
];

function localOriginal(id) {
  for (const ext of ['jpg', 'jpeg', 'png', 'webp', 'avif']) {
    const file = path.join(origDir, id + '.' + ext);
    if (fs.existsSync(file)) return file;
  }
  return null;
}

async function obter(id, url) {
  const local = localOriginal(id);
  if (local) return fs.readFileSync(local);
  const resp = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36', Accept: 'image/*' } });
  if (!resp.ok) throw new Error('HTTP ' + resp.status);
  return Buffer.from(await resp.arrayBuffer());
}

(async () => {
  let ok = 0; const falhas = []; let antes = 0; let depois = 0;
  for (const [id, url] of FOTOS) {
    try {
      const buf = await obter(id, url);
      const largura = id === 'hero' ? 1200 : 720;
      const out = await sharp(buf).rotate().resize({ width: largura, withoutEnlargement: true }).webp({ quality: id === 'hero' ? 68 : 70 }).toBuffer();
      fs.writeFileSync(path.join(outDir, id + '.webp'), out);
      antes += buf.length; depois += out.length; ok++;
      console.log('OK    ' + id.padEnd(16) + Math.round(buf.length / 1024) + ' KB -> ' + Math.round(out.length / 1024) + ' KB');
    } catch (e) {
      falhas.push(id); console.log('FALHA ' + id.padEnd(16) + e.message);
    }
  }
  console.log('\n' + ok + '/' + FOTOS.length + ' imagens geradas. Total: ' + Math.round(antes / 1024) + ' KB -> ' + Math.round(depois / 1024) + ' KB');
  if (falhas.length) console.log('Salve manualmente em assets/img-original/<id>.jpg: ' + falhas.join(', '));
  process.exit(falhas.length ? 1 : 0);
})();
