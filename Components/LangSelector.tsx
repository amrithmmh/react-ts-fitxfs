import React from "react";
import { Store } from "../System/Stores";

import Select, { ActionMeta, OptionTypeBase } from "react-select";

interface LanguageOption {
  name: string;
  id: string | number;
}

interface SelectButtonProps {
  onSelect: (user: LanguageOption) => void;
  languageOptions: LanguageOption[];
  stateId: string;
}

const users: LanguageOption[] = [
  {
    name: "English",
    id: 1,
  },
  {
    name: "Italian",
    id: 2,
  },
  {
    name: "French",
    id: 3,
  },
  {
    name: "German",
    id: 4,
  },
  {
    name: "Spanish",
    id: 5,
  },
  {
    name: "Japanese",
    id: 6,
  },
  {
    name: "Hebrew",
    id: 7,
  },
  {
    name: "Korean",
    id: 8,
  },
  {
    name: "Turkish",
    id: 9,
  },
  {
    name: "Urdu",
    id: 10,
  },
  {
    name: "Chinese",
    id: 11,
  },
  {
    name: "Tagalog",
    id: 12,
  },
  {
    name: "Bahasa",
    id: 13,
  },
];

const SelectUserButton: React.FunctionComponent<SelectButtonProps> = ({
  onSelect,
  languageOptions,
  stateId,
}) => {
  const options: OptionTypeBase[] = languageOptions.map(
    (user: LanguageOption) => ({
      label: user.name,
      value: user.id,
    })
  );

  const handleChange = (
    option: OptionTypeBase,
    meta: ActionMeta<any>
  ): void => {
    console.log({ option, meta });
    onSelect({
      name: option.label,
      id: option.value,
    });
  };

  return (
    <div className="select__user">
      <Select
        name="user"
        options={options}
        onChange={handleChange}
        maxMenuHeight={120}
        placeholder={stateId}
        defaultValue={options[0]}
      />
    </div>
  );
};

export default function LangSelector() {
  const stateId = "Select any language";

  return (
    <SelectUserButton
      stateId={stateId}
      languageOptions={users}
      onSelect={(user) => {
        console.log("you have selected user " + user.name);
        //const val :string = user.name;
        Store.setLanguage(user.name);
      }}
    />
  );
}
