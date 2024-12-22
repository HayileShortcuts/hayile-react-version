import { useTranslations } from "@/i18n/utils";

interface Props {
  command: string;
  description: string;
  additionalCommand?: string;
  lang?: "en" | "es";
}

const Key = ({ word }) => {
  const isEmptyString: boolean = word === "/";
  const style: string = isEmptyString
    ? "flex ml-4 mt-4 p-3 bg-transparent text-black text-lg"
    : "flex ml-4 mt-4 p-3 bg-white text-black text-lg rounded shadow-md drop-shadow-sm";
  return <p class={style}>{word}</p>;
};
export function Shortcut(props: Props) {
  const { command, description, additionalCommand, lang } = props;
  const splittedString: string = command;
  const splittedAdditionalString: string = additionalCommand ?? "";

  const t = useTranslations(lang);

  return (
    <div
      class="grid-cols-2 row-gap-2 bg-gray-200/50 p-4 m-4 mx-0 rounded"
      id="shortcut-container"
    >
      <h5 class="text-base text-purple-950">{description}</h5>
      <div class="flex flex-col">
        <div class="flex flex-row">
          {splittedString.split(" ").map((word) => (
            <Key word={word} />
          ))}
        </div>
        <div className="flex mt-3 gap-1 items-baseline">
          {additionalCommand && (
            <p class="text-lg text-white-950/75">{t("section.additional")}</p>
          )}
          {additionalCommand && (
            <span class="flex flex-row">
              {splittedAdditionalString.split(" ").map((word) => (
                <Key word={word} />
              ))}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
