
export const stripeService = {
  /**
   * Redireciona para o Checkout do Stripe para assinatura do plano.
   */
  async createSubscription(planId: string) {
    console.log(`Iniciando checkout Stripe para o plano: ${planId}`);
    // Em produção: chamada para a Edge Function do Supabase que gera a Session
    return { url: 'https://checkout.stripe.com/pay/mock_session' };
  },

  /**
   * Gera link de pagamento para uma Ordem de Serviço faturada.
   */
  async createOSPayment(osId: string, amount: number) {
    console.log(`Gerando pagamento de R$ ${amount} para OS ${osId}`);
    return { url: 'https://stripe.com/pay/os_mock' };
  },

  /**
   * Abre o Portal do Cliente do Stripe para gestão de cartões e histórico.
   */
  async openBillingPortal() {
    console.log("Abrindo Stripe Customer Portal...");
    window.location.href = 'https://billing.stripe.com/p/session/mock';
  }
};
