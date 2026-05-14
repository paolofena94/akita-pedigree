import { AuditLog } from "@/types/log";

export interface EntityReference {
  id: string;
  name: string;
  slug: string;
}

export const MOCK_RESOURCES: Record<string, EntityReference[]> = {
  akitas: [
    { id: "1", name: "Hachiko Go", slug: "hachiko-go" },
    { id: "2", name: "Yuki", slug: "yuki" },
    { id: "3", name: "Gento", slug: "gento" },
    { id: "4", name: "Sakura", slug: "sakura" },
    { id: "5", name: "Sumo Go", slug: "sumo-go" },
    { id: "6", name: "Kira", slug: "kira" },
    { id: "7", name: "Taro", slug: "taro" },
    { id: "8", name: "Suna", slug: "suna" },
  ],
  kennels: [
    { id: "10", name: "Akita Pride", slug: "akita-pride" },
    { id: "11", name: "Fujisan Kennel", slug: "fujisan-kennel" },
    { id: "12", name: "Yama No Kami", slug: "yama-no-kami" },
  ],
  persons: [
    { id: "100", name: "Mario Rossi", slug: "mario-rossi" },
    { id: "101", name: "Anna K.", slug: "anna-k" },
    { id: "102", name: "Kenji Yamamoto", slug: "kenji-yamamoto" },
    { id: "105", name: "Yuki Tanaka", slug: "yuki-tanaka" },
  ]
};

export const INTERNAL_MOCK_LOGS: AuditLog[] = [
  { id: "20", table_name: "akitas", record_id: "1", user_id: "paolo_f", action: "UPDATE", created_at: "2026-05-14T10:30:00Z" },
  { id: "19", table_name: "persons", record_id: "102", user_id: "paolo_f", action: "INSERT", created_at: "2026-05-14T09:15:00Z" },
  { id: "18", table_name: "akitas", record_id: "5", user_id: "paolo_f", action: "INSERT", created_at: "2026-05-14T08:00:00Z" },
  { id: "17", table_name: "kennels", record_id: "11", user_id: "paolo_f", action: "UPDATE", created_at: "2026-05-13T22:45:00Z" },
  { id: "16", table_name: "akitas", record_id: "2", user_id: "paolo_f", action: "UPDATE", created_at: "2026-05-13T19:20:00Z" },
  { id: "15", table_name: "akitas", record_id: "6", user_id: "paolo_f", action: "INSERT", created_at: "2026-05-13T18:00:00Z" },
  { id: "14", table_name: "persons", record_id: "100", user_id: "paolo_f", action: "UPDATE", created_at: "2026-05-13T15:30:00Z" },
  { id: "13", table_name: "akitas", record_id: "3", user_id: "paolo_f", action: "UPDATE", created_at: "2026-05-13T14:10:00Z" },
  { id: "12", table_name: "kennels", record_id: "12", user_id: "paolo_f", action: "INSERT", created_at: "2026-05-13T11:00:00Z" },
  { id: "11", table_name: "akitas", record_id: "1", user_id: "paolo_f", action: "INSERT", created_at: "2026-05-13T10:00:00Z" },
  { id: "10", table_name: "kennels", record_id: "10", user_id: "paolo_f", action: "UPDATE", created_at: "2026-05-13T09:30:00Z" },
  { id: "9", table_name: "akitas", record_id: "4", user_id: "paolo_f", action: "UPDATE", created_at: "2026-05-12T14:20:00Z" },
  { id: "8", table_name: "persons", record_id: "101", user_id: "paolo_f", action: "UPDATE", created_at: "2026-05-12T08:00:00Z" },
  { id: "7", table_name: "akitas", record_id: "7", user_id: "paolo_f", action: "INSERT", created_at: "2026-05-11T20:00:00Z" },
  { id: "6", table_name: "akitas", record_id: "2", user_id: "paolo_f", action: "UPDATE", created_at: "2026-05-11T16:45:00Z" },
  { id: "5", table_name: "persons", record_id: "101", user_id: "paolo_f", action: "DELETE", created_at: "2026-05-11T08:00:00Z" },
  { id: "4", table_name: "akitas", record_id: "8", user_id: "paolo_f", action: "INSERT", created_at: "2026-05-10T14:00:00Z" },
  { id: "3", table_name: "kennels", record_id: "11", user_id: "paolo_f", action: "INSERT", created_at: "2026-05-10T09:00:00Z" },
  { id: "2", table_name: "akitas", record_id: "1", user_id: "paolo_f", action: "UPDATE", created_at: "2026-05-09T18:30:00Z" },
  { id: "1", table_name: "persons", record_id: "105", user_id: "paolo_f", action: "INSERT", created_at: "2026-05-09T10:00:00Z" }
];