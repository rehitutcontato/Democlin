'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Sparkles,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Lock,
  Hospital,
  ChevronDown,
  Stethoscope,
  Activity,
  HeartHandshake,
  Send,
  X,
  FileText,
  Sliders,
  ExternalLink,
  Crown
} from 'lucide-react';

const WHATSAPP_NUMBER = '5519994656845';
const BASE_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=`;
const DEFAULT_WHATSAPP_MSG = encodeURIComponent(
  'Olá, gostaria de solicitar uma consulta reservada de avaliação cirúrgica.'
);

// Types
interface Procedure {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  recoveryBadge: string;
  hospitalStay: string;
  returnToRoutine: string;
  technologies: string[];
  keyBenefits: string[];
  anatomicalFocus: string;
  clinicalCriteria: string;
}

interface SimulatorPlan {
  id: string;
  title: string;
  subtitle: string;
  hospitalStay: string;
  recoveryTime: string;
  technologies: string[];
  supportProtocol: string[];
  hospitalUnit: string;
  whatsappMessage: string;
}

const PROCEDURES_DATA: Procedure[] = [
  {
    id: 'lipo-hd',
    title: 'Lipo HD de Definição Anatômica',
    category: 'Contorno Corporal Avançado',
    tagline: 'Escultura muscular tridimensional com máxima retração dérmica.',
    description:
      'Escultura muscular guiada por Vaser e Renuvion para retração cutânea máxima sem cortes extensos. Protocolo concebido para revelar a anatomia atlética natural respeitando os eixos de tensão miofascial.',
    recoveryBadge: 'Recuperação Ativa: 7 a 10 dias',
    hospitalStay: 'Day Clinic Hospitalar ou 24h em Suíte Privativa',
    returnToRoutine: 'Atividades sociais em 7 dias; treino leve guiado em 21 dias',
    technologies: [
      'Emulsificação Ultrassônica Vaser',
      'Helium Plasma Renuvion (Retração até 60%)',
      'Ultrassonografia Intraoperatória Dinâmica'
    ],
    keyBenefits: [
      'Acentuação dos relevos musculares sem aspecto artificial',
      'Retração homogênea de pele em abdômen, flancos e dorso',
      'Menor índice de edema e hematomas por preservação vascular'
    ],
    anatomicalFocus: 'Abdômen, dorso, cintura escapular e glúteos com enxertia estruturada intramuscular guiada.',
    clinicalCriteria: 'Indicado para pacientes próximos ao peso ideal com tônus muscular preservado e que buscam acabamento de contorno cirúrgico milimétrico.'
  },
  {
    id: 'dual-plane',
    title: 'Mamoplastia Estruturada com Dual Plane',
    category: 'Arquitetura Mamária',
    tagline: 'Estabilidade biomecânica e colo com transição suave a longo prazo.',
    description:
      'Estabilidade a longo prazo com cicatrizes reduzidas e sustentação muscular fisiológica. O implante é posicionado no plano submuscular parcial com reforço de sutiã interno em fio absorvível de sustentação.',
    recoveryBadge: 'Retorno Social: 5 a 7 dias',
    hospitalStay: '24 horas de observação em ambiente hospitalar JCI',
    returnToRoutine: 'Retorno ao trabalho em 5 dias; elevação de membros superiores guiada em 14 dias',
    technologies: [
      'Dissecção Precisa por Radiofrequência',
      'Sutiã Interno com Fixação no Sulco Inframamário',
      'Implantes de Superfície Microtexturizada / Nanotexturada'
    ],
    keyBenefits: [
      'Transição de colo natural sem o efeito de borda marcada',
      'Fixação muscular que previne a queda precoce (ptose tardia)',
      'Cicatrizes mínimas milimetricamente posicionadas no sulco'
    ],
    anatomicalFocus: 'Reestruturação parenquimatosa mamária com sustentação biomecânica inframamária.',
    clinicalCriteria: 'Ideal para mulheres que buscam restauração de volume ou mastopexia estruturada sem necessidade de trocas precoces de implantes.'
  },
  {
    id: 'deep-plane',
    title: 'Deep Plane Facelift & Rejuvenescimento Facial',
    category: 'Plástica Facial Anatômica',
    tagline: 'Reposicionamento profundo do SMAS com preservação da mímica facial.',
    description:
      'Reposicionamento anatômico profundo das estruturas faciais preservando a mímica natural. Ao liberar os ligamentos retentores da face, devolvemos a posição juvenil dos tecidos sem nenhuma tração na pele.',
    recoveryBadge: 'Convalescença Social: 12 a 15 dias',
    hospitalStay: '24h em Suíte Privativa com suporte de enfermagem dedicada',
    returnToRoutine: 'Presença social discreta em 14 dias; compromissos de vídeo em 10 dias',
    technologies: [
      'Microdissecção Magnificada de Alta Resolução',
      'Liberação Anatômica dos Ligamentos Zigomáticos e Mandibulares',
      'Nano-Lipoenxertia Regenerativa com Células Tronco Mesenquimais'
    ],
    keyBenefits: [
      'Harmonia absoluta sem o estigma de face tracionada ou operada',
      'Definição escultural da linha mandibular e pescoço (ângulo cervicomental)',
      'Rejuvenescimento tridimensional com durabilidade superior a 10 anos'
    ],
    anatomicalFocus: 'Terço médio, terço inferior da face, platisma cervical e pálpebras estruturadas.',
    clinicalCriteria: 'Pacientes a partir dos 42 anos que buscam rejuvenescimento definitivo com acabamento indetectável e nobre.'
  }
];

const SIMULATOR_PLANS: Record<string, SimulatorPlan> = {
  corporal: {
    id: 'corporal',
    title: 'Contorno Corporal de Alta Definição',
    subtitle: 'Protocolo Vaser HD + Plasma Renuvion + Enxertia Guiada',
    hospitalStay: 'Day Clinic Especializado ou 24h em Suíte Hospitalar',
    recoveryTime: '7 a 10 dias para compromissos sociais; 21 dias para atividades físicas',
    technologies: [
      'Vaser Ultrasonic Lipo System de 3ª Geração',
      'J-Plasma Renuvion para coagulação subdérmica',
      'Ultrassom dinâmico intraoperatório para segurança vascular'
    ],
    supportProtocol: [
      'Equipe de enfermagem domiciliar nas primeiras 48h de pós-operatório',
      '10 sessões de reabilitação fisioterápica e drenagem linfática inclusas',
      'Laser Fotobiomodulação para cicatrização acelerada e anti-edema',
      'Cintas pós-cirúrgicas personalizadas com corte a laser sem costuras'
    ],
    hospitalUnit: 'Hospital Vera Cruz (Cambuí) ou Hospital Albert Einstein (SP)',
    whatsappMessage: encodeURIComponent(
      'Olá, utilizei o Simulador de Planejamento Cirúrgico e gostaria de agendar uma consulta focada em Contorno Corporal de Alta Definição (Lipo HD).'
    )
  },
  mamas: {
    id: 'mamas',
    title: 'Arquitetura e Sustentação Mamária',
    subtitle: 'Protocolo Dual Plane Submuscular + Sutiã Interno Estruturado',
    hospitalStay: '24 horas de monitoramento hospitalar dedicado',
    recoveryTime: '5 a 7 dias para rotina profissional; 30 dias para esforço peitoral',
    technologies: [
      'Sutiã Interno em Monocryl com ancoragem periosteal',
      'Dissecção piezoelétrica/radiofrequência com hemostasia fria',
      'Implantes com rastreabilidade por microchip RFID integrado'
    ],
    supportProtocol: [
      'Acompanhamento de enfermagem e curativos impermeáveis com filme de poliuretano',
      'Laser profilático nas cicatrizes no 15º e 30º dia pós-operatório',
      'Sutiãs de estabilização pós-cirúrgica confeccionados sob medida',
      'Linha direta 24h com a equipe de anestesiologia e cirurgia'
    ],
    hospitalUnit: 'Hospital Sírio-Libanês ou Hospital Madre Theodora (Campinas)',
    whatsappMessage: encodeURIComponent(
      'Olá, utilizei o Simulador de Planejamento Cirúrgico e gostaria de agendar uma consulta focada em Mamoplastia Estruturada com Dual Plane.'
    )
  },
  face: {
    id: 'face',
    title: 'Rejuvenescimento Facial Profundo (Deep Plane)',
    subtitle: 'Deep Plane Facelift + Platismoplastia Cervical + Microenxertia',
    hospitalStay: '24h em Suíte Privativa com enfermagem exclusiva',
    recoveryTime: '12 a 15 dias de recolhimento social; maquiagem leve a partir do 10º dia',
    technologies: [
      'Microscopia Cirúrgica de alta ampliação para preservação de ramos nervosos',
      'Platysma Hammock para restauração do ângulo da mandíbula e colo',
      'Centrifugação fechada de gordura para nano-enxertia tecidual'
    ],
    supportProtocol: [
      'Crioterapia de fluxo contínuo nas primeiras 36 horas para minimizar hematomas',
      'Drenagem linfática facial manual realizada por fisioterapeuta dermatofuncional',
      'Terapia com LED e Laser para atenuação rápida de micropontos cirúrgicos',
      'Retirada de pontos em etapas com protocolo asséptico domiciliar'
    ],
    hospitalUnit: 'Hospital Alemão Oswaldo Cruz (SP) ou Hospital Vera Cruz (Cambuí)',
    whatsappMessage: encodeURIComponent(
      'Olá, utilizei o Simulador de Planejamento Cirúrgico e gostaria de agendar uma consulta focada em Deep Plane Facelift e Rejuvenescimento Facial.'
    )
  }
};

const FAQ_ITEMS = [
  {
    q: 'Qual o padrão de segurança anestésica e ambiente hospitalar adotado?',
    a: 'Rigor irrestrito: nenhum procedimento com sedação profunda ou anestesia geral é realizado em consultório ou clínicas de rua. Operamos exclusivamente em centros hospitalares de excelência com UTI acreditada internacionalmente (JCI), presença de anestesiologista dedicado em tempo integral na sala e monitoramento do Índice Bispectral (BIS), garantindo plano anestésico estável, ausência de dor e despertar sereno sem náuseas.'
  },
  {
    q: 'Como atuam as tecnologias de retração como Renuvion e Vaser na qualidade da pele?',
    a: 'O Vaser utiliza energia ultrassônica suave para emulsionar seletivamente o tecido adiposo, preservando vasos sanguíneos, terminações nervosas e a matriz de colágeno. Em seguida, a cânula do Renuvion introduz gás hélio ionizado e radiofrequência no plano subdérmico, provocando contração térmica imediata dos septos fibrosos e retração de até 60% da flacidez tecidual, dispensando cortes extensos em pacientes com flacidez leve a moderada.'
  },
  {
    q: 'Qual o período recomendado de repouso antes de voos e viagens internacionais?',
    a: 'Para pacientes que residem fora do eixo Campinas-São Paulo ou no exterior, nosso protocolo exige permanência mínima de 10 a 14 dias para intervenções corporais (Lipo HD) e 12 a 15 dias para cirurgias faciais. Esse intervalo permite a realização de retornos clínicos presenciais, sessões iniciais de reabilitação e liberação médica segura com profilaxia mecânica e medicamentosa para prevenção de trombose venosa profunda (TVP).'
  },
  {
    q: 'Como funciona a política de confidencialidade e discrição para figuras públicas e executivos?',
    a: 'Dispomos de um protocolo concierge de blindagem de privacidade. As consultas contam com agendamento em horário reservado com o andar restrito e estacionamento privativo com acesso direto ao consultório sem trânsito pela recepção geral. Durante a internação hospitalar, viabilizamos o cadastro com identificação confidencial, além de toda a equipe assistencial e pós-operatória assinar termos estritos de confidencialidade (NDA).'
  }
];

export default function MasterLandingPage() {
  const [activeProcedureModal, setActiveProcedureModal] = useState<Procedure | null>(null);
  const [selectedSimulatorTab, setSelectedSimulatorTab] = useState<'corporal' | 'mamas' | 'face'>('corporal');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationUnit, setConsultationUnit] = useState<'cambui' | 'jardins'>('cambui');
  const [consultationInterest, setConsultationInterest] = useState('Contorno Corporal (Lipo HD)');
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);

  const currentPlan = SIMULATOR_PLANS[selectedSimulatorTab];

  const handleOpenWhatsApp = (customMsg?: string) => {
    const msg = customMsg || DEFAULT_WHATSAPP_MSG;
    window.open(`${BASE_WHATSAPP_URL}${msg}`, '_blank', 'noopener,noreferrer');
  };

  const handleCustomConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const unitText = consultationUnit === 'cambui' ? 'Cambuí (Campinas)' : 'Jardins (São Paulo)';
    const customText = encodeURIComponent(
      `Olá, gostaria de solicitar uma consulta reservada no Instituto Vanguarda.\n• Unidade de Preferência: ${unitText}\n• Foco Cirúrgico: ${consultationInterest}\nPor favor, confirmem a disponibilidade da agenda concierge.`
    );
    window.open(`${BASE_WHATSAPP_URL}${customText}`, '_blank', 'noopener,noreferrer');
    setIsConsultationModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-zinc-100 selection:bg-amber-500/20 selection:text-amber-200 overflow-x-hidden font-sans-clean">
      {/* Background Architectural Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top radial amber aura */}
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.12),transparent_70%)] blur-[100px]" />
        {/* Subtle mid-page illumination */}
        <div className="absolute top-[40%] right-[-10%] w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(180,83,9,0.06),transparent_70%)] blur-[120px]" />
        {/* Bottom subtle glow */}
        <div className="absolute bottom-[10%] left-[-10%] w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05),transparent_70%)] blur-[140px]" />
        {/* Subtle architectural noise/grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      {/* 1. DYNAMIC FLOATING BAR (TOPO) */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-zinc-950/75 border-b border-amber-400/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16 gap-3">
            {/* Brand / Medical Seal */}
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full border border-amber-400/30 bg-amber-950/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(217,119,6,0.2)]">
                <span className="font-serif-luxury font-bold text-amber-300 text-sm tracking-widest">IV</span>
              </div>
              <div className="min-w-0">
                <a
                  href="#hero"
                  className="font-serif-luxury text-sm sm:text-base font-semibold tracking-wider text-zinc-100 hover:text-amber-200 transition-colors truncate block"
                >
                  INSTITUTO VANGUARDA
                </a>
                <p className="text-[10px] text-amber-300/80 uppercase tracking-widest font-mono hidden sm:block truncate">
                  Corpo Clínico RQE / Titular SBCP
                </p>
              </div>
            </div>

            {/* Concierge Pulse Status (Center on desktop) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-emerald-500/20 shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs text-zinc-300 font-medium tracking-wide">
                Agenda Particular Concierge Ativa
              </span>
            </div>

            {/* Quick Glass Action */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsConsultationModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-400/30 hover:border-amber-400/60 bg-amber-500/5 hover:bg-amber-500/10 text-xs font-medium text-amber-200 transition-all duration-200"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>Planejar Consulta</span>
              </button>
              <button
                onClick={() => handleOpenWhatsApp()}
                className="relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 hover:from-amber-500/30 hover:to-amber-400/40 text-amber-100 border border-amber-400/40 hover:border-amber-300 text-xs sm:text-sm font-medium shadow-[0_0_20px_rgba(217,119,6,0.25)] transition-all duration-300 active:scale-95"
              >
                <Send className="w-3.5 h-3.5 text-amber-300" />
                <span className="whitespace-nowrap">Atendimento Reservado</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10">
        {/* 2. HERO SECTION CINEMATOGRÁFICA */}
        <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Visual Overline & Badge */}
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/40 border border-amber-400/30 text-amber-300 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(217,119,6,0.15)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>ALTA DEFINIÇÃO ANATÔMICA & CIRURGIA DE PRECISÃO</span>
              </motion.div>

              {/* Imposing Serif Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-zinc-100 leading-[1.15] text-balance mb-6"
              >
                A convergência entre{' '}
                <span className="italic font-normal bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 bg-clip-text text-transparent">
                  rigor cirúrgico
                </span>{' '}
                e a naturalidade absoluta do contorno corporal.
              </motion.h1>

              {/* Subheadline de Alta Autoridade */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-zinc-300/90 font-normal leading-relaxed max-w-3xl mb-10 text-balance"
              >
                Protocolos cirúrgicos avançados em ambiente hospitalar de ponta, desenhados para pacientes que exigem privacidade, previsibilidade e recuperação assistida por tecnologia.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16"
              >
                <button
                  onClick={() => handleOpenWhatsApp()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-semibold text-sm sm:text-base tracking-wide shadow-[0_10px_35px_rgba(245,158,11,0.35)] hover:shadow-[0_15px_45px_rgba(245,158,11,0.5)] transition-all duration-300 active:scale-[0.98]"
                >
                  <span>Solicitar Consulta Privada via Concierge</span>
                  <ArrowRight className="w-4 h-4 text-zinc-950" />
                </button>

                <a
                  href="#procedimentos"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl backdrop-blur-2xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/10 hover:border-amber-400/40 text-zinc-200 text-sm sm:text-base font-medium transition-all duration-200"
                >
                  <span>Explorar Protocolos de Assinatura</span>
                </a>
              </motion.div>

              {/* Floating Glass Metrics (3 Columns) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full text-left"
              >
                {/* Metric 1 */}
                <div className="p-6 rounded-2xl backdrop-blur-2xl bg-zinc-950/60 border border-amber-400/20 hover:border-amber-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Hospital className="w-5 h-5 text-amber-300" />
                    </div>
                    <span className="text-[11px] font-mono tracking-widest text-amber-400/80 uppercase">Acreditação</span>
                  </div>
                  <h2 className="font-serif-luxury text-2xl font-semibold text-zinc-100 mb-1.5">
                    100% Hospitalar
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    Procedimentos realizados exclusivamente em hospitais de referência com centro cirúrgico de alta tecnologia e UTI acreditada.
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="p-6 rounded-2xl backdrop-blur-2xl bg-zinc-950/60 border border-amber-400/20 hover:border-amber-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Activity className="w-5 h-5 text-amber-300" />
                    </div>
                    <span className="text-[11px] font-mono tracking-widest text-amber-400/80 uppercase">Precisão</span>
                  </div>
                  <h2 className="font-serif-luxury text-2xl font-semibold text-zinc-100 mb-1.5">
                    Sub-Milimétrico
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    Tecnologia guiada por ultrassom e retração de pele com plasma, assegurando preservação tecidual e simetria anatômica.
                  </p>
                </div>

                {/* Metric 3 */}
                <div className="p-6 rounded-2xl backdrop-blur-2xl bg-zinc-950/60 border border-amber-400/20 hover:border-amber-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Lock className="w-5 h-5 text-amber-300" />
                    </div>
                    <span className="text-[11px] font-mono tracking-widest text-amber-400/80 uppercase">Sigilo</span>
                  </div>
                  <h2 className="font-serif-luxury text-2xl font-semibold text-zinc-100 mb-1.5">
                    Privacidade Total
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    Entrada exclusiva, elevadores privativos e fluxo confidencial desenhado para figuras públicas, executivos e pacientes seletos.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. VITRINE INTERATIVA DE PROCEDIMENTOS DE ASSINATURA */}
        <section id="procedimentos" className="py-20 border-t border-amber-400/10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono tracking-[0.25em] text-amber-400 uppercase">
                Excelência Cirúrgica Sob Medida
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-zinc-100 mt-2 mb-4">
                Procedimentos de Assinatura
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Técnicas cirúrgicas de última geração amparadas por bioengenharia, hemostasia seletiva e recuperação guiada por protocolos internacionais.
              </p>
            </div>

            {/* 3 Procedimentos Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {PROCEDURES_DATA.map((proc, index) => (
                <div
                  key={proc.id}
                  className="flex flex-col justify-between p-7 sm:p-8 rounded-2xl backdrop-blur-2xl bg-zinc-950/70 border border-amber-400/20 hover:border-amber-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 relative group overflow-hidden"
                >
                  {/* Subtle Top Gold Hairline Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Category & Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[11px] font-mono tracking-widest text-amber-400/90 uppercase">
                        {proc.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-[11px] font-medium text-amber-300">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {proc.recoveryBadge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif-luxury text-2xl font-normal text-zinc-100 group-hover:text-amber-200 transition-colors mb-2">
                      {proc.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xs font-medium text-amber-400/90 italic mb-4">
                      &quot;{proc.tagline}&quot;
                    </p>

                    {/* Description */}
                    <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                      {proc.description}
                    </p>

                    {/* Tech List */}
                    <div className="space-y-2 mb-8 pt-4 border-t border-white/[0.06]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                        Diferenciais Tecnológicos
                      </span>
                      {proc.technologies.map((tech) => (
                        <div key={tech} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/[0.06] flex flex-col gap-2.5">
                    <button
                      onClick={() => setActiveProcedureModal(proc)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl backdrop-blur-md bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 hover:border-amber-400/60 text-amber-200 text-xs sm:text-sm font-medium transition-all duration-200"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>Ficha Técnica Completa</span>
                    </button>

                    <button
                      onClick={() =>
                        handleOpenWhatsApp(
                          encodeURIComponent(
                            `Olá, gostaria de saber mais sobre o protocolo de ${proc.title} via Recepção Privada.`
                          )
                        )
                      }
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 hover:border-amber-400/30 text-xs sm:text-sm font-medium transition-all duration-200"
                    >
                      <span>Saber Mais via Recepção Privada</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PROTOCOLO DA JORNADA CONCIERGE (EXPERIÊNCIA DO PACIENTE) */}
        <section id="jornada" className="py-20 border-t border-amber-400/10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono tracking-[0.25em] text-amber-400 uppercase">
                Experiência Sem Atritos
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-zinc-100 mt-2 mb-4">
                Protocolo da Jornada Concierge
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Cada detalhe orquestrado com precisão cirúrgica suíça e acolhimento de hotelaria 6 estrelas, do primeiro contato ao pós-operatório tardio.
              </p>
            </div>

            {/* Stepper Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Step 1 */}
              <div
                onClick={() => setActiveTimelineStep(0)}
                className={`cursor-pointer p-8 rounded-2xl backdrop-blur-2xl transition-all duration-300 relative border ${
                  activeTimelineStep === 0
                    ? 'bg-zinc-900/90 border-amber-400/50 shadow-[0_15px_40px_rgba(217,119,6,0.15)] ring-1 ring-amber-400/30'
                    : 'bg-zinc-950/60 border-amber-400/15 hover:border-amber-400/30'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif-luxury text-4xl font-light text-amber-300/80">01</span>
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-400/20 flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-amber-400" />
                  </div>
                </div>
                <h3 className="font-serif-luxury text-xl font-normal text-zinc-100 mb-2">
                  Consulta Diagnóstica de 90 Minutos
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                  Escaneamento tridimensional, alinhamento minucioso de expectativas e mapeamento de saúde global.
                </p>
                <ul className="space-y-1.5 text-xs text-zinc-400">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Análise antropométrica e biofotônica
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Plano cirúrgico simulado em alta resolução
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Checkup cardiológico e hematológico integrado
                  </li>
                </ul>
              </div>

              {/* Step 2 */}
              <div
                onClick={() => setActiveTimelineStep(1)}
                className={`cursor-pointer p-8 rounded-2xl backdrop-blur-2xl transition-all duration-300 relative border ${
                  activeTimelineStep === 1
                    ? 'bg-zinc-900/90 border-amber-400/50 shadow-[0_15px_40px_rgba(217,119,6,0.15)] ring-1 ring-amber-400/30'
                    : 'bg-zinc-950/60 border-amber-400/15 hover:border-amber-400/30'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif-luxury text-4xl font-light text-amber-300/80">02</span>
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-400/20 flex items-center justify-center">
                    <Hospital className="w-4 h-4 text-amber-400" />
                  </div>
                </div>
                <h3 className="font-serif-luxury text-xl font-normal text-zinc-100 mb-2">
                  Intervenção Hospitalar com Blindagem Tecnológica
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                  Sala cirúrgica de última geração, anestesiologia exclusiva e monitoramento contínuo.
                </p>
                <ul className="space-y-1.5 text-xs text-zinc-400">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Acreditação JCI e retaguarda de CTI 24 horas
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Hemostasia fria e monitorização cerebral BIS
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Suíte privativa com serviço de hotelaria premium
                  </li>
                </ul>
              </div>

              {/* Step 3 */}
              <div
                onClick={() => setActiveTimelineStep(2)}
                className={`cursor-pointer p-8 rounded-2xl backdrop-blur-2xl transition-all duration-300 relative border ${
                  activeTimelineStep === 2
                    ? 'bg-zinc-900/90 border-amber-400/50 shadow-[0_15px_40px_rgba(217,119,6,0.15)] ring-1 ring-amber-400/30'
                    : 'bg-zinc-950/60 border-amber-400/15 hover:border-amber-400/30'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif-luxury text-4xl font-light text-amber-300/80">03</span>
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-400/20 flex items-center justify-center">
                    <HeartHandshake className="w-4 h-4 text-amber-400" />
                  </div>
                </div>
                <h3 className="font-serif-luxury text-xl font-normal text-zinc-100 mb-2">
                  Suporte Pós-Operatório Domiciliar
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                  Equipe de enfermagem dedicada, drenagem linfática especializada e laser para otimização cicatricial.
                </p>
                <ul className="space-y-1.5 text-xs text-zinc-400">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Assistência domiciliar nas primeiras 48h
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Fisioterapia dermatofuncional in company
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Protocolo a laser profilático para linha cirúrgica
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Concierge Assistance Pill */}
            <div className="mt-12 p-6 rounded-2xl backdrop-blur-xl bg-zinc-950/50 border border-amber-400/20 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-sm text-zinc-300">
                  Pacientes de fora de Campinas ou São Paulo contam com transfer executivo blindado e conciergerie para reservas na rede hoteleira de alta categoria.
                </span>
              </div>
              <button
                onClick={() => handleOpenWhatsApp()}
                className="shrink-0 text-xs font-medium text-amber-300 hover:text-amber-200 border-b border-amber-400/40 pb-0.5 transition-colors flex items-center gap-1"
              >
                <span>Falar com o Concierge Pessoal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* 5. SIMULADOR INTERATIVO DE PLANEJAMENTO CIRÚRGICO */}
        <section id="simulador" className="py-20 border-t border-amber-400/10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono tracking-[0.25em] text-amber-400 uppercase">
                Previsibilidade e Transparência Clínica
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-zinc-100 mt-2 mb-4">
                Simulador Interativo de Planejamento Cirúrgico
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Selecione o seu objetivo cirúrgico principal e examine a ficha técnica com estimativa de internação, convalescença e tecnologias assistidas.
              </p>
            </div>

            {/* Simulator Interactive Box */}
            <div className="max-w-4xl mx-auto rounded-3xl backdrop-blur-2xl bg-zinc-950/80 border border-amber-400/25 shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-6 sm:p-10">
              {/* Category Segmented Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-zinc-900/80 rounded-xl border border-white/5 mb-8">
                <button
                  onClick={() => setSelectedSimulatorTab('corporal')}
                  className={`py-3 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    selectedSimulatorTab === 'corporal'
                      ? 'bg-gradient-to-r from-amber-400/30 to-amber-500/20 text-amber-200 border border-amber-400/40 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Contorno Corporal
                </button>
                <button
                  onClick={() => setSelectedSimulatorTab('mamas')}
                  className={`py-3 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    selectedSimulatorTab === 'mamas'
                      ? 'bg-gradient-to-r from-amber-400/30 to-amber-500/20 text-amber-200 border border-amber-400/40 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Mamas Estruturadas
                </button>
                <button
                  onClick={() => setSelectedSimulatorTab('face')}
                  className={`py-3 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    selectedSimulatorTab === 'face'
                      ? 'bg-gradient-to-r from-amber-400/30 to-amber-500/20 text-amber-200 border border-amber-400/40 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Face & Pescoço
                </button>
              </div>

              {/* Dynamic Technical Sheet */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPlan.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Title & Tagline */}
                  <div className="border-b border-white/[0.08] pb-5">
                    <span className="text-[11px] font-mono tracking-widest text-amber-400/80 uppercase">
                      Ficha de Parâmetros Técnicos Estimados
                    </span>
                    <h3 className="font-serif-luxury text-2xl sm:text-3xl text-zinc-100 font-light mt-1">
                      {currentPlan.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-300/90 font-medium mt-1">
                      {currentPlan.subtitle}
                    </p>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Internação */}
                    <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider mb-1">
                        <Hospital className="w-4 h-4" />
                        <span>Tempo de Internação Hospitalar</span>
                      </div>
                      <p className="text-sm font-medium text-zinc-100">
                        {currentPlan.hospitalStay}
                      </p>
                    </div>

                    {/* Retorno */}
                    <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider mb-1">
                        <Clock className="w-4 h-4" />
                        <span>Retorno à Rotina & Convalescença</span>
                      </div>
                      <p className="text-sm font-medium text-zinc-100">
                        {currentPlan.recoveryTime}
                      </p>
                    </div>
                  </div>

                  {/* Included Technologies & Protocols */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Technologies */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400/90 mb-3 flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5" />
                        <span>Tecnologias Hospitalares de Ponta</span>
                      </h4>
                      <div className="space-y-2">
                        {currentPlan.technologies.map((t) => (
                          <div key={t} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Support Protocol */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400/90 mb-3 flex items-center gap-2">
                        <HeartHandshake className="w-3.5 h-3.5" />
                        <span>Protocolo de Suporte Integrado</span>
                      </h4>
                      <div className="space-y-2">
                        {currentPlan.supportProtocol.map((sp) => (
                          <div key={sp} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                            <span>{sp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hospital Unit Note */}
                  <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-400/20 flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs text-zinc-300">
                      <strong className="text-amber-200">Unidades de Internação Credenciadas:</strong>{' '}
                      {currentPlan.hospitalUnit}.
                    </span>
                  </div>

                  {/* CTA Direct to WhatsApp */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-zinc-400 text-center sm:text-left">
                      *Estimativas orientativas. O plano definitivo é estritamente customizado em consulta presencial.
                    </p>
                    <button
                      onClick={() => handleOpenWhatsApp(currentPlan.whatsappMessage)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-semibold text-xs sm:text-sm shadow-[0_4px_25px_rgba(245,158,11,0.3)] transition-all"
                    >
                      <span>Validar Disponibilidade Cirúrgica via WhatsApp</span>
                      <ArrowRight className="w-4 h-4 text-zinc-950" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 6. FAQ DE SEGURANÇA MÉDICA (ACORDEÃO COM FÍSICA FRAMER MOTION) */}
        <section id="seguranca" className="py-20 border-t border-amber-400/10 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-mono tracking-[0.25em] text-amber-400 uppercase">
                Rigor Científico & Transparência
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-zinc-100 mt-2 mb-4">
                FAQ de Segurança Médica & Ética
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Respostas diretas e transparentes sobre tecnologia, ambiente cirúrgico, tempo de repouso e sigilo profissional.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={item.q}
                    className="rounded-2xl backdrop-blur-2xl bg-zinc-950/60 border border-amber-400/20 hover:border-amber-400/40 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                    >
                      <span className="font-serif-luxury text-base sm:text-lg text-zinc-100 font-medium">
                        {item.q}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0 w-7 h-7 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-amber-400"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-5 pb-6 sm:px-6 sm:pb-7 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/[0.06] pt-4">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* UNIDADES & ATENDIMENTO RESERVADO BANNER */}
        <section className="py-16 border-t border-amber-400/10 relative bg-gradient-to-b from-zinc-950 to-[#050505]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Unidade Cambuí */}
              <div className="p-8 rounded-3xl backdrop-blur-2xl bg-zinc-950/70 border border-amber-400/20 hover:border-amber-400/40 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase">
                    Polo Campinas
                  </span>
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="font-serif-luxury text-2xl text-zinc-100 font-light mb-1">
                  Unidade Cambuí
                </h3>
                <p className="text-xs text-amber-300/90 font-mono mb-4">
                  Av. Coronel Silva Telles, 1020 • Cambuí, Campinas / SP
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  Estrutura ambulatorial de avaliação tridimensional e retaguarda cirúrgica contígua aos principais centros hospitalares de Campinas.
                </p>
                <button
                  onClick={() =>
                    handleOpenWhatsApp(
                      encodeURIComponent(
                        'Olá, gostaria de solicitar uma consulta no Instituto Vanguarda - Unidade Cambuí (Campinas).'
                      )
                    )
                  }
                  className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors"
                >
                  <span>Agendar Consulta no Cambuí</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Unidade Jardins */}
              <div className="p-8 rounded-3xl backdrop-blur-2xl bg-zinc-950/70 border border-amber-400/20 hover:border-amber-400/40 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase">
                    Polo São Paulo Capital
                  </span>
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="font-serif-luxury text-2xl text-zinc-100 font-light mb-1">
                  Unidade Jardins
                </h3>
                <p className="text-xs text-amber-300/90 font-mono mb-4">
                  Rua Bela Cintra, 2180 • Jardins, São Paulo / SP
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  Atendimento privativo para executivos e pacientes internacionais com suporte cirúrgico nos hospitais Albert Einstein e Sírio-Libanês.
                </p>
                <button
                  onClick={() =>
                    handleOpenWhatsApp(
                      encodeURIComponent(
                        'Olá, gostaria de solicitar uma consulta no Instituto Vanguarda - Unidade Jardins (São Paulo).'
                      )
                    )
                  }
                  className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors"
                >
                  <span>Agendar Consulta nos Jardins</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. RODAPÉ INSTITUCIONAL BLINDADO */}
      <footer className="border-t border-amber-400/20 bg-zinc-950 pt-16 pb-24 md:pb-16 text-zinc-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Col 1: Brand & Identity */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-amber-400/30 bg-amber-950/40 flex items-center justify-center">
                  <span className="font-serif-luxury font-bold text-amber-300 text-sm">IV</span>
                </div>
                <span className="font-serif-luxury text-base font-semibold text-zinc-100 tracking-wider">
                  INSTITUTO VANGUARDA
                </span>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed max-w-md">
                Centro de Cirurgia Plástica de Precisão & Contorno Corporal Avançado. Atuação pautada pela ética estrita, segurança hospitalar e preservação da harmonia anatômica humana.
              </p>
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1 text-[11px] text-zinc-300 font-mono">
                <p>Responsável Técnico Médico: Dr. Alexandre Vanguarda</p>
                <p>CRM-SP 184.920 • RQE 82.411 • Membro Titular SBCP</p>
              </div>
            </div>

            {/* Col 2: Unidades */}
            <div className="space-y-3">
              <h4 className="font-serif-luxury text-zinc-200 text-sm font-medium tracking-wide">
                Unidades Concierge
              </h4>
              <ul className="space-y-2 text-[11px] text-zinc-400">
                <li>
                  <strong className="text-zinc-300 block">Cambuí - Campinas/SP</strong>
                  Av. Coronel Silva Telles, 1020
                </li>
                <li>
                  <strong className="text-zinc-300 block">Jardins - São Paulo/SP</strong>
                  Rua Bela Cintra, 2180
                </li>
                <li className="pt-2">
                  <span className="text-amber-400/90 font-mono block">Central WhatsApp Concierge:</span>
                  <a
                    href={BASE_WHATSAPP_URL + DEFAULT_WHATSAPP_MSG}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-200 hover:text-amber-300 transition-colors font-mono"
                  >
                    +55 (19) 99465-6845
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Links Rápidos */}
            <div className="space-y-3">
              <h4 className="font-serif-luxury text-zinc-200 text-sm font-medium tracking-wide">
                Navegação
              </h4>
              <ul className="space-y-2 text-[11px]">
                <li>
                  <a href="#hero" className="hover:text-amber-300 transition-colors">
                    Início & Filosofia
                  </a>
                </li>
                <li>
                  <a href="#procedimentos" className="hover:text-amber-300 transition-colors">
                    Procedimentos de Assinatura
                  </a>
                </li>
                <li>
                  <a href="#jornada" className="hover:text-amber-300 transition-colors">
                    Jornada Concierge
                  </a>
                </li>
                <li>
                  <a href="#simulador" className="hover:text-amber-300 transition-colors">
                    Simulador Cirúrgico
                  </a>
                </li>
                <li>
                  <a href="#seguranca" className="hover:text-amber-300 transition-colors">
                    Segurança & Conformidade CFM
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* CFM & CODAME Legal Disclaimer */}
          <div className="border-t border-white/[0.08] pt-8 pb-8 text-[11px] text-zinc-500 leading-relaxed space-y-2">
            <p>
              <strong className="text-zinc-400">Nota Legal & Resoluções CFM/CODAME:</strong> As informações contidas neste portal têm caráter exclusivamente informativo e educativo, em estrita conformidade com as resoluções do Conselho Federal de Medicina (CFM nº 2.336/2023) e Código de Ética Médica. A cirurgia plástica é uma ciência de meios, não de fins ou garantias de resultados, sendo a indicação cirúrgica exclusivamente definida após detalhada anamnese e exame clínico presencial.
            </p>
          </div>

          {/* PARVUS SPACE OFFICIAL SIGNATURE */}
          <div className="border-t border-amber-400/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
            <p className="text-center sm:text-left" suppressHydrationWarning>
              © {new Date().getFullYear()} Instituto Vanguarda de Cirurgia Plástica. Todos os direitos reservados.
            </p>

            <div className="flex items-center gap-2 text-zinc-300 font-mono text-center sm:text-right">
              <span>Digital Architecture by</span>
              <a
                href="https://parvuspace.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-200 font-semibold underline decoration-amber-400/40 hover:decoration-amber-300 transition-all inline-flex items-center gap-1"
              >
                Parvus Space (parvuspace.com.br)
                <ExternalLink className="w-3 h-3 inline" />
              </a>
              <span className="hidden sm:inline text-zinc-600">|</span>
              <a
                href={BASE_WHATSAPP_URL + DEFAULT_WHATSAPP_MSG}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-300 transition-colors"
              >
                +55 (19) 99465-6845
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY CONCIERGE BAR (Complies with 15% Mobile Sticky Cap) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden backdrop-blur-2xl bg-zinc-950/90 border-t border-amber-400/25 px-4 py-2.5 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-zinc-200 truncate font-serif-luxury">
              Instituto Vanguarda
            </p>
            <p className="text-[9px] text-amber-300 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Concierge Online
            </p>
          </div>
          <button
            onClick={() => handleOpenWhatsApp()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-semibold text-xs shadow-md active:scale-95 transition-all"
          >
            <Send className="w-3 h-3 text-zinc-950" />
            <span>Consulta Reservada</span>
          </button>
        </div>
      </div>

      {/* DETAIL MODAL: FICHA TÉCNICA DO PROCEDIMENTO */}
      <AnimatePresence>
        {activeProcedureModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl my-8 rounded-3xl backdrop-blur-2xl bg-zinc-950 border border-amber-400/30 shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-6 sm:p-8 text-zinc-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProcedureModal(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-amber-400/50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Content */}
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase">
                    {activeProcedureModal.category}
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-zinc-100 font-light mt-1">
                    {activeProcedureModal.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-300 font-medium italic mt-1">
                    &quot;{activeProcedureModal.tagline}&quot;
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/70 border border-white/5 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400">
                    Indicação e Foco Anatômico
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {activeProcedureModal.anatomicalFocus}
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed border-t border-white/5 pt-2">
                    <strong className="text-zinc-300">Critério Clínico:</strong> {activeProcedureModal.clinicalCriteria}
                  </p>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
                    Benefícios e Segurança Biomecânica
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                    {activeProcedureModal.keyBenefits.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hospital and Recovery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-zinc-900/50 border border-white/5">
                    <span className="text-zinc-400 block mb-0.5 font-mono">Regime Hospitalar:</span>
                    <span className="text-zinc-200 font-medium">{activeProcedureModal.hospitalStay}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/50 border border-white/5">
                    <span className="text-zinc-400 block mb-0.5 font-mono">Convalescença Social:</span>
                    <span className="text-zinc-200 font-medium">{activeProcedureModal.returnToRoutine}</span>
                  </div>
                </div>

                {/* Modal CTA */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-end gap-3">
                  <button
                    onClick={() => setActiveProcedureModal(null)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/10 text-xs font-medium text-zinc-400 hover:text-white"
                  >
                    Fechar
                  </button>
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(
                        `Olá, analisei a ficha técnica de ${activeProcedureModal.title} e gostaria de agendar uma consulta presencial de avaliação.`
                      );
                      handleOpenWhatsApp(msg);
                      setActiveProcedureModal(null);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-semibold text-xs shadow-md"
                  >
                    <span>Solicitar Consulta para este Protocolo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONSULTATION PLANNING MODAL */}
      <AnimatePresence>
        {isConsultationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl backdrop-blur-2xl bg-zinc-950 border border-amber-400/30 shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-6 sm:p-8 text-zinc-200"
            >
              <button
                onClick={() => setIsConsultationModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-amber-400/50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <form onSubmit={handleCustomConsultationSubmit} className="space-y-5">
                <div>
                  <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase">
                    Atendimento Particular Exclusivo
                  </span>
                  <h3 className="font-serif-luxury text-2xl text-zinc-100 font-light mt-1">
                    Solicitar Consulta Concierge
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Selecione a sua unidade preferencial e o foco cirúrgico para direcionamento imediato à recepção médica privada.
                  </p>
                </div>

                {/* Unidade */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block mb-2">
                    Unidade de Preferência
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setConsultationUnit('cambui')}
                      className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                        consultationUnit === 'cambui'
                          ? 'border-amber-400 bg-amber-500/10 text-amber-200'
                          : 'border-white/10 bg-zinc-900/60 text-zinc-400'
                      }`}
                    >
                      <strong className="block text-zinc-200">Cambuí</strong>
                      Campinas / SP
                    </button>
                    <button
                      type="button"
                      onClick={() => setConsultationUnit('jardins')}
                      className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                        consultationUnit === 'jardins'
                          ? 'border-amber-400 bg-amber-500/10 text-amber-200'
                          : 'border-white/10 bg-zinc-900/60 text-zinc-400'
                      }`}
                    >
                      <strong className="block text-zinc-200">Jardins</strong>
                      São Paulo / SP
                    </button>
                  </div>
                </div>

                {/* Procedimento */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block mb-2">
                    Foco da Avaliação Cirúrgica
                  </label>
                  <select
                    value={consultationInterest}
                    onChange={(e) => setConsultationInterest(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-amber-400/60"
                  >
                    <option value="Contorno Corporal (Lipo HD Vaser + Renuvion)">
                      Contorno Corporal (Lipo HD Vaser + Renuvion)
                    </option>
                    <option value="Mamoplastia Estruturada com Dual Plane">
                      Mamoplastia Estruturada com Dual Plane
                    </option>
                    <option value="Deep Plane Facelift & Rejuvenescimento Facial">
                      Deep Plane Facelift & Rejuvenescimento Facial
                    </option>
                    <option value="Cirurgia Combinada (Mamas + Contorno Corporal)">
                      Cirurgia Combinada (Mamas + Contorno Corporal)
                    </option>
                    <option value="Consulta Geral de Avaliação Prévia">
                      Consulta Geral de Avaliação Prévia
                    </option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-400/20 text-[11px] text-zinc-300">
                  <ShieldCheck className="w-4 h-4 text-amber-400 inline mr-1.5" />
                  Privacidade médica blindada. Seus dados são protegidos por sigilo profissional irrestrito.
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-zinc-950 font-semibold text-xs sm:text-sm shadow-[0_4px_25px_rgba(245,158,11,0.35)] active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4 text-zinc-950" />
                  <span>Transmitir Solicitação ao Concierge WhatsApp</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
