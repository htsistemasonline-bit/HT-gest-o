/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { QRCodeSVG } from 'qrcode.react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Package, 
  DollarSign, 
  BarChart3, 
  Settings, 
  FileText, 
  PlusCircle, 
  MessageSquare,
  ClipboardList,
  Globe,
  BookOpen,
  Zap,
  Activity,
  Briefcase,
  Lock,
  Target,
  Megaphone,
  UserCheck,
  PieChart,
  ChevronRight,
  Menu,
  X,
  LogOut,
  Search,
  Trash2,
  Save,
  Plus,
  Link as LinkIcon,
  Copy,
  QrCode,
  Download,
  CheckCircle2,
  Clock,
  Stethoscope,
  Star,
  Camera,
  History,
  FileUp,
  Truck,
  Tag,
  UserCog,
  Home,
  UserPlus,
  RefreshCw,
  Send,
  User
} from 'lucide-react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut, signInAnonymously } from 'firebase/auth';
import { collection, addDoc, query, where, onSnapshot, orderBy, limit, getDocs, deleteDoc, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick, badge }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
      active 
        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon size={18} className={active ? 'text-white' : 'group-hover:text-orange-400'} />
    <span className="text-sm font-medium flex-1 text-left">{label}</span>
    {badge && (
      <span className="bg-orange-600 text-[10px] px-1.5 py-0.5 rounded-full text-white">
        {badge}
      </span>
    )}
  </button>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="px-4 mt-6 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
    {children}
  </h3>
);

