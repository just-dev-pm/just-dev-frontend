"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IMenuItem {
  children: React.ReactNode;
  href: string;
}

/**
 *
 * @param children
 * @param href 菜单项指向的物理路径
 * @returns 被 Link 组件包裹的 children
 */
export default function MenuItem({ children, href }: IMenuItem) {
  const pathname: string = usePathname();
  /**
   * /projects 属于个人空间
   * /projects/:any* 属于项目空间
   * 因此区别
   */
  const isActive =
    pathname.startsWith(href) &&
    (pathname.startsWith("/projects")
      ? pathname == "/projects"
        ? href == pathname
        : href != "/projects"
      : true);
  return (
    <li>
      <Link
        className={cn(
          "block hover:bg-white dark:hover:bg-zinc-700 rounded-md text-muted-foreground hover:text-foreground p-1.5 px-4",
          isActive &&
            "bg-primary hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground text-primary-foreground"
        )}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}
