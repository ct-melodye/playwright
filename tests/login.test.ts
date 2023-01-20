import { LoginPage } from '../pages/login.page';

// login.test.ts
import { test, expect } from '@playwright/test';
test('Login using valid account', async ({ page }) => {
const loginpage = new LoginPage(page);
await loginpage.loginValidAccount();
await expect(loginpage.userInfo).toHaveCount(1);
});