// --- Pages ---

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    city: '',
    source: 'Instagram'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'clients'), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao enviar cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#1a1d21] flex items-center justify-center p-4">
        <div className="bg-[#252930] p-8 rounded-2xl shadow-2xl text-center max-w-md w-full border border-white/5">
          <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserCheck size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Cadastro Realizado!</h2>
          <p className="text-gray-400 mb-8">Obrigado por se cadastrar. Em breve entraremos em contato.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all"
          >
            Novo Cadastro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1d21] flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Htestudio</h1>
          <p className="text-gray-400 text-sm">Sistema Unificado de Cadastro e Solicitações</p>
          <div className="flex justify-center gap-4 mt-4 text-orange-500">
             <span className="text-xs">tattooht@uorak.com</span>
          </div>
        </div>

        <div className="bg-[#252930] rounded-2xl shadow-2xl border border-white/5 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-orange-500 to-emerald-600 w-1/2"></div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white">Seus Dados</h2>
              <p className="text-gray-400 text-sm">Confirme ou atualize seus dados pessoais</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-orange-500 uppercase mb-1.5">Nome Completo *</label>
                <input
                  required
                  type="text"
                  className="w-full bg-[#1a1d21] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-orange-500 uppercase mb-1.5">Email</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-[#1a1d21] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-orange-500 uppercase mb-1.5">WhatsApp</label>
                  <input
                    required
                    type="tel"
                    className="w-full bg-[#1a1d21] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-orange-500 uppercase mb-1.5">Data de Nascimento</label>
                  <input
                    type="date"
                    className="w-full bg-[#1a1d21] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
                    value={formData.birthDate}
                    onChange={e => setFormData({...formData, birthDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-orange-500 uppercase mb-1.5">Cidade</label>
                  <input
                    type="text"
                    className="w-full bg-[#1a1d21] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
                    placeholder="Sua cidade"
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-orange-500 uppercase mb-1.5">Como nos conheceu?</label>
                <select
                  className="w-full bg-[#1a1d21] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all appearance-none"
                  value={formData.source}
                  onChange={e => setFormData({...formData, source: e.target.value})}
                >
                  <option>Instagram</option>
                  <option>Facebook</option>
                  <option>Indicação</option>
                  <option>Google</option>
                  <option>Outros</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button type="button" className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all uppercase text-sm">
                ← Voltar
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="flex-[2] bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all uppercase text-sm shadow-lg shadow-orange-500/20 disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'Continuar →'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Início');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientSearch, setClientSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [cadastrosSubView, setCadastrosSubView] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        setIsLoggedIn(true);
      }
    });
  }, []);

  const handleLogin = async () => {
    try {
      await signInAnonymously(auth);
      setIsLoggedIn(true);
    } catch (error: any) {
      if (error.code === 'auth/admin-restricted-operation') {
        console.warn("A autenticação anônima está desativada no Console do Firebase. Continuando com sessão local.");
      } else {
        console.error("Erro ao entrar:", error);
      }
      // Fallback to local state if Firebase Auth fails or is disabled
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    setIsLoggedIn(false);
    setUser(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0f1115] flex items-center justify-center p-4">
        <div className="bg-[#1a1d21] p-10 rounded-3xl shadow-2xl border border-white/5 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 rotate-12">
            <Lock size={40} className="text-orange-500" />
          </div>
          <h1 className="text-3xl font-black text-white mb-8 tracking-tight">HT Gestão</h1>
          <button
            onClick={handleLogin}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-3 uppercase tracking-widest font-aurora text-xl"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1115] flex text-gray-100 font-sans">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 0, opacity: sidebarOpen ? 1 : 0 }}
        className="bg-[#1a1d21] border-r border-white/5 overflow-hidden flex flex-col h-screen sticky top-0"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
            <LayoutDashboard size={24} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter">HT GESTÃO</span>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-6 custom-scrollbar">
          <SectionTitle>Principal</SectionTitle>
          <SidebarItem icon={LayoutDashboard} label="Início" active={activeTab === 'Início'} onClick={() => setActiveTab('Início')} />
          
          <SectionTitle>Formulários</SectionTitle>
          <SidebarItem icon={ClipboardList} label="Formulários" active={activeTab === 'Formulários'} onClick={() => setActiveTab('Formulários')} />
          <SidebarItem icon={LinkIcon} label="Formulários p/ Clientes" active={activeTab === 'Formulários p/ Clientes'} onClick={() => setActiveTab('Formulários p/ Clientes')} />
          <SidebarItem icon={PlusCircle} label="Criador de Formulários" active={activeTab === 'Criador de Formulários'} onClick={() => setActiveTab('Criador de Formulários')} />
          
          <SectionTitle>Presença Online</SectionTitle>
          <SidebarItem icon={Globe} label="Seu Site" active={activeTab === 'Seu Site'} onClick={() => setActiveTab('Seu Site')} />
          <SidebarItem icon={BookOpen} label="Seu Catálogo" active={activeTab === 'Seu Catálogo'} onClick={() => setActiveTab('Seu Catálogo')} />
          
          <SectionTitle>Operacional</SectionTitle>
          <SidebarItem icon={Zap} label="Acesso Rápido" active={activeTab === 'Acesso Rápido'} onClick={() => setActiveTab('Acesso Rápido')} />
          <SidebarItem icon={Calendar} label="Agenda" active={activeTab === 'Agenda'} onClick={() => setActiveTab('Agenda')} badge="3" />
          <SidebarItem icon={Activity} label="Visão Geral" active={activeTab === 'Visão Geral'} onClick={() => setActiveTab('Visão Geral')} />
          <SidebarItem icon={Briefcase} label="Diagnóstico" active={activeTab === 'Diagnóstico'} onClick={() => setActiveTab('Diagnóstico')} />
          <SidebarItem icon={Settings} label="Todos Serviços" active={activeTab === 'Todos Serviços'} onClick={() => setActiveTab('Todos Serviços')} />
          
          <SectionTitle>CRM</SectionTitle>
          <SidebarItem icon={Users} label="Clientes" active={activeTab === 'Clientes'} onClick={() => setActiveTab('Clientes')} />
          <SidebarItem icon={Calendar} label="Aniversariantes" active={activeTab === 'Aniversariantes'} onClick={() => setActiveTab('Aniversariantes')} />

          <SectionTitle>Vendas & Atendimento</SectionTitle>
          <SidebarItem icon={Lock} label="Caixa Diário (Fechado)" active={activeTab === 'Caixa Diário'} onClick={() => setActiveTab('Caixa Diário')} />
          <SidebarItem icon={FileText} label="Orçamentos" active={activeTab === 'Orçamentos'} onClick={() => setActiveTab('Orçamentos')} badge="1" />
          <SidebarItem icon={ClipboardList} label="Gerenciar Orçamentos" active={activeTab === 'Gerenciar Orçamentos'} onClick={() => setActiveTab('Gerenciar Orçamentos')} />
          <SidebarItem icon={LayoutDashboard} label="Orçamentos (Kanban)" active={activeTab === 'Orçamentos (Kanban)'} onClick={() => setActiveTab('Orçamentos (Kanban)')} />
          <SidebarItem icon={Users} label="Atendimentos" active={activeTab === 'Atendimentos'} onClick={() => setActiveTab('Atendimentos')} />
          <SidebarItem icon={UserCheck} label="Cadastros" active={activeTab === 'Cadastros'} onClick={() => setActiveTab('Cadastros')} />
          
          <SectionTitle>Gestão</SectionTitle>
          <SidebarItem icon={Package} label="Estoque" active={activeTab === 'Estoque'} onClick={() => setActiveTab('Estoque')} />
          <SidebarItem icon={DollarSign} label="Financeiro" active={activeTab === 'Financeiro'} onClick={() => setActiveTab('Financeiro')} />
          
          <SectionTitle>Estratégia</SectionTitle>
          <SidebarItem icon={Target} label="Crescimento" active={activeTab === 'Crescimento'} onClick={() => setActiveTab('Crescimento')} />
          <SidebarItem icon={Megaphone} label="Marketing" active={activeTab === 'Marketing'} onClick={() => setActiveTab('Marketing')} />
          <SidebarItem icon={Users} label="Análise de Clientes" active={activeTab === 'Análise de Clientes'} onClick={() => setActiveTab('Análise de Clientes')} />
          <SidebarItem icon={BarChart3} label="Relatórios" active={activeTab === 'Relatórios'} onClick={() => setActiveTab('Relatórios')} />
        </div>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-[#1a1d21]/80 backdrop-blur-md border-bottom border-white/5 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg text-gray-400 transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h2 className="text-lg font-bold text-white">{activeTab}</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="bg-[#0f1115] border border-white/5 rounded-full pl-10 pr-4 py-1.5 text-sm focus:border-orange-500 outline-none w-64 transition-all"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white leading-none">{user?.displayName || 'Administrador'}</p>
                <p className="text-[10px] text-gray-500 mt-1">HT Gestão</p>
              </div>
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-lg border border-white/10" />
              ) : (
                <div className="w-8 h-8 rounded-lg border border-white/10 bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold text-xs">
                  HT
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'Início' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard title="Faturamento Mensal" value="R$ 12.450,00" trend="+12%" icon={DollarSign} color="orange" />
                  <StatCard title="Novos Clientes" value="48" trend="+5%" icon={Users} color="blue" />
                  <StatCard title="Agendamentos" value="12" trend="Hoje" icon={Calendar} color="green" />
                  <StatCard title="Taxa de Conversão" value="68%" trend="+2%" icon={BarChart3} color="purple" />
                  
                  <div className="col-span-1 lg:col-span-3 bg-[#1a1d21] rounded-3xl p-8 border border-white/5">
                    <h3 className="text-xl font-bold mb-6">Timeline de Atividades</h3>
                    <div className="space-y-6">
                      <TimelineItem time="09:00" title="Tatuagem Realismo" client="João Silva" status="Confirmado" />
                      <TimelineItem time="11:30" title="Piercing Septo" client="Maria Oliveira" status="Em andamento" />
                      <TimelineItem time="14:00" title="Consulta Orçamento" client="Pedro Santos" status="Aguardando" />
                      <TimelineItem time="16:00" title="Tatuagem Blackwork" client="Ana Costa" status="Agendado" />
                    </div>
                  </div>

                  <div className="bg-[#1a1d21] rounded-3xl p-8 border border-white/5">
                    <h3 className="text-xl font-bold mb-6">Ações Rápidas</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <QuickAction icon={PlusCircle} label="Novo Agendamento" onClick={() => setActiveTab('Agenda')} />
                      <QuickAction 
                        icon={UserCheck} 
                        label="Novo Cliente" 
                        onClick={() => {
                          setActiveTab('Cadastros');
                          setCadastrosSubView('Cadastrar Clientes');
                        }} 
                      />
                      <QuickAction icon={FileText} label="Novo Orçamento" onClick={() => setActiveTab('Orçamentos')} />
                      <QuickAction icon={DollarSign} label="Lançar Despesa" onClick={() => setActiveTab('Financeiro')} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Clientes' && (
                <div className="bg-[#1a1d21] rounded-3xl border border-white/5 overflow-hidden">
                  <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-xl font-bold">Lista de Clientes</h3>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                          type="text"
                          placeholder="Buscar cliente pelo nome..."
                          value={clientSearch}
                          onChange={(e) => setClientSearch(e.target.value)}
                          className="w-full bg-[#0f1115] border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:border-orange-500 outline-none transition-all"
                        />
                      </div>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap">
                        Exportar CSV
                      </button>
                    </div>
                  </div>
                  <ClientsList onSelectClient={setSelectedClient} searchTerm={clientSearch} />
                </div>
              )}

              {activeTab === 'Aniversariantes' && (
                <BirthdayManager />
              )}

              {activeTab === 'Gerenciar Orçamentos' && (
                <BudgetManager />
              )}

              {activeTab === 'Formulários p/ Clientes' && (
                <ClientForms />
              )}

              {activeTab === 'Formulários' && (
                <div className="bg-[#1a1d21] rounded-3xl border border-white/5 overflow-hidden">
                  <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-xl font-bold">Meus Formulários</h3>
                    <button 
                      onClick={() => setActiveTab('Criador de Formulários')}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    >
                      Novo Formulário
                    </button>
                  </div>
                  <FormsList />
                </div>
              )}

              {activeTab === 'Criador de Formulários' && (
                <FormBuilder onSave={() => setActiveTab('Formulários')} />
              )}

              {activeTab === 'Cadastros' && (
                <div className="space-y-6">
                  {!cadastrosSubView ? (
                    <CadastrosMenu onSelect={setCadastrosSubView} />
                  ) : (
                    <>
                      {cadastrosSubView === 'Cadastrar Clientes' && (
                        <InternalClientRegistration onBack={() => setCadastrosSubView(null)} />
                      )}
                      {cadastrosSubView === 'Histórico dos Clientes' && (
                        <ClientHistory onBack={() => setCadastrosSubView(null)} />
                      )}
                      {cadastrosSubView === 'Lista de Clientes' && (
                        <div className="bg-[#1a1d21] rounded-3xl border border-white/5 overflow-hidden">
                          <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <h3 className="text-xl font-bold">Lista de Clientes</h3>
                            <div className="flex gap-2">
                              <button onClick={() => setCadastrosSubView(null)} className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all">
                                Voltar
                              </button>
                              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all">
                                Exportar CSV
                              </button>
                            </div>
                          </div>
                          <ClientsList onSelectClient={setSelectedClient} />
                        </div>
                      )}
                      {cadastrosSubView !== 'Cadastrar Clientes' && cadastrosSubView !== 'Lista de Clientes' && (
                        <div className="flex flex-col items-center justify-center py-20 text-center bg-[#1a1d21] rounded-3xl border border-white/5">
                          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6">
                            <Settings size={40} className="text-gray-600" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">{cadastrosSubView}</h3>
                          <p className="text-gray-500 max-w-sm mb-6">Estamos trabalhando para trazer esta funcionalidade o mais rápido possível.</p>
                          <button onClick={() => setCadastrosSubView(null)} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-all">
                            Voltar ao Menu
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {selectedClient && (
                <ClientDetailsModal 
                  client={selectedClient} 
                  onClose={() => setSelectedClient(null)} 
                />
              )}

              {activeTab !== 'Início' && activeTab !== 'Cadastros' && activeTab !== 'Formulários' && activeTab !== 'Criador de Formulários' && activeTab !== 'Clientes' && activeTab !== 'Aniversariantes' && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6">
                    <Settings size={40} className="text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Módulo em Desenvolvimento</h3>
                  <p className="text-gray-500 max-w-sm">Estamos trabalhando para trazer a funcionalidade de {activeTab} o mais rápido possível.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, trend, icon: Icon, color }: any) => {
  const colors: any = {
    orange: 'bg-orange-500/10 text-orange-500',
    blue: 'bg-blue-500/10 text-blue-500',
    green: 'bg-green-600/10 text-green-600',
    purple: 'bg-purple-500/10 text-purple-500',
  };

  return (
    <div className="bg-[#1a1d21] p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${colors[color]}`}>
          <Icon size={24} />
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${trend.startsWith('+') ? 'bg-green-600/10 text-green-600' : 'bg-gray-500/10 text-gray-400'}`}>
          {trend}
        </span>
      </div>
      <h4 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</h4>
      <p className="text-2xl font-black text-white">{value}</p>
    </div>
  );
};

const TimelineItem = ({ time, title, client, status }: any) => (
  <div className="flex gap-6 group">
    <div className="w-16 pt-1">
      <span className="text-sm font-bold text-gray-500">{time}</span>
    </div>
    <div className="relative pb-6 flex-1">
      <div className="absolute left-[-25px] top-2 w-2 h-2 rounded-full bg-orange-500 ring-4 ring-orange-500/20"></div>
      <div className="absolute left-[-21px] top-4 bottom-0 w-0.5 bg-white/5 group-last:hidden"></div>
      <div className="bg-[#252930] p-4 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all cursor-pointer">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold text-white">{title}</h4>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            status === 'Confirmado' ? 'bg-green-600/10 text-green-600' :
            status === 'Em andamento' ? 'bg-blue-500/10 text-blue-500' :
            'bg-orange-500/10 text-orange-500'
          }`}>
            {status}
          </span>
        </div>
        <p className="text-sm text-gray-400">{client}</p>
      </div>
    </div>
  </div>
);

const QuickAction = ({ icon: Icon, label, onClick }: any) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center gap-3 p-4 bg-[#252930] hover:bg-orange-500 rounded-2xl border border-white/5 transition-all group"
  >
    <Icon size={20} className="text-orange-500 group-hover:text-white" />
    <span className="text-[10px] font-bold text-gray-400 group-hover:text-white uppercase text-center">{label}</span>
  </button>
);

const WebcamAny = Webcam as any;

const InternalClientRegistration = ({ onBack }: { onBack: () => void }) => {
  const [formData, setFormData] = useState({
    pessoa: 'Física',
    name: '',
    birthDate: '',
    rg: '',
    cpf: '',
    sexo: '',
    whatsapp: '',
    telefone2: '',
    email: '',
    redeSocial1: '',
    redeSocial2: '',
    cep: '',
    estado: '',
    cidade: '',
    endereco: '',
    nr: '',
    complemento: '',
    bairro: '',
    source: '',
    photo: ''
  });
  const [loading, setLoading] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setFormData(prev => ({ ...prev, photo: imageSrc }));
      setShowWebcam(false);
    }
  }, [webcamRef]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.birthDate || !formData.sexo || !formData.whatsapp || !formData.source) {
      alert("Por favor, preencha todos os campos obrigatórios (*)");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'clients'), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      alert("Cliente cadastrado com sucesso!");
      onBack();
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar cliente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1d21] rounded-3xl border border-white/5 overflow-hidden">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <UserPlus size={24} className="text-orange-500" />
          Cadastrar Clientes
        </h3>
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="flex flex-col items-center gap-4">
          {formData.photo ? (
            <div className="relative group">
              <img src={formData.photo} alt="Client" className="w-32 h-32 rounded-full object-cover border-2 border-orange-500" />
              <button 
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, photo: '' }))}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center text-gray-500">
              <User size={48} />
            </div>
          )}
          
          {!showWebcam ? (
            <button 
              type="button" 
              onClick={() => setShowWebcam(true)}
              className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-gray-300 flex items-center gap-2 transition-all text-sm font-bold"
            >
              <Camera size={18} />
              Tirar Foto com WebCam
            </button>
          ) : (
            <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4">
              <div className="relative w-full max-w-md bg-[#1a1d21] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <WebcamAny
                  audio={false}
                  ref={webcamRef as any}
                  screenshotFormat="image/jpeg"
                  className="w-full aspect-video object-cover"
                  videoConstraints={{ facingMode: "user" }}
                />
                <div className="p-6 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setShowWebcam(false)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="button"
                    onClick={capture}
                    className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20"
                  >
                    Capturar Foto
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Pessoa *</label>
            <select 
              className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
              value={formData.pessoa}
              onChange={e => setFormData({...formData, pessoa: e.target.value})}
            >
              <option>Física</option>
              <option>Jurídica</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Nome *</label>
            <input 
              required
              type="text" 
              className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Data de Nascimento *</label>
            <input 
              required
              type="date" 
              className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
              value={formData.birthDate}
              onChange={e => setFormData({...formData, birthDate: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">RG</label>
              <input 
                type="text" 
                className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
                value={formData.rg}
                onChange={e => setFormData({...formData, rg: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">CPF</label>
              <input 
                type="text" 
                className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
                value={formData.cpf}
                onChange={e => setFormData({...formData, cpf: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Sexo *</label>
            <select 
              required
              className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
              value={formData.sexo}
              onChange={e => setFormData({...formData, sexo: e.target.value})}
            >
              <option value="">Selecione...</option>
              <option>Masculino</option>
              <option>Feminino</option>
              <option>Outros</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">WhatsApp *</label>
            <input 
              required
              type="tel" 
              placeholder="WhatsApp com DDD sem o Zero, EX: 1199644...."
              className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
              value={formData.whatsapp}
              onChange={e => setFormData({...formData, whatsapp: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Telefone 2</label>
            <input 
              type="tel" 
              className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
              value={formData.telefone2}
              onChange={e => setFormData({...formData, telefone2: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">E-Mail</label>
            <input 
              type="email" 
              className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Rede Social 1</label>
            <input 
              type="text" 
              className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
              value={formData.redeSocial1}
              onChange={e => setFormData({...formData, redeSocial1: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Rede Social 2</label>
            <input 
              type="text" 
              className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
              value={formData.redeSocial2}
              onChange={e => setFormData({...formData, redeSocial2: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Cep</label>
              <input 
                type="text" 
                className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
                value={formData.cep}
                onChange={e => setFormData({...formData, cep: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Estado</label>
              <input 
                type="text" 
                className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
                value={formData.estado}
                onChange={e => setFormData({...formData, estado: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Cidade</label>
            <input 
              type="text" 
              className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
              value={formData.cidade}
              onChange={e => setFormData({...formData, cidade: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Endereço</label>
            <input 
              type="text" 
              className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
              value={formData.endereco}
              onChange={e => setFormData({...formData, endereco: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">NR</label>
              <input 
                type="text" 
                className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
                value={formData.nr}
                onChange={e => setFormData({...formData, nr: e.target.value})}
              />
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Complemento</label>
              <input 
                type="text" 
                className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
                value={formData.complemento}
                onChange={e => setFormData({...formData, complemento: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Bairro</label>
            <input 
              type="text" 
              className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
              value={formData.bairro}
              onChange={e => setFormData({...formData, bairro: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Como Conheceu nosso Trabalho *</label>
            <select 
              required
              className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
              value={formData.source}
              onChange={e => setFormData({...formData, source: e.target.value})}
            >
              <option value="">Selecione...</option>
              <option>Indicação</option>
              <option>Site</option>
              <option>Facebook</option>
              <option>Instagram</option>
              <option>Twitter</option>
              <option>Google</option>
              <option>TikTok</option>
              <option>Internet</option>
              <option>Cartão</option>
              <option>Flyer</option>
              <option>Viu o Estúdio</option>
              <option>Rádio / Televisão</option>
              <option>Outros</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button 
            type="button" 
            onClick={onBack}
            className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all uppercase tracking-widest text-sm"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="flex-[2] bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-all uppercase tracking-widest text-sm shadow-lg shadow-orange-500/20 disabled:opacity-50"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  );
};

const ClientHistory = ({ onBack }: { onBack: () => void }) => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'budgets'), orderBy('createdAt', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHistory(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-[#1a1d21] rounded-3xl border border-white/5 overflow-hidden">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <History size={24} className="text-orange-500" />
          Histórico dos Clientes
        </h3>
        <button onClick={onBack} className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all">
          Voltar
        </button>
      </div>
      
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <RefreshCw className="animate-spin text-orange-500" size={40} />
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-20 text-gray-500">Nenhum histórico encontrado.</div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="p-4 bg-[#0f1115] rounded-2xl border border-white/5 flex items-center justify-between group hover:border-orange-500/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <User size={20} className="text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{item.clientName}</h4>
                    <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString('pt-BR')} - {item.tattooDescription?.substring(0, 30)}...</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    item.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                    item.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                    'bg-orange-500/10 text-orange-500'
                  }`}>
                    {item.status === 'approved' ? 'Aprovado' : item.status === 'rejected' ? 'Recusado' : 'Pendente'}
                  </span>
                  <button className="p-2 text-gray-500 hover:text-white transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CadastrosMenu = ({ onSelect }: { onSelect: (view: string) => void }) => {
  const buttons = [
    { id: 'Cadastrar Clientes', icon: UserPlus, label: 'Cadastrar Clientes' },
    { id: 'Histórico dos Clientes', icon: History, label: 'Histórico dos Clientes' },
    { id: 'Lista de Clientes', icon: Users, label: 'Lista de Clientes' },
    { id: 'Importar Clientes', icon: FileUp, label: 'Importar Clientes' },
    { id: 'Cadastro dos Fornecedores', icon: Truck, label: 'Cadastro dos Fornecedores' },
    { id: 'Etiquetas', icon: Tag, label: 'Etiquetas' },
    { id: 'Cadastro dos Profissionais', icon: UserCog, label: 'Cadastro dos Profissionais' },
    { id: 'Cadastro dos Espaços', icon: Home, label: 'Cadastro dos Espaços' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {buttons.map((btn) => (
        <button
          key={btn.id}
          onClick={() => onSelect(btn.id)}
          className="flex flex-col items-center justify-center gap-4 p-8 bg-[#1a1d21] hover:bg-orange-500 rounded-3xl border border-white/5 transition-all group shadow-xl hover:shadow-orange-500/20"
        >
          <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all">
            <btn.icon size={32} className="text-orange-500 group-hover:text-white" />
          </div>
          <span className="text-sm font-bold text-gray-300 group-hover:text-white text-center uppercase tracking-wider">
            {btn.label}
          </span>
        </button>
      ))}
    </div>
  );
};

const ClientsList = ({ onSelectClient, searchTerm = '' }: { onSelectClient: (client: any) => void, searchTerm?: string }) => {
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'clients'), orderBy('createdAt', 'desc'), limit(50));
    return onSnapshot(q, (snapshot) => {
      setClients(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-white/2 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
            <th className="px-6 py-4">Cliente</th>
            <th className="px-6 py-4">Contato</th>
            <th className="px-6 py-4">Cidade</th>
            <th className="px-6 py-4">Origem</th>
            <th className="px-6 py-4">Data Cadastro</th>
            <th className="px-6 py-4">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {filteredClients.map((client) => (
            <tr 
              key={client.id} 
              className="hover:bg-white/2 transition-colors group cursor-pointer"
              onClick={() => onSelectClient(client)}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-500 font-bold text-xs">
                    {client.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-white">{client.name}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm text-white">{client.phone}</p>
                <p className="text-xs text-gray-500">{client.email}</p>
              </td>
              <td className="px-6 py-4 text-sm text-gray-400">{client.city}</td>
              <td className="px-6 py-4">
                <span className="bg-white/5 px-2 py-1 rounded text-[10px] text-gray-400 uppercase font-bold">
                  {client.source}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-400">
                {new Date(client.createdAt).toLocaleDateString('pt-BR')}
              </td>
              <td className="px-6 py-4">
                <button className="p-2 hover:bg-orange-500/20 rounded-lg text-gray-500 hover:text-orange-500 transition-all">
                  <ChevronRight size={18} />
                </button>
              </td>
            </tr>
          ))}
          {filteredClients.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                {searchTerm ? 'Nenhum cliente encontrado com esse nome.' : 'Nenhum cliente cadastrado ainda.'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const BirthdayManager = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [birthdayClients, setBirthdayClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'clients'));
    return onSnapshot(q, (snapshot) => {
      const allClients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClients(allClients);
      
      const today = new Date();
      const todayDay = today.getDate();
      const todayMonth = today.getMonth() + 1;

      const filtered = allClients.filter((client: any) => {
        if (!client.birthDate) return false;
        const bDate = new Date(client.birthDate);
        // Adjust for timezone issues if necessary, but usually YYYY-MM-DD works
        // We compare day and month only
        const bDay = bDate.getUTCDate();
        const bMonth = bDate.getUTCMonth() + 1;
        return bDay === todayDay && bMonth === todayMonth;
      });

      setBirthdayClients(filtered);
      setLoading(false);
    });
  }, []);

  const sendBirthdayMessage = (client: any) => {
    const message = `Parabéns, ${client.name}! 🎉\n\nA equipe HT Gestão deseja a você um dia incrível e cheio de realizações. Feliz aniversário! 🎂🎈`;
    const url = `https://wa.me/55${client.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white">Gestão de Aniversariantes</h3>
          <p className="text-gray-500">Fortaleça o relacionamento com seus clientes em datas especiais.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#1a1d21] rounded-3xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-500">
                  <Users size={20} />
                </div>
                <h4 className="font-bold">Aniversariantes de Hoje</h4>
              </div>
              <span className="text-xs font-bold text-gray-500 bg-white/5 px-3 py-1 rounded-full uppercase tracking-widest">
                {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
              </span>
            </div>

            {loading ? (
              <div className="p-12 text-center text-gray-500">Carregando dados...</div>
            ) : birthdayClients.length === 0 ? (
              <div className="p-20 text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar size={32} className="text-gray-600" />
                </div>
                <p className="text-gray-400 font-medium">Nenhum aniversariante encontrado para hoje.</p>
                <p className="text-xs text-gray-600 mt-2">Total de clientes na base: {clients.length}</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {birthdayClients.map((client) => (
                  <div key={client.id} className="p-6 flex items-center justify-between hover:bg-white/2 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/20">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <h5 className="font-bold text-white text-lg">{client.name}</h5>
                        <div className="flex items-center gap-2 text-gray-500">
                          <MessageSquare size={12} />
                          <p className="text-xs">{client.phone}</p>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => sendBirthdayMessage(client)}
                      className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-lg shadow-green-500/20 hover:scale-105 active:scale-95"
                    >
                      <MessageSquare size={18} />
                      <span>Enviar Parabéns</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#1a1d21] p-8 rounded-3xl border border-white/5">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Mensagem Padrão</h4>
            <div className="p-6 bg-[#0f1115] rounded-2xl border border-white/5 relative">
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#0f1115] rotate-45 border-l border-t border-white/5"></div>
              <p className="text-sm text-gray-400 italic leading-relaxed">
                "Parabéns, <span className="text-orange-500 font-bold">[Nome do Cliente]</span>! 🎉 A equipe HT Gestão deseja a você um dia incrível e cheio de realizações. Feliz aniversário! 🎂🎈"
              </p>
            </div>
            <p className="text-[10px] text-gray-600 mt-4 text-center">A mensagem é aberta automaticamente no WhatsApp Web ou App.</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-transparent p-8 rounded-3xl border border-orange-500/20">
            <h4 className="text-sm font-bold text-orange-500 mb-2">Dica de Fidelização</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Clientes que recebem mensagens em datas especiais têm 40% mais chances de retornar ao seu estabelecimento. Aproveite para oferecer um cupom de desconto!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormsList = () => {
  const [forms, setForms] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'forms'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      setForms(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Deseja realmente excluir este formulário?')) {
      try {
        await deleteDoc(doc(db, 'forms', id));
      } catch (error) {
        console.error("Erro ao excluir formulário:", error);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-white/2 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
            <th className="px-6 py-4">Título do Formulário</th>
            <th className="px-6 py-4">Campos</th>
            <th className="px-6 py-4">Data de Criação</th>
            <th className="px-6 py-4">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {forms.map((form) => (
            <tr key={form.id} className="hover:bg-white/2 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-500">
                    <ClipboardList size={16} />
                  </div>
                  <span className="text-sm font-medium text-white">{form.title}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-xs text-gray-400">{form.fields?.length || 0} campos</span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-400">
                {new Date(form.createdAt).toLocaleDateString('pt-BR')}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDelete(form.id)}
                    className="p-2 hover:bg-red-500/20 rounded-lg text-gray-500 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {forms.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                Nenhum formulário criado ainda.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const FormBuilder = ({ onSave }: { onSave: () => void }) => {
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const addField = () => {
    setFields([...fields, { id: Date.now().toString(), label: '', type: 'text', required: false }]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const updateField = (id: string, updates: any) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Por favor, insira um título para o formulário.');
      return;
    }
    if (fields.length === 0) {
      alert('Adicione pelo menos um campo ao formulário.');
      return;
    }

    setIsSaving(true);
    try {
      await addDoc(collection(db, 'forms'), {
        title,
        fields,
        createdAt: new Date().toISOString()
      });
      onSave();
    } catch (error) {
      console.error("Erro ao salvar formulário:", error);
      alert('Erro ao salvar formulário. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white">Criador de Formulários</h3>
          <p className="text-gray-500">Crie formulários personalizados para seus clientes.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={onSave}
            className="px-6 py-2 rounded-xl text-sm font-bold text-gray-400 hover:bg-white/5 transition-all"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-8 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
          >
            <Save size={18} />
            {isSaving ? 'Salvando...' : 'Salvar Formulário'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#1a1d21] p-8 rounded-3xl border border-white/5 space-y-6">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">Título do Formulário</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Ficha de Anamnese, Termo de Consentimento..."
                className="w-full bg-[#0f1115] border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-orange-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Campos do Formulário</label>
                <button 
                  onClick={addField}
                  className="text-orange-500 hover:text-orange-400 text-xs font-bold flex items-center gap-1 transition-all"
                >
                  <Plus size={14} />
                  Adicionar Campo
                </button>
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={field.id} 
                    className="bg-[#252930] p-6 rounded-2xl border border-white/5 flex gap-4 items-start group"
                  >
                    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-500 font-bold text-xs flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-bold mb-2 block">Rótulo do Campo</label>
                        <input 
                          type="text" 
                          value={field.label}
                          onChange={(e) => updateField(field.id, { label: e.target.value })}
                          placeholder="Ex: Nome Completo, Data de Nascimento..."
                          className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-2 text-sm text-white focus:border-orange-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-bold mb-2 block">Tipo de Resposta</label>
                        <select 
                          value={field.type}
                          onChange={(e) => updateField(field.id, { type: e.target.value })}
                          className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-2 text-sm text-white focus:border-orange-500 outline-none transition-all appearance-none"
                        >
                          <option value="text">Texto Curto</option>
                          <option value="textarea">Texto Longo</option>
                          <option value="number">Número</option>
                          <option value="date">Data</option>
                          <option value="checkbox">Caixa de Seleção</option>
                        </select>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeField(field.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg text-gray-600 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}

                {fields.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-3xl">
                    <p className="text-gray-500 text-sm">Nenhum campo adicionado. Comece adicionando o primeiro campo!</p>
                    <button 
                      onClick={addField}
                      className="mt-4 bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all"
                    >
                      Adicionar Primeiro Campo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#1a1d21] p-8 rounded-3xl border border-white/5">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Dicas de Criação</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-gray-400">
                <div className="w-5 h-5 bg-orange-500/10 rounded flex items-center justify-center text-orange-500 flex-shrink-0">
                  <Zap size={12} />
                </div>
                Use títulos claros para que o cliente saiba exatamente o que preencher.
              </li>
              <li className="flex gap-3 text-sm text-gray-400">
                <div className="w-5 h-5 bg-orange-500/10 rounded flex items-center justify-center text-orange-500 flex-shrink-0">
                  <Zap size={12} />
                </div>
                Agrupe informações relacionadas para facilitar a leitura.
              </li>
              <li className="flex gap-3 text-sm text-gray-400">
                <div className="w-5 h-5 bg-orange-500/10 rounded flex items-center justify-center text-orange-500 flex-shrink-0">
                  <Zap size={12} />
                </div>
                Formulários curtos têm maior taxa de preenchimento.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientDetailsModal = ({ client, onClose }: { client: any, onClose: () => void }) => {
  const [followUps, setFollowUps] = useState<any[]>([]);
  const [newNote, setNewNote] = useState('');
  const [status, setStatus] = useState('Bom');

  useEffect(() => {
    if (!client) return;
    const q = query(
      collection(db, `clients/${client.id}/followups`),
      orderBy('date', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
      setFollowUps(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, [client]);

  const handleAddFollowUp = async () => {
    if (!newNote.trim()) return;
    try {
      await addDoc(collection(db, `clients/${client.id}/followups`), {
        date: new Date().toISOString(),
        status,
        note: newNote,
        createdAt: new Date().toISOString()
      });
      setNewNote('');
    } catch (error) {
      console.error("Erro ao adicionar acompanhamento:", error);
    }
  };

  const sendWhatsApp = () => {
    const message = `Olá ${client.name}! Como está a cicatrização da sua tatuagem hoje?`;
    const url = `https://wa.me/${client.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1a1d21] w-full max-w-4xl max-h-[90vh] rounded-3xl border border-white/10 overflow-hidden flex flex-col shadow-2xl"
      >
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#252930]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
              {client.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{client.name}</h3>
              <p className="text-sm text-gray-400">{client.phone} • {client.city}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-400 transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#252930] p-6 rounded-2xl border border-white/5">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Informações do Cliente</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold">Email</label>
                  <p className="text-sm text-white">{client.email || 'Não informado'}</p>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold">Origem</label>
                  <p className="text-sm text-white">{client.source}</p>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold">Data de Cadastro</label>
                  <p className="text-sm text-white">{new Date(client.createdAt).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
              <button 
                onClick={sendWhatsApp}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare size={18} />
                WhatsApp
              </button>
            </div>
          </div>

          {/* Healing Follow-up Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Activity size={20} className="text-orange-500" />
                Acompanhamento de Cicatrização
              </h3>
            </div>

            {/* Add New Entry */}
            <div className="bg-[#252930] p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-[10px] text-gray-500 uppercase font-bold mb-2 block">Status da Cicatrização</label>
                  <div className="flex gap-2">
                    {['Excelente', 'Bom', 'Regular', 'Ruim'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(s)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                          status === s 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-[10px] text-gray-500 uppercase font-bold mb-2 block">Observações / Notas</label>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Descreva como está a cicatrização..."
                  className="w-full bg-[#0f1115] border border-white/5 rounded-xl p-4 text-sm focus:border-orange-500 outline-none min-h-[100px] transition-all"
                />
              </div>
              <button 
                onClick={handleAddFollowUp}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
              >
                <PlusCircle size={18} />
                Registrar Evolução
              </button>
            </div>

            {/* History */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Histórico de Evolução</h4>
              {followUps.length === 0 ? (
                <div className="text-center py-10 bg-white/2 rounded-2xl border border-dashed border-white/5">
                  <p className="text-gray-500 text-sm">Nenhum registro de evolução ainda.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {followUps.map((item) => (
                    <div key={item.id} className="bg-[#252930] p-5 rounded-2xl border border-white/5 flex gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar size={20} className="text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase">{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                            <h5 className="font-bold text-white">{item.status}</h5>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.status === 'Excelente' ? 'bg-green-600/10 text-green-600' :
                            item.status === 'Bom' ? 'bg-blue-500/10 text-blue-500' :
                            item.status === 'Regular' ? 'bg-orange-500/10 text-orange-500' :
                            'bg-red-500/10 text-red-500'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Budget Components ---

const BudgetManager = () => {
  const [budgets, setBudgets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Todos');
  const [selectedBudget, setSelectedBudget] = useState<any>(null);

  useEffect(() => {
    const q = query(collection(db, 'budgets'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      setBudgets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    const budgetRef = doc(db, 'budgets', id);
    await updateDoc(budgetRef, { 
      status: newStatus,
      updatedAt: new Date().toISOString()
    });
  };

  const filteredBudgets = budgets.filter(b => filter === 'Todos' || b.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendente': return 'bg-yellow-500/20 text-yellow-500';
      case 'Aprovado': return 'bg-green-500/20 text-green-500';
      case 'Respondido': return 'bg-blue-500/20 text-blue-500';
      case 'Arquivado': return 'bg-gray-500/20 text-gray-500';
      default: return 'bg-white/5 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">Gerenciar Orçamentos</h3>
          <p className="text-xs text-gray-500">Acompanhe e responda as solicitações de orçamento recebidas pelo seu site.</p>
        </div>
        <div className="flex gap-2">
          {['Todos', 'Pendente', 'Respondido', 'Aprovado'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === f ? 'bg-orange-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#1a1d21] rounded-3xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/2 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Descrição</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredBudgets.map((budget) => (
                <tr key={budget.id} className="hover:bg-white/2 transition-colors group">
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(budget.status)}`}>
                      {budget.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-white">{budget.clientName}</p>
                    <p className="text-xs text-gray-500">{budget.clientPhone}</p>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-xs text-gray-400 truncate">{budget.description}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(budget.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <select 
                        value={budget.status}
                        onChange={(e) => updateStatus(budget.id, e.target.value)}
                        className="bg-[#0f1115] border border-white/5 rounded-lg text-xs text-white px-2 py-1 outline-none focus:border-orange-500"
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Respondido">Respondido</option>
                        <option value="Aprovado">Aprovado</option>
                        <option value="Arquivado">Arquivado</option>
                      </select>
                      <button 
                        onClick={() => {
                          const msg = `Olá ${budget.clientName}, seu orçamento foi atualizado! Acompanhe aqui: ${window.location.origin}/track/${budget.trackingToken}`;
                          window.open(`https://wa.me/55${budget.clientPhone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
                        }}
                        className="p-2 hover:bg-green-500/20 rounded-lg text-gray-500 hover:text-green-500 transition-all"
                        title="Enviar no WhatsApp"
                      >
                        <MessageSquare size={16} />
                      </button>
                      <button 
                        onClick={() => setSelectedBudget(budget)}
                        className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all"
                        title="Ver Detalhes"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredBudgets.length === 0 && (
            <div className="p-12 text-center text-gray-500">Nenhum orçamento encontrado.</div>
          )}
        </div>
      </div>

      {selectedBudget && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1a1d21] w-full max-w-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-white">Detalhes do Orçamento</h3>
                <p className="text-gray-500 text-sm">Token: {selectedBudget.trackingToken}</p>
              </div>
              <button onClick={() => setSelectedBudget(null)} className="p-2 hover:bg-white/5 rounded-xl text-gray-400">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Cliente</label>
                  <p className="text-white font-bold">{selectedBudget.clientName}</p>
                  <p className="text-gray-400 text-sm">{selectedBudget.clientPhone}</p>
                  <p className="text-gray-400 text-sm">{selectedBudget.clientEmail}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Status Atual</label>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(selectedBudget.status)}`}>
                    {selectedBudget.status}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Descrição da Tattoo</label>
                <div className="bg-[#0f1115] p-4 rounded-2xl border border-white/5 text-gray-300 text-sm leading-relaxed">
                  {selectedBudget.description || 'Nenhuma descrição fornecida.'}
                </div>
              </div>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    const msg = `Olá ${selectedBudget.clientName}, aqui está o link para acompanhar seu orçamento: ${window.location.origin}/track/${selectedBudget.trackingToken}`;
                    window.open(`https://wa.me/55${selectedBudget.clientPhone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Enviar Link de Acompanhamento
                </button>
                <button 
                  onClick={() => setSelectedBudget(null)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all"
                >
                  Fechar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const ClientForms = () => {
  const [customLink, setCustomLink] = useState('orcamentosgestaoink');
  const [activeTab, setActiveTab] = useState('Orçamento');
  const [isEditingLink, setIsEditingLink] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [tempLink, setTempLink] = useState(customLink);

  const publicLink = `${window.location.origin}/budget-request/${customLink}`;

  const copyLink = () => {
    navigator.clipboard.writeText(publicLink);
    alert('Link copiado!');
  };

  const handleSaveLink = () => {
    setCustomLink(tempLink);
    setIsEditingLink(false);
  };

  return (
    <div className="space-y-8">
      {/* ... existing header ... */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white">Formulários p/ Clientes</h3>
          <p className="text-gray-500">Disponibilize links para seus clientes solicitarem orçamentos e agendamentos.</p>
        </div>
        <button 
          onClick={() => setIsEditingLink(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20"
        >
          <Settings size={18} />
          Personalizar Links
        </button>
      </div>

      {isEditingLink && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1d21] w-full max-w-md rounded-3xl border border-white/10 p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Personalizar Link</h3>
            <p className="text-gray-400 text-sm mb-6">Defina o nome que aparecerá após a barra no seu link de orçamento.</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-orange-500 uppercase block mb-2">Nome do Link</label>
                <div className="flex items-center bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3">
                  <span className="text-gray-600 text-sm mr-1">/budget-request/</span>
                  <input 
                    type="text" 
                    value={tempLink}
                    onChange={(e) => setTempLink(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    className="bg-transparent text-white text-sm outline-none flex-1"
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setIsEditingLink(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSaveLink}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-orange-500/20"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showQRCode && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1d21] w-full max-w-sm rounded-3xl border border-white/10 p-8 shadow-2xl flex flex-col items-center">
            <h3 className="text-xl font-bold text-white mb-6">QR Code do Formulário</h3>
            <div className="bg-white p-4 rounded-2xl mb-6">
              <QRCodeSVG value={publicLink} size={200} />
            </div>
            <p className="text-gray-400 text-xs text-center mb-8">Aponte a câmera do celular para acessar o formulário de orçamento.</p>
            <div className="flex gap-4 w-full">
              <button 
                onClick={() => setShowQRCode(false)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all"
              >
                Fechar
              </button>
              <button 
                onClick={() => {
                  const svg = document.querySelector('svg');
                  if (svg) {
                    const svgData = new XMLSerializer().serializeToString(svg);
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    const img = new Image();
                    img.onload = () => {
                      canvas.width = img.width;
                      canvas.height = img.height;
                      ctx?.drawImage(img, 0, 0);
                      const pngFile = canvas.toDataURL("image/png");
                      const downloadLink = document.createElement("a");
                      downloadLink.download = "qrcode-orcamento.png";
                      downloadLink.href = pngFile;
                      downloadLink.click();
                    };
                    img.src = "data:image/svg+xml;base64," + btoa(svgData);
                  }
                }}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-orange-500/20"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#1a1d21] rounded-3xl border border-white/5 overflow-hidden">
        <div className="p-2 bg-[#0f1115] flex gap-1 overflow-x-auto">
          {['Orçamento', 'Ficha Anamnese', 'Cadastro Clientes', 'Reserva/Agenda Online', 'Cartão Visita Digital', 'Feedback Cliente'].map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === t ? 'bg-[#1a1d21] text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="p-8 space-y-6">
          <div className="p-6 bg-[#0f1115] rounded-2xl border border-white/5 space-y-4">
            <p className="text-xs text-gray-500 font-medium">Orçamento pelo Facebook ou WhatsApp? Compartilhe o seu link e ele mesmo(cliente) faz o cadastro no sistema!</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-[#1a1d21] border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-400 flex items-center overflow-hidden">
                <span className="truncate">{publicLink}</span>
              </div>
              <button onClick={copyLink} className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap">
                <Copy size={18} />
                Copiar Link
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-white/5 hover:bg-white/10 text-white p-6 rounded-3xl border border-white/5 flex flex-col items-center gap-3 transition-all group">
              <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                <MessageSquare size={24} />
              </div>
              <span className="font-bold">Como Funciona o Link?</span>
            </button>
            <button 
              onClick={() => setShowQRCode(true)}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white p-6 rounded-3xl border border-white/5 flex flex-col items-center gap-3 transition-all group"
            >
              <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                <QrCode size={24} />
              </div>
              <span className="font-bold">Ver QR Code</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Public Pages ---

const PublicBudgetRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    cpf: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [trackingToken, setTrackingToken] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = Math.random().toString(36).substring(2, 15);
    try {
      await addDoc(collection(db, 'budgets'), {
        clientName: formData.name,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        clientBirthDate: formData.birthDate,
        clientCpf: formData.cpf,
        description: formData.description,
        status: 'Pendente',
        trackingToken: token,
        createdAt: new Date().toISOString()
      });
      setTrackingToken(token);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar solicitação.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0f1115] flex items-center justify-center p-4">
        <div className="bg-[#1a1d21] p-10 rounded-3xl border border-white/5 text-center max-w-md w-full space-y-6">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-500">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-bold text-white">Solicitação Enviada!</h2>
          <p className="text-gray-400">Seu pedido de orçamento foi recebido com sucesso. Você pode acompanhar o status pelo link abaixo:</p>
          <Link 
            to={`/track/${trackingToken}`}
            className="block p-4 bg-white/5 rounded-2xl text-orange-500 font-bold hover:bg-white/10 transition-all underline"
          >
            Acompanhar Orçamento
          </Link>
          <p className="text-xs text-gray-500">Guarde este link para futuras consultas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1115] flex flex-col">
      <header className="h-20 bg-[#1a1d21] border-b border-white/5 flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
            <LayoutDashboard size={24} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase">Tattoo Studio</span>
        </div>
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Orçamento</div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-8 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black text-white tracking-tight uppercase">Formulário Tattoo Studio</h1>
          <p className="text-gray-500 max-w-xl mx-auto">Preencha os campos abaixo com atenção para que seu orçamento seja providenciado com agilidade.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Solicite seu Orçamento</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Preencha todos os campos com atenção, todos os campos são importantes para que seu orçamento seja providenciado com maior agilidade! Obrigado!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-2 bg-[#1a1d21] p-8 rounded-3xl border border-white/5 space-y-6">
            <div className="space-y-4">
              <label className="block text-xs font-bold text-gray-500 uppercase">Seu Nome *</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-xs font-bold text-gray-500 uppercase">Nascimento</label>
                <input 
                  type="date" 
                  value={formData.birthDate}
                  onChange={e => setFormData({...formData, birthDate: e.target.value})}
                  className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-xs font-bold text-gray-500 uppercase">CPF</label>
                <input 
                  type="text" 
                  value={formData.cpf}
                  onChange={e => setFormData({...formData, cpf: e.target.value})}
                  className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-xs font-bold text-gray-500 uppercase">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-xs font-bold text-gray-500 uppercase">WhatsApp (Com DDD) *</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-bold text-gray-500 uppercase">Descrição da Tattoo</label>
              <textarea 
                rows={4}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all resize-none"
                placeholder="Conte-nos sobre sua ideia, local do corpo, tamanho aproximado..."
              ></textarea>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-orange-500/20 uppercase tracking-widest"
            >
              {loading ? 'Enviando...' : 'Enviar Solicitação'}
            </button>
          </form>
        </div>
      </main>

      <footer className="p-8 border-t border-white/5 text-center space-y-4">
        <div className="flex justify-center gap-8 text-xs font-bold text-gray-500 uppercase">
          <span>Tattoo Studio, Rua Guia Lopes</span>
          <span>Fone: (00) 00000-0000</span>
          <span>Email: tattoomodelo@gmail.com</span>
        </div>
        <p className="text-[10px] text-gray-600">© 2026 - Formulário Disponibilizado por Gestãoink</p>
      </footer>
    </div>
  );
};

const PublicTracking = () => {
  const { token } = useParams();
  const [budget, setBudget] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'budgets'), where('trackingToken', '==', token));
    return onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setBudget({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
      }
      setLoading(false);
    });
  }, [token]);

  if (loading) return <div className="min-h-screen bg-[#0f1115] flex items-center justify-center text-white">Carregando...</div>;
  if (!budget) return <div className="min-h-screen bg-[#0f1115] flex items-center justify-center text-white">Orçamento não encontrado.</div>;

  const steps = [
    { label: 'Orçamento', icon: FileText, active: true },
    { label: 'Agendamento', icon: Calendar, active: budget.status === 'Aprovado' || budget.status === 'Agendado' },
    { label: 'Anamnese', icon: Stethoscope, active: budget.status === 'Anamnese' },
    { label: 'Avaliação', icon: Star, active: budget.status === 'Finalizado' }
  ];

  return (
    <div className="min-h-screen bg-[#0f1115] flex flex-col">
      <header className="h-20 bg-[#1a1d21] border-b border-white/5 flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
            <LayoutDashboard size={24} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase">Tattoo Studio</span>
        </div>
        <button className="p-2 bg-white/5 rounded-lg text-white">
          <Menu size={20} />
        </button>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-8 space-y-8">
        <div className="bg-[#1a1d21] rounded-3xl border border-white/5 overflow-hidden divide-y divide-white/5">
          <div className="p-8 flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Cliente</p>
              <h2 className="text-xl font-bold text-white">{budget.clientName}</h2>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Última Atualização</p>
              <h2 className="text-xl font-bold text-white">{new Date(budget.updatedAt || budget.createdAt).toLocaleDateString('pt-BR')}</h2>
            </div>
          </div>

          <div className="p-8 space-y-4">
            <p className="text-sm text-gray-400">
              <span className="font-bold text-white">Próximo Passo:</span> {
                budget.status === 'Pendente' ? 'Aguarde a Nossa Resposta em um dos Contatos que deixou no Cadastro ;)' :
                budget.status === 'Respondido' ? 'Seu orçamento foi enviado! Verifique seu WhatsApp ou Email.' :
                budget.status === 'Aprovado' ? 'Orçamento aprovado! Entraremos em contato para agendar sua sessão.' :
                'Acompanhe o progresso abaixo.'
              }
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Seu Link de Acompanhamento:</span>
              <a href={window.location.href} className="text-orange-500 underline truncate">{window.location.href}</a>
            </div>
          </div>

          <div className="p-12">
            <div className="relative flex justify-between">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 z-0"></div>
              {steps.map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    step.active ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-[#0f1115] text-gray-600 border border-white/5'
                  }`}>
                    <step.icon size={20} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${step.active ? 'text-white' : 'text-gray-600'}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center space-y-6">
          <h3 className="text-3xl font-black text-white uppercase tracking-tight">Veja mais em nosso <span className="text-orange-500">Instagram!</span></h3>
          <div className="w-24 h-24 bg-white/5 rounded-3xl mx-auto flex items-center justify-center text-gray-600">
            <Target size={48} />
          </div>
        </div>
      </main>

      <footer className="p-8 border-t border-white/5 text-center">
        <p className="text-[10px] text-gray-600">© 2026 - Formulário Disponibilizado por Gestãoink</p>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/budget-request/:slug" element={<PublicBudgetRequest />} />
        <Route path="/track/:token" element={<PublicTracking />} />
        <Route path="/cadastro" element={<RegistrationForm />} />
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
