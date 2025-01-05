import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

interface Props {
  allTags: string[];
  onSelectTag: (tag: string) => void;
}

const DropDown = ({ allTags, onSelectTag }: Props) => {
    const [curTag, setCurTag] = useState("All tags");
    return (
        <Menu as="div" className="relative inline-block text-left">
        <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-green-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 transition-colors">
                {curTag}
            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-white" />
            </MenuButton>
        </div>
        <MenuItems className="absolute mt-2 w-56 max-h-64 overflow-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            {allTags.map((tag, index) => (
            <MenuItem key={index}>
                {({ active }) => (
                <button
                    className={`${
                    active ? "bg-green-100" : ""
                    } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                    onClick={() => {onSelectTag(tag); setCurTag(tag);}}
                >
                    {tag}
                </button>
                )}
            </MenuItem>
            ))}
        </MenuItems>
        </Menu>
    );
};

export default DropDown;
