// Copyright (C) 2022  Aranggi J. Toar <at@aranggitoar.com>
// Full GPL-2.0 notice  https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt

import { fireEvent, render } from 'solid-testing-library';
import Chapter from 'components/SelectorBlock/Chapter';
import setupStore from 'tests/setup';

describe('<Chapter />', () => {
  setupStore();
  test('renders', () => {
    const { container, unmount } = render(() => <Chapter />);
    expect(container.innerHTML).toContain('28');
    unmount();
  });

  test('updates', () => {
    const { unmount, getByRole } = render(() => <Chapter />);
    fireEvent.change(getByRole('combobox') as Element, {
      target: { value: '14' },
    });
    expect((getByRole('option', { name: '15' }) as HTMLOptionElement).selected).toBe(
      true
    );
    unmount();
  });
});
