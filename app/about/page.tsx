import React from 'react'

export default function AboutPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">About AI Shopping Assistant</h1>
      <div className="prose max-w-none">
        <p>
          Welcome to AI Shopping Assistant, your intelligent companion for a seamless shopping experience. Our platform combines cutting-edge AI technology with a vast product database to provide personalized recommendations and assistance.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Our Mission</h2>
        <p>
          We strive to revolutionize online shopping by leveraging artificial intelligence to understand your preferences, anticipate your needs, and offer tailored suggestions. Our goal is to make your shopping journey effortless, enjoyable, and rewarding.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">How It Works</h2>
        <p>
          Our AI-powered chatbot is at the heart of your shopping experience. Simply start a conversation, tell us what you're looking for, and let our intelligent assistant guide you to the perfect products. Whether you need help finding a specific item, comparing options, or discovering new products that match your taste, we're here to help.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Contact Us</h2>
        <p>
          If you have any questions, suggestions, or feedback, we'd love to hear from you. Reach out to our customer support team at support@aishoppingassistant.com or use the chat feature on our website.
        </p>
      </div>
    </div>
  )
}