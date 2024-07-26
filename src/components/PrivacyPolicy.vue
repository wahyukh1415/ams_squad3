<script>
export default {
    name: "PrivacyPolicy",
};
</script>

<template>
    <!-- Modal -->
    <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                        Privacy & Policy
                    </h1>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <p>
                        Welcome to BidBuddy's Privacy Policy. Your privacy is of
                        utmost importance to us, and we are committed to
                        protecting your personal information. This Privacy
                        Policy explains how we collect, use, and share your
                        information.
                    </p>
                    <p>
                        <strong>1. Information We Collect:</strong> We collect
                        information that you provide directly to us, such as
                        when you register, create an auction, place a bid, or
                        contact customer support. This includes your name, email
                        address, phone number, and payment information.
                    </p>
                    <p>
                        <strong>2. Use of Information:</strong> We use your
                        information to provide, maintain, and improve our
                        services, including to process transactions, manage
                        accounts, and provide customer support. We may also use
                        your information to communicate with you about updates,
                        offers, and promotions.
                    </p>
                    <p>
                        <strong>3. Sharing of Information:</strong> We do not
                        share your personal information with third parties
                        except as necessary to provide our services, comply with
                        the law, or protect our rights. This includes sharing
                        information with payment processors and fraud prevention
                        services.
                    </p>
                    <p>
                        <strong>4. Data Security:</strong> We implement a
                        variety of security measures to protect your personal
                        information. These measures include encryption, access
                        controls, and regular security assessments.
                    </p>
                    <p>
                        <strong>5. Your Rights:</strong> You have the right to
                        access, correct, or delete your personal information.
                        You may also object to the processing of your
                        information or request that we restrict its processing.
                        To exercise these rights, please contact our support
                        team.
                    </p>
                    <p>
                        <strong>6. Cookies:</strong> We use cookies and similar
                        technologies to collect information about your use of
                        our services. This information helps us to improve our
                        services and deliver a better user experience.
                    </p>
                    <p>
                        <strong>7. Changes to this Policy:</strong> We may
                        update this Privacy Policy from time to time. If we make
                        significant changes, we will notify you by email or
                        through our services. Your continued use of our services
                        after the changes become effective means you accept the
                        updated policy.
                    </p>
                    <p>
                        <strong>8. Contact Us:</strong> If you have any
                        questions about this Privacy Policy, please contact us
                        at privacy@bidbuddy.com.
                    </p>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-title {
    font-weight: 900;
    font-size: 20px;
    line-height: 24px;
    color: #343a40;
}
.modal-body {
    max-height: 400px;
    overflow-y: auto;
}
</style>