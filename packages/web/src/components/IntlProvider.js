import { IntlContext } from "@hooks/intl-context";

export default function IntlProvider({
  children,
  locale = "en",
  ...contextValues
}) {

  return (
    <IntlContext.Provider value={{ ...contextValues, locale }}>
      {children}
    </IntlContext.Provider>
  );
}
