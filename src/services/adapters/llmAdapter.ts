import { OracleCard, ChakraType } from '@/types';

export interface LLMConfig {
  provider: 'mock-simulation' | 'openai' | 'anthropic' | 'gemini';
  apiKey?: string;
  modelName?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  relatedCardId?: number;
  relatedTrackId?: string;
  relatedMentorId?: string;
}

export interface LLMResponse {
  content: string;
  tokensUsed: number;
  model: string;
  isSimulated: boolean;
  latencyMs: number;
  relatedCardId?: number;
  relatedTrackId?: string;
  relatedMentorId?: string;
}

/**
 * Adapter interface for connecting real LLMs in production.
 */
export interface LLMAdapter {
  chat(messages: LLMMessage[], config?: Partial<LLMConfig>): Promise<LLMResponse>;
  synthesizeReading(cards: OracleCard[], question: string, locale: 'zh' | 'en'): Promise<string>;
}

// Local deterministic AI simulation engine
export class LocalSimulationLLMAdapter implements LLMAdapter {
  private isSimulation = true;

  async chat(messages: LLMMessage[], config?: Partial<LLMConfig>): Promise<LLMResponse> {
    const startTime = Date.now();
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content || '';
    
    // Deterministic reflection matching with ecosystem cross-links
    const { reply, relatedCardId, relatedTrackId, relatedMentorId } = this.generateSimulatedReply(lastUserMsg);
    
    // Simulate brief thinking delay
    await new Promise(resolve => setTimeout(resolve, 400));

    return {
      content: reply,
      tokensUsed: Math.floor(reply.length * 1.3),
      model: 'soulscape-sim-v1 (Deterministic Template Engine)',
      isSimulated: true,
      latencyMs: Date.now() - startTime,
      relatedCardId,
      relatedTrackId,
      relatedMentorId
    };
  }

  async synthesizeReading(cards: OracleCard[], question: string, locale: 'zh' | 'en'): Promise<string> {
    if (cards.length === 1) {
      const card = cards[0];
      if (locale === 'zh') {
        return `【DEMO SIMULATION · 演示模拟】针对你提问的「${question || '当下核心课题'}」，抽取的「${card.nameZh}」给出了关键的指引。该牌属于${card.realmZh}，对应${card.chakra}。牌义启示：${card.lightMeaningZh}。你的潜意识此时正呼唤着${card.keywordsZh.join('、')}。请牢记思考题：${card.reflectionPromptZh}`;
      } else {
        return `[DEMO SIMULATION] In response to your question "${question || 'Current Life Theme'}", the single drawn card "${card.nameEn}" reveals deep guidance. Residing in the ${card.realmEn} realm and corresponding to the ${card.chakra} chakra, it illuminates: "${card.lightMeaningEn}". Your subconscious resonates with ${card.keywordsEn.join(', ')}. Contemplate: ${card.reflectionPromptEn}`;
      }
    } else {
      // 3 cards
      const [c1, c2, c3] = cards;
      if (locale === 'zh') {
        return `【DEMO SIMULATION · 演示模拟】针对「${question || '深层课题探索'}」的三牌阵全息综合解析：\n\n1. 过去根源【${c1.nameZh}】：揭示了曾经导致能量积淀的成因。${c1.keywordsZh[0]}与${c1.keywordsZh[1]}在过往塑造了你的防御模式。\n2. 当下焦点【${c2.nameZh}】：当前能量流动的核心枢纽，呼应${c2.chakra}的觉察。${c2.lightMeaningZh}\n3. 未来启示【${c3.nameZh}】：破局的转化之道在于${c3.keywordsZh.join('与')}。不再向外索求评判，回归内在${c3.nameZh}的笃定力量。\n\n整合建议：今晚建议配合${c2.relatedMusicTag === 'calm' ? '翡翠心泉(639Hz)' : '黄金意志(528Hz)'}进行10分钟静心，让直觉在深层呼吸中生根。`;
      } else {
        return `[DEMO SIMULATION] Holistic 3-card spread synthesis for "${question || 'Life Path Inquiry'}":\n\n1. Past Foundation [${c1.nameEn}]: Illustrates historical grounding and recurring emotional patterns around ${c1.keywordsEn.slice(0, 2).join(' & ')}.\n2. Present Pivot [${c2.nameEn}]: The focal center aligned with the ${c2.chakra} chakra. ${c2.lightMeaningEn}\n3. Future Horizon [${c3.nameEn}]: The evolutionary path calls for ${c3.keywordsEn.join(', ')}. Step boldly into self-trust.\n\nIntegration Advice: Listen to the corresponding frequency track to ground this somatic reflection tonight.`;
      }
    }
  }

