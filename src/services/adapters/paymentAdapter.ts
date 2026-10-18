export interface PaymentOrder {
  orderId: string;
  itemType: 'credit_pack' | 'membership' | 'course' | 'mentor_booking';
  itemId: string;
  amountRmb: number;
  creditsPurchased?: number;
  titleZh: string;
  titleEn: string;
}

export interface PaymentResult {
  success: boolean;
  orderId: string;
  transactionId: string;
  timestamp: string;
  messageZh: string;
  messageEn: string;
  isSimulated: boolean;
}

/**
 * Adapter interface for real payment gateways (Stripe, WeChat Pay, Alipay, Apple Pay).
 */
export interface PaymentGatewayAdapter {
  createOrder(order: PaymentOrder): Promise<{ checkoutUrl?: string; orderId: string }>;
  confirmPayment(orderId: string): Promise<PaymentResult>;
}

export class MockPaymentAdapter implements PaymentGatewayAdapter {
  async createOrder(order: PaymentOrder): Promise<{ checkoutUrl?: string; orderId: string }> {
    return {
      orderId: `MOCK-ORDER-${Date.now()}`
    };
  }

  async confirmPayment(orderId: string): Promise<PaymentResult> {
    // Simulate payment processing latency
    await new Promise(resolve => setTimeout(resolve, 600));

    return {
      success: true,
      orderId,
      transactionId: `TX-MOCK-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      messageZh: '【演示模式】模拟结算成功，真实环境无需扣款，账户积分已即时更新。',
      messageEn: '[DEMO MODE] Mock checkout confirmed. No actual card charged. Balance credited.',
      isSimulated: true
    };
  }
}

export const defaultPaymentAdapter = new MockPaymentAdapter();
