export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  feedback: {
    correct: string;
    incorrect: string;
  };
}

export interface MatchingItem {
  id: string;
  term: string;
  definition: string;
}

export interface Lesson {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  duration: string;
  content: LessonContent;
  quiz: QuizQuestion[];
  matching?: MatchingItem[];
}

export interface LessonContent {
  sections: ContentSection[];
}

export interface ContentSection {
  type: "text" | "highlight" | "list" | "accordion" | "comparison" | "stats" | "audio";
  title?: string;
  content?: string;
  items?: string[] | AccordionItem[];
  data?: Record<string, unknown>;
  audioSrc?: string;
  transcript?: string;
}

export interface AccordionItem {
  title: string;
  content: string;
  icon?: string;
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Who We Are",
    shortTitle: "Introduction",
    description: "Meet Stoneridge Software and Levridge — two connected companies helping businesses run better.",
    duration: "3 min",
    content: {
      sections: [
        {
          type: "text",
          content:
            "At Stoneridge, we help businesses run better using Microsoft technology. We do this through two connected but distinct companies: **Stoneridge Software** and **Levridge**.",
        },
        {
          type: "audio",
          title: "Listen: Introduction to Who We Are",
          audioSrc: "/audio/lesson-1-who-we-are.mp3",
          transcript:
            "At Stoneridge, we help businesses run better using Microsoft technology.\n\nWe do this through two connected but distinct companies: Stoneridge Software and Levridge.\n\nTogether, they support organizations by implementing, extending, and optimizing Microsoft business solutions — with a strong focus on industry expertise.",
        },
        {
          type: "accordion",
          title: "The Two Companies",
          items: [
            {
              title: "Stoneridge Software",
              content:
                "A consulting and technology services company focused on Microsoft Dynamics 365 and Microsoft 365 implementations.",
            },
            {
              title: "Levridge",
              content:
                "An independent software vendor (ISV) that builds specialized software for the agriculture industry on top of Microsoft technology.",
            },
          ],
        },
        {
          type: "stats",
          title: "Key Facts",
          data: {
            items: [
              { label: "Microsoft Partner", icon: "handshake" },
              { label: "Industry-Focused", icon: "target" },
              { label: "Two Connected Companies", icon: "building" },
            ],
          },
        },
      ],
    },
    quiz: [
      {
        id: "q1-1",
        question: "What is the relationship between Stoneridge Software and Levridge?",
        options: [
          "They are competitors in the same market",
          "They are two connected but distinct companies under Stoneridge",
          "Levridge acquired Stoneridge Software",
          "They have no relationship",
        ],
        correctIndex: 1,
        feedback: {
          correct:
            "Correct! Stoneridge Software and Levridge are two connected but distinct companies that work together to help businesses succeed with Microsoft technology.",
          incorrect:
            "Not quite. Stoneridge Software and Levridge are actually two connected but distinct companies — both part of the Stoneridge family.",
        },
      },
    ],
  },
  {
    id: 2,
    title: "Stoneridge Software Overview",
    shortTitle: "Stoneridge Software",
    description: "Learn what Stoneridge Software does and the industries we serve.",
    duration: "4 min",
    content: {
      sections: [
        {
          type: "text",
          content:
            "Stoneridge Software is a **consulting and technology services company**. We help businesses implement, customize, and support Microsoft business applications like Dynamics 365 and Microsoft 365.",
        },
        {
          type: "audio",
          title: "Listen: What Stoneridge Software Does",
          audioSrc: "/audio/lesson-2-what-we-do.mp3",
          transcript:
            "Stoneridge Software is a consulting and technology services company. We help businesses implement, customize, and support Microsoft business applications like Dynamics three sixty five and Microsoft three sixty five.\n\nOur role is to ensure these systems are configured correctly so clients can manage accounting, operations, sales, and customer service more effectively. We primarily serve mid-sized organizations across key industries including, but not limited to: Agriculture, Food & Beverage, Specialty Construction, and Industrial Manufacturing.",
        },
        {
          type: "accordion",
          title: "Industries We Serve",
          items: [
            {
              title: "Agriculture",
              content:
                "We support agricultural businesses with specialized solutions for commodity management, grain trading, and farm operations.",
              icon: "wheat",
            },
            {
              title: "Food & Beverage",
              content:
                "From production planning to compliance tracking, we help food and beverage companies streamline their operations.",
              icon: "utensils",
            },
            {
              title: "Specialty Construction",
              content:
                "We help specialty contractors manage complex projects, subcontractor relationships, and job costing with tailored Microsoft solutions.",
              icon: "hard-hat",
            },
            {
              title: "Industrial Manufacturing",
              content:
                "We serve manufacturers with complex supply chains, helping them optimize production and distribution.",
              icon: "factory",
            },
          ],
        },
        {
          type: "list",
          title: "What We Help Clients Manage",
          items: [
            "Accounting and financial operations",
            "Business operations and workflows",
            "Sales pipeline and customer relationships",
            "Customer service and support",
          ],
        },
      ],
    },
    quiz: [
      {
        id: "q2-1",
        question: "What type of company is Stoneridge Software?",
        options: [
          "A hardware manufacturer",
          "A consulting and technology services company",
          "A retail company",
          "A marketing agency",
        ],
        correctIndex: 1,
        feedback: {
          correct:
            "That's right! Stoneridge Software is a consulting and technology services company specializing in Microsoft business applications.",
          incorrect:
            "Not quite. Stoneridge Software is a consulting and technology services company that helps implement and support Microsoft business applications.",
        },
      },
    ],
    matching: [
      { id: "m1", term: "Dynamics 365", definition: "Microsoft's business application platform we implement" },
      { id: "m2", term: "Agriculture", definition: "A key industry we specialize in serving" },
      { id: "m3", term: "Consulting", definition: "The type of services Stoneridge provides" },
    ],
  },
  {
    id: 3,
    title: "How Stoneridge Makes Money",
    shortTitle: "Stoneridge Revenue",
    description: "Understand the primary revenue streams that power Stoneridge Software.",
    duration: "5 min",
    content: {
      sections: [
        {
          type: "text",
          content:
            "Understanding how we generate revenue helps everyone appreciate the business model and make better decisions. Let's explore Stoneridge Software's main revenue streams.",
        },
        {
          type: "audio",
          title: "Primary Revenue Streams",
          audioSrc: "/audio/lesson-3-primary-revenue-streams.mp3",
          transcript:
            "The majority of Stoneridge's revenue comes from consulting services. Clients pay us for the time and expertise of our consultants through either time-and-materials or subscription-based arrangements.\n\nThis includes: Software implementations, ongoing system support, and project work delivered by Stoneridge consultants or subcontractors.",
        },
        {
          type: "accordion",
          title: "Revenue Streams",
          items: [
            {
              title: "Consulting Revenue (Primary)",
              content:
                "The majority of Stoneridge's revenue comes from consulting services. Clients pay us for the time and expertise of our consultants through either time-and-materials or subscription-based arrangements. This includes software implementations, ongoing system support, and project work.",
            },
            {
              title: "Product Licensing Resale",
              content:
                "As a Microsoft partner, Stoneridge purchases software licenses from Microsoft and other third-party vendors, applies a markup, and resells them to clients. This is a growing revenue stream for the company.",
            },
            {
              title: "Partner Incentives",
              content:
                "We receive partner incentives from Microsoft for selling licenses and completing qualifying activities. These incentives reward us for growing the Microsoft ecosystem.",
            },
          ],
        },
        {
          type: "comparison",
          title: "Revenue Model Summary",
          data: {
            left: {
              title: "Time & Materials",
              description: "Clients pay for actual hours worked",
              icon: "clock",
            },
            right: {
              title: "Subscription Support",
              description: "Clients pay recurring fees for ongoing support",
              icon: "refresh",
            },
          },
        },
        {
          type: "highlight",
          content:
            "Key insight: As a consulting business, our revenue is directly tied to the time and expertise of our people.",
        },
      ],
    },
    quiz: [
      {
        id: "q3-1",
        question: "What is Stoneridge Software's PRIMARY source of revenue?",
        options: ["Advertising", "Product manufacturing", "Consulting services", "Real estate"],
        correctIndex: 2,
        feedback: {
          correct:
            "Exactly! Consulting services — where clients pay for our expertise and time — is the primary revenue source for Stoneridge Software.",
          incorrect:
            "Actually, consulting services are Stoneridge's primary revenue source. Clients pay for our expertise through time-and-materials or subscription arrangements.",
        },
      },
    ],
  },
  {
    id: 4,
    title: "Stoneridge Cost Structure",
    shortTitle: "Stoneridge Costs",
    description: "Learn about the major cost drivers for a consulting business like Stoneridge.",
    duration: "4 min",
    content: {
      sections: [
        {
          type: "text",
          content:
            "Every business has costs that enable it to operate and deliver value. For a consulting company like Stoneridge Software, understanding our cost structure helps explain business decisions.",
        },
        {
          type: "audio",
          title: "Cost Structure Overview",
          audioSrc: "/audio/lesson-4-cost-structure.mp3",
          transcript:
            "Because Stoneridge is a consulting and services-based business, our largest costs are tied directly to the people, tools, and systems required to deliver value to our clients.\n\nThe first and largest cost category is salaries and benefits for consultants and subcontractors. These are the teams who do the work for our clients — including project managers, solution architects, developers, data specialists, and trainers. This category also includes subcontractors who provide additional capacity or specialized expertise, as well as project-related expenses like travel for onsite client work when needed. Since our revenue is generated through expert services, investing in skilled delivery teams is essential to client success and to the business overall.\n\nAnother key cost area is Microsoft and third-party license costs. When Stoneridge resells software licenses, we first purchase those licenses from Microsoft or other vendors before selling them to clients. We also manage license provisioning, optimization, compliance, and renewals as part of this process. While licensing resale is an important revenue stream, these upfront costs are a core part of how the business manages margins.\n\nFinally, there are operational and support costs that keep the business running. These include salaries and benefits for internal teams. They also include internal tools and systems like CRM platforms and project management software, along with marketing efforts, sales commissions, and office expenses.\n\nThese teams and systems allow consultants to focus on delivering high-quality work to clients while ensuring the business operates efficiently and sustainably. Altogether, this cost structure reflects a people-driven consulting business. Success depends on hiring and retaining talented professionals, balancing delivery capacity with client demand, and investing in the internal systems that allow the company to scale and grow.",
        },
        {
          type: "accordion",
          title: "Major Cost Categories",
          items: [
            {
              title: "People Costs",
              content:
                "Salaries and benefits for consultants and subcontractors represent the largest expense. As a people-driven business, our team IS our product.",
            },
            {
              title: "License Costs",
              content:
                "We purchase Microsoft and third-party licenses that we then resell to clients. These costs are offset by the markup we apply.",
            },
            {
              title: "Operational Costs",
              content:
                "Internal teams, tools, marketing, training, and office expenses all contribute to running the business effectively.",
            },
          ],
        },
        {
          type: "highlight",
          content:
            "This cost structure reflects a people-driven consulting business. Our biggest investment is in talented people who deliver value to clients.",
        },
        {
          type: "stats",
          title: "Cost Categories at a Glance",
          data: {
            items: [
              { label: "People", icon: "users", description: "Salaries & benefits" },
              { label: "Licenses", icon: "key", description: "Software costs" },
              { label: "Operations", icon: "settings", description: "Tools & overhead" },
            ],
          },
        },
      ],
    },
    quiz: [
      {
        id: "q4-1",
        question: "What is the largest expense category for Stoneridge Software?",
        options: [
          "Marketing and advertising",
          "Office buildings",
          "Salaries and benefits for our people",
          "Software development",
        ],
        correctIndex: 2,
        feedback: {
          correct:
            "Correct! As a consulting company, people are our greatest asset and our largest expense. Salaries and benefits for our people represent the biggest cost.",
          incorrect:
            "Not quite. Since Stoneridge is a consulting company, our biggest expense is people — specifically salaries and benefits for our people.",
        },
      },
    ],
  },
  {
    id: 5,
    title: "Why Levridge Exists",
    shortTitle: "Levridge Origins",
    description: "Discover why Stoneridge created Levridge and its purpose in the market.",
    duration: "4 min",
    content: {
      sections: [
        {
          type: "text",
          content:
            "Levridge is a **software development company** and **independent software vendor (ISV)**. But why did Stoneridge create a separate company?",
        },
        {
          type: "audio",
          title: "Levridge Origins",
          audioSrc: "/audio/lesson-5-levridge-origins.mp3",
          transcript: `Levridge is a software development company and independent software vendor, or ISV.

Stoneridge founded Levridge in 2018 as a strategic move to strengthen our agriculture industry focus.

At the time, existing Microsoft solutions didn't fully meet the needs of agribusinesses — so we built something purpose-designed.

Levridge is a cloud-based platform built on Dynamics 365, with specialized features like: Commodity accounting, grain trading, agronomy, and patronage tracking.`,
        },
        {
          type: "text",
          content:
            "Levridge is a cloud-based platform built on Dynamics 365, with specialized features designed specifically for agricultural businesses.",
        },
        {
          type: "list",
          title: "Levridge Key Features",
          items: ["Commodity accounting", "Grain trading", "Agronomy management", "Patronage tracking"],
        },
        {
          type: "comparison",
          title: "A Helpful Analogy",
          data: {
            left: {
              title: "Stoneridge Software",
              description: "Builds and customizes the house using Microsoft materials",
              icon: "home",
            },
            right: {
              title: "Levridge",
              description: "The custom-designed kitchen built specifically for farmers",
              icon: "utensils",
            },
          },
        },
      ],
    },
    quiz: [
      {
        id: "q5-1",
        question: "When was Levridge founded and why?",
        options: [
          "2010, to compete with Microsoft",
          "2018, to address unmet needs in the agriculture industry",
          "2020, to expand into retail",
          "2015, to replace Stoneridge Software",
        ],
        correctIndex: 1,
        feedback: {
          correct:
            "That's right! Levridge was founded in 2018 because existing Microsoft solutions didn't fully meet the specialized needs of agribusinesses.",
          incorrect:
            "Levridge was actually founded in 2018 as a strategic move to address the unique needs of agricultural businesses that weren't being met by existing solutions.",
        },
      },
    ],
  },
  {
    id: 6,
    title: "How Levridge Makes Money",
    shortTitle: "Levridge Revenue",
    description: "Understand Levridge's revenue model as a SaaS-style product company.",
    duration: "5 min",
    content: {
      sections: [
        {
          type: "text",
          content:
            "Unlike Stoneridge Software's consulting model, Levridge operates more like a **SaaS (Software as a Service)** company. Let's explore how this different model generates revenue.",
        },
        {
          type: "accordion",
          title: "Levridge Revenue Streams",
          items: [
            {
              title: "Subscription Revenue (Primary)",
              content:
                "Levridge's core revenue comes from subscription licensing. Clients pay recurring fees to access and use the platform — similar to how you might subscribe to Netflix or Microsoft 365. As more agribusinesses adopt Levridge, this recurring revenue grows.",
            },
            {
              title: "Feature & Add-On Revenue",
              content:
                "Levridge also generates revenue through add-on features and enhancements. These may include advanced integrations or specialized workflows requested by clients. These are typically one-time or project-based fees on top of the base subscription.",
            },
            {
              title: "Consulting Revenue",
              content:
                "While primarily a product company, Levridge also earns consulting revenue — especially for onboarding, configuration, and training. This work often happens in close collaboration with Stoneridge Software.",
            },
          ],
        },
        {
          type: "highlight",
          content:
            "Key difference: Subscription revenue is recurring and predictable, making it easier to plan for the future. Each new customer adds to a growing base of monthly revenue.",
        },
        {
          type: "comparison",
          title: "Comparing Revenue Models",
          data: {
            left: {
              title: "Stoneridge (Consulting)",
              description: "Revenue tied to billable hours and project work",
              icon: "clock",
            },
            right: {
              title: "Levridge (Product/SaaS)",
              description: "Recurring subscription fees that grow over time",
              icon: "trending-up",
            },
          },
        },
      ],
    },
    quiz: [
      {
        id: "q6-1",
        question: "What is Levridge's PRIMARY source of revenue?",
        options: ["One-time software sales", "Subscription licensing fees", "Hardware sales", "Advertising"],
        correctIndex: 1,
        feedback: {
          correct:
            "Correct! Levridge's core revenue comes from subscription licensing — recurring fees clients pay to access and use the platform.",
          incorrect:
            "Actually, Levridge primarily earns revenue through subscription licensing — recurring fees that clients pay on an ongoing basis.",
        },
      },
    ],
    matching: [
      { id: "m4", term: "Subscription", definition: "Levridge's primary revenue model" },
      { id: "m5", term: "Add-ons", definition: "Optional features for additional fees" },
      { id: "m6", term: "Consulting", definition: "Revenue from onboarding and training" },
    ],
  },
  {
    id: 7,
    title: "Levridge Today and Strategic Direction",
    shortTitle: "Levridge Strategy",
    description: "See how Levridge is evolving and growing within the Microsoft partner ecosystem.",
    duration: "4 min",
    content: {
      sections: [
        {
          type: "text",
          content:
            "As Levridge has matured, the company has been evolving to operate more independently as a true ISV (Independent Software Vendor).",
        },
        {
          type: "highlight",
          content:
            "A separate CEO was hired, and the business is being positioned to serve not only Stoneridge clients, but the broader Microsoft partner ecosystem.",
        },
        {
          type: "list",
          title: "Strategic Evolution",
          items: [
            "Operating more independently as a true ISV",
            "Leadership focused specifically on Levridge's growth",
            "Expanding reach beyond Stoneridge clients",
            "Building partnerships across the Microsoft ecosystem",
          ],
        },
        {
          type: "text",
          content:
            "This allows Levridge to scale its impact across the agriculture industry while remaining deeply connected to Microsoft's platform.",
        },
        {
          type: "stats",
          title: "Levridge's Growth Strategy",
          data: {
            items: [
              { label: "Independence", icon: "rocket", description: "Operating as a true ISV" },
              { label: "Scale", icon: "trending-up", description: "Growing customer base" },
              { label: "Ecosystem", icon: "globe", description: "Microsoft partner network" },
            ],
          },
        },
      ],
    },
    quiz: [
      {
        id: "q7-1",
        question: "How is Levridge evolving as a company?",
        options: [
          "It's merging completely into Stoneridge Software",
          "It's operating more independently as a true ISV with its own leadership",
          "It's shutting down operations",
          "It's moving away from Microsoft technology",
        ],
        correctIndex: 1,
        feedback: {
          correct:
            "Exactly! Levridge is evolving to operate more independently as a true ISV, with its own CEO and a strategy to serve the broader Microsoft partner ecosystem.",
          incorrect:
            "Actually, Levridge is evolving to operate more independently with dedicated leadership, positioning itself to serve the broader Microsoft partner ecosystem.",
        },
      },
    ],
  },
  {
    id: 8,
    title: "Summary and Mental Model",
    shortTitle: "Summary",
    description: "Bring it all together with a clear mental model of how Stoneridge and Levridge work.",
    duration: "3 min",
    content: {
      sections: [
        {
          type: "text",
          content: "Let's wrap up with a clear mental model for understanding our two companies.",
        },
        {
          type: "comparison",
          title: "The Simple Summary",
          data: {
            left: {
              title: "Stoneridge Software",
              description: "The expert team that implements and supports Microsoft business solutions",
              icon: "users",
            },
            right: {
              title: "Levridge",
              description: "The specialized agriculture solution built on top of Microsoft tools",
              icon: "leaf",
            },
          },
        },
        {
          type: "highlight",
          content:
            "Think of it this way: Stoneridge builds and customizes the house using Microsoft materials. Levridge is the custom-designed kitchen built specifically for farmers.",
        },
        {
          type: "accordion",
          title: "Key Takeaways",
          items: [
            {
              title: "Two Different Business Models",
              content:
                "Stoneridge Software is a consulting business (revenue from billable time). Levridge is a product/SaaS business (revenue from subscriptions).",
            },
            {
              title: "Connected But Distinct",
              content:
                "While they work closely together, each company has its own focus, leadership, and growth strategy.",
            },
            {
              title: "Industry Expertise",
              content:
                "Both companies share a commitment to deep industry knowledge, particularly in agriculture, food & beverage, and manufacturing.",
            },
            {
              title: "Microsoft Partnership",
              content: "Both companies operate within and contribute to the Microsoft partner ecosystem.",
            },
          ],
        },
        {
          type: "text",
          content:
            "Together, they help clients operate smarter, scale faster, and get more value from their technology investments.",
        },
      ],
    },
    quiz: [
      {
        id: "q8-1",
        question: "Which statement best describes the relationship between Stoneridge Software and Levridge?",
        options: [
          "They compete for the same customers",
          "Stoneridge is consulting, Levridge is product — both connected within the Microsoft ecosystem",
          "Levridge is a department within Stoneridge Software",
          "They operate in completely different industries",
        ],
        correctIndex: 1,
        feedback: {
          correct:
            "Perfect! You've got it. Stoneridge Software is a consulting company while Levridge is a product company — both connected and working within the Microsoft ecosystem.",
          incorrect:
            "The best way to think about it: Stoneridge Software is the consulting arm (billable expertise) while Levridge is the product arm (subscription software) — both connected within the Microsoft ecosystem.",
        },
      },
    ],
  },
];
