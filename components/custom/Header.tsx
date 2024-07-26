import Link from "next/link";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/custom/LogoutButton";
import { Logo } from "./Logo";

interface AuthUserProps {
    username: string;
    email: string;
}


export function LoggedInUser({ userData }: { readonly userData: AuthUserProps }) {
    return (
        <div className="flex gap-2">
            <Link
                href="/dashboard/account"
                className="font-semibold hover:text-primary"
            >
                {userData.username}
            </Link>
            <LogoutButton />
        </div>
    );
}

interface HeaderProps {
    data: {
        logoText: {
            id: number;
            text: string;
            url: string;
        };
        ctaButton: {
            id: number;
            text: string;
            url: string;
        };
    };
}

export async function Header() {
    const user = await getUserMeLoader();
    console.log(user);

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
            <Logo text={'LMS'} />
            <div className="flex items-center gap-4">
                {user.ok ? (
                    <LoggedInUser userData={user.data} />
                ) : (
                    <>
                        <Link href="/sign-up">
                            <Button>{'Sign up'}</Button>
                        </Link>
                        <Link href="/sign-in">
                            <Button>{'Sign in'}</Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}