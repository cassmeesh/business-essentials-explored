#!/usr/bin/env node

/**
 * SCORM Package Builder
 * 
 * This script builds the React app and packages it as a SCORM 1.2 compliant ZIP file.
 * 
 * Usage:
 *   node scripts/build-scorm.js
 * 
 * Output:
 *   dist/scorm-package.zip
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if archiver is available, provide instructions if not
try {
  require.resolve('archiver');
} catch (e) {
  console.log('\n📦 First-time setup: Installing archiver package...\n');
  execSync('npm install archiver --save-dev', { stdio: 'inherit' });
}

const archiver = require('archiver');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const OUTPUT_FILE = path.join(DIST_DIR, 'scorm-package.zip');
const MANIFEST_SOURCE = path.join(__dirname, '..', 'public', 'imsmanifest.xml');

async function buildScormPackage() {
  console.log('🚀 Building SCORM Package...\n');

  // Step 1: Build the React app
  console.log('📦 Step 1: Building React application...');
  try {
    execSync('npm run build', { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
  } catch (error) {
    console.error('❌ Build failed!');
    process.exit(1);
  }

  // Step 2: Verify the manifest file exists
  console.log('\n📋 Step 2: Verifying SCORM manifest...');
  if (!fs.existsSync(MANIFEST_SOURCE)) {
    console.error('❌ imsmanifest.xml not found in public folder!');
    process.exit(1);
  }
  console.log('✅ Manifest found');

  // Step 3: Create the SCORM ZIP package
  console.log('\n📦 Step 3: Creating SCORM package...');
  
  // Remove existing package if it exists
  if (fs.existsSync(OUTPUT_FILE)) {
    fs.unlinkSync(OUTPUT_FILE);
  }

  const output = fs.createWriteStream(OUTPUT_FILE);
  const archive = archiver('zip', {
    zlib: { level: 9 } // Maximum compression
  });

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      const sizeMB = (archive.pointer() / 1024 / 1024).toFixed(2);
      console.log(`\n✅ SCORM package created successfully!`);
      console.log(`📁 Location: ${OUTPUT_FILE}`);
      console.log(`📊 Size: ${sizeMB} MB`);
      console.log(`\n📤 Upload this ZIP file to your LMS to deploy the course.`);
      resolve();
    });

    archive.on('error', (err) => {
      console.error('❌ Error creating ZIP:', err);
      reject(err);
    });

    archive.pipe(output);

    // Add all files from dist folder (except the zip itself)
    const distFiles = fs.readdirSync(DIST_DIR);
    distFiles.forEach(file => {
      if (file !== 'scorm-package.zip') {
        const filePath = path.join(DIST_DIR, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          archive.directory(filePath, file);
        } else {
          archive.file(filePath, { name: file });
        }
      }
    });

    // imsmanifest.xml should already be in dist from public folder copy during build
    // But let's ensure it's at the root level
    if (!fs.existsSync(path.join(DIST_DIR, 'imsmanifest.xml'))) {
      archive.file(MANIFEST_SOURCE, { name: 'imsmanifest.xml' });
    }

    archive.finalize();
  });
}

buildScormPackage().catch(console.error);
