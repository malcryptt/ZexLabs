import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

(async () => {
    console.log("Starting Vue/Vite dev server...");
    const vite = spawn('npm', ['run', 'dev'], { cwd: '/home/mal4crypt404/ZexLabs', shell: true });

    await new Promise(r => setTimeout(r, 4000));
    console.log("Server likely up. Launching puppeteer...");

    try {
        const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();

        page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.text()));
        page.on('pageerror', err => console.log('BROWSER_ERROR:', err.toString()));
        page.on('requestfailed', request => {
            console.log('BROWSER_REQUEST_FAILED:', request.url(), request.failure()?.errorText);
        });

        console.log("Navigating to http://localhost:5173/ ...");
        await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 15000 });

        console.log("Closing browser...");
        await browser.close();
    } catch (e) {
        console.error("Puppeteer Script Error:", e);
    }

    vite.kill();
    process.exit(0);
})();
