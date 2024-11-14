export const UrlReplace = (key: string, value: any) => {
  const params = new URLSearchParams(window.location.search);
  params.set(key, value); // Replace or add 'key=newValue'
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${params.toString()}`
  );
};
