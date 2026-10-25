import type { Dictionary } from "./bg";

export const en: Dictionary = {
  nav: {
    items: [
      { label: "AI", href: "/ai" },
      { label: "Web & SEO", href: "/web" },
      { label: "Marketing", href: "/marketing" },
      { label: "Contact", href: "/contact" },
    ],
    cta: "Get in touch",
  },
  hero: {
    status: "Digital transformation for enterprises",
    line1: "We digitalize",
    line2: "enterprises with",
    accents: ["AI", "code", "ads"],
    sub: "The tech team every business deserves.",
    ctaPrimary: "Get in touch",
    ctaSecondary: "See services",
  },
  partners: {
    label: "Partnerships with leading platforms",
  },
  services: {
    heading: "Three disciplines. One system for digitalization.",
    intro:
      "We cover the full path of your digital transformation, from process automation to the customers who will use it.",
    explore: "Explore",
    items: [
      {
        id: "ai",
        index: "01",
        title: "AI & Automation",
        href: "/ai",
        desc: "We build AI systems that take over repetitive work and talk to your customers around the clock.",
        points: [
          "Process automation",
          "AI agents",
          "AI call center",
          "AI chatbots",
          "Team training",
          "AI visual content and apps",
        ],
      },
      {
        id: "web",
        index: "02",
        title: "Web development & SEO",
        href: "/web",
        desc: "Fast, measurable sites and stores that get found on Google and sell.",
        points: ["Corporate websites", "Online stores", "SEO optimization"],
      },
      {
        id: "marketing",
        index: "03",
        title: "Digital marketing",
        href: "/marketing",
        desc: "Paid advertising and presence wherever your customers are, across every channel.",
        points: [
          "Meta · Facebook & Instagram",
          "Google Ads",
          "TikTok",
          "Reddit · Discord",
          "X (Twitter)",
        ],
      },
    ],
  },
  about: {
    kicker: "Why TFM",
    heading: "A digitalization partner, not just a vendor.",
    body: "We do not ship isolated services, we ship results. We connect automation, technology and advertising into one system that keeps working for your business long after we hand it over.",
    cta: "Get in touch",
    metrics: [
      { value: 20, suffix: "+", label: "team of specialists" },
      { value: 130, suffix: "+", label: "projects delivered" },
      { value: 8, suffix: "", label: "years of experience" },
      { value: 60, suffix: "+", label: "happy clients" },
    ],
  },
  process: {
    kicker: "How we work",
    heading: "From analysis to scale, without the busywork.",
    steps: [
      {
        no: "01",
        title: "Analyze",
        desc: "We learn your processes, goals and bottlenecks in depth.",
      },
      {
        no: "02",
        title: "Strategize",
        desc: "We design a tailored solution with clear timelines and success metrics.",
      },
      {
        no: "03",
        title: "Build",
        desc: "We develop, integrate, train your team and launch.",
      },
      {
        no: "04",
        title: "Optimize",
        desc: "We measure real results, refine and scale what works.",
      },
    ],
  },
  testimonials: {
    kicker: "Trust",
    heading: "Businesses already working with us.",
    items: [
      {
        quote:
          "An exceptional team! They helped us bring our new products to market and reach the right customers. True professionals, thank you!",
        name: "Petko Ivanov",
        role: "Sales Director, Natura",
      },
      {
        quote:
          "Incredible work. They automated our orders and stock and save us hours of manual work every day. We are grateful for the precision and care!",
        name: "Dobrin Dobrev",
        role: "Owner, DIS Market",
      },
      {
        quote:
          "The training for our team was practical and inspiring. Our colleagues now use AI tools every day. Thank you for the patience and expertise!",
        name: "Zhulian Dimitrov",
        role: "Manager, RBL Group",
      },
      {
        quote:
          "A wonderful collaboration! Their marketing is measured and professional, and inquiries to the clinic grew noticeably. I recommend them wholeheartedly.",
        name: "Dr. Georgiev",
        role: "Spatz3",
      },
      {
        quote:
          "We are very happy! The AI call center handles calls at peak times and after hours, and not a single customer is left without an answer. A great team!",
        name: "Tanya Kostadinova",
        role: "Sales Director, Gut Expert",
      },
      {
        quote:
          "Thank you for the wonderful site! Fast, clean and easy to maintain, it presents our work exactly as we wanted. A real pleasure to work with them.",
        name: "Transmed Team",
        role: "Transmed",
      },
    ],
  },
  clients: {
    heading: "Clients who trust us",
  },
  finalCta: {
    heading: "Ready to digitalize your enterprise?",
    sub: "Tell us briefly about your business. We come back with concrete ideas within 24 hours.",
    cta: "Get in touch",
  },
  servicePages: {
    crossHeading: "Our other disciplines",
    crossCta: "Explore",
    soon: {
      tag: "Coming soon",
      title: "This page is being built.",
      body: "We are putting it together right now. In the meantime, reach us directly or explore the other disciplines.",
      back: "Back to home",
    },
    ai: {
      label: "Discipline 01 / 03",
      title: "AI that does real work.",
      intro:
        "We automate processes, build agents and assistants, and create visual content, so your business runs smarter, not harder.",
      cta: "Get in touch",
      items: [
        {
          icon: "automation",
          title: "Process automation",
          desc: "We connect your systems and remove manual work. Orders, invoices, reports and data entry happen on their own, without delay and without errors. Before we start, we map your processes and automate what eats the most time first, so the impact shows immediately.",
          benefits: [
            "Up to 70% less manual work",
            "No human error on repetitive tasks",
            "Integrates with your existing tools",
          ],
        },
        {
          icon: "agent",
          title: "AI agents",
          desc: "Autonomous agents that complete whole tasks for you: they research, process, decide and act on the rules you set. Unlike a plain script, an agent handles exceptions and works across several tools at once, while you keep control over every important decision.",
          benefits: [
            "Work around the clock, no breaks",
            "Handle complex multi-step tasks",
            "Adapt to your processes",
          ],
        },
        {
          icon: "call",
          title: "AI call center",
          desc: "A voice AI that answers the phone, handles questions, books meetings and routes calls in natural language, any time of day. It absorbs peaks and after-hours calls, hands complex cases to a human, and leaves you a full recording and summary of every conversation.",
          benefits: [
            "Zero missed calls",
            "Instant answers, no hold queue",
            "Eases the load on your team",
          ],
        },
        {
          icon: "chat",
          title: "AI chatbot",
          desc: "A chatbot for your site and social channels that answers customers, qualifies inquiries and sells while you sleep. We train it on your products, prices and FAQs, and when needed it hands the conversation to one of your staff without a break.",
          benefits: [
            "Instant answers around the clock",
            "More inquiries converted",
            "Trained on your business content",
          ],
        },
        {
          icon: "training",
          title: "Team training",
          desc: "We teach your team to use AI tools in their real work: hands-on, by role, with ready-to-use workflows. We start from each department's actual tasks and leave behind playbooks and templates, so the knowledge stays in the company after the training.",
          benefits: [
            "Hands-on workshops, not theory",
            "Materials tailored to your business",
            "Measurable productivity gains",
          ],
        },
        {
          icon: "visual",
          title: "AI visual content",
          desc: "We generate videos and images for ads, products and social channels: fast, consistent and without expensive productions. We keep one brand style, produce variants for testing across audiences, and deliver ready files for every format and platform.",
          benefits: [
            "Product visuals without a photoshoot",
            "Ad videos in days, not weeks",
            "Consistent brand style everywhere",
          ],
        },
        {
          icon: "apps",
          title: "AI app development",
          desc: "We build custom AI applications: from internal tools to customer products, integrated with your data. We start with a fast prototype, validate it with real users, and grow it into a secure, maintained solution in production.",
          benefits: [
            "Solutions tailored to your case",
            "Integration with your data and systems",
            "From prototype to production",
          ],
        },
      ],
    },
  },
  webPage: {
    label: "Discipline 02 / 03",
    title: "Sites that get found and sell.",
    intro:
      "We build fast corporate websites and online stores and optimize them for Google, so they attract the right customers and turn them into orders.",
    cta: "Get in touch",
    items: [
      {
        icon: "sites",
        title: "Corporate websites",
        desc: "We design and build corporate websites that build trust and lead the visitor to act. They load instantly, look flawless on every device, and your team manages them with ease. We connect them to your analytics and inquiry tools, so you see what works and what to improve.",
        benefits: [
          "Instant loading and high PageSpeed",
          "Responsive design for every device",
          "Easy content management",
        ],
      },
      {
        icon: "shop",
        title: "Online stores",
        desc: "We build online stores that turn visits into orders. We set up products, payments, shipping and stock, optimize the whole path to checkout, and integrate your accounting and marketing channels. The store grows with your business without needing a rebuild.",
        benefits: [
          "Optimized checkout flow",
          "Payments and shipping integrations",
          "Ready for ads and remarketing",
        ],
      },
      {
        icon: "seo",
        title: "SEO optimization",
        desc: "We rank your site for the terms your customers actually search. We start with a technical audit and keyword research, improve structure and content, and build authority with backlinks. We report movement in rankings and traffic every month, with clear next steps.",
        benefits: [
          "Technical audit and quick fixes",
          "Content built on real search demand",
          "Monthly reports with rankings and traffic",
        ],
      },
    ],
  },
  marketingPage: {
    label: "Discipline 03 / 03",
    title: "Advertising where your customers are.",
    intro:
      "We plan, launch and optimize paid campaigns in every channel that matters to your business, and report the result down to the last lev spent.",
    cta: "Get in touch",
    items: [
      {
        icon: "brand:meta",
        title: "Meta · Facebook & Instagram",
        desc: "We build and run campaigns on Facebook and Instagram, from reaching new audiences to remarketing and sales. We test messages and creative, steer budget toward what performs, and track cost per result every day.",
        benefits: [
          "Campaigns for sales and inquiries",
          "Creative and audience testing",
          "Clear cost-per-result reporting",
        ],
      },
      {
        icon: "brand:googleads",
        title: "Google Ads",
        desc: "We manage the full range of Google: Search, Display, YouTube, Performance Max and Shopping. We catch people exactly when they search for what you offer, and bring them back with remarketing until they become customers.",
        benefits: [
          "Search, Display, YouTube and Pmax",
          "Ads at the moment of search",
          "Remarketing to warm audiences",
        ],
      },
      {
        icon: "brand:tiktok",
        title: "TikTok",
        desc: "We create and run TikTok ads that look like content, not a banner. We help with ideas and short-video production, and optimize for real conversions, not just views.",
        benefits: [
          "Video ads that don't look like ads",
          "Content ideas and production",
          "Optimized for conversions",
        ],
      },
      {
        icon: "brand:reddit",
        title: "Reddit",
        desc: "We reach narrowly specific communities on Reddit, where the audience is engaged and intent is clear. We pick the right communities and messages that sound authentic to the platform.",
        benefits: [
          "Access to niche communities",
          "Precise interest targeting",
          "Messaging authentic to the platform",
        ],
      },
      {
        icon: "brand:discord",
        title: "Discord",
        desc: "We build presence and campaigns in Discord communities that reach engaged audiences around your topic. A fit for community products, events and brands with loyal fans.",
        benefits: [
          "Campaigns in engaged communities",
          "A fit for community products",
          "A direct line to the audience",
        ],
      },
      {
        icon: "brand:x",
        title: "X (Twitter)",
        desc: "We run paid and organic activity on X, so you take part in the conversation in real time. A fit for announcements, B2B positioning and reaching audiences that follow your topic.",
        benefits: [
          "Real-time ads and presence",
          "A fit for B2B and announcements",
          "Reaching topic-driven audiences",
        ],
      },
    ],
  },
  footer: {
    tagline: "We digitalize enterprises with AI, code and advertising.",
    columns: {
      services: "Services",
      company: "Company",
      contact: "Contact",
    },
    company: [
      { label: "About", href: "/#about" },
      { label: "How we work", href: "/#process" },
      { label: "Contact", href: "/contact" },
    ],
    email: "office@tfm.bg",
    phone: "0888 018 802",
    phoneHref: "+359888018802",
    address: "Varna, 68 Vasil Levski Blvd, entrance B, floor 5",
    rights: "All rights reserved.",
  },
  contactStub: {
    heading: "Contact",
    body: "The contact form is being built in the next step. For now, reach us directly:",
    back: "Back to home",
  },
  contact: {
    label: "Contact",
    title: "Let's digitalize your business.",
    intro:
      "Tell us briefly what you do and what you want to achieve. We come back with concrete ideas within 24 hours.",
    directLabel: "Or reach us directly",
    responseLabel: "We reply within 24 hours",
    form: {
      name: { label: "Name", placeholder: "Ivan Ivanov" },
      email: { label: "Email", placeholder: "ivan@company.com" },
      company: { label: "Company", hint: "(optional)", placeholder: "Your company name" },
      interest: {
        label: "What are you interested in",
        options: [
          "AI & Automation",
          "Web development & SEO",
          "Digital marketing",
          "Other / Not sure yet",
        ],
      },
      message: {
        label: "Message",
        placeholder: "Tell us briefly about the project or challenge...",
      },
      consent:
        "I agree that TFM may process my data to respond to this inquiry.",
      submit: "Send inquiry",
      sending: "Sending...",
    },
    success: {
      title: "Thank you!",
      body: "We received your inquiry. We'll get back to you within 24 hours.",
      again: "Send another inquiry",
    },
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email.",
      message: "Please write a message (at least 10 characters).",
      consent: "Please confirm your consent.",
      generic:
        "Something went wrong while sending. Try again or email us directly at office@tfm.bg.",
    },
  },
};
