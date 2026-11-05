export type Topic = "angular" | "javascript" | "typescript";
export type DeckTopic = Topic | "all";

export const TOPICS: readonly Topic[] = ["angular", "javascript", "typescript"];

const names: Record<string, string> = {
  angular: "Angular",
  javascript: "JavaScript",
  typescript: "TypeScript",
  all: "All cards",
};

export function topicName(topic: string): string {
  return names[topic] ?? topic;
}
