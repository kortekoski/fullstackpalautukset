import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

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

test('blog creation form calls prop function with correct information when blog is created', async () => {
    const user = userEvent.setup()

    const createBlog = vi.fn()

    const { container } = render(<BlogForm handleBlogForm={createBlog}/>)

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    const submitButton = container.querySelector('#submit-button')

    await user.type(titleInput, 'test title')
    await user.type(authorInput, 'test author')
    await user.type(urlInput, 'test url')
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toBe('test title')
    expect(createBlog.mock.calls[0][1]).toBe('test author')
    expect(createBlog.mock.calls[0][2]).toBe('test url')
})