  private generateSimulatedReply(userQuery: string): {
    reply: string;
    relatedCardId?: number;
    relatedTrackId?: string;
    relatedMentorId?: string;
  } {
    const q = userQuery.toLowerCase();

    if (q.includes('焦虑') || q.includes('压力') || q.includes('anxiety') || q.includes('stress')) {
      return {
        reply: `【DEMO SIMULATION · 演示模拟】我感受到了你此刻身体传来的紧绷信号。在身心医学中，焦虑通常是大脑杏仁核过度警戒、试图保护你的本能反应。\n\n试着先放下对“解决问题”的急迫感，做两次“生理性长叹气”：吸气两次，长长呼气。\n\n若你想更系统地舒缓，已为你联动推荐「海底轮·396Hz清障冥想」及今日代表安全感扎根的「#01 大地基石」神谕卡。`,
        relatedCardId: 1,
        relatedTrackId: 'music-1',
        relatedMentorId: 'mentor-1'
      };
    }

    if (q.includes('睡') || q.includes('失眠') || q.includes('sleep') || q.includes('insomnia')) {
      return {
        reply: `【DEMO SIMULATION · 演示模拟】夜晚是意识卸下白日伪装与重担的时刻。失眠往往是大脑还在试图处理未完成的“责任清单”。\n\n今晚不妨开启我们为你准备的「万念归息·德尔塔波夜间入眠之旅」，将灯光调暗，让 1.5Hz 的低频雨声慢慢安抚你的自律神经系统。你可以安心睡去，明天自会拥有崭新的能量。`,
        relatedCardId: 6,
        relatedTrackId: 'music-8',
        relatedMentorId: 'mentor-2'
      };
    }

    if (q.includes('关系') || q.includes('爱') || q.includes('分手') || q.includes('love') || q.includes('relationship')) {
      return {
        reply: `【DEMO SIMULATION · 演示模拟】亲密关系是一面最清澈也最尖锐的镜子，往往映照出我们对被接纳与被看见的深层渴望。\n\n心轮的智慧告诉我们：真正的爱始于对自己阴影的全然接纳。当你不再把“自我确认”的责任全盘托付给对方时，关系中的紧张便会开始融化。建议你查阅导师苏念真老师的个案与心轮专题。`,
        relatedCardId: 34,
        relatedTrackId: 'music-4',
        relatedMentorId: 'mentor-1'
      };
    }

    if (q.includes('脉轮') || q.includes('chakra') || q.includes('能量') || q.includes('energy')) {
      return {
        reply: `【DEMO SIMULATION · 演示模拟】人体七脉轮从底部的海底轮（生存根基）到顶端的顶轮（灵性觉知），构成了一条完整的能量光谱。如果你感到某一区域受阻，可以先从身体体感进行排查。\n\n例如喉轮对应真实表达，心轮对应慈悲与接纳。你可以在顶部导航进入「七脉轮」专区，查看每一个脉轮的调频赫兹与平衡练习。`,
        relatedCardId: 23,
        relatedTrackId: 'music-3',
        relatedMentorId: 'mentor-2'
      };
    }

    if (q.includes('卡') || q.includes('牌') || q.includes('oracle') || q.includes('reading')) {
      return {
        reply: `【DEMO SIMULATION · 演示模拟】神谕卡是一种通过共时性与象征隐喻唤醒潜意识自我洞察的工具。它并不做宿命式的预判，而是帮助你看清此刻思维中的盲区。\n\n你可以前往「神谕占读」页面，选择今日单牌或深度三牌阵，在静心中洗牌、揭开属于你的觉知镜映。`,
        relatedCardId: 1,
        relatedTrackId: 'music-1',
        relatedMentorId: 'mentor-1'
      };
    }

    // Default reflective response
    return {
      reply: `【DEMO SIMULATION · 演示模拟】感谢你的真诚敞开。生命中的每一个困惑与停顿，其实都是潜意识向表层意识发出的调频邀请。\n\n试着闭上双眼，问问自己：在刚才这段提问的背后，你内心最渴望被满足的深层感受是什么？是安全感、被认可，还是纯粹的宁静？\n\n（提示：当前对话由本地预设模板模拟驱动。真实生产部署时，可通过我们提供的 LLM Adapter 无缝对接 OpenAI/Claude/Gemini 官方大模型 API。）`,
      relatedCardId: 11,
      relatedTrackId: 'music-4',
      relatedMentorId: 'mentor-3'
    };
  }
}

export const defaultLLMAdapter = new LocalSimulationLLMAdapter();
