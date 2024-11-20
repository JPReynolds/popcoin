import Link from "next/link";

export function GlobalHeader() {
    return (
        <header className="p-2 flex flex-row items-center border-solid border-b-2">
            <h1 className="flex-1">
                <Link href="/">
                    JR Movies
                </Link>
            </h1>
        </header>
    );
}
