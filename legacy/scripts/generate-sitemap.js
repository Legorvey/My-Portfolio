const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://adityac.dev';
const IGNORE_FILES = ['404.html', 'project-template.html', 'footer.html'];
const DIRECTORIES = ['.', 'projects'];

function generateSitemap() {
  let urls = [];

  DIRECTORIES.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(dirPath)) return;
    
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
      if (path.extname(file) === '.html' && !IGNORE_FILES.includes(file)) {
        let route = dir === '.' ? `/${file}` : `/${dir}/${file}`;
        
        // Clean URL mapping matching vercel.json
        route = route.replace(/\.html$/, '');
        if (route === '/index') {
            route = '/';
        }
        
        urls.push(`${BASE_URL}${route}`);
      }
    });
  });

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>\n    <loc>${url}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${url === BASE_URL + '/' ? '1.0' : '0.8'}</priority>\n  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, '..', 'sitemap.xml'), sitemapContent);
  console.log('sitemap.xml generated successfully!');
}

generateSitemap();
