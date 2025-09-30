import AlertDialog from "@/components/modified/dialog";

export default function TermsDialog() {
    return (
        <AlertDialog
            trigger={<a href="#" className="underline">Terms of Service</a>}
            title="Terms of Service"
            cancel={true}
        >
            <div className="space-y-4 max-h-96 overflow-y-auto text-black pr-10">
                <div>
                    Welcome to <strong>Nest Grocery</strong>! These Terms and Conditions govern your use of
                    our website and services. By accessing or using our platform, you agree to
                    comply with these Terms. If you do not agree, please do not use our services.
                </div>

                <h2 className="text-lg font-semibold">1. Eligibility</h2>
                <div>
                    To use our services, you must be at least 18 years old or have the consent of
                    a parent or guardian. By using our platform, you represent and warrant that
                    you meet these eligibility requirements.
                </div>

                <h2 className="text-lg font-semibold">2. Account Responsibilities</h2>
                <div>
                    You are responsible for maintaining the confidentiality of your account and
                    password and for restricting access to your device. You agree to accept
                    responsibility for all activities that occur under your account.
                </div>

                <h2 className="text-lg font-semibold">3. Orders & Payments</h2>
                <div>
                    By placing an order, you agree to provide accurate billing and shipping
                    information. All payments must be made through the accepted payment methods
                    listed on our platform.
                </div>

                <h2 className="text-lg font-semibold">4. Delivery</h2>
                <div>
                    We will make reasonable efforts to deliver your orders on time. However, we
                    are not liable for delays caused by unforeseen circumstances beyond our
                    control.
                </div>

                <h2 className="text-lg font-semibold">5. Returns & Refunds</h2>
                <div>
                    If you are unsatisfied with your order, please review our Return & Refund
                    Policy for details on how to request a return or refund.
                </div>

                <h2 className="text-lg font-semibold">6. Prohibited Use</h2>
                <div>
                    You agree not to misuse our services, including attempting to disrupt our
                    platform, accessing other users&apos; accounts without permission, or engaging in
                    fraudulent activities.
                </div>

                <h2 className="text-lg font-semibold">7. Limitation of Liability</h2>
                <div>
                    Nest Grocery will not be liable for any indirect, incidental, or
                    consequential damages resulting from your use of our services.
                </div>

                <h2 className="text-lg font-semibold">8. Changes to Terms</h2>
                <div>
                    We may update these Terms from time to time. Continued use of our services
                    after changes constitutes your acceptance of the new Terms.
                </div>

                <h2 className="text-lg font-semibold">9. Contact Us</h2>
                <div>
                    If you have any questions about these Terms, please contact us at
                    <span className="font-medium"> support@nestgrocery.com</span>.
                </div>
            </div>
        </AlertDialog>
    )
}
