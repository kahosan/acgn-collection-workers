export async function fetcher<T>(url: string, options?: RequestInit) {
  const res = await fetch(url, options);

  try {
    const data = res.headers.get('content-type')?.includes('application/json')
      ? await res.json()
      : await res.text();

    if (!res.ok)
      throw new Error(`Fetch ${url} failed`);

    return data as T;
  } catch (error) {
    if (error instanceof SyntaxError)
      throw new Error(`Failed to parse JSON body: ${error.message}`);

    throw error;
  }
}
