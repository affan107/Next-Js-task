import {
  MOCK_CONTACTS,
  AVAILABLE_PROPERTIES,
} from "../contacts/contactsMockData";

export const MOCK_LISTS = [
  {
    id: 1,
    name: "Inspected on Apr 19",
    properties: ["35 Jones St", "35 Jones St"],
    contacts: 150,
    completedBatch: 3,
    latestBatch: "Day Time",
    createdDate: "14-Mar-25",
    createdBy: "User123",
    contacts_data: MOCK_CONTACTS,
  },
  {
    id: 2,
    name: "Inspected on Apr 20",
    properties: ["5 Pine Ln"],
    contacts: 150,
    completedBatch: 4,
    latestBatch: "Night Time",
    createdDate: "14-Mar-25",
    createdBy: "User123",
    contacts_data: MOCK_CONTACTS.slice(0, 3),
  },
  {
    id: 3,
    name: "Inspected on Apr 21",
    properties: ["35 Jones St", "35 Jones St"],
    contacts: 150,
    completedBatch: 5,
    latestBatch: "Dawn",
    createdDate: "14-Mar-25",
    createdBy: "User123",
    contacts_data: MOCK_CONTACTS.slice(1, 4),
  },
  {
    id: 4,
    name: "Inspected on Apr 22",
    properties: ["35 Jones St", "5 Pine Ln"],
    contacts: 150,
    completedBatch: 6,
    latestBatch: "Dusk",
    createdDate: "14-Mar-25",
    createdBy: "User123",
    contacts_data: MOCK_CONTACTS.slice(0, 2),
  },
  {
    id: 5,
    name: "Inspected on Apr 23",
    properties: ["35 Jones St"],
    contacts: 150,
    completedBatch: 9,
    latestBatch: "Midday",
    createdDate: "14-Mar-25",
    createdBy: "User123",
    contacts_data: MOCK_CONTACTS,
  },
];

export const PROPERTY_DROPDOWN_OPTIONS = [
  "35 Jones St",
  "42 Maple Ave",
  "78 Pine Rd",
  "5 Pine Ln",
  "10 Bird St",
  "21 Thompson St",
];

export { AVAILABLE_PROPERTIES };
