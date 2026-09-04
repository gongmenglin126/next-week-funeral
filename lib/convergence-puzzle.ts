export type CrossIndexField = "origin" | "object" | "place" | "participant";

export const CROSS_INDEX_FIELDS: ReadonlyArray<{
  key: CrossIndexField;
  label: string;
  prompt: string;
  placeholder: string;
}> = [
  {
    key: "origin",
    label: "起始个案",
    prompt: "2016年海岬病危夜晚，顾惟真把谁的死亡解释为自己幸存的代价？",
    placeholder: "输入姓名",
  },
  {
    key: "object",
    label: "会前物品",
    prompt: "2018年匿名成交、后来同时出现在顾惟真书房和说明会里的物件是什么？",
    placeholder: "输入物件名称",
  },
  {
    key: "place",
    label: "旧址名称",
    prompt: "地方档案里，北麓路17号这片院落曾用过什么院名或居民称呼？",
    placeholder: "输入院名或旧称",
  },
  {
    key: "participant",
    label: "第六期参与者",
    prompt: "第六期账号“雨停以后”在8月19日仍然更新；社区治丧信息中，原使用者的真实姓名是什么？",
    placeholder: "输入真实姓名",
  },
] as const;

const ANSWERS: Record<CrossIndexField, ReadonlySet<string>> = {
  origin: new Set(["陆闻川"]),
  object: new Set(["无面小像", "无面像"]),
  place: new Set(["栖潮疗养院", "栖潮旧院"]),
  participant: new Set(["程叙白"]),
};

export function normalizeCrossIndexAnswer(value: string) {
  return value
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[\s《》〈〉「」『』【】()（）·._—–-]/g, "");
}

export function isCrossIndexAnswerCorrect(field: CrossIndexField, value: string) {
  return ANSWERS[field].has(normalizeCrossIndexAnswer(value));
}
