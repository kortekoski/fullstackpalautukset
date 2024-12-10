const testLogin = async (page, username, password) => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)

    await page.getByRole('button', { name: 'Log in' }).click()
}

const testLogout = async (page) => {
    await page.getByRole('button', { name: 'Log out'}).click()
}

const testCreateBlog = async (page, content) => {
    await page.getByRole('button', { name: 'create blog' }).click()

    await page.getByTestId('title').fill(content.title)
    await page.getByTestId('author').fill(content.author)
    await page.getByTestId('url').fill(content.url)

    await page.getByRole('button', { name: 'Post' }).click()
}

const testCreateBlogs = async (page) => {
    const testBlogs = [
        { title: 'test1', author: 'testauthor', url: 'url1' },
        { title: 'test2', author: 'testauthor', url: 'url2' },
        { title: 'test3', author: 'testauthor', url: 'url3' },
        { title: 'test4', author: 'testauthor', url: 'url4' }
    ]

    for (const blog of testBlogs) {
        await testCreateBlog(page, blog)
    }
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
}

const isInDescendingOrder = (array) => {
    const reducer = (isOrdered, currentNumber, currentIndex, numbers) => {
        if (!isOrdered) {
            return false
        }
        if (currentIndex === 0) {
            return true
        }
        return currentNumber <= numbers[currentIndex - 1]
    }

    return array.reduce(reducer, true)
}

export { testLogin, testLogout, testCreateBlog, testCreateBlogs, getRandomInt, isInDescendingOrder }