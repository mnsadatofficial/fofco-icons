const webfont = require('webfont').default;
const fs = require('fs');
const path = require('path');

// dist ফোল্ডার না থাকলে তৈরি করবে
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)){
    fs.mkdirSync(distDir);
}

// ফন্ট জেনারেট করার ম্যাজিক
webfont({
    files: 'src/svgs/**/*.svg',
    fontName: 'FofcoIcons',
    formats: ['woff2'],
    ligatures: true, // <fof>home</fof> এর জন্য লিগেচার চালু করা হলো
    normalize: true
})
.then((result) => {
    // ফন্ট ফাইল সেভ করা
    fs.writeFileSync(path.join(distDir, 'FofcoIcons.woff2'), result.woff2);
    
    // CSS ফাইল জেনারেট করা
    const cssContent = `
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
}`;
    
    fs.writeFileSync(path.join(distDir, 'fof.css'), cssContent);
    console.log('✅ Success! FOFco Icons and CSS are ready in the "dist" folder.');
})
.catch((error) => {
    console.error('❌ Error generating font:', error);
});