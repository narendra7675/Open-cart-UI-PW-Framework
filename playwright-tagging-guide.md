# Run tests with specific tag

npx playwright test --grep @smoke

# Run multiple tags (OR condition)

npx playwright test --grep "@smoke|@critical"

# Run tests with ALL tags (AND condition)

npx playwright test --grep "(?=._@smoke)(?=._@critical)"

# Exclude specific tags

npx playwright test --grep-invert @slow

# Combine include and exclude

npx playwright test --grep @smoke --grep-invert @flaky

Advanced Filtering
Tests tagged with smoke OR critical
npx playwright test --grep "@smoke|@critical"

# Tests tagged with smoke AND NOT slow

npx playwright test --grep @smoke --grep-invert @slow

# Tests with multiple required tags

npx playwright test --grep "(?=._@smoke)(?=._@api)"

Package.json
json{
"scripts": {
"test:smoke": "playwright test --grep @smoke",
"test:regression": "playwright test --grep @regression",
"test:critical": "playwright test --grep @critical",
"test:no-flaky": "playwright test --grep-invert @flaky"
}
}

Example
import { test, expect } from '@playwright/test';

test.describe('@smoke Login Module', () => {
test('@critical Valid login', async ({ page }) => {
await page.goto('/login');
await page.fill('#username', 'admin');
await page.fill('#password', 'password');
await page.click('#login-btn');
await expect(page).toHaveURL('/dashboard');
});

test('@slow @flaky SSO login', async ({ page }) => {
// Slow test code
});
});

Run it:
npx playwright test --grep "@smoke" --grep-invert "@flaky"

# This will run all smoke tests except the flaky ones

Common Tag Patterns
typescript@smoke // Quick sanity tests
@regression // Full regression suite
@critical // Business-critical tests
@slow // Long-running tests
@flaky // Known unstable tests
@api // API tests
@ui // UI tests
@auth // Authentication tests
@p0, @p1 // Priority levels
