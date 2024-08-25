import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png"
import { Button } from "./ui/button";
export default function Navbar() {
  return (
    <header className="shadow-sm ">
      <nav className="max-w-5xl m-auto py-5 px-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
            <Image
                src={logo}
                width={40}
                height={40}
                alt="logo"
            />
            <span className="text-xl font-bold tracking-tight">Career Bridge</span>
        </Link>
        <Button asChild className="bg-white p-2 text-black outline font-bold hover:text-white">
            <Link href="/alumni">Connect with Alumni</Link>
        </Button>
        <Button asChild >
            <Link href="/jobs/new">Post a Job</Link>
        </Button>
      </nav>
    </header>
  )
}
