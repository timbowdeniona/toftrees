export function formatPersonName(name?: string): string {
  if (!name) return 'Unknown';
  
  const trimmed = name.trim();
  if (!trimmed) return 'Unknown';
  
  if (trimmed.includes(',')) {
    return trimmed;
  }
  
  const parts = trimmed.split(/\s+/);
  if (parts.length > 1) {
    const surname = parts[0];
    const forenames = parts.slice(1).join(' ');
    return `${surname}, ${forenames}`;
  }
  
  return trimmed;
}

