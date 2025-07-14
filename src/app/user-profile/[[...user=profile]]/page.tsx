import { UserProfile } from "@clerk/nextjs";

export default function UserProfilePage() {
    return (
        <div className="flex justify-center items-cnter py-8">
            <UserProfile path="/user-profile"/>
        </div>
    )
}