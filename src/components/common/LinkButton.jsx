import { ArrowRight, SkipForward } from "lucide-react";
import Link from "next/link";

const LinkButton = ({href,title,className,skip}) => {
  return (
    <Link
      className={`w-80 h-12 rounded-[50px] text-white flex items-center justify-center gap-x-2  py-3  bg-dark-brown  text-xl font-semibold tracking-wide text-center
      ${className}
      `}
      href={href}
    >
      {title}
      {skip ? <SkipForward size={24}  /> : <ArrowRight size={ 24} />}
    </Link>
  );
};

export default LinkButton;
