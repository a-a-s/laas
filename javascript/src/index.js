'use strict';

// CONSTANTS

const WEEKDAYS = [
  '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六',
];
const DRINKS = [
  '水', '茶', '红茶', '绿茶', '咖啡', '奶茶', '可乐', '鲜奶', '豆奶', '果汁',
  '果味汽水', '苏打水', '运动饮料', '酸奶', '酒',
];
const DIRECTIONS = [
  '北方', '东方', '南方', '西方', '东北方', '东南方', '西南方', '西北方',
];
const GODDESS_SYMBOL = '★★★★★☆☆☆☆☆';
const VARIABLES = [
 'jieguo', 'huodong', 'pay', 'expire', 'zhangdan', 'every', 'free',
 'i1', 'a', 'virtual', 'ad', 'spider', 'mima', 'pass', 'ui',
];
const TOOLS = [
  'Eclipse写程序', 'MSOffice写文档', '记事本写程序',
  'Windows8', 'Linux', 'MacOS', 'IE', 'Android设备', 'iOS设备',
];

function tool() {
  return TOOLS[random(12) % TOOLS.length];
}

function variable() {
  return VARIABLES[random(11) % VARIABLES.length];
}

function linesCount() {
  return random(12) % 247 + 30;
}

function asActivityName(name) {
  return name
    .replace('%t', tool())
    .replace('%v', variable())
    .replace('%l', linesCount());
}

const ACTIVITES = [];
function defActivity(name, reasonGood, reasonBad, forWeekend) {
  const activity = {name, reasonGood, reasonBad, forWeekend};
  ACTIVITES.push(activity);

  activity.asGood = () => {
    return {
      name: asActivityName(name),
      reason: reasonGood,
    };
  };
  activity.asBad = () => {
    return {
      name: asActivityName(name),
      reason: reasonBad,
    };
  };

  return activity;
}
defActivity('写单元测试', '写单元测试将减少出错', '写单元测试会降低你的开发效率', false);
defActivity('洗澡', '你几天没洗澡了？', '会把设计方面的灵感洗掉', true);
defActivity('锻炼一下身体', '', '能量没消耗多少，吃得却更多', true);
defActivity('抽烟', '抽烟有利于提神，增加思维敏捷', '除非你活够了，死得早点没关系', true);
defActivity('白天上线', '今天白天上线是安全得', '可能导致灾难性后果', false);
defActivity('重构', '代码质量得到提高', '你很有可能会陷入泥潭', false);
defActivity('使用%t', '你看起来更有品味', '别人会觉得你在装逼', false);
defActivity('跳槽', '该放手时就放手', '鉴于当前的经济形式，你的下一份工作未必比现在强', false);
defActivity('招人', '你面前这位有成为牛人的潜质', '这人会写程序吗？', false);
defActivity('面试', '面试官今天心情很好', '面试官不爽，会拿你出气', false);
defActivity('提交辞职申请', '公司找到了一个比你更能干更便宜的家伙，巴不得你赶快滚蛋', '鉴于当前的经济形势，你的下一份工作未必比现在强', false);
defActivity('申请加薪', '老板今天心情很好', '公司正在考虑裁员', false);
defActivity('晚上加班', '晚上是程序员精神最好的时候', '', true);
defActivity('在妹子面前吹牛', '改善你矮穷挫的形象', '会被识破', true);
defActivity('撸管', '避免缓冲区溢出', '强撸灰飞烟灭', true);
defActivity('浏览成人网站', '重拾对生活的信心', '你会心神不宁', true);
defActivity('命名变量%v', '', '', false);
defActivity('写超过%l行的方法', '你的代码组织的很好，长一点没关系', '你的代码将混乱不堪，你自己都看不懂', false);
defActivity('提交代码', '遇到冲突的几率是最低的', '你遇到的一大堆冲突让你觉得自己是不是时间穿越了', false);
defActivity('代码复审', '发现重要问题的几率大大增加', '你什么问题都发现不了，白白浪费时间', false);
defActivity('开会', '写代码之余放松一下打个盹，有益健康', '小心被扣屎盆子背黑锅', false);
defActivity('打DOTA', '你将如有神助', '你会被虐得很惨', true);
defActivity('晚上上线', '晚上是程序员精神最好的时候', '你白天已经筋疲力尽了', false);
defActivity('修复BUG', '你今天对BUG的嗅觉大大提高', '新产生的BUG将比修复的更多', false);
defActivity('设计评审', '设计评审会议将变成头脑风暴', '人人筋疲力尽，评审就这么过了', false);
defActivity('需求评审', '', '', false);
defActivity('上微博', '今天发生的事不能错过', '今天的微博充满负能量', true);
defActivity('上AB站', '还需要理由吗？', '满屏兄贵亮瞎你的眼', true);
defActivity('玩FlappyBird', '今天破纪录的几率很高', '除非你想玩到把手机砸了', true);

function merge(...things) {
  const o = {};

  for (let thing of things) {
    for (let k in thing) {
      o[k] = thing[k];
    }
  }

  return o;
}

function today() {
  const date = new Date();

  return {
    year: date.getYear() + 1900,
    month: date.getMonth(),
    day: date.getDate(),
    dayOfWeek: WEEKDAYS[date.getDay()],
  };
}

function todaySeed() {
  const date = today();
  return date.year * 1000 + date.month * 100 + date.day;
}

function random(seed) {
  const modulo = 11117;

  let n = todaySeed() % modulo;
  for (let i = 0; i < seed + 100; i++) n = n * n % modulo;
  return n;
}

function pickItems(items, requiredCount) {
  let picked = items.slice();
  for (let removedCount = 0;
       removedCount < items.length - requiredCount;
       removedCount++) {
    const toRemove = random(removedCount) % picked.length;
    picked = picked.slice(0, toRemove).concat(picked.slice(toRemove + 1));
  }

  return picked;
}

function activites() {
  const isWeekend = ['星期六', '星期日'].indexOf(today().dayOfWeek) !== -1;
  let availableActivites = ACTIVITES;
  if (isWeekend) {
    availableActivites = availableActivites.filter((i) => i.forWeekend);
  }

  const goodActivitesCount = random(98) % 3 + 2;
  const badActivitesCount = random(87) % 3 + 2;
  const pickedActivites = pickItems(
    availableActivites,
    goodActivitesCount + badActivitesCount
  );

  const goodActivites = pickedActivites
    .slice(0, goodActivitesCount)
    .map((i) => i.asGood());
  const badActivites = pickedActivites
    .slice(goodActivitesCount + 1)
    .map((i) => i.asBad());

  return {activites: {good: goodActivites, bad: badActivites}};
}

function drinkings() {
  return {drinkings: pickItems(DRINKS, 2)};
}

function directions() {
  return {directions: DIRECTIONS[random(2) % DIRECTIONS.length]};
}

function goddess() {
  const maxLevel = GODDESS_SYMBOL.length / 2;
  const level = random(maxLevel + 1) % maxLevel;
  return {
    goddess: {
      level,
      symbol: GODDESS_SYMBOL.slice(maxLevel - level, maxLevel * 2 - level),
    },
  };
}

function huangli() {
  return merge(
    today(),
    activites(),
    drinkings(),
    directions(),
    goddess()
  );
};

module.exports = {
  random,

  huangli,
  today,
  activites,
  drinkings,
  directions,
  goddess,
};
