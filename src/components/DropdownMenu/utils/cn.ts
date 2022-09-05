export const cn = (...parts: (undefined | string | Record<string, any>)[]) => {
  const filtered = parts.filter((p) => !!p) as (string | Record<string, any>)[];

  return filtered
    .map(
      (p) => typeof p === 'string'
        ? p
        : Object.keys(p).map((pKey) => p[pKey] ? pKey : '').join(' ')
    ).join(' ');
};
