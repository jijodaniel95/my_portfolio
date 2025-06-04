import fs from 'fs';
import { createCanvas } from 'canvas';

// Create a 512x512 canvas
const canvas = createCanvas(512, 512);
const ctx = canvas.getContext('2d');

// Create gradient background
const gradient = ctx.createLinearGradient(0, 0, 512, 512);
gradient.addColorStop(0, '#3B82F6');    // Blue
gradient.addColorStop(0.5, '#8B5CF6');  // Purple
gradient.addColorStop(1, '#EC4899');    // Pink

// Draw rounded rectangle with gradient
ctx.beginPath();
ctx.roundRect(0, 0, 512, 512, 128);
ctx.fillStyle = gradient;
ctx.fill();

// Add text
ctx.fillStyle = 'white';
ctx.font = 'bold 240px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('JD', 256, 280);

// Create public directory if it doesn't exist
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

// Save to file
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('public/logo.png', buffer); 