import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavGroup, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [], groups = [] }: { items?: NavItem[]; groups?: NavGroup[] }) {
    const page = usePage();

    // If groups are provided, use them; otherwise, use items with default group
    const navGroups = groups.length > 0 ? groups : [{ title: 'Platform', items }];

    return (
        <>
            {navGroups.map((group) => (
                <SidebarGroup key={group.title} className="px-2 py-0">
                    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                    <SidebarMenu>
                        {group.items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </>
    );
}
