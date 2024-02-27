/**
 *  足球状态id 
 */

export const FOOTBALL_TYPE = {
  1: '未开赛',
  2: '上半场',
  3: '中场',
  4: '下半场',
  5: '加时赛',
  6: '弃用',
  7: '点球决战',
  8: '完场',
  9: '推迟',
  10: '推迟',
  11: '腰斩',
  12: '取消',
  13: '待定',
};

/** 
 * 篮球状态 
 */
export const BASKETBALL_TYPE = {
  1: '未开赛',
  2: '第一节',
  3: '第一节完',
  4: '第二节',
  5: '第二节完',
  6: '第三节',
  7: '第三节完',
  8: '第四节',
  9: '加时',
  10: '完场',
  11: '中断',
  12: '取消',
  13: '延期',
  14: '腰斩',
  15: '待定',
};

/** 未开始 结束灰色状态 */
export const FOOTBALL_STYLE_STATUS_ARR = [2, 3, 4, 5, 7,]
export const BASKETBALLSTYLE_STATUS_ARR = [1, 10]
