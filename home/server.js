const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

http.createServer((req, res) => {
    let filePath = '.' + req.url;

    if (filePath === './') {
        filePath = './build/index.html'; // Servir o arquivo index.html na raiz
    } else if (!fs.existsSync(filePath)) {
        filePath = './build/index.html'; // Se o arquivo solicitado não existir, servir o arquivo index.html
    }

    const extname = path.extname(filePath);
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
    };

    const contentTypeHeader = contentType[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('404 Not Found');
            return;
        }

        res.writeHead(200, { 'Content-Type': contentTypeHeader });
        res.end(data);
    });
}).listen(PORT, () => console.log(`Server running on port ${PORT}`));
