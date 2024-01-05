import React, { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import faqData from "../data/faqData.json";

export default function About() {
  const [accordion, setAccordion] = useState({});

  const toggleAccordion = (index) => {
    setAccordion({ ...accordion, [index]: !accordion[index] });
  };

  return (
    <>
      <Head>
        {/* Meta Tags */}
        {/* ... (Meta tags as previously shown) ... */}
      </Head>
      <div className="bg-white min-h-screen">
        <Header />
        <div className="max-w-[1200px] mx-auto px-4 py-10 md:py-24">
          <h2 className="mb-4 font-bold text-darkPurple text-4xl md:text-[48px] md:leading-[125%]">
            About [Your Site's Name]
          </h2>
          <p className="text-lg text-neutral-500 mb-8">
            Welcome to [Your Site's Name], the ultimate photo-sharing platform
            designed for enhanced visibility on social media!
          </p>

          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-neutral-500 mb-8">
            At [Your Site's Name], our mission is to simplify the
            photography-sharing experience. Our platform empowers users to
            effortlessly create and share their visual stories.
          </p>

          <h2 className="text-2xl font-bold mb-4">What Sets Us Apart</h2>
          <ul className="list-disc pl-6 mb-8 text-lg text-neutral-500">
            <li>
              Photography Focus: Unlike traditional link-sharing services, we
              prioritize the beauty and impact of visual storytelling through
              photos.
            </li>
            <li>
              Customization: Personalize your profile with themes, layouts, and
              aesthetics that reflect your unique style.
            </li>
            <li>
              Intuitive Interface: Our user-friendly interface ensures easy
              navigation and optimal accessibility for creators and viewers
              alike.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-neutral-500 mb-4">
            Profile Creation: Sign up and create your profile within minutes.
            Upload your favorite photos and organize them into customizable
            grids.
          </p>
          <p className="text-lg text-neutral-500 mb-4">
            Easy Sharing: Share your profile link across social media,
            portfolios, or any online space to effortlessly showcase your visual
            content.
          </p>
          <p className="text-lg text-neutral-500 mb-8">
            Discovery and Connection: Explore a diverse range of creators and
            their stunning visual narratives. Follow, engage, and get inspired!
          </p>

          <h2 className="text-2xl font-bold mb-4">
            FAQ (Frequently Asked Questions)
          </h2>
          <div className="mb-8">
            {faqData.map((item, index) => (
              <div className="border-b border-gray-300" key={index}>
                <button
                  className="flex items-center justify-between w-full py-4 focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <p className="text-lg text-neutral-500 font-bold text-left">
                    {item.question}
                  </p>
                  <svg
                    className={`ml-4 h-6 w-6 transition-transform ${
                      accordion[index] ? "transform rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {accordion[index] && (
                  <p className="text-lg text-neutral-500 mb-4 ml-4">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Contact Details */}
          <p className="text-lg text-neutral-500 mb-8">
            For any queries or support, reach out to our dedicated support team
            at{" "}
            <a href="mailto:support@yoursite.com" className="text-blue-500">
              support@yoursite.com
            </a>
            .
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
}
