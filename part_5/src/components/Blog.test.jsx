import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('When blog is rendered...', async () => {
  const blog = {
    title: 'Testikirja',
    url: 'www.testikirja.fi',
    author: 'Panu Ruusunen',
    user: { name: 'Panu', username: 'Panu' },
  };
  const handleLike = vi.fn();
  beforeEach(() => {
    render(<Blog blog={blog} handleLike={handleLike} />);
  });
  test('...and show is not pressed, show blog title.', () => {
    screen.getByText('Testikirja');
  });
  test('...and show is not pressed, URL, author and adder is not shown.', () => {
    const url = screen.queryByText('www.testikirja.fi');
    expect(url).toBeNull();
    const author = screen.queryByText('Panu Ruusunen');
    expect(author).toBeNull();
    const adder = screen.queryByText('Panu');
    expect(adder).toBeNull();
  });
  test('...and show is pressed, URL, author and adder is shown.', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('Show');
    await user.click(button);
    screen.getByText('www.testikirja.fi', { exact: false });
    screen.getByText('Panu Ruusunen', { exact: false });
    screen.getByText('Panu', { exact: false });
  });
  test('...and like is pressed, the proper function is called.', async () => {
    const user = userEvent.setup();
    const show = screen.getByText('Show');
    await user.click(show);
    const like = screen.getByText('Like');
    await user.click(like);
    await user.click(like);
    expect(handleLike.mock.calls).toHaveLength(2);
  });
});
