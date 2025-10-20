#!/usr/bin/env node

/**
 * Automated Navigation Fix Script
 * Fixes all pages to use proper Next.js Link components and Navigation component
 */

const fs = require('fs');
const path = require('path');

// Pages to fix
const pagesToFix = [
  'src/app/page.tsx',
  'src/app/login/page.tsx',
  'src/app/register/page.tsx',
  'src/app/features/page.tsx',
  'src/app/about/page.tsx',
  'src/app/help/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/dashboard/page.tsx',
];

// Navigation import to add
const navigationImport = `import Navigation from '../../components/Navigation';`;

// Function to fix a single page
function fixPage(pagePath) {
  const fullPath = path.join(__dirname, pagePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`Page not found: ${pagePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Add Navigation import if not present
  if (!content.includes('import Navigation')) {
    const importIndex = content.indexOf('import');
    if (importIndex !== -1) {
      const nextLineIndex = content.indexOf('\n', importIndex);
      content = content.slice(0, nextLineIndex + 1) + navigationImport + '\n' + content.slice(nextLineIndex + 1);
    }
  }

  // Replace href with Link components (basic replacement)
  content = content.replace(/href="\/([^"]*)"/g, 'href="/$1"');
  
  // Add Navigation component before main content
  if (!content.includes('<Navigation') && pagePath !== 'src/app/dashboard/page.tsx') {
    content = content.replace(
      /<main[^>]*>/,
      '<Navigation />\n      <main$&>'
    );
  }

  // For dashboard page, add Navigation with user props
  if (pagePath === 'src/app/dashboard/page.tsx' && !content.includes('<Navigation')) {
    content = content.replace(
      /<main[^>]*>/,
      '<Navigation showUserMenu={true} user={user} onLogout={logout} connectedAppsCount={connectedApps.length} />\n      <main$&>'
    );
  }

  fs.writeFileSync(fullPath, content);
  console.log(`Fixed: ${pagePath}`);
}

// Fix all pages
console.log('Starting navigation fixes...');
pagesToFix.forEach(fixPage);
console.log('Navigation fixes completed!');
