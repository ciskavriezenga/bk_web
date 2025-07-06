export async function getCount(): Promise<number> {
  const response = await fetch('/api/count');
  const data = await response.json();
  return data.count;
}

export async function incrementCount(): Promise<number> {
  const response = await fetch('/api/count', {
    method: 'POST',
  });
  const data = await response.json();
  return data.count;
}