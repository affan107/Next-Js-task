export const MOCK_CALLS = [
  {
    id: 1,
    contact: "Tom Cruise",
    suburb: "Balmain",
    property: "35 Jones St",
    address: "35 Jones St",
    type: "Inbound",
    batch: "Follow-up #2",
    bot: "Lead Qual 2",
    time: "11:00am, 14-Mar-25",
    duration: "1m 20s",
    successEvaluation: "Warm",
    status: "Completed",
    recordingDuration: "01:20",
    aiInsights: {
      qualifiedBuyers: "Yes",
      attendingEvent: "Yes",
      interestLevel: "Warm",
      summary: [
        "Tom Cruise expressed mild interest in the property.",
        "Feedback: kitchen size was a concern.",
        "Open to a follow-up call next week.",
      ],
    },
    callSummary:
      "Tom Cruise showed moderate interest in 35 Jones St. He raised concerns about the kitchen size but is open to viewing the property.",
    transcript: [
      { role: "bot", text: "Hi, is this Tom Cruise?" },
      { role: "client", text: "Yes, speaking." },
      {
        role: "bot",
        text: "Great! I'm calling from VOXworks regarding 35 Jones St, Balmain. Are you still interested?",
      },
      {
        role: "client",
        text: "Yes I am, though the kitchen seemed a bit small in the photos.",
      },
      {
        role: "bot",
        text: "Understood. Would you like to schedule an inspection to see the space in person?",
      },
      { role: "client", text: "Maybe next week, I'll think about it." },
      {
        role: "bot",
        text: "Sounds good! I'll follow up with you then. Have a great day!",
      },
      { role: "client", text: "Thanks, bye." },
    ],
  },
  {
    id: 2,
    contact: "Nicole Kidman",
    suburb: "Five Dock",
    property: "10 Bird St",
    address: "10 Bird St",
    type: "Outbound",
    batch: "Follow-up #3",
    bot: "Initial Contact",
    time: "12:30pm, 14-Mar-25",
    duration: "2m 15s",
    successEvaluation: "Cold",
    status: "Completed",
    recordingDuration: "02:15",
    aiInsights: {
      qualifiedBuyers: "No",
      attendingEvent: "No",
      interestLevel: "Cold",
      summary: [
        "Nicole Kidman showed no interest in the property.",
        "She indicated she is not currently looking to buy.",
        "Recommended removing from active list.",
      ],
    },
    callSummary:
      "Nicole Kidman is not interested in 10 Bird St at this time. She is not actively looking to purchase property.",
    transcript: [
      {
        role: "bot",
        text: "Hi Nicole, calling from VOXworks about 10 Bird St, Five Dock.",
      },
      { role: "client", text: "I'm not really interested at the moment." },
      {
        role: "bot",
        text: "No problem at all. Is there a better time to reach you in future?",
      },
      { role: "client", text: "Not really, I'm not looking to buy." },
      {
        role: "bot",
        text: "Understood, I'll make a note. Thank you for your time!",
      },
    ],
  },
  {
    id: 3,
    contact: "Hugh Jackman",
    suburb: "Drummoyne",
    property: "21 Thompson St",
    address: "21 Thompson St",
    type: "Inbound",
    batch: "Follow-up #4",
    bot: "Follow up",
    time: "2:00pm, 14-Mar-25",
    duration: "3m 30s",
    successEvaluation: "Unknown",
    status: "Completed",
    recordingDuration: "03:30",
    aiInsights: {
      qualifiedBuyers: "Unknown",
      attendingEvent: "Maybe",
      interestLevel: "Unknown",
      summary: [
        "Hugh Jackman was non-committal during the call.",
        "Did not confirm or deny interest.",
        "Suggested a follow-up in 2 weeks.",
      ],
    },
    callSummary:
      "Outcome unclear. Hugh Jackman neither confirmed nor denied interest in 21 Thompson St. A follow-up is recommended in 2 weeks.",
    transcript: [
      {
        role: "bot",
        text: "Hi Hugh, this is VOXworks calling about 21 Thompson St.",
      },
      { role: "client", text: "Oh right, I've been busy — can you call back?" },
      { role: "bot", text: "Of course! When would be a good time?" },
      { role: "client", text: "Maybe in a couple of weeks." },
      {
        role: "bot",
        text: "No problem, I'll schedule a follow-up for two weeks from now.",
      },
      { role: "client", text: "Sounds good, thanks." },
    ],
  },
  {
    id: 4,
    contact: "Margot Robbie",
    suburb: "Strathfield",
    property: "77 Oak Rd",
    address: "77 Oak Rd",
    type: "Outbound",
    batch: "Follow-up #5",
    bot: "Proposal Sent",
    time: "3:30pm, 14-Mar-25",
    duration: "4m 05s",
    successEvaluation: "Hot",
    status: "Completed",
    recordingDuration: "04:05",
    aiInsights: {
      qualifiedBuyers: "Yes",
      attendingEvent: "Yes",
      interestLevel: "Hot",
      summary: [
        "Margot Robbie is very interested in 77 Oak Rd.",
        "She wants to make an offer above the asking price.",
        "Inspection booked for this Saturday.",
      ],
    },
    callSummary:
      "Margot Robbie is highly motivated to purchase 77 Oak Rd. She has confirmed attendance at the Saturday inspection and is considering an offer above asking price.",
    transcript: [
      {
        role: "bot",
        text: "Hi Margot, following up on 77 Oak Rd in Strathfield.",
      },
      {
        role: "client",
        text: "Yes! I love the property, I've been waiting for this call.",
      },
      {
        role: "bot",
        text: "Wonderful! Would you like to attend the inspection this Saturday at 10am?",
      },
      {
        role: "client",
        text: "Absolutely, I'll be there. I'm thinking of making an offer.",
      },
      {
        role: "bot",
        text: "Fantastic! I'll confirm the Saturday inspection for you. Is there anything else?",
      },
      {
        role: "client",
        text: "Can you tell the agent I'm very serious? I may go above asking.",
      },
      { role: "bot", text: "I'll pass that along. See you Saturday, Margot!" },
    ],
  },
  {
    id: 5,
    contact: "Chris Hemsworth",
    suburb: "Burwood",
    property: "5 Pine Ln",
    address: "5 Pine Ln",
    type: "Inbound",
    batch: "Follow-up #6",
    bot: "Closed - Won",
    time: "5:00pm, 14-Mar-25",
    duration: "5m 45s",
    successEvaluation: "Hot",
    status: "Completed",
    recordingDuration: "05:45",
    aiInsights: {
      qualifiedBuyers: "Yes",
      attendingEvent: "Yes",
      interestLevel: "Hot",
      summary: [
        "Chris Hemsworth has submitted an offer on 5 Pine Ln.",
        "Offer is within acceptable range.",
        "Awaiting vendor response.",
      ],
    },
    callSummary:
      "Chris Hemsworth has formally submitted an offer on 5 Pine Ln. The offer is competitive and the vendor is reviewing it. Follow-up required within 24 hours.",
    transcript: [
      {
        role: "bot",
        text: "Hi Chris, this is VOXworks. I understand you've made an offer on 5 Pine Ln?",
      },
      {
        role: "client",
        text: "Yes that's right, I submitted it through the portal this morning.",
      },
      {
        role: "bot",
        text: "Great news! The vendor is currently reviewing all offers. We expect a response by end of day.",
      },
      { role: "client", text: "Perfect. I'm quite serious about this one." },
      {
        role: "bot",
        text: "Understood. We'll call you as soon as we have an update. Is this the best number to reach you?",
      },
      { role: "client", text: "Yes, anytime after 3pm is fine." },
      { role: "bot", text: "Noted! We'll be in touch soon. Thanks Chris!" },
      { role: "client", text: "Cheers, looking forward to it." },
    ],
  },
];

// Backwards compat — points to call 1
export const MOCK_CALL_DETAIL = MOCK_CALLS[0];
