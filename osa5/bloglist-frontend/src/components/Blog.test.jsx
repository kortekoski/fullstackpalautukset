import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const testUser = {
    username: 'test',
    name: 'tsete',
    id: '333111333'
}

const blog = {
    title: 'testblog',
    author: 'tester',
    url: 'testurl',
    likes: 100,
    user: {
        username: 'testboi',
        name: 'yee',
        id: '1337'
    }
}

const id = '313'

test('blog title is rendered', () => {
    render(<Blog id={id} blog={blog} sessionUser={testUser}/>)

    const element = screen.getByText('testblog', { exact: false })
    expect(element).toBeDefined()
})

test('url, likes and user are shown after clicking button', async () => {
    render(<Blog id={id} blog={blog} sessionUser={testUser}/>)

    const user = userEvent.setup()
    const button = screen.getByText('show info')
    await user.click(button)

    const url = screen.getByText(blog.url)
    const likes = screen.getByText('likes ' + blog.likes.toString())
    const username = screen.getByText(blog.user.username)

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
    expect(username).toBeDefined()
})

test('like handler is called twice when like button is pressed twice', async () => {
    const mockHandler = vi.fn()

    render(<Blog id={id} blog={blog} sessionUser={testUser} handleLike={mockHandler}/>)

    const user = userEvent.setup()
    await user.click(screen.getByText('show info'))
    await user.click(screen.getByText('like'))
    await user.click(screen.getByText('like'))

    expect(mockHandler).toHaveBeenCalledTimes(2)
})