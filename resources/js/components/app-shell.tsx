import React from 'react';
import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { BreadcrumbItem, NavGroup, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import {
    Package,
    ShoppingCart,
    Users,
    FolderOpen,
    BarChart3,
    Home,
} from 'lucide-react';

interface AppShellProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    variant?: 'header' | 'sidebar';
}

function AppShell({ children, breadcrumbs, variant = 'sidebar' }: AppShellProps) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    // Handle different variants for compatibility with existing layouts
    if (variant === 'header') {
        return <div className="flex min-h-screen w-full flex-col">{children}</div>;
    }

    // Define ERP navigation items
    const erpNavGroups: NavGroup[] = [
        {
            title: 'Dashboard',
            items: [
                {
                    title: 'Overview',
                    href: '/dashboard',
                    icon: Home,
                },
            ],
        },
        {
            title: 'Inventory',
            items: [
                {
                    title: 'Products',
                    href: '/products',
                    icon: Package,
                },
                {
                    title: 'Categories',
                    href: '/categories',
                    icon: FolderOpen,
                },
            ],
        },
        {
            title: 'Sales',
            items: [
                {
                    title: 'Orders',
                    href: '/orders',
                    icon: ShoppingCart,
                },
                {
                    title: 'Analytics',
                    href: '/analytics',
                    icon: BarChart3,
                },
            ],
        },
        {
            title: 'Management',
            items: [
                {
                    title: 'Users',
                    href: '/users',
                    icon: Users,
                },
            ],
        },
    ];

    return (
        <SidebarProvider defaultOpen={isOpen}>
            <AppSidebar navGroups={erpNavGroups} />
            <SidebarInset>
                <AppHeader />
                <AppContent>
                    {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
                    {children}
                </AppContent>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default AppShell;
export { AppShell };