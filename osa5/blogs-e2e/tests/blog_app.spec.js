const { test, expect, describe, beforeEach } = require('@playwright/test')
const { testLogin, testLogout, testCreateBlog, testCreateBlogs, getRandomInt, isInDescendingOrder } = require('./helper')

const testBlog = {
    title: 'playwright',
    author: 'author',
    url: 'url'
}

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/test/reset')
        await request.post('/api/users', {
            data: {
                username: 'jaa',
                name: 'juu',
                password: 'salasana'
            }
        })
        await request.post('/api/users', {
            data: {
                username: 'juu',
                name: 'jee',
                password: 'jep'
            }
        })

        await page.goto('')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByText('Login')).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await testLogin(page, 'jaa', 'salasana')

            await expect(page.getByText('jaa logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await testLogin(page, 'jaa', 'sana')

            await expect(page.getByText('Invalid username/password!')).toBeVisible()
        })
    })
    
    describe('logged in', () => {
        beforeEach(async ({ page }) => {
            await testLogin(page, 'jaa', 'salasana')
        })

        test('new blog can be created', async ({ page }) => {
            await testCreateBlog(page, testBlog)
            await expect(page.getByText(/playwright author/)).toBeVisible()
        })

        test('blog can be liked', async ({ page }) => {
            await testCreateBlog(page, testBlog)
            await page.getByRole('button', { name: 'show info' }).click()
            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText('likes 1')).toBeVisible()
        })

        test('blog can be deleted', async ({ page }) => {
            await testCreateBlog(page, testBlog)
            page.on('dialog', async (dialog) => await dialog.accept())
            await page.getByRole('button', { name: 'show info' }).click()
            await page.getByRole('button', { name: 'delete blog' }).click()
            await expect(page.getByText(/playwright author/)).not.toBeVisible()
        })

        test('user who did not create blog does not see the delete button', async ({ page }) => {
            await testCreateBlog(page, testBlog)
            await testLogout(page)
            await testLogin(page, 'juu', 'jep')
            await page.getByRole('button', { name: 'show info' }).click()
            await expect(page.getByRole('button', { name: 'delete blog' })).not.toBeVisible()
        })

        test('blogs are ordered by likes in descending order', async ({ page }) => {
            // Create four blogs for testing
            await testCreateBlogs(page)

            // For each created blog: open info, like max 10 times and hide info
            for (const row of await page.getByRole('button', { name: 'show info' }).all()){
                await row.click()

                let max = getRandomInt(10)

                for (let i = 0; i < max; i += 1) {
                    await page.getByRole('button', { name: 'like'}).click()
                }

                await page.getByRole('button', { name: 'hide info'}).click()
            }

            const likes = []

            for (const row of await page.getByRole('button', { name: 'show info' }).all()){
                await row.click()

                let amount = parseInt(await page.getByTestId('blog-like').textContent())
                likes.push(amount)

                await page.getByRole('button', { name: 'hide info'}).click()
            }

            expect(isInDescendingOrder(likes)).toBeTruthy()
        })
    })
})