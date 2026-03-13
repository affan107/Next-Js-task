export const MOCK_BOTS = [
  {
    id: 1,
    name: "John Doe",
    stage: "Inspection",
    activity: "Lead Qual 2",
    description: "Pitch new properties",
    type: "Inbound",
    botTemplate: "Lead Qual 2",
    voice: "Aussie Male A",
    // edit-mode detail fields
    workflowStage: "Inspection",
    template: "Lead Qualification",
    promptDescription:
      "have a discussion with the buyer about whether they are interested in purchasing the property.",
    dataCollection: [
      "Looking to buy? [yes/no/ unknown]",
      "Attending auction? [yes/no/unknown]",
      "Level of interest? [hot/warm/cold/unknown]",
      "Type of buyer? [investor/occupier/unknown]",
      "In price range? [yes/no/ unknown]",
    ],
    // summary title shown in panel
    summaryTitle: "Lead Qualification",
  },
  {
    id: 2,
    name: "Jane Smith",
    stage: "Confirmation",
    activity: "Initial Contact",
    description: "Conduct market research",
    type: "Outbound",
    botTemplate: "Initial Contact",
    voice: "Aussie Male",
    workflowStage: "Confirmation",
    template: "Initial Contact",
    promptDescription:
      "Introduce the property to the buyer and gauge initial interest.",
    dataCollection: [
      "Interested in viewing? [yes/no/unknown]",
      "Current suburb? [text]",
      "Budget range? [text]",
    ],
    summaryTitle: "Initial Contact",
  },
  {
    id: 3,
    name: "Emily Johnson",
    stage: "Inspection",
    activity: "Follow up",
    description: "Develop marketing strategies",
    type: "Inbound",
    botTemplate: "Follow up",
    voice: "New Zealand Female",
    workflowStage: "Inspection",
    template: "Follow up",
    promptDescription: "Follow up with buyer after open home inspection.",
    dataCollection: [
      "Did you attend the inspection? [yes/no]",
      "Overall impression? [positive/negative/neutral]",
      "Offer intent? [yes/no/undecided]",
    ],
    summaryTitle: "Follow Up",
  },
  {
    id: 4,
    name: "Michael Brown",
    stage: "Inspection",
    activity: "Proposal Sent",
    description: "Create property listings",
    type: "Outbound",
    botTemplate: "Proposal Sent",
    voice: "New Zealand Male",
    workflowStage: "Inspection",
    template: "Proposal Sent",
    promptDescription:
      "Confirm receipt of proposal and answer any initial questions.",
    dataCollection: [
      "Proposal received? [yes/no]",
      "Any questions? [text]",
      "Ready to proceed? [yes/no/undecided]",
    ],
    summaryTitle: "Proposal Sent",
  },
  {
    id: 5,
    name: "Sarah Davis",
    stage: "Inspection",
    activity: "Closed - Won",
    description: "Organize property viewings",
    type: "Inbound",
    botTemplate: "Closed - Won",
    voice: "Canadian Female",
    workflowStage: "Inspection",
    template: "Closed - Won",
    promptDescription: "Congratulate buyer and coordinate settlement process.",
    dataCollection: [
      "Settlement date confirmed? [yes/no]",
      "Solicitor engaged? [yes/no]",
      "Finance approved? [yes/no]",
    ],
    summaryTitle: "Closed - Won",
  },
];

export const WORKFLOW_STAGES = [
  "Inspection",
  "Confirmation",
  "Proposal Sent",
  "Closed - Won",
  "Closed - Lost",
];
export const ACTIVITY_OPTIONS = [
  "Lead Qual 2",
  "Initial Contact",
  "Follow up",
  "Proposal Sent",
  "Closed - Won",
];
export const TEMPLATE_OPTIONS = [
  "Lead Qualification",
  "Initial Contact",
  "Follow up",
  "Proposal Sent",
  "Closed - Won",
];
export const VOICE_OPTIONS = [
  "Aussie Male A",
  "Aussie Male",
  "Aussie Female A",
  "New Zealand Female",
  "New Zealand Male",
  "Canadian Female",
];
export const TYPE_OPTIONS = ["Inbound", "Outbound"];
export const PROPERTY_OPTIONS = [
  "35 Jones St",
  "10 Bird St",
  "21 Thompson St",
  "77 Oak Rd",
  "5 Pine Ln",
];
