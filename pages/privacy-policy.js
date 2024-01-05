import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";

function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - [Your Site's Name]</title>
        <meta
          name="description"
          content="Privacy Policy for [Your Site's Name], outlining how we collect, use, and protect your personal information."
        />
      </Head>{" "}
      <div className="bg-white min-h-screen">
        <Header />
        <div className="max-w-[1200px] mx-auto px-4 py-10 md:py-24">
          <h2 className="font-bold text-darkPurple text-4xl md:text-[48px] md:leading-[125%] mb-4">
            Privacy Policy
          </h2>
          <p className="text-lg text-neutral-500 mb-6">Last Updated: [Date]</p>

          <p className="text-lg text-neutral-500 mb-6">
            At [Your Site's Name], we take your privacy seriously. This Privacy
            Policy document outlines the types of personal information received
            and collected by [Your Site's Name] and how it is used.
          </p>

          <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
          <p className="text-lg text-neutral-500 mb-6">
            We collect information you provide directly to us when you [describe
            actions where data is collected, e.g., sign up for an account,
            interact with our services, etc.]. This may include:
          </p>
          <ul className="list-disc text-lg text-neutral-500 pl-6 mb-6">
            <li>Name, email address, and other contact information.</li>
            <li>
              Profile information such as username, bio, and profile picture.
            </li>
            {/* Add other types of collected information */}
          </ul>

          <h2 className="text-2xl font-bold mb-4">Use of Information</h2>
          <p className="text-lg text-neutral-500 mb-6">
            We may use the information collected for purposes including, but not
            limited to:
          </p>
          <ul className="list-disc pl-6 mb-6 text-lg text-neutral-500">
            <li>Providing, maintaining, and improving our services.</li>
            <li>Communicating with you about updates, news, and promotions.</li>
            {/* Add other purposes of information use */}
          </ul>

          <h2 className="text-2xl font-bold mb-4">Sharing of Information</h2>
          <p className="text-lg text-neutral-500">
            We may share your information in the following situations:
          </p>
          <ul className="list-disc pl-6 mb-6 text-lg text-neutral-500">
            <li>
              With third-party service providers assisting us in providing and
              improving our services.
            </li>
            <li>When required by law or to protect our rights.</li>
            {/* Add other scenarios of information sharing */}
          </ul>

          <h2 className="text-2xl font-bold mb-4">Security</h2>
          <p className="text-lg text-neutral-500 mb-6">
            We take appropriate measures to secure your personal information,
            but please be aware that no method of transmission over the internet
            or electronic storage is 100% secure.
          </p>

          {/* Add other sections as needed based on your site's policies */}

          <p className="text-lg text-neutral-500 mb-6">
            For further details about our Privacy Policy or to inquire about
            your personal information, please contact us at [contact email or
            link to contact page].
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default PrivacyPolicy;
