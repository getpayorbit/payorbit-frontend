"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { capitalizeWords, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getUserDisplayName, useAuthStore } from "@/lib/stores/auth-store";
import { toast } from "sonner";
import Logo from "@/components/ui/logo";
import { routes } from "@/lib/utils/routes";

interface DashboardHeaderProps {
	onMenuClick?: () => void;
	sidebarOpen?: boolean;
}

export function DashboardHeader({
	onMenuClick,
	sidebarOpen,
}: DashboardHeaderProps) {
	const { user, logout } = useAuthStore();
	const router = useRouter();
	const pathname = usePathname();

	const pageTitle = (() => {
		if (pathname === routes.dashboardRoutes.OVERVIEW) return "Overview";
		const segment = pathname.split("/").pop() ?? "";
		return (
			segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
		);
	})();

	const displayName = getUserDisplayName(user);
	const userInitial = displayName.charAt(0).toUpperCase() || "U";

	const handleLogout = async () => {
		await logout();
		toast.success("Signed out successfully", {
			description: "See you next time!",
		});
		router.push(routes.authRoutes.SIGN_IN);
	};

	return (
		<div className="sticky top-0 z-40">
			<header className="border-b border-[#e8eaf0] bg-white shadow-[0_1px_12px_rgba(85,1,255,0.06)]">
				<div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 md:h-16">
					<div className="flex items-center gap-3 max-md:justify-between max-md:w-full max-md:mx-auto">
						<Logo />

						<Button
							variant="ghost"
							size="icon"
							onClick={onMenuClick}
							className="h-9 w-9 shrink-0 md:hidden"
							aria-label="Toggle sidebar"
						>
							<Menu
								className={cn(
									"h-5 w-5 transition-transform duration-200",
									sidebarOpen && "rotate-90",
								)}
							/>
						</Button>

						<div className="hidden items-center gap-3 md:flex">
							<div className="h-4 w-px bg-[#e8eaf0]" />
							<span className="text-sm font-medium text-[#1f1f1f]/45">
								{pageTitle}
							</span>
						</div>
					</div>

					<div className="flex items-center gap-2 sm:gap-3">
						{user?.role_name && (
							<span className="hidden rounded-full bg-[#5501ff]/8 px-3 py-1 text-xs font-semibold text-[#5501ff] sm:inline-flex">
								{user.role_name}
							</span>
						)}

						<div className="hidden items-center gap-2.5 sm:flex">
							<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5501ff]/10 ring-1 ring-[#5501ff]/20">
								<span className="text-xs font-bold text-[#5501ff]">
									{userInitial}
								</span>
							</div>
							<div className="text-right leading-tight">
								<p className="text-sm font-semibold text-[#0d0020]">
									{capitalizeWords(displayName)}
								</p>
								<p className="text-[11px] text-[#1f1f1f]/40">{user?.email}</p>
							</div>
						</div>

						<div className="h-5 w-px bg-[#e8eaf0] hidden sm:block" />

						<Button
							variant="ghost"
							size="sm"
							onClick={handleLogout}
							className="gap-1.5 text-[#1f1f1f]/45 transition-colors hover:bg-red-50 hover:text-red-500"
						>
							<LogOut className="h-4 w-4" />
							<span className="hidden text-xs sm:inline">Sign out</span>
						</Button>
					</div>
				</div>
			</header>
			{/* Brand gradient stripe */}
			<div className="h-[2px] w-full bg-gradient-to-r from-[#5501ff] via-[#ff00a6] to-[#00ffbb]" />
		</div>
	);
}
