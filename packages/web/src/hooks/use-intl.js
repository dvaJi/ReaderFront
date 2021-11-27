import useIntlContext from "./use-intl-context";
import { templateReplacement } from "@readerfront/shared/build/template-replacement";

const useIntl = () => {
  const { messages: dict = {}, locale } = useIntlContext();

  const formatFn = ({ id, defaultMessage, values }) => {
    if (dict[id]) {
      return values ? templateReplacement(dict[id], values) : dict[id];
    }

    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[useIntl] Missing translation for "${id}" in "${locale}" locale.`
      );
    }

    return values
      ? templateReplacement(defaultMessage, values)
      : defaultMessage;
  };

  return { f: formatFn, locale };
};

export default useIntl;
