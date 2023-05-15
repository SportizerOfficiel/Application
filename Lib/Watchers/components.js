const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

// const watcher = chokidar.watch('src/DesignSystem/*/*', { ignored: /node_modules/ });

// watcher
//   .on('addDir', (dirPath) => {
//     const componentName = path.basename(dirPath);
//     const componentPath = path.join(dirPath, componentName);
//     const reactComponentPath = path.join(componentPath, `${componentName}.jsx`);
//     const scssFilePath = path.join(componentPath, `${componentName}.scss`);

//     if (
//       componentName !== 'atoms' &&
//       componentName !== 'molecules' &&
//       componentName !== 'organisms' &&
//       !fs.existsSync(reactComponentPath) &&
//       !fs.existsSync(scssFilePath)
//     ) {
//       const organismDirPath = path.join('src/DesignSystem/organisms', componentName);
//       const organismReactComponentPath = path.join(organismDirPath, `${componentName}.jsx`);
//       const organismScssFilePath = path.join(organismDirPath, `${componentName}.scss`);

//       if (!fs.existsSync(organismDirPath)) {
//         fs.mkdirSync(organismDirPath);

//         fs.writeFileSync(
//           organismReactComponentPath,
//           `import React from 'react';
// import './${componentName}.scss';

// const ${componentName} = () => {
//   return (
//     <div className="${componentName}">
//       {/* Contenu du composant */}
//     </div>
//   );
// };

// export default ${componentName};
// `
//         );

//         fs.writeFileSync(
//           organismScssFilePath,
//           `.${componentName} {
//   /* Styles du composant */
// }
// `
//         );

//         // Ajouter la référence du CSS dans le fichier index.scss
//         const indexFilePath = path.join('src/GlobalStyles', 'index.scss');
//         const cssReference = `@import '../DesignSystem/organisms/${componentName}/${componentName}.scss';\n`;

//         fs.appendFileSync(indexFilePath, cssReference);

//         console.log(`Le composant ${componentName} et le fichier SCSS ont été créés.`);
//       }
//     }
//   })
//   .on('error', (error) => {
//     console.error(`Erreur de surveillance : ${error}`);
//   });

// module.exports = watcher;
