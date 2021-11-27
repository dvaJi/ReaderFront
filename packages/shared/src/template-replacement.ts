export const templateReplacement = (
  template: string,
  data: Record<string, string>
) => {
  const pattern = /{\s*(\w+?)\s*}/g;
  return template.replace(pattern, (_, token) => data[token] || '');
};
