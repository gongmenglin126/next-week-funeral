export type IncidentField = "message" | "circle" | "witness" | "vehicle";

export const INCIDENT_FIELDS: ReadonlyArray<{
  key: IncidentField;
  label: string;
  prompt: string;
  placeholder: string;
}> = [
  { key: "message", label: "通讯", prompt: "周惜嘲讽顾惟真后，那段通讯的导出标识是什么？", placeholder: "输入导出标识" },
  { key: "circle", label: "接收者", prompt: "顾惟真把周惜的消息和位置转发到了哪个群？", placeholder: "输入群名" },
  { key: "witness", label: "回应者", prompt: "哪一个账号回复“明白”，并在天亮前离开北麓路17号？", placeholder: "输入账号" },
  { key: "vehicle", label: "车辆", prompt: "事故前持续跟随周惜的白色车辆号牌是什么？", placeholder: "输入完整号牌" },
] as const;

const ANSWERS: Record<IncidentField, ReadonlySet<string>> = {
  message: new Set(["gz82517"]),
  circle: new Set(["近身见证"]),
  witness: new Set(["守潮人17"]),
  vehicle: new Set(["lc7m21"]),
};

export function normalizeIncidentAnswer(value: string) {
  return value.normalize("NFKC").trim().toLowerCase().replace(/[\s·•._—–-]/g, "");
}

export function isIncidentAnswerCorrect(field: IncidentField, value: string) {
  return ANSWERS[field].has(normalizeIncidentAnswer(value));
}
