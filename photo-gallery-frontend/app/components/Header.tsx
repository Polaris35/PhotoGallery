import Link from "next/link";
import ThemeToggle from "@/app/components/ThemeToggle";

type props = {
    // onLogin(): boolean;
    // onLogOut(): boolean;
};
export default function Header(props:props) {
    return <header>
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <div className="navbar bg-base-100">
                    <div className="flex-none">
                        <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1">
                        <a className="btn btn-ghost normal-case text-xl">PhotoGallery</a>
                    </div>
                    <ThemeToggle/>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li><Link href="/">Main Page</Link></li>
                    {/*<li><Link href={"#"}>Sidebar Item 2</Link></li>*/}

                </ul>
            </div>
        </div>
    </header>

}