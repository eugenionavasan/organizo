// utils.test.ts
import { handleMonthChange } from '../utils';

describe('handleMonthChange', () => {
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    mockRouter.push.mockClear();
  });

  it('should navigate to the previous month', () => {
    handleMonthChange('prev', 2023, 5, mockRouter as any);
    expect(mockRouter.push).toHaveBeenCalledWith('/calendar?year=2023&month=4');
  });

  it('should navigate to the next month', () => {
    handleMonthChange('next', 2023, 5, mockRouter as any);
    expect(mockRouter.push).toHaveBeenCalledWith('/calendar?year=2023&month=6');
  });

  it('should navigate to the previous year when in January', () => {
    handleMonthChange('prev', 2023, 1, mockRouter as any);
    expect(mockRouter.push).toHaveBeenCalledWith(
      '/calendar?year=2022&month=12'
    );
  });

  it('should navigate to the next year when in December', () => {
    handleMonthChange('next', 2023, 12, mockRouter as any);
    expect(mockRouter.push).toHaveBeenCalledWith('/calendar?year=2024&month=1');
  });
});
