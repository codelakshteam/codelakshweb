import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { pageMetadata } from '@/lib/seo';

export const metadata = {
  ...pageMetadata({
    title: 'Privacy Policy | CodeLaksh',
    description:
      'Privacy Policy for CodeLaksh and CodeLaksh ERP: what information we collect, how we use it and how we protect it across our web, desktop, Android and iOS products.',
    path: '/privacy',
  }),
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'September 24, 2026';

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="legal-page">
          <div className="container">
            <div className="legal-header">
              <span className="section-subtitle">Legal</span>
              <h1>Privacy Policy</h1>
              <p>Last updated: {LAST_UPDATED}</p>
            </div>

            <div className="legal-content">
              <p>
                This Privacy Policy describes how CodeLaksh (&quot;CodeLaksh&quot;,
                &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects
                information when you use <strong>CodeLaksh ERP</strong>, our billing, invoicing,
                inventory and business management platform, available as a web application,
                Windows desktop application, and mobile application on Android and iOS
                (collectively, the &quot;App&quot; or the &quot;Service&quot;).
              </p>
              <p>
                By creating an account or using the App, you agree to the collection and use of
                information in accordance with this policy. If you do not agree with this policy,
                please do not use the App.
              </p>

              <h2>1. Who We Are</h2>
              <p>
                CodeLaksh is a software development company based in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra,
                India. CodeLaksh ERP is built for small and medium businesses (retail, kirana,
                clothing, medical, electronics, restaurant, and hospitality) to manage billing,
                inventory, customers, staff, and payments.
              </p>

              <h2>2. Information We Collect</h2>
              <h3>2.1 Information you provide to us</h3>
              <ul>
                <li>
                  <strong>Account &amp; business information:</strong> name, email address, phone
                  number, business/organization name, business category, and address provided
                  during sign-up or while managing your organization.
                </li>
                <li>
                  <strong>Business data you enter:</strong> invoices, bills, customer records,
                  supplier records, staff/employee records, inventory and product details
                  (including product photos you upload, e.g. for a restaurant menu), purchase
                  orders, and related business records you create while using the App.
                </li>
                <li>
                  <strong>Payment information:</strong> when you or your customers make payments
                  through the App, payments are processed by third-party payment gateways
                  (Razorpay and/or PhonePe). We receive confirmation of payment status and a
                  transaction reference; we do not collect or store full card, UPI PIN, or net
                  banking credentials on our servers.
                </li>
                <li>
                  <strong>Support communications:</strong> information you provide when you
                  contact us for support, such as your email address and the content of your
                  message.
                </li>
              </ul>

              <h3>2.2 Information collected automatically</h3>
              <ul>
                <li>
                  <strong>Device &amp; usage information:</strong> device type, operating system,
                  app version, a device identifier used to enforce your license&apos;s device
                  limits, and basic diagnostic/crash information.
                </li>
                <li>
                  <strong>License &amp; activation data:</strong> activation codes, license/plan
                  tier, seat count, and activation status, used to validate your subscription and
                  keep your account in sync across devices.
                </li>
                <li>
                  <strong>Log data:</strong> IP address, access times, and actions taken within
                  the App, used for security, fraud prevention, and troubleshooting.
                </li>
              </ul>

              <h3>2.3 Permissions requested on mobile</h3>
              <p>
                The CodeLaksh ERP mobile app requests the following device permissions, each used
                only for the stated purpose:
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Permission</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Camera</td>
                    <td>To scan product barcodes and to capture photos of products or menu items.</td>
                  </tr>
                  <tr>
                    <td>Photo library</td>
                    <td>To attach an existing photo to a product or restaurant menu item.</td>
                  </tr>
                  <tr>
                    <td>Storage</td>
                    <td>
                      To let you import/export data such as CSV catalogs and PDF invoices, and to
                      cache files needed for offline use.
                    </td>
                  </tr>
                  <tr>
                    <td>Internet / network state</td>
                    <td>
                      To sync your business data with our servers and check connectivity for
                      offline mode.
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>
                The App does not use the microphone to record or process audio; any microphone
                permission present in the Android package is required by a bundled library and is
                unused by our app functionality.
              </p>

              <h2>3. How We Use Your Information</h2>
              <ul>
                <li>To create and manage your account and organization.</li>
                <li>To provide core features: billing, invoicing, inventory, staff, and customer management.</li>
                <li>To process and confirm payments made through supported payment gateways.</li>
                <li>To sync your data securely across your web, desktop, and mobile devices.</li>
                <li>To enforce license activation, plan limits, and device restrictions tied to your subscription.</li>
                <li>To send you service-related notifications (e.g. approvals, low stock, renewal reminders).</li>
                <li>To provide customer support and respond to your requests.</li>
                <li>To detect, prevent, and address fraud, abuse, or security issues.</li>
                <li>To improve and maintain the reliability of the App.</li>
              </ul>

              <h2>4. How We Share Your Information</h2>
              <p>We do not sell your personal information. We share information only with:</p>
              <ul>
                <li>
                  <strong>Payment processors</strong> (Razorpay, PhonePe) to complete transactions
                  you initiate.
                </li>
                <li>
                  <strong>Cloud infrastructure and storage providers</strong> (e.g. AWS) that host
                  our servers and store uploaded files such as product/menu photos, under
                  contractual confidentiality obligations.
                </li>
                <li>
                  <strong>Other users within your organization</strong> that you or your admin
                  grant access to, based on the roles and permissions configured in the App.
                </li>
                <li>
                  <strong>Law enforcement or regulators</strong>, where required to comply with a
                  legal obligation, protect our rights, or prevent fraud or harm.
                </li>
                <li>
                  <strong>A successor entity</strong>, in the event of a merger, acquisition, or
                  sale of assets, subject to this policy or a policy at least as protective.
                </li>
              </ul>

              <h2>5. Data Storage &amp; Security</h2>
              <p>
                Your business data is stored on secured servers and is associated with your
                organization account. We use industry-standard measures such as encrypted
                connections (HTTPS/TLS) and access controls to protect your information. No method
                of transmission or storage is 100% secure, and while we work to protect your data
                we cannot guarantee absolute security.
              </p>
              <p>
                The desktop application may cache a local copy of your data to support offline
                use; this local data is synced back to your account when connectivity is
                restored.
              </p>

              <h2>6. Data Retention</h2>
              <p>
                We retain your account and business data for as long as your account is active or
                as needed to provide the Service. If you close your account, we will delete or
                anonymize your personal information within a reasonable period, unless we are
                required to retain it to comply with legal, tax, or accounting obligations, or to
                resolve disputes.
              </p>

              <h2>7. Your Rights &amp; Choices</h2>
              <ul>
                <li>You may access, correct, or update your account and business information at any time within the App.</li>
                <li>You may request a copy of your data or request deletion of your account by contacting us at the email below.</li>
                <li>You may withdraw device permissions (camera, photos, storage) at any time from your device settings; some features may not work without them.</li>
              </ul>

              <h2>8. Children&apos;s Privacy</h2>
              <p>
                CodeLaksh ERP is a business tool intended for use by business owners and staff. It
                is not directed at children under 18, and we do not knowingly collect personal
                information from children.
              </p>

              <h2>9. International Users</h2>
              <p>
                CodeLaksh ERP is operated from India. If you use the App from outside India, your
                information will be transferred to and processed in India, and may be transferred
                to other countries where our service providers operate.
              </p>

              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will update the &quot;Last
                updated&quot; date above when we do, and material changes will be communicated
                within the App or by email where appropriate.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or how we handle your data,
                please contact us at:
              </p>
              <p>
                <strong>CodeLaksh</strong>
                <br />
                Sangram Nagar, Chhatrapati Sambhajinagar (Aurangabad), Maharashtra, India
                <br />
                Email: <a href="mailto:codelaksh@gmail.com">codelaksh@gmail.com</a>
                <br />
                Phone: <a href="tel:+919834684866">+91-9834684866</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
