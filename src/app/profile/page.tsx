import ProfileForm from "@/components/blocks/form/ProfileForm";

export default function ProfileInfoPage() {
    return (
        <>
            <div className="profile-info font-lato">
                <h1 className="text-2xl font-bold mb-2">Profile Information</h1>
                <p className="text-muted-foreground text-base">
                    Update your account profile information and email address.
                </p>
            </div>

            <div className="mt-6 grid">
                <ProfileForm />
            </div>
        </>
    )
}