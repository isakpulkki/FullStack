import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBlog from './NewBlog';
import Blog from './Blog';

test('When a blog is created, the callback function has a proper blog.', async () => {
  const user = userEvent.setup();
  const createBlog = vi.fn();

  const { container } = render(<NewBlog createBlog={createBlog} />);
  const title = container.querySelector('#title');
  const author = container.querySelector('#author');
  const url = container.querySelector('#url');
  const sendButton = screen.getByText('Add');
  await user.type(title, 'Testikirja');
  await user.type(url, 'www.testikirja.fi');
  await user.type(author, 'Panu Ruusunen');
  await user.click(sendButton);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('Testikirja');
  expect(createBlog.mock.calls[0][0].url).toBe('www.testikirja.fi');
  expect(createBlog.mock.calls[0][0].author).toBe('Panu Ruusunen');
});
