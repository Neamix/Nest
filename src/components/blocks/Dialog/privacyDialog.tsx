import AlertDialog from "@/components/modified/dialog";

export default function PrivacyDialog() {
    return (
        <AlertDialog
            trigger={<a href="#" className="underline">Privacy Policy</a>}
            title="Privacy Policy"
            cancel={true}
        >
            <div className="space-y-4 max-h-96 overflow-y-auto text-black pr-10">
                <div>
                    At <strong>Nest Grocery</strong>, your privacy is very important to us. This
                    Privacy Policy explains how we collect, use, disclose, and protect your
                    personal information when you use our website and services.
                </div>

                <h2 className="text-lg font-semibold">1. Information We Collect</h2>
                <div>
                    We may collect personal information such as your name, email address, phone
                    number, billing and shipping information, and payment details when you use
                    our services. We also collect non-personal information like device data and
                    browsing activity.
                </div>

                <h2 className="text-lg font-semibold">2. How We Use Your Information</h2>
                <div>
                    We use the information we collect to process orders, deliver products,
                    improve our services, personalize your experience, send important updates,
                    and comply with legal obligations.
                </div>

                <h2 className="text-lg font-semibold">3. Sharing Your Information</h2>
                <div>
                    We do not sell your personal information. However, we may share it with
                    trusted third-party service providers (such as payment processors or
                    delivery partners) who help us operate our business. We may also disclose
                    information if required by law.
                </div>

                <h2 className="text-lg font-semibold">4. Data Security</h2>
                <div>
                    We take reasonable measures to protect your information from unauthorized
                    access, disclosure, alteration, or destruction. However, no method of
                    transmission over the internet is completely secure.
                </div>

                <h2 className="text-lg font-semibold">5. Cookies & Tracking</h2>
                <div>
                    Our website may use cookies and similar technologies to enhance your
                    browsing experience, analyze traffic, and remember your preferences. You can
                    manage or disable cookies through your browser settings.
                </div>

                <h2 className="text-lg font-semibold">6. Your Rights</h2>
                <div>
                    You have the right to access, update, or delete your personal information.
                    You may also opt out of receiving promotional emails at any time by
                    following the unsubscribe instructions provided in the message.
                </div>

                <h2 className="text-lg font-semibold">7. Children&apos;s Privacy</h2>
                <div>
                    Our services are not directed to children under the age of 13. We do not
                    knowingly collect personal information from children. If we become aware
                    that we have collected such information, we will delete it promptly.
                </div>

                <h2 className="text-lg font-semibold">8. Changes to This Policy</h2>
                <div>
                    We may update this Privacy Policy from time to time. Any changes will be
                    posted on this page with an updated revision date. Continued use of our
                    services after changes indicates your acceptance of the updated policy.
                </div>

                <h2 className="text-lg font-semibold">9. Contact Us</h2>
                <div>
                    If you have any questions or concerns about this Privacy Policy, please
                    contact us at
                    <span className="font-medium"> support@nestgrocery.com</span>.
                </div>
            </div>
        </AlertDialog>
    )
}
