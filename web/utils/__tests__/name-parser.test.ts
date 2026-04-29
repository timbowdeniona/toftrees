import { formatPersonName } from '../name-parser';

describe('formatPersonName', () => {
  it('should format "SURNAME forenames" to "SURNAME, forenames"', () => {
    expect(formatPersonName('WOOD Alice Ellen')).toBe('WOOD, Alice Ellen');
    expect(formatPersonName('BAKER Shirley Olive C')).toBe('BAKER, Shirley Olive C');
    expect(formatPersonName('JOHNSON Caroline M. T.')).toBe('JOHNSON, Caroline M. T.');
  });

  it('should treat the first word as surname (Approach A)', () => {
    expect(formatPersonName('DE GREY John')).toBe('DE, GREY John');
  });

  it('should return the name as is if it already contains a comma', () => {
    expect(formatPersonName('WOOD, Alice Ellen')).toBe('WOOD, Alice Ellen');
  });

  it('should return just the surname if no forename is provided', () => {
    expect(formatPersonName('WOOD')).toBe('WOOD');
  });

  it('should return "Unknown" for empty or undefined names', () => {
    expect(formatPersonName('')).toBe('Unknown');
    expect(formatPersonName(undefined)).toBe('Unknown');
  });
});
