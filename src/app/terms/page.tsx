import { bbfAdminEmail, bbfName } from "@/environment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${bbfName} • Terms & Conditions`,
};

export default async function TermsPage() {
  const effectiveDate = "11/11/2024";

  return (
    <div className="card mt-4" data-test-id="terms-page">
      <div className="card-header">Terms & Conditions</div>
      <div className="px-4 pt-2 pb-12 paragraph">
        <h1>Terms of Service</h1>
        <p>Effective Date: {effectiveDate}]</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using {bbfName} (the &quot;Service&quot;), you agree
          to comply with and be bound by these Terms of Service. If you do not
          agree to these terms, you should not use the Service.
        </p>

        <h2>2. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms of Service at any time. Any
          changes will be posted on this page with the updated &quot;Effective
          Date.&quot; Continued use of the Service after any such changes shall
          constitute your consent to those changes.
        </p>

        <h2>3. User Conduct</h2>
        <p>As a user of the Service, you agree to the following:</p>
        <ul>
          <li>
            You will not post any unlawful, harmful, defamatory, or obscene
            content.
          </li>
          <li>You will not harass, threaten, or abuse other users.</li>
          <li>
            You will not engage in any activity that interferes with or disrupts
            the Service.
          </li>
          <li>
            You will not use the Service to distribute spam, viruses, or
            malicious code.
          </li>
          <li>
            You are responsible for all content that you post or share on the
            forum.
          </li>
        </ul>

        <h2>4. Account Responsibilities</h2>
        <p>When you create an account on {bbfName}, you agree to:</p>
        <ul>
          <li>
            Provide accurate and complete information during registration.
          </li>
          <li>
            Maintain the security of your account and notify us immediately if
            you suspect any unauthorized use.
          </li>
          <li>
            Be responsible for any activity that occurs under your account.
          </li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>
          All content on the Service, including text, images, and software, is
          the intellectual property of {bbfName} or its licensors. You may not
          reproduce, distribute, or create derivative works from any content
          without our express permission.
        </p>

        <h2>6. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to the
          Service at any time, with or without cause, and without prior notice.
          In the event of termination, your right to use the Service will
          immediately cease.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, {bbfName} shall not be liable
          for any damages resulting from your use or inability to use the
          Service, including but not limited to, indirect, incidental, punitive,
          or consequential damages.
        </p>

        <h2>8. Disclaimer</h2>
        <p>
          The Service is provided on an &quot;as is&quot; and &quot;as
          available&quot; basis. We make no warranties, express or implied,
          regarding the reliability, accuracy, or availability of the Service.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have any questions about these Terms of Service, please contact
          us at {bbfAdminEmail}.
        </p>
      </div>
    </div>
  );
}
