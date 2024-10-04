import { bbfAdminEmail, bbfName } from "@/environment";

export default async function PrivacyPage() {
  const effectiveDate = "11/11/2024";

  return (
    <div className="card mt-4">
      <div className="bg-secondary font-header text-inverse px-4 py-2">
        Privacy
      </div>
      <div className="px-4 pt-2 pb-12 paragraph">
        <h1>Privacy Policy</h1>
        <p>Effective Date: {effectiveDate}</p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to {bbfName}! Your privacy is important to us. This Privacy
          Policy explains how we collect, use, and protect your personal
          information when you use our bulletin board forum (the “Service”).
        </p>
        <p>
          By accessing or using our Service, you agree to the collection and use
          of information in accordance with this policy. If you do not agree to
          this Privacy Policy, please do not use the Service.
        </p>

        <h2>2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>
            <strong>Personal Information</strong>: When you register for an
            account, we may collect information such as your name, email
            address, and any other details you provide voluntarily.
          </li>
          <li>
            <strong>Usage Data</strong>: We collect information about how you
            interact with the forum, including your IP address, browser type,
            and activity on the site (e.g., posts, comments, and visits).
          </li>
          <li>
            <strong>Cookies</strong>: We may use cookies and similar tracking
            technologies to monitor activity on our forum and store certain
            information for functional purposes, such as keeping you logged in.
          </li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We may use the information collected to:</p>
        <ul>
          <li>Provide, operate, and maintain our forum</li>
          <li>
            Allow you to participate in discussions, post content, and interact
            with other users
          </li>
          <li>Notify you about important changes or updates to our Service</li>
          <li>Improve our platform and tailor content to user preferences</li>
          <li>Monitor forum usage and maintain security</li>
        </ul>

        <h2>4. Sharing Your Information</h2>
        <p>
          We will not sell or share your personal information with third
          parties, except in the following cases:
        </p>
        <ul>
          <li>
            <strong>Service Providers</strong>: We may share your data with
            trusted service providers who help us operate the forum (e.g.,
            hosting providers) and are bound by confidentiality agreements.
          </li>
          <li>
            <strong>Legal Requirements</strong>: We may disclose your
            information if required by law or in response to valid requests by
            public authorities (e.g., law enforcement).
          </li>
        </ul>

        <h2>5. Security of Your Information</h2>
        <p>
          We take reasonable precautions to protect your personal information.
          However, no method of transmission over the internet or electronic
          storage is completely secure. We cannot guarantee the absolute
          security of your information.
        </p>

        <h2>6. Your Choices</h2>
        <p>You have the following options regarding your personal data:</p>
        <ul>
          <li>
            <strong>Account Information</strong>: You can update, correct, or
            delete your personal information through your account settings.
          </li>
          <li>
            <strong>Cookies</strong>: You can modify your browser settings to
            decline cookies if you prefer. However, some parts of the Service
            may not function properly without them.
          </li>
        </ul>

        <h2>7. Links to Other Websites</h2>
        <p>
          Our forum may contain links to other websites that are not operated by
          us. We are not responsible for the privacy practices of those
          websites, so we encourage you to review their privacy policies.
        </p>

        <h2>8. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any significant changes by posting the new Privacy Policy on
          this page with an updated &quot;Effective Date.&quot;
        </p>

        <h2>9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at {bbfAdminEmail}.
        </p>
      </div>
    </div>
  );
}
