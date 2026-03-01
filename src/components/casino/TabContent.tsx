import { CASINO_DATA } from '@/data/casino-data';

interface TabContentProps {
  activeTab: string;
}

const TabContent = ({ activeTab }: TabContentProps) => {
  return (
    <div
      className="p-5 px-6"
      style={{
        background: 'rgba(30, 33, 40, 0.95)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderTop: 'none',
        borderRadius: '0 0 16px 16px',
        marginTop: 2,
      }}
    >
      {activeTab === 'overview' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Обзор {CASINO_DATA.name}</h2>
          <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {CASINO_DATA.name} — это современное онлайн-казино, предлагающее широкий выбор игр от {CASINO_DATA.totalProviders}+ ведущих провайдеров. Казино работает по лицензии Кюрасао и предоставляет игрокам безопасный и комфортный игровой опыт.
          </p>
          <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Платформа поддерживает {CASINO_DATA.totalPayments}+ платёжных систем, включая криптовалюты, и гарантирует быстрые выплаты. Новые игроки могут воспользоваться приветственным бонусом {CASINO_DATA.bonusOffer} по промокоду {CASINO_DATA.promoCode}.
          </p>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 mt-6">
            <div className="info-card">
              <div className="text-2xl font-bold text-primary">{CASINO_DATA.totalProviders}+</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Провайдеров игр</div>
            </div>
            <div className="info-card">
              <div className="text-2xl font-bold text-primary">{CASINO_DATA.totalPayments}+</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Платёжных систем</div>
            </div>
            <div className="info-card">
              <div className="text-2xl font-bold" style={{ color: '#34D399' }}>24/7</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Служба поддержки</div>
            </div>
            <div className="info-card">
              <div className="text-2xl font-bold" style={{ color: '#34D399' }}>1-24ч</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Время выплаты</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bonuses' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Бонусы {CASINO_DATA.name}</h2>
          <div className="info-card mb-4" style={{ background: 'rgba(245,158,11,0.05)', borderColor: 'rgba(245,158,11,0.15)' }}>
            <div className="text-[11px] uppercase tracking-widest font-semibold mb-1" style={{ color: 'rgba(245,158,11,0.6)' }}>Приветственный бонус</div>
            <div className="text-2xl font-extrabold mb-1">{CASINO_DATA.bonusOffer}</div>
            <div className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{CASINO_DATA.bonusDesc}</div>
            <div className="mt-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Промокод: <span className="font-mono-casino font-bold text-primary">{CASINO_DATA.promoCode}</span>
            </div>
          </div>
          <div className="info-card mb-4">
            <div className="text-[11px] uppercase tracking-widest font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Кэшбек</div>
            <div className="text-xl font-bold mb-1">До 10% еженедельно</div>
            <div className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Возврат части проигранных средств каждую неделю</div>
          </div>
          <div className="info-card">
            <div className="text-[11px] uppercase tracking-widest font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>VIP программа</div>
            <div className="text-xl font-bold mb-1">10 уровней</div>
            <div className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Персональный менеджер, повышенные лимиты, эксклюзивные турниры</div>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Отзывы о {CASINO_DATA.name}</h2>
          {[
            { name: 'Алексей К.', stars: 5, text: 'Отличное казино! Быстрые выплаты, большой выбор слотов. Промокод сработал сразу.' },
            { name: 'Марина Д.', stars: 4, text: 'Хороший бонус на старте. Поддержка отвечает быстро. Единственный минус — верификация занимает время.' },
            { name: 'Олег В.', stars: 5, text: 'Играю уже полгода. Всегда стабильные выплаты, VIP-программа реально работает.' },
          ].map((review, i) => (
            <div key={i} className={`info-card ${i < 2 ? 'mb-3' : ''}`}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-sm">{review.name}</span>
                <span className="text-primary">
                  {'★'.repeat(review.stars)}
                  {review.stars < 5 && <span style={{ color: 'rgba(255,255,255,0.15)' }}>{'★'.repeat(5 - review.stars)}</span>}
                </span>
              </div>
              <p className="text-sm leading-relaxed m-0" style={{ color: 'rgba(255,255,255,0.5)' }}>{review.text}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'payments' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Платёжные системы</h2>
          <div className="grid grid-cols-3 max-sm:grid-cols-2 gap-3">
            {CASINO_DATA.payments.map((p, i) => (
              <div key={i} className="info-card flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-black"
                  style={{ background: `${p.color}18`, color: p.color }}
                >
                  {p.abbr}
                </div>
                <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'faq' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Часто задаваемые вопросы</h2>
          {[
            { q: 'Как активировать промокод?', a: `Введите промокод ${CASINO_DATA.promoCode} при регистрации или в личном кабинете в разделе "Бонусы".` },
            { q: 'Сколько времени занимает вывод средств?', a: 'Обработка заявки на вывод занимает от 1 до 24 часов в зависимости от выбранного метода оплаты.' },
            { q: 'Есть ли верификация?', a: 'Да, казино может запросить верификацию личности для обеспечения безопасности вашего аккаунта.' },
            { q: 'Какие провайдеры доступны?', a: `На платформе представлено более ${CASINO_DATA.totalProviders} провайдеров, включая Pragmatic Play, Microgaming, NetEnt и другие.` },
          ].map((faq, i) => (
            <div key={i} className={`info-card ${i < 3 ? 'mb-3' : ''}`}>
              <div className="font-semibold text-sm mb-2">{faq.q}</div>
              <div className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{faq.a}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TabContent;
