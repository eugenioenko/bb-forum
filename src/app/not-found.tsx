import { Login } from "@/components/login";
import { IconFileSad } from "@tabler/icons-react";

export default function LoginPage() {
  return (
    <div className="flex-grow flex-center">
      <div className=" p-4  font-normal flex items-center gap-2">
        <div className="hidden md:block">
          <IconFileSad size={192} />
        </div>
        <div className="flex-grow flex flex-col items-center">
          <div className="text-9xl">404</div>
          <div className="text-2xl">Page not found</div>
        </div>
      </div>
    </div>
  );
}
