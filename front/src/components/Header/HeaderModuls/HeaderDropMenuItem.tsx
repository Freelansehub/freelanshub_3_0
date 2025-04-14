import { HTMLAttributes } from "react";

export type headerDropMenuItemType = {
    url: string;
    title: string;
    description: string;
    icon: string;
}

type HeaderDropMenuItemPropsType = HTMLAttributes<HTMLElement> & {
    menuItem: headerDropMenuItemType;
}

export function HeaderDropMenuItem({ menuItem, ...props }: HeaderDropMenuItemPropsType) {
    return (
        <div {...props} className="d-flex align-items-start py-2 px-3">
            <a href={menuItem.url} className="d-flex align-items-center text-decoration-none">
                <img 
                    src={menuItem.icon} 
                    alt={menuItem.title} 
                    className="me-2" 
                    style={{ width: "24px", height: "24px" }} 
                />
                <span className="fw-bold">{menuItem.title}</span>
            </a>
            <p className="text-muted small mb-0 ms-4">{menuItem.description}</p>
        </div>
    );
}
