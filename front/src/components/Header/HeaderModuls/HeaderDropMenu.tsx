import { HTMLAttributes } from "react";
import { HeaderDropMenuItem, headerDropMenuItemType } from "./HeaderDropMenuItem";

type HeaderMenuPropsType = HTMLAttributes<HTMLElement> & {
    menuList: headerDropMenuItemType[];
}

export function HeaderDropMenu({ menuList, ...props }: HeaderMenuPropsType) {
    return (
        <div className="container">
            <div className="container w-100 p-2">
                {menuList.map((item, index) => (
                    <HeaderDropMenuItem
                        menuItem={item}
                        key={index}
                        className="dropdown-item"
                    />
                ))}
            </div>
        </div>
    );
}
