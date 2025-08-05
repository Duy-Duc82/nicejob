const fs = require('fs');
const path = require('path');
const { ObjectId } = require('bson');

const controllersDir = path.join(__dirname, '../');
const createdBy = {
  _id: '680b6f9c52d64f6920662702',
  email: 'duongducduy825@gmail.com',
};

const permissionArr = [];

function scanControllers(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanControllers(fullPath);
    } else if (file.endsWith('.controller.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const controllerMatch = content.match(/@Controller\(['"`](.*?)['"`]\)/);
      const basePath = controllerMatch ? controllerMatch[1] : '';
      const methodRegex = /@(Get|Post|Patch|Delete)\(['"`]?(.*?)['"`]?\)/g;
      let match;
      while ((match = methodRegex.exec(content)) !== null) {
        const method = match[1].toUpperCase();
        const subPath = match[2] || '';
        // Tìm @ResponseMessage ngay sau method
        const afterMethod = content.slice(methodRegex.lastIndex);
        const responseMessageMatch = afterMethod.match(
          /@ResponseMessage\(['"`](.*?)['"`]\)/,
        );
        let name = `${method} ${basePath}${subPath ? '/' + subPath : ''}`;
        if (responseMessageMatch) {
          name = responseMessageMatch[1];
        }
        permissionArr.push({
          _id: new ObjectId().toString(),
          name,
          apiPath: `/api/v1${`/${basePath}${
            subPath ? '/' + subPath : ''
          }`.replace(/\/+/g, '/')}`,
          method,
          module: basePath.toUpperCase(),
          createdBy,
          isDeleted: false,
          deletedAt: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          __v: 0,
        });
      }
    }
  });
}

scanControllers(controllersDir);

fs.writeFileSync(
  path.join(__dirname, 'init-permissions.json'),
  JSON.stringify(permissionArr, null, 2),
);

console.log('Generated permissions:', permissionArr.length);
