import { expect } from '@wdio/globals'
import LoginPage from '../pages/login.page.js'
import { $ } from '@wdio/globals'

describe('My Login application', () => {
    it('має дозволяти входити з правильними даними', async () => {
        await LoginPage.register(
            'ivan123',
            'securePassword!',
            'ivan@example.com',
            '0991234567',
            'Клієнт'
        );

        const successMessage = await $('#home-page'); 
        await expect(successMessage).toBeDisplayed();
    });

    it('має дозволяти входити з правильними даними', async () => {
        await LoginPage.login(
            'ivan@example.com',
            'securePassword!'
        );            

        const successMessage = await $('#home-page'); 
        await expect(successMessage).toBeDisplayed();
    });
})

