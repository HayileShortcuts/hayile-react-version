import { useTranslations } from "@/i18n/utils";
import { SearchIcon } from "./icons";
import { atom } from "nanostores";

export const userSearchValue = atom<string | undefined>(undefined);

export function Searchbar({ lang }) {
  const t = useTranslations(lang);
  const handleSearch = (searchTerm: string) => {
    console.log(searchTerm);
    return userSearchValue.set(searchTerm);
  };

  return (
    <form
      class={
        "flex flex-row justify-between w-auto h-auto rounded p-4 shadow-md bg-gray-100 mb-6 items-center"
      }
    >
      <SearchIcon />
      <input
        onInput={function (e) {
          handleSearch(e.currentTarget.value);
        }}
        onBlur={function (e) {
          handleSearch(e.currentTarget.value);
        }}
        class="flex w-full bg-transparent text-gray-700/90 pl-4 pr-4 border-transparent outline-none"
        placeholder={t("placeholder.searchbar")}
      />
    </form>
  );
}
