import Image from "next/image";
import Link from "next/link";

const Logo = ({ className }: { className?: string }) => {
	return (
		<Link href="/" className={`flex items-center shrink-0 ${className ?? ""}`}>
			<Image
				alt="PayOrbit"
				src="/logo/Fulll Logo/SVG/FullLogoColor1.svg"
				height={36}
				width={140}
				className="h-9 w-auto object-contain"
				priority
			/>
		</Link>
	);
};

export default Logo;
