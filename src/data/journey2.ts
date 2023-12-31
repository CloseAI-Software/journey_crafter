export const journey2 = `
header:
  role: Marketer
  persona: Emma, 32岁，市场营销专员，工作5年，熟悉公司的业务和市场，但对Salesforce的使用还不够熟练。
  scenario: 基于现有的定制化CRM来数字化MQL handover流程
  goals: 简化MQL的识别和标记过程 - 提高MQL转化率 - 让销售和市场团队更好地协作
stages:
  - stage: MQL识别
    tasks:
    - task: 识别MQL
      touchpoint: 在Salesforce的dashboard中查看新的MQL，并根据预定义的标准判断是否合格。
      emotion: 2
    - task: 标记MQL
      touchpoint: 将合格的MQL标记为“待进一步跟进”的状态，不合格的MQL标记为“无效”。
      emotion: 2

  - stage: 销售退回的MQL分析
    tasks:
    - task: 接收销售退回的MQL
      touchpoint: 收到Salesforce的通知，通知中包含销售退回的MQL的详细信息。
      emotion: 2
    - task: 分析MQL
      touchpoint: 查看Salesforce中的MQL信息和历史记录，分析销售退回的MQL是否可以重新标记为待进一步跟进。
      emotion: 2

  - stage: 跟进协作
    tasks:
    - task: 了解销售的跟进情况
      touchpoint: 在Salesforce中查看销售对MQL的跟进情况，包括跟进的结果和下一步的计划。
      emotion: 2
    - task: 与销售协作
      touchpoint: 如果MQL需要更多的市场营销措施，与销售协作共同制定下一步的营销计划；如果销售需要更多的信息来推进MQL，及时提供支持。
      emotion: 3
  - stage: 反馈和优化
    tasks:
    - task: 与销售和客户联系
      touchpoint: 与销售和客户联系，了解MQL跟进的情况和结果，并听取销售和客户的反馈意见。
      emotion: 2
    - task: 优化MQL handover流程
      touchpoint: 根据反馈意见，及时优化MQL handover的流程和标准，提高MQL转化率和市场营销的效率。
      emotion: 2
`;
