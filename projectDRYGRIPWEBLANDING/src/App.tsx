import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Star, Droplets, Trophy, Users, ShoppingCart, Building2, ChevronRight, Tag } from 'lucide-react';

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-1000 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-green-400 fill-green-400' : 'text-gray-600'}`}
        />
      ))}
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const [showBusiness, setShowBusiness] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePurchase = () => {
    if (selectedPlan) {
      navigate('/checkout', { state: { plan: selectedPlan } });
    }
  };

  const playerPacks = [
    { name: "Pack Individual", units: "1 spray DryGripPro", price: "10€", pricePerUnit: 10 },
    { name: "Pack Dúo", units: "2 sprays DryGripPro (10% dto.)", price: "18€", pricePerUnit: 9 },
    { name: "Pack Familia", units: "4 sprays DryGripPro (30% dto.)", price: "28€", pricePerUnit: 7 }
  ];

  return (
    <div className="min-h-screen bg-black">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://i.pinimg.com/originals/cb/37/65/cb37659c78ec90cb1906b98d12a6a495.jpg"
            alt="Padel court background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <AnimatedSection className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl font-bold text-green-400 mb-6 hover:scale-105 transition-transform">DryGripPro</h1>
          <p className="text-2xl text-white mb-8">
            El spray revolucionario que mantiene tus manos secas durante todo el partido
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => navigate('/checkout')}
              className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-300 flex items-center gap-2"
            >
              Comprar Ahora <ShoppingCart className="w-5 h-5" />
            </button>
            <button className="bg-transparent text-white px-8 py-4 rounded-full font-semibold border-2 border-green-400 hover:bg-green-400/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300 flex items-center gap-2">
              Para Empresas <Building2 className="w-5 h-5" />
            </button>
          </div>
        </AnimatedSection>
      </section>

      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center text-green-400 mb-16 hover:scale-105 transition-transform">
              Características Principales
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Droplets className="w-12 h-12 text-green-400 mx-auto mb-4" />,
                title: "Larga Duración",
                description: "Hasta 4 horas de efecto anti-sudor garantizado"
              },
              {
                icon: <Trophy className="w-12 h-12 text-green-400 mx-auto mb-4" />,
                title: "Usado por Profesionales",
                description: "Elegido por los mejores jugadores del circuito"
              },
              {
                icon: <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />,
                title: "Para Todos los Niveles",
                description: "Perfecto tanto para principiantes como expertos"
              }
            ].map((feature, index) => (
              <AnimatedSection 
                key={index}
                className="text-center p-6 rounded-xl bg-black/50 border-2 border-green-400/30 hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300 cursor-pointer"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black/80">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center text-green-400 mb-16 hover:scale-105 transition-transform">
              Lo que dicen nuestros usuarios
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?auto=format&fit=crop&q=80&w=200",
                name: "María García",
                review: "Increíble producto. Ya no tengo que preocuparme por el agarre durante los partidos."
              },
              {
                image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&q=80&w=200",
                name: "Carlos Rodríguez",
                review: "DryGripPro ha mejorado mi juego significativamente. ¡Lo recomiendo!"
              }
            ].map((review, index) => (
              <AnimatedSection 
                key={index}
                className="bg-black/50 p-6 rounded-xl border border-green-400/30 hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-white">{review.name}</h3>
                    <StarRating rating={5} />
                    <p className="mt-2 text-gray-300">"{review.review}"</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center text-green-400 mb-8 hover:scale-105 transition-transform">
              Elige tu Plan
            </h2>
            <div className="flex justify-center gap-4 mb-16">
              <button
                onClick={() => setShowBusiness(false)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  !showBusiness 
                    ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]' 
                    : 'bg-transparent text-white border-2 border-green-400'
                }`}
              >
                Jugadores
              </button>
              <button
                onClick={() => setShowBusiness(true)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  showBusiness 
                    ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]' 
                    : 'bg-transparent text-white border-2 border-green-400'
                }`}
              >
                Empresas
              </button>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-1 gap-8 mb-16 max-w-2xl mx-auto">
            <AnimatedSection className="border-2 border-green-400/30 rounded-xl p-8 bg-black/50">
              {!showBusiness ? (
                <>
                  <h3 className="text-2xl font-bold text-green-400 mb-4">Para Jugadores</h3>
                  <div className="space-y-4">
                    {playerPacks.map((pack) => (
                      <div
                        key={pack.name}
                        onClick={() => setSelectedPlan(pack.name)}
                        className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                          selectedPlan === pack.name
                            ? 'bg-green-400/20 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                            : 'bg-black/30 border-green-400/20 hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                        }`}
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{pack.name}</h4>
                          <p className="text-sm text-gray-400">{pack.units}</p>
                        </div>
                        <p className="font-bold text-xl text-green-400">{pack.price}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handlePurchase}
                    className={`w-full mt-6 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      selectedPlan
                        ? 'bg-green-500 text-white hover:bg-green-600 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]'
                        : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Comprar Ahora <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-green-400 mb-4">Para Empresas</h3>
                  <div className="space-y-4">
                    {[
                      { name: "Pack 100 unidades", desc: "Ideal para clubs pequeños", price: "899€" },
                      { name: "Pack 250 unidades", desc: "Para clubs medianos", price: "1,999€" },
                      { name: "Pack 500 unidades", desc: "Clubs grandes", price: "3,499€" },
                      { name: "Pack 1000 unidades", desc: "Distribuidores", price: "5,999€" }
                    ].map((pack) => (
                      <div
                        key={pack.name}
                        onClick={() => setSelectedPlan(pack.name)}
                        className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                          selectedPlan === pack.name
                            ? 'bg-green-400/20 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                            : 'bg-black/30 border-green-400/20 hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                        }`}
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{pack.name}</h4>
                          <p className="text-sm text-gray-400">{pack.desc}</p>
                        </div>
                        <p className="font-bold text-xl text-green-400">{pack.price}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-6 bg-transparent text-white px-6 py-3 rounded-full font-semibold border-2 border-green-400 hover:bg-green-400/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300 flex items-center justify-center gap-2">
                    Contactar <Building2 className="w-5 h-5" />
                  </button>
                </>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center text-green-400 mb-16 hover:scale-105 transition-transform">
              Mira DryGripPro en acción
            </h2>
          </AnimatedSection>
          <AnimatedSection className="aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border-2 border-green-400/30 hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="DryGripPro en acción"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </AnimatedSection>
        </div>
      </section>

      <footer className="bg-black border-t border-green-400/30 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 DryGripPro. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [referralCode, setReferralCode] = useState('');
  const [appliedCode, setAppliedCode] = useState<string | null>(null);

  const playerPacks = {
    "Pack Individual": { price: 10, units: 1 },
    "Pack Dúo": { price: 18, units: 2 },
    "Pack Familia": { price: 28, units: 4 }
  };

  const selectedPack = location.state?.plan ? playerPacks[location.state.plan as keyof typeof playerPacks] : playerPacks["Pack Individual"];

  const referralCodes = {
    "PAQUITO": { player: "Paquito Navarro", discount: 5 },
    "LEBRON": { player: "Juan Lebrón", discount: 5 },
    "GALAN": { player: "Alejandro Galán", discount: 5 }
  };

  const handleApplyCode = () => {
    if (referralCodes[referralCode as keyof typeof referralCodes]) {
      setAppliedCode(referralCode);
    }
  };

  const calculateTotal = () => {
    const basePrice = selectedPack.price;
    const discount = appliedCode ? referralCodes[appliedCode as keyof typeof referralCodes].discount : 0;
    return basePrice - discount;
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="text-green-400 hover:text-green-300 mb-8 flex items-center gap-2"
        >
          ← Volver
        </button>
        
        <div className="max-w-4xl mx-auto bg-black/50 rounded-xl border-2 border-green-400/30 p-8">
          <h1 className="text-4xl font-bold text-green-400 mb-8">Finalizar Compra</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <img
                src="https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?auto=format&fit=crop&q=80&w=500"
                alt="DryGripPro Spray"
                className="w-full rounded-lg border-2 border-green-400/30 hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300"
              />
              <div className="bg-black/30 p-4 rounded-lg border border-green-400/20">
                <h3 className="font-semibold text-white mb-2">Descripción del Producto</h3>
                <p className="text-gray-400">
                  Spray anti-sudor premium para un agarre perfecto durante todo tu partido. 
                  Efecto duradero hasta 4 horas.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-green-400/20">
                <div>
                  <h3 className="text-xl font-semibold text-white">{location.state?.plan || "Pack Individual"}</h3>
                  <p className="text-gray-400">Spray Anti-sudor Premium</p>
                  <p className="text-sm text-green-400 mt-1">
                    {selectedPack.units} {selectedPack.units > 1 ? 'unidades' : 'unidad'}
                  </p>
                </div>
                <p className="text-xl font-bold text-green-400">{selectedPack.price}€</p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Código de referido"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    className="flex-1 bg-black/30 border border-green-400/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-400"
                  />
                  <button
                    onClick={handleApplyCode}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-300 flex items-center gap-2"
                  >
                    <Tag className="w-4 h-4" /> Aplicar
                  </button>
                </div>
                {appliedCode && (
                  <div className="text-green-400 text-sm">
                    ¡Código de {referralCodes[appliedCode as keyof typeof referralCodes].player} aplicado! 
                    5€ de descuento
                  </div>
                )}
              </div>

              <div className="border-t border-green-400/30 pt-6">
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-white">Total:</span>
                  <span className="text-green-400">{calculateTotal()}€</span>
                </div>
              </div>

              <button className="w-full bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-300">
                Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}

export default App;