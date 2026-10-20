const webfont = require('webfont').default;
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)){
    fs.mkdirSync(distDir);
}

webfont({
    files: 'src/svgs/**/*.svg',
    fontName: 'FofcoIcons',
    formats: ['woff2'],
    ligatures: true,
    normalize: true
})
.then((result) => {
    fs.writeFileSync(path.join(distDir, 'FofcoIcons.woff2'), result.woff2);
    
    // তোমার ইউনিক সিগনেচার ও প্রিমিয়াম CSS
    const cssContent = `
/**
 * 
 *  ███████╗ ██████╗ ███████╗ ██████╗ ██████╗ 
 *  ██╔════╝██╔═══██╗██╔════╝██╔════╝██╔═══██╗
 *  █████╗  ██║   ██║█████╗  ██║     ██║   ██║
 *  ██╔══╝  ██║   ██║██╔══╝  ██║     ██║   ██║
 *  ██║     ╚██████╔╝██║     ╚██████╗╚██████╔╝
 *  ╚═╝      ╚═════╝ ╚═╝      ╚═════╝ ╚═════╝ 
 * 
 *  FOFco Icons - An Icon Library
 *  Created by: M. N. Sadat
 *  Version: 1.0.0
 * 
 */

:root {
    --fof-primary-color: inherit;
    --fof-base-size: 24px;
    --fof-transition-speed: 0.3s;
}

@font-face {
    font-family: 'FofcoIcons';
    src: url('./FofcoIcons.woff2') format('woff2');
}

fof {
    font-family: 'FofcoIcons' !important;
    font-weight: normal;
    font-style: normal;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-feature-settings: 'liga';
    
    /* Default Styling */
    color: var(--fof-primary-color);
    font-size: var(--fof-base-size);
    transition: all var(--fof-transition-speed) ease;
}

/* =========================================
   FOFco Unique Utilities (Sizes & Effects)
   ========================================= */

/* Sizes */
fof.fof-sm { font-size: 16px; }
fof.fof-md { font-size: 32px; }
fof.fof-lg { font-size: 48px; }
fof.fof-xl { font-size: 64px; }

/* Animations */
fof.fof-spin {
    animation: fof-spin 2s infinite linear;
}
fof.fof-pulse {
    animation: fof-spin 1s infinite steps(8);
}
fof.fof-beat {
    animation: fof-beat 1.5s infinite ease-in-out;
}

/* Hover Effects */
fof.fof-hover-grow:hover { transform: scale(1.2); }
fof.fof-hover-color:hover { color: #ff5722; }

@keyframes fof-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(359deg); }
}

@keyframes fof-beat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
}
`;
    
    fs.writeFileSync(path.join(distDir, 'fof.css'), cssContent);

    fs.writeFileSync(path.join(distDir, 'fof.css'), cssContent);
    
  
    const svgsDir = path.join(__dirname, 'src', 'svgs');
    const files = fs.readdirSync(svgsDir);
    const iconNames = files
        .filter(file => file.endsWith('.svg'))
        .map(file => file.replace('.svg', ''));
    
    fs.writeFileSync(path.join(distDir, 'icons.json'), JSON.stringify(iconNames));
    // -----------------------------------------

    console.log('✅ Premium FOFco CSS and JSON generated!');
    console.log('✅ Premium FOFco CSS with signature generated!');
})
.catch((error) => {
    console.error('❌ Error generating font:', error);
});