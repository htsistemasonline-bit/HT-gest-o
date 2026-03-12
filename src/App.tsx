/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as XLSX from 'xlsx';
import CalendarComponent from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Webcam from 'react-webcam';
import { QRCodeSVG } from 'qrcode.react';
import { 
  LayoutDashboard, 
  Bell,
  Calendar, 
  Users, 
  Package, 
  DollarSign, 
  BarChart3, 
  Settings, 
  FileText, 
  PlusCircle, 
  Share2,
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
  Edit2,
  MessageCircle,
  Tag,
  Truck,
  UserCog,
  Home,
  UserPlus,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Send,
  User,
  Instagram,
  Images,
  Share
} from 'lucide-react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, addDoc, query, where, onSnapshot, orderBy, limit, getDocs, deleteDoc, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Login = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1d21] flex items-center justify-center p-4">
      <div className="bg-[#252930] p-10 rounded-3xl border border-white/5 text-center max-w-md w-full space-y-8 shadow-2xl">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-orange-500/20 rounded-2xl flex items-center justify-center">
            <Lock size={40} className="text-orange-500" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white tracking-tight">GESTÃO STUDIO</h2>
          <p className="text-gray-400 text-sm">Acesse sua conta administrativa para gerenciar seu estúdio.</p>
        </div>
        <button 
          onClick={handleLogin}
          className="w-full bg-white text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-all shadow-lg"
        >
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
          Entrar com Google
        </button>
        <p className="text-[10px] text-gray-600 uppercase tracking-widest">Acesso restrito a administradores</p>
      </div>
    </div>
  );
};

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
  const [caixaStatus, setCaixaStatus] = useState<'Aberto' | 'Fechado'>('Fechado');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [clientSearch, setClientSearch] = useState('');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [cadastrosSubView, setCadastrosSubView] = useState<string | null>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [budgets, setBudgets] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const q = query(collection(db, 'clients'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      setClients(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'budgets'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      setBudgets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1115] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const monthlyRevenue = budgets
    .filter(b => b.status === 'Aprovado' && new Date(b.createdAt).getMonth() === new Date().getMonth() && new Date(b.createdAt).getFullYear() === new Date().getFullYear())
    .reduce((acc, b) => {
      const val = typeof b.value === 'string' ? parseFloat(b.value.replace('R$ ', '').replace('.', '').replace(',', '.')) : (b.value || 0);
      return acc + (isNaN(val) ? 0 : val);
    }, 0);

  const formattedRevenue = `R$ ${monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(clients.map(c => ({
      Nome: c.name,
      Email: c.email,
      Telefone: c.phone,
      Cidade: c.city,
      Origem: c.source,
      'Data Cadastro': c.createdAt ? new Date(c.createdAt).toLocaleDateString('pt-BR') : '-'
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clientes");
    XLSX.writeFile(workbook, "Clientes.xlsx");
  };

  return (
    <div className="min-h-screen bg-[#0f1115] flex text-gray-100 font-sans">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 0, opacity: sidebarOpen ? 1 : 0 }}
        className="bg-[#1a1d21] border-r border-white/5 overflow-hidden flex flex-col h-screen sticky top-0"
      >
        <div className="p-4 flex items-center justify-center min-h-[100px]">
          <img 
            src="/logo.png" 
            alt="Gestão Studio" 
            className="w-full h-auto max-h-24 object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              const parent = target.parentElement;
              if (parent) {
                target.style.display = 'none';
                if (!parent.querySelector('.fallback-logo')) {
                  const fallback = document.createElement('div');
                  fallback.className = 'fallback-logo flex items-center gap-3';
                  fallback.innerHTML = `
                    <span class="text-4xl font-black text-[#00cc66] leading-none">HT</span>
                    <span class="text-xl font-black tracking-tighter leading-none">Gestão Studio</span>
                  `;
                  parent.appendChild(fallback);
                }
              }
            }}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-6 custom-scrollbar">
          <SectionTitle>Principal</SectionTitle>
          <SidebarItem icon={Bell} label="Início" active={activeTab === 'Início'} onClick={() => setActiveTab('Início')} />
          
          <SectionTitle>Formulários</SectionTitle>
          <SidebarItem icon={ClipboardList} label="Formulários" active={activeTab === 'Formulários'} onClick={() => setActiveTab('Formulários')} />
          <SidebarItem icon={LinkIcon} label="Formulários p/ Clientes" active={activeTab === 'Formulários p/ Clientes'} onClick={() => setActiveTab('Formulários p/ Clientes')} />
          <SidebarItem icon={PlusCircle} label="Criador de Formulários" active={activeTab === 'Criador de Formulários'} onClick={() => setActiveTab('Criador de Formulários')} />
          
          <SectionTitle>Presença Online</SectionTitle>
          <SidebarItem icon={Camera} label="Meus trabalhos" active={activeTab === 'Meus trabalhos'} onClick={() => setActiveTab('Meus trabalhos')} />
          <SidebarItem icon={BookOpen} label="Seu Catálogo" active={activeTab === 'Seu Catálogo'} onClick={() => setActiveTab('Seu Catálogo')} />
          
          <SectionTitle>Operacional</SectionTitle>
          <SidebarItem icon={Zap} label="Acesso Rápido" active={activeTab === 'Acesso Rápido'} onClick={() => setActiveTab('Acesso Rápido')} />
          <SidebarItem icon={Calendar} label="Agenda" active={activeTab === 'Agenda'} onClick={() => setActiveTab('Agenda')} />
          <SidebarItem icon={Activity} label="Visão Geral" active={activeTab === 'Visão Geral'} onClick={() => setActiveTab('Visão Geral')} />
          <SidebarItem icon={Briefcase} label="Diagnóstico" active={activeTab === 'Diagnóstico'} onClick={() => setActiveTab('Diagnóstico')} />
          <SidebarItem icon={Settings} label="Todos Serviços" active={activeTab === 'Todos Serviços'} onClick={() => setActiveTab('Todos Serviços')} />
          
          <SectionTitle>CRM</SectionTitle>
          <SidebarItem icon={Users} label="Clientes" active={activeTab === 'Clientes'} onClick={() => setActiveTab('Clientes')} />
          <SidebarItem icon={Calendar} label="Aniversariantes" active={activeTab === 'Aniversariantes'} onClick={() => setActiveTab('Aniversariantes')} />

          <SectionTitle>Vendas & Atendimento</SectionTitle>
          <SidebarItem icon={Lock} label={`Caixa Diário (${caixaStatus})`} active={activeTab === 'Caixa Diário'} onClick={() => setActiveTab('Caixa Diário')} />
          <SidebarItem icon={FileText} label="Orçamentos" active={activeTab === 'Orçamentos'} onClick={() => setActiveTab('Orçamentos')} />
          <SidebarItem icon={ClipboardList} label="Orçamentos (Kanban)" active={activeTab === 'Orçamentos (Kanban)'} onClick={() => setActiveTab('Orçamentos (Kanban)')} />
          <SidebarItem icon={ClipboardList} label="Gerenciar Orçamentos" active={activeTab === 'Gerenciar Orçamentos'} onClick={() => setActiveTab('Gerenciar Orçamentos')} />
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
            onClick={() => signOut(auth)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all"
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
              className="p-2 hover:bg-white/5 rounded-lg text-[#00cc66] transition-colors"
            >
              <div className="space-y-1.5">
                <div className="w-6 h-1 bg-current rounded-full"></div>
                <div className="w-6 h-1 bg-current rounded-full"></div>
                <div className="w-6 h-1 bg-current rounded-full"></div>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-6">
            <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-[#1a1d21]"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white leading-none">{user?.displayName || 'Administrador'}</p>
                <p className="text-[10px] text-gray-500 mt-1">Gestão Studio</p>
              </div>
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-lg border border-white/10" />
              ) : (
                <div className="w-8 h-8 rounded-lg border border-white/10 bg-[#00cc66]/20 flex items-center justify-center text-[#00cc66] font-bold text-xs">
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
                  {/* Quick Actions (Now at the top) */}
                  <div className="col-span-1 lg:col-span-4 bg-[#1a1d21] rounded-3xl p-8 border border-white/5">
                    <h3 className="text-xl font-bold mb-6">Ações Rápidas</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
                      <QuickAction 
                        icon={caixaStatus === 'Aberto' ? Lock : PlusCircle} 
                        label={caixaStatus === 'Aberto' ? "Fechar Caixa" : "Abrir Caixa"} 
                        onClick={() => setActiveTab('Caixa Diário')} 
                        color={caixaStatus === 'Aberto' ? 'red' : 'green'}
                      />
                    </div>
                  </div>
                  
                  {/* Timeline (Remains in the same relative position, but now below Quick Actions) */}
                  <div className="col-span-1 lg:col-span-3 bg-[#1a1d21] rounded-3xl p-8 border border-white/5">
                    <h3 className="text-xl font-bold mb-6">Timeline de Atividades</h3>
                    <div className="space-y-6">
                      <TimelineItem time="09:00" title="Tatuagem Realismo" client="João Silva" status="Confirmado" />
                      <TimelineItem time="11:30" title="Piercing Septo" client="Maria Oliveira" status="Em andamento" />
                      <TimelineItem time="14:00" title="Consulta Orçamento" client="Pedro Santos" status="Aguardando" />
                      <TimelineItem time="16:00" title="Tatuagem Blackwork" client="Ana Costa" status="Agendado" />
                    </div>
                  </div>

                  {/* StatCards (Now on the right column) */}
                  <div className="flex flex-col gap-6">
                    <StatCard title="Faturamento Mensal" value={formattedRevenue} trend="+12%" icon={DollarSign} color="orange" />
                    <StatCard title="Novos Clientes" value="48" trend="+5%" icon={Users} color="blue" />
                    <StatCard title="Agendamentos" value="12" trend="Hoje" icon={Calendar} color="green" />
                    <StatCard title="Taxa de Conversão" value="68%" trend="+2%" icon={BarChart3} color="purple" />
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
                      <button 
                        onClick={exportToExcel}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap"
                      >
                        Exportar Excel
                      </button>
                    </div>
                  </div>
                  <ClientsList onSelectClient={setSelectedClient} searchTerm={clientSearch} clients={clients} />
                </div>
              )}

              {activeTab === 'Agenda' && (
                <div className="bg-[#1a1d21] rounded-3xl border border-white/5 p-6">
                  <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} />
                  <style>{`
                    .react-calendar { background: #0f1115 !important; border: none !important; color: white !important; }
                    .react-calendar__tile { color: white !important; }
                    .react-calendar__tile--active { background: #f97316 !important; color: white !important; }
                    .react-calendar__navigation button { color: white !important; }
                  `}</style>
                  <h3 className="text-xl font-bold mb-6">Agenda</h3>
                  <div className="flex gap-2 mb-6">
                    <button className="p-3 bg-gray-600 rounded-xl text-white"><Calendar size={20} /></button>
                    <button onClick={() => setIsTaskModalOpen(true)} className="p-3 bg-sky-500 rounded-xl text-white"><CheckCircle2 size={20} /></button>
                    <button className="p-3 bg-red-500 rounded-xl text-white"><X size={20} /></button>
                    <button className="p-3 bg-orange-500 rounded-xl text-white"><MessageSquare size={20} /></button>
                    <button className="p-3 bg-sky-500 rounded-xl text-white"><Calendar size={20} /></button>
                    <button className="p-3 bg-white rounded-xl text-white"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="Google Calendar" className="w-5 h-5" /></button>
                  </div>
                  <div className="flex gap-4 mb-6">
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-xl font-bold">Calendário</button>
                    <button className="px-4 py-2 bg-white/5 text-gray-400 rounded-xl font-bold">Lista</button>
                    <button className="px-4 py-2 bg-white/5 text-gray-400 rounded-xl font-bold">Relatórios</button>
                  </div>
                  <div className="bg-[#0f1115] p-6 rounded-2xl border border-white/5">
                    <CalendarComponent className="w-full text-white" />
                  </div>
                </div>
              )}
              {activeTab === 'Aniversariantes' && (
                <BirthdayManager />
              )}

              {activeTab === 'Orçamentos' && (
                <BudgetDashboard onCreateBudget={() => setActiveTab('Gerenciar Orçamentos')} />
              )}

              {activeTab === 'Orçamentos (Kanban)' && (
                <KanbanDashboard />
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
                          <ClientsList onSelectClient={setSelectedClient} clients={clients} />
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

              {activeTab === 'Caixa Diário' && (
                <CaixaDiario status={caixaStatus} setStatus={setCaixaStatus} setActiveTab={setActiveTab} />
              )}
              {activeTab === 'Financeiro' && (
                <FinanceiroView caixaStatus={caixaStatus} />
              )}
              {activeTab === 'Estoque' && (
                <InventoryView />
              )}
              {activeTab === 'Atendimentos' && (
                <AtendimentosView />
              )}
              {activeTab === 'Meus trabalhos' && (
                <MeusTrabalhosView />
              )}
              {activeTab !== 'Início' && activeTab !== 'Cadastros' && activeTab !== 'Formulários' && activeTab !== 'Criador de Formulários' && activeTab !== 'Clientes' && activeTab !== 'Aniversariantes' && activeTab !== 'Caixa Diário' && activeTab !== 'Atendimentos' && activeTab !== 'Meus trabalhos' && (
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

const MeusTrabalhosView = () => {
  const [works, setWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWork, setNewWork] = useState({ title: '', url: '', category: 'Tattoo' });

  useEffect(() => {
    const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const worksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWorks(worksData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAddWork = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'portfolio'), {
        ...newWork,
        createdAt: new Date().toISOString()
      });
      setShowAddModal(false);
      setNewWork({ title: '', url: '', category: 'Tattoo' });
    } catch (error) {
      console.error("Error adding work:", error);
    }
  };

  const handleDeleteWork = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'portfolio', id));
    } catch (error) {
      console.error("Error deleting work:", error);
    }
  };

  const copyPortfolioLink = () => {
    const link = `${window.location.origin}/portfolio`;
    navigator.clipboard.writeText(link);
    alert("Link do portfólio copiado para a área de transferência!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1a1d21] p-6 rounded-3xl border border-white/5">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Camera className="text-orange-500" />
            Meu Portfólio de Trabalhos
          </h3>
          <p className="text-gray-500 text-sm">Gerencie as fotos que seus clientes verão no seu link público.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={copyPortfolioLink}
            className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          >
            <Share size={20} />
            Gerar Link para Clientes
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex-1 md:flex-none bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
          >
            <Plus size={20} />
            Adicionar Trabalho
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <RefreshCw className="animate-spin text-orange-500" size={40} />
        </div>
      ) : works.length === 0 ? (
        <div className="bg-[#1a1d21] rounded-3xl border border-white/5 p-20 text-center">
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Images size={40} className="text-gray-600" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Nenhum trabalho cadastrado</h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-8">Comece adicionando suas melhores tatuagens para criar um portfólio incrível para seus clientes.</p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-all"
          >
            Adicionar Primeiro Trabalho
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {works.map((work) => (
            <motion.div 
              key={work.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative aspect-square bg-[#1a1d21] rounded-3xl overflow-hidden border border-white/5"
            >
              <img 
                src={work.url} 
                alt={work.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                <h4 className="text-white font-bold mb-1">{work.title}</h4>
                <span className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-4">{work.category}</span>
                <button 
                  onClick={() => handleDeleteWork(work.id)}
                  className="bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white p-3 rounded-xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1a1d21] w-full max-w-md rounded-3xl border border-white/10 overflow-hidden"
          >
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Novo Trabalho</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddWork} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-orange-500 uppercase mb-1.5">Título do Trabalho</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
                  placeholder="Ex: Realismo no Braço"
                  value={newWork.title}
                  onChange={e => setNewWork({...newWork, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-orange-500 uppercase mb-1.5">URL da Imagem</label>
                <input 
                  required
                  type="url" 
                  className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
                  placeholder="https://exemplo.com/foto.jpg"
                  value={newWork.url}
                  onChange={e => setNewWork({...newWork, url: e.target.value})}
                />
                <p className="text-[10px] text-gray-500 mt-1">Dica: Use links do Google Drive, Dropbox ou sites de hospedagem de imagens.</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-orange-500 uppercase mb-1.5">Categoria</label>
                <select 
                  className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all appearance-none"
                  value={newWork.category}
                  onChange={e => setNewWork({...newWork, category: e.target.value})}
                >
                  <option>Tattoo</option>
                  <option>Piercing</option>
                  <option>Desenho</option>
                  <option>Outros</option>
                </select>
              </div>
              <button 
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 mt-4"
              >
                Salvar no Portfólio
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const FinanceiroView = ({ caixaStatus }: { caixaStatus: 'Aberto' | 'Fechado' }) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [inventoryItems, setInventoryItems] = useState<any[]>([]);
  const [goals, setGoals] = useState({ monthly: 5000, annual: 60000 });
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState<{show: boolean, type: 'entrada' | 'saida'}>({show: false, type: 'entrada'});
  const [newTransaction, setNewTransaction] = useState({ description: '', amount: '', category: '' });

  useEffect(() => {
    const q = query(collection(db, 'transactions'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactions(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'inventory'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInventoryItems(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getGoals = async () => {
      const docRef = doc(db, 'settings', 'financial_goals');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setGoals(docSnap.data() as any);
      }
    };
    getGoals();
  }, []);

  const handleSaveGoals = async (e: React.FormEvent) => {
    e.preventDefault();
    await setDoc(doc(db, 'settings', 'financial_goals'), goals);
    setShowGoalModal(false);
  };

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (caixaStatus === 'Fechado') {
      alert("O caixa está fechado! Abra o caixa para realizar lançamentos.");
      return;
    }
    await addDoc(collection(db, 'transactions'), {
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
      type: showTransactionModal.type,
      date: new Date().toISOString(),
    });
    setShowTransactionModal({show: false, type: 'entrada'});
    setNewTransaction({ description: '', amount: '', category: '' });
  };

  const totalRevenue = transactions.filter(t => t.type === 'entrada').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'saida').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalRevenue - totalExpense;
  const inventoryCost = inventoryItems.reduce((acc, item) => acc + (item.quantity * (item.costPrice || 10)), 0);

  const today = new Date().toISOString().split('T')[0];
  const todayTransactions = transactions.filter(t => t.date.startsWith(today));
  const todayRevenue = todayTransactions.filter(t => t.type === 'entrada').reduce((acc, t) => acc + t.amount, 0);
  const todayExpense = todayTransactions.filter(t => t.type === 'saida').reduce((acc, t) => acc + t.amount, 0);

  const monthlyProgress = Math.min((totalRevenue / goals.monthly) * 100, 100);
  const annualProgress = Math.min((totalRevenue / (goals.annual || 1)) * 100, 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1a1d21] p-6 rounded-3xl border border-white/5">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <DollarSign className="text-emerald-500" />
            Gestor Financeiro Profissional
          </h3>
          <p className="text-gray-500 text-sm">Controle total de receitas, despesas e metas do seu estúdio.</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <button 
            onClick={() => setShowGoalModal(true)}
            className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          >
            <Target size={20} />
            Definir Metas
          </button>
          <button 
            disabled={caixaStatus === 'Fechado'}
            onClick={() => setShowTransactionModal({show: true, type: 'saida'})}
            className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${caixaStatus === 'Fechado' ? 'bg-gray-500/20 text-gray-500 cursor-not-allowed' : 'bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white'}`}
          >
            <TrendingDown size={20} />
            Despesa (Saída)
          </button>
          <button 
            disabled={caixaStatus === 'Fechado'}
            onClick={() => setShowTransactionModal({show: true, type: 'entrada'})}
            className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${caixaStatus === 'Fechado' ? 'bg-gray-500/20 text-gray-500 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'}`}
          >
            <TrendingUp size={20} />
            Receita (Entrada)
          </button>
        </div>
      </div>

      {caixaStatus === 'Fechado' && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-500">
          <Lock size={20} />
          <p className="text-sm font-bold">O caixa está fechado. Abra o caixa no menu "Caixa Diário" para realizar novos lançamentos financeiros.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Receita Total" value={`R$ ${totalRevenue.toLocaleString()}`} trend="+12%" icon={TrendingUp} color="green" />
        <StatCard title="Despesa Total" value={`R$ ${totalExpense.toLocaleString()}`} trend="-5%" icon={TrendingDown} color="orange" />
        <StatCard title="Saldo Atual" value={`R$ ${balance.toLocaleString()}`} trend="Balanço" icon={DollarSign} color="blue" />
        <StatCard title="Investimento Estoque" value={`R$ ${inventoryCost.toLocaleString()}`} trend="Estoque" icon={Package} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a1d21] p-8 rounded-3xl border border-white/5">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="text-orange-500" />
            Acompanhamento de Metas
          </h3>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase">Meta Mensal</p>
                  <p className="text-white font-black text-xl">R$ {totalRevenue.toLocaleString()} / R$ {goals.monthly.toLocaleString()}</p>
                </div>
                <span className="text-orange-500 font-bold">{monthlyProgress.toFixed(1)}%</span>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${monthlyProgress}%` }}
                  className="h-full bg-orange-500"
                ></motion.div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase">Meta Anual</p>
                  <p className="text-white font-black text-xl">R$ {totalRevenue.toLocaleString()} / R$ {goals.annual.toLocaleString()}</p>
                </div>
                <span className="text-emerald-500 font-bold">{annualProgress.toFixed(1)}%</span>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${annualProgress}%` }}
                  className="h-full bg-emerald-500"
                ></motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1d21] p-8 rounded-3xl border border-white/5">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Clock className="text-blue-500" />
            Resumo do Dia ({new Date().toLocaleDateString()})
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#0f1115] p-4 rounded-2xl border border-white/5">
              <p className="text-gray-500 text-[10px] font-bold uppercase mb-1">Entrou Hoje</p>
              <p className="text-emerald-500 font-black text-lg">R$ {todayRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-[#0f1115] p-4 rounded-2xl border border-white/5">
              <p className="text-gray-500 text-[10px] font-bold uppercase mb-1">Saiu Hoje</p>
              <p className="text-red-500 font-black text-lg">R$ {todayExpense.toLocaleString()}</p>
            </div>
          </div>
          <div className="space-y-3 max-h-[150px] overflow-y-auto custom-scrollbar pr-2">
            {todayTransactions.length === 0 ? (
              <p className="text-gray-500 text-center py-4 text-sm italic">Nenhuma movimentação hoje.</p>
            ) : (
              todayTransactions.map(t => (
                <div key={t.id} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${t.type === 'entrada' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                      {t.type === 'entrada' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold">{t.description}</p>
                      <p className="text-gray-500 text-[10px]">{t.category}</p>
                    </div>
                  </div>
                  <p className={`text-xs font-bold ${t.type === 'entrada' ? 'text-emerald-500' : 'text-red-500'}`}>
                    {t.type === 'entrada' ? '+' : '-'} R$ {t.amount.toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#1a1d21] rounded-3xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Histórico de Lançamentos</h3>
          <div className="flex gap-2">
            <button className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white"><Search size={18} /></button>
            <button className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white"><Download size={18} /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0f1115] text-gray-500 text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Descrição</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4 text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-white/5 transition-all">
                  <td className="px-6 py-4 text-xs text-gray-400">{new Date(t.date).toLocaleString()}</td>
                  <td className="px-6 py-4 text-xs font-bold text-white">{t.description}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-white/5 rounded-lg text-[10px] text-gray-400">{t.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${t.type === 'entrada' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                      {t.type === 'entrada' ? 'Receita' : 'Despesa'}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-xs font-bold text-right ${t.type === 'entrada' ? 'text-emerald-500' : 'text-red-500'}`}>
                    R$ {t.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#1a1d21] w-full max-w-md rounded-3xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Configurar Metas</h3>
              <button onClick={() => setShowGoalModal(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveGoals} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-orange-500 uppercase mb-1.5">Meta Mensal (R$)</label>
                <input required type="number" className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none" value={goals.monthly} onChange={e => setGoals({...goals, monthly: parseFloat(e.target.value)})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-orange-500 uppercase mb-1.5">Meta Anual (R$)</label>
                <input required type="number" className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none" value={goals.annual} onChange={e => setGoals({...goals, annual: parseFloat(e.target.value)})} />
              </div>
              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 mt-4">Salvar Metas</button>
            </form>
          </motion.div>
        </div>
      )}

      {showTransactionModal.show && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#1a1d21] w-full max-w-md rounded-3xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Lançar {showTransactionModal.type === 'entrada' ? 'Receita' : 'Despesa'}</h3>
              <button onClick={() => setShowTransactionModal({show: false, type: 'entrada'})} className="text-gray-500 hover:text-white"><X size={24} /></button>
            </div>
            <form onSubmit={handleAddTransaction} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-orange-500 uppercase mb-1.5">Descrição</label>
                <input required type="text" className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none" placeholder="Ex: Pagamento Tatuagem" value={newTransaction.description} onChange={e => setNewTransaction({...newTransaction, description: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-orange-500 uppercase mb-1.5">Valor (R$)</label>
                <input required type="number" step="0.01" className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none" placeholder="0,00" value={newTransaction.amount} onChange={e => setNewTransaction({...newTransaction, amount: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-orange-500 uppercase mb-1.5">Categoria</label>
                <select className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none appearance-none" value={newTransaction.category} onChange={e => setNewTransaction({...newTransaction, category: e.target.value})}>
                  <option value="">Selecione...</option>
                  {showTransactionModal.type === 'entrada' ? (
                    <>
                      <option value="Serviço">Serviço</option>
                      <option value="Venda Produto">Venda Produto</option>
                      <option value="Outros">Outros</option>
                    </>
                  ) : (
                    <>
                      <option value="Aluguel">Aluguel</option>
                      <option value="Materiais">Materiais</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Estoque">Estoque</option>
                      <option value="Outros">Outros</option>
                    </>
                  )}
                </select>
              </div>
              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 mt-4">Confirmar Lançamento</button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const InventoryView = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ item: '', quantity: 0, unit: 'un', minQuantity: 5, costPrice: 0 });

  useEffect(() => {
    const q = query(collection(db, 'inventory'), orderBy('item', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'inventory'), newItem);
    setShowAddModal(false);
    setNewItem({ item: '', quantity: 0, unit: 'un', minQuantity: 5, costPrice: 0 });
  };

  const handleDeleteItem = async (id: string) => {
    if (confirm("Deseja excluir este item do estoque?")) {
      await deleteDoc(doc(db, 'inventory', id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1a1d21] p-6 rounded-3xl border border-white/5">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Package className="text-purple-500" />
            Gestão de Estoque
          </h3>
          <p className="text-gray-500 text-sm">Controle de materiais, insumos e custos de reposição.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
        >
          <Plus size={20} />
          Adicionar Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1a1d21] p-6 rounded-3xl border border-white/5">
          <p className="text-gray-500 text-xs font-bold uppercase mb-1">Total de Itens</p>
          <p className="text-2xl font-black text-white">{items.length}</p>
        </div>
        <div className="bg-[#1a1d21] p-6 rounded-3xl border border-white/5">
          <p className="text-gray-500 text-xs font-bold uppercase mb-1">Itens em Alerta</p>
          <p className="text-2xl font-black text-red-500">{items.filter(i => i.quantity <= i.minQuantity).length}</p>
        </div>
        <div className="bg-[#1a1d21] p-6 rounded-3xl border border-white/5">
          <p className="text-gray-500 text-xs font-bold uppercase mb-1">Valor Total em Estoque</p>
          <p className="text-2xl font-black text-emerald-500">R$ {items.reduce((acc, i) => acc + (i.quantity * (i.costPrice || 0)), 0).toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-[#1a1d21] rounded-3xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0f1115] text-gray-500 text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Quantidade</th>
                <th className="px-6 py-4">Mínimo</th>
                <th className="px-6 py-4">Preço de Custo</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-white/5 transition-all">
                  <td className="px-6 py-4">
                    <p className="text-white text-sm font-bold">{item.item}</p>
                    <p className="text-gray-500 text-[10px]">{item.unit}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${item.quantity <= item.minQuantity ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                      {item.quantity} {item.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">{item.minQuantity} {item.unit}</td>
                  <td className="px-6 py-4 text-xs text-white">R$ {(item.costPrice || 0).toLocaleString()}</td>
                  <td className="px-6 py-4 text-xs font-bold text-white">R$ {(item.quantity * (item.costPrice || 0)).toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDeleteItem(item.id)} className="p-2 text-gray-500 hover:text-red-500 transition-all">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#1a1d21] w-full max-w-md rounded-3xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Novo Item no Estoque</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
            </div>
            <form onSubmit={handleAddItem} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-orange-500 uppercase mb-1.5">Nome do Item</label>
                <input required type="text" className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none" placeholder="Ex: Agulha 3RL" value={newItem.item} onChange={e => setNewItem({...newItem, item: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-orange-500 uppercase mb-1.5">Quantidade</label>
                  <input required type="number" className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none" value={newItem.quantity} onChange={e => setNewItem({...newItem, quantity: parseInt(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-orange-500 uppercase mb-1.5">Unidade</label>
                  <input required type="text" className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none" placeholder="un, ml, cx" value={newItem.unit} onChange={e => setNewItem({...newItem, unit: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-orange-500 uppercase mb-1.5">Mínimo Alerta</label>
                  <input required type="number" className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none" value={newItem.minQuantity} onChange={e => setNewItem({...newItem, minQuantity: parseInt(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-orange-500 uppercase mb-1.5">Preço de Custo (R$)</label>
                  <input required type="number" step="0.01" className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none" value={newItem.costPrice} onChange={e => setNewItem({...newItem, costPrice: parseFloat(e.target.value)})} />
                </div>
              </div>
              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 mt-4">Adicionar ao Estoque</button>
            </form>
          </motion.div>
        </div>
      )}
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

const ClientsList = ({ onSelectClient, searchTerm = '', clients }: { onSelectClient: (client: any) => void, searchTerm?: string, clients: any[] }) => {
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
                {client.createdAt ? new Date(client.createdAt).toLocaleDateString('pt-BR') : '-'}
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

const TaskModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1a1d21] p-6 rounded-2xl border border-white/10 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Nova Tarefa</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Profissional</label>
            <select className="w-full bg-[#0f1115] border border-white/5 rounded-xl p-2 text-white">
              <option>Selecione o Profissional</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Data</label>
              <input type="date" className="w-full bg-[#0f1115] border border-white/5 rounded-xl p-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Inicio</label>
              <input type="time" className="w-full bg-[#0f1115] border border-white/5 rounded-xl p-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Fim</label>
              <input type="time" className="w-full bg-[#0f1115] border border-white/5 rounded-xl p-2 text-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Descrição</label>
            <textarea className="w-full bg-[#0f1115] border border-white/5 rounded-xl p-2 text-white h-24" />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-white/5 rounded-xl text-gray-400">Fechar</button>
          <button className="px-4 py-2 bg-emerald-500 rounded-xl text-white">Salvar</button>
        </div>
      </div>
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
    const message = `Parabéns, ${client.name}! 🎉\n\nA equipe Gestão Studio deseja a você um dia incrível e cheio de realizações. Feliz aniversário! 🎂🎈`;
    const url = `https://wa.me/55${client.phone?.replace(/\D/g, '') || ''}?text=${encodeURIComponent(message)}`;
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
                "Parabéns, <span className="text-orange-500 font-bold">[Nome do Cliente]</span>! 🎉 A equipe Gestão Studio deseja a você um dia incrível e cheio de realizações. Feliz aniversário! 🎂🎈"
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
    const url = `https://wa.me/${client.phone?.replace(/\D/g, '') || ''}?text=${encodeURIComponent(message)}`;
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

const NewBudgetModal = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    client: '', professional: '', service: '', region: '', colors: '', sessions: '1', height: '', width: '', validity: '', installments: '1', value: '', paymentMethod: ''
  });
  const [clients, setClients] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'clients'));
    return onSnapshot(q, (snapshot) => {
      setClients(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'budgets'), {
        ...formData,
        status: 'Pendente',
        createdAt: new Date().toISOString(),
        clientName: formData.client,
      });
      onClose();
    } catch (error) {
      console.error('Error adding budget:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1d21] w-full max-w-4xl rounded-3xl border border-white/10 p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Orçamento</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="relative">
              <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Cliente</label>
              <input 
                placeholder="Localize o Cliente" 
                className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/5 text-white"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowClientDropdown(true);
                }}
              />
              {showClientDropdown && (
                <div className="absolute z-10 w-full bg-[#1a1d21] border border-white/10 rounded-xl mt-1 max-h-40 overflow-y-auto">
                  {clients.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map(c => (
                    <div key={c.id} className="p-3 hover:bg-white/5 cursor-pointer text-white" onClick={() => {
                      setFormData({...formData, client: c.name});
                      setSearchTerm(c.name);
                      setShowClientDropdown(false);
                    }}>
                      {c.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Profissional</label>
              <select className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/5 text-white" onChange={e => setFormData({...formData, professional: e.target.value})}>
                <option value="">Selecione o Artista</option>
                <option value="Artista 1">Artista 1</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Serviço</label>
              <select className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/5 text-white" onChange={e => setFormData({...formData, service: e.target.value})}>
                <option value="">Selecione o Serviço</option>
                <option value="Tattoo">Tattoo</option>
                <option value="Piercing">Piercing</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 p-4 border border-white/5 rounded-2xl">
            <div>
              <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Região</label>
              <select className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/5 text-white" onChange={e => setFormData({...formData, region: e.target.value})}>
                <option value="">Selecione</option>
                {['Cabeça', 'Pescoço', 'Ombro', 'Costas', 'Braço', 'Perna'].map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Cores</label>
              <select className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/5 text-white" onChange={e => setFormData({...formData, colors: e.target.value})}>
                <option value="">Selecione</option>
                {['Preto e Branco', 'Colorida', 'Preto e Cinza'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Sessões</label>
              <input type="number" value={formData.sessions} className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/5 text-white" onChange={e => setFormData({...formData, sessions: e.target.value})} />
            </div>
            <div className="col-span-3">
              <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Tamanho</label>
              <div className="flex gap-4">
                <input placeholder="Altura(CM)" type="number" className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/5 text-white" onChange={e => setFormData({...formData, height: e.target.value})} />
                <input placeholder="Largura(CM)" type="number" className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/5 text-white" onChange={e => setFormData({...formData, width: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="p-4 border border-white/5 rounded-2xl grid grid-cols-3 gap-4">
            <div className="col-span-3">
              <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Pagamento</label>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Válidade</label>
              <input type="date" className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/5 text-white" onChange={e => setFormData({...formData, validity: e.target.value})} />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Parc.</label>
              <input type="number" value={formData.installments} className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/5 text-white" onChange={e => setFormData({...formData, installments: e.target.value})} />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Valor(R$)</label>
              <input type="number" className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/5 text-white" onChange={e => setFormData({...formData, value: e.target.value})} />
            </div>
            <div className="col-span-3">
              <input placeholder="Pagamento" className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/5 text-white" onChange={e => setFormData({...formData, paymentMethod: e.target.value})} />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-8 rounded-xl">Sair</button>
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2">
              <Save size={18} /> Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const BudgetCard = ({ budget, onEdit, key }: { budget: any, onEdit: (b: any) => void, key?: string }) => (
  <div className="bg-[#0f1115] p-4 rounded-xl border border-white/5 mb-4">
    <p className="text-sm font-bold text-white">{budget.service}</p>
    <p className="text-xs text-gray-400 mb-2">{budget.client}</p>
    <div className="flex items-center gap-2 mb-3">
      <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-[10px] text-white">J</div>
      <span className="text-xs text-gray-500">Junior</span>
    </div>
    <p className="text-[10px] text-gray-500 mb-3">{budget.date}</p>
    <div className="flex gap-2">
      <button onClick={() => onEdit(budget)} className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600"><Edit2 size={14} /></button>
      <button className="p-2 bg-orange-500/20 rounded-lg hover:bg-orange-500/30 text-orange-500"><Tag size={14} /></button>
      <button className="p-2 bg-emerald-500/20 rounded-lg hover:bg-emerald-500/30 text-emerald-500"><MessageCircle size={14} /></button>
    </div>
  </div>
);

const PDFView = ({ budget, onClose }: { budget: any, onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4">
    <div className="bg-white w-full max-w-2xl h-[90vh] overflow-y-auto p-8 text-black">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Orçamento</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">Fechar</button>
      </div>
      <div className="space-y-4">
        <p><strong>Nome:</strong> {budget.client}</p>
        <p><strong>Serviço:</strong> {budget.service}</p>
        <p><strong>Data:</strong> {budget.date}</p>
        {/* Add more fields from the 3rd image here */}
      </div>
    </div>
  </div>
);

const BudgetDetailsModal = ({ budget, onClose }: { budget: any, onClose: () => void }) => {
  const [showPDF, setShowPDF] = useState(false);
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1d21] rounded-3xl border border-white/5 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Orçamento</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs text-gray-500 font-bold uppercase mb-1">Status</label><select className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/10 text-white"><option>Aguardando Orçamento</option></select></div>
            <div><label className="block text-xs text-gray-500 font-bold uppercase mb-1">Motivo Não Fechar</label><select className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/10 text-white"><option></option></select></div>
            <div className="col-span-2"><label className="block text-xs text-gray-500 font-bold uppercase mb-1">Cliente</label><select className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/10 text-white"><option>{budget.client}</option></select></div>
            <div><label className="block text-xs text-gray-500 font-bold uppercase mb-1">Profissional</label><input className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/10 text-white" defaultValue="Junior" /></div>
            <div><label className="block text-xs text-gray-500 font-bold uppercase mb-1">Serviço</label><input className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/10 text-white" defaultValue={budget.service} /></div>
          </div>
          <div className="border border-white/5 rounded-xl p-4 text-gray-400">+ Formulário Padrão</div>
          <div className="border border-white/5 rounded-xl p-4 text-gray-400">+ Formulário Personalizado</div>
          <div className="border border-white/5 rounded-xl p-4 text-gray-400">+ Outros Anexos</div>
          <div className="border border-white/5 rounded-xl p-4 text-gray-400">+ Etiquetas</div>
        </div>
        <div className="p-6 border-t border-white/5 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5">Sair</button>
          <button className="px-6 py-3 rounded-xl bg-gray-700 text-white font-bold hover:bg-gray-600 flex items-center gap-2"><Save size={18} /> Salvar e Responder Cliente</button>
          <button className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 flex items-center gap-2"><MessageCircle size={18} /> WhatsApp</button>
          <button onClick={() => setShowPDF(true)} className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 flex items-center gap-2"><FileText size={18} /> Ver Documento</button>
        </div>
      </div>
      {showPDF && <PDFView budget={budget} onClose={() => setShowPDF(false)} />}
    </div>
  );
};

const KanbanDashboard = () => {
  const [view, setView] = useState<'kanban' | 'clientDetails'>('kanban');
  const [selectedBudget, setSelectedBudget] = useState<any>(null);

  const budgets = [
    { id: '1', service: 'Tatuagem', client: 'Luiz Silveira Da Conceicao Junior', date: '12/03/26', status: 'Novos Pedidos' },
    { id: '2', service: 'HT sistema', client: 'Luiz Silveira Da Conceicao Junior', date: '12/03/26', status: 'Novos Pedidos' },
  ];

  if (view === 'clientDetails') {
    return <ClientDetailsView onBack={() => setView('kanban')} />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#1a1d21] rounded-3xl border border-white/5 p-8">
        <h3 className="text-xl font-bold text-white mb-6">Orçamentos</h3>
        <div className="flex gap-4">
          <button onClick={() => setSelectedBudget({})} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold">Novo Orçamento</button>
          <button onClick={() => setView('clientDetails')} className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-bold">Formulário para Cliente</button>
        </div>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {['Novos Pedidos', 'Orçamentos Enviados', 'Aprovados'].map(status => (
          <div key={status} className="bg-[#1a1d21] rounded-3xl border border-white/5 p-6 w-80 flex-shrink-0">
            <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">{status} {budgets.filter(b => b.status === status).length}</h4>
            {budgets.filter(b => b.status === status).map(b => (
              <BudgetCard key={b.id} budget={b} onEdit={setSelectedBudget} />
            ))}
          </div>
        ))}
      </div>
      {selectedBudget && <BudgetDetailsModal budget={selectedBudget} onClose={() => setSelectedBudget(null)} />}
    </div>
  );
};

const ClientDetailsView = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-gray-400 hover:text-white mb-4">← Voltar</button>
      <div className="bg-[#1a1d21] rounded-3xl border border-white/5 p-8 space-y-6 text-gray-300">
        <h2 className="text-2xl font-bold text-orange-500">Solicite seu Orçamento</h2>
        <p className="text-sm">Preencha todos os campos com atenção, todos os campos são importantes para que seu orçamento seja providenciado com maior agilidade! Obrigado!</p>
        
        <div className="space-y-4">
          <div><label className="block text-sm font-bold text-white mb-1">Seu Nome *</label><input className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/10" /></div>
          <div><label className="block text-sm font-bold text-white mb-1">Sua Foto Rosto (Para seu Perfil)</label><div className="border-2 border-dashed border-white/10 p-6 text-center rounded-xl">Anexar Foto</div></div>
          <div><label className="block text-sm font-bold text-white mb-1">Nascimento</label><input type="date" className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/10" /></div>
          <div><label className="block text-sm font-bold text-white mb-1">Cidade</label><input className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/10" /></div>
          <div><label className="block text-sm font-bold text-white mb-1">Email</label><input type="email" className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/10" /></div>
          <div><label className="block text-sm font-bold text-white mb-1">WhatsApp (Com DDD sem o Zero) *</label><input className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/10" /></div>
          <div><label className="block text-sm font-bold text-white mb-1">Como nos Conheceu?</label><select className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/10"><option>Selecione</option></select></div>
          <div><label className="block text-sm font-bold text-white mb-1">Serviço</label><input className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/10" /></div>
          <div><label className="block text-sm font-bold text-white mb-1">Região do Corpo *</label><select className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/10"><option>Qual Região do Corpo?</option></select></div>
          <div><label className="block text-sm font-bold text-white mb-1">É Escrita? sabe a fonte?(Escolher Fonte), deixe o link ou o nome da fonte:</label><input className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/10" /></div>
          <div><label className="block text-sm font-bold text-white mb-1">Qual sua disponibilidade conforme Dias da semana e período do dia? *</label><input className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/10" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-bold text-white mb-1">Tamanho Altura * (cm)</label><input type="number" className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/10" /></div>
            <div><label className="block text-sm font-bold text-white mb-1">Tamanho Largura * (cm)</label><input type="number" className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/10" /></div>
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">Cor?</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2"><input type="radio" name="cor" /> Preto & Branco</label>
              <label className="flex items-center gap-2"><input type="radio" name="cor" /> Preto & Cinza</label>
              <label className="flex items-center gap-2"><input type="radio" name="cor" /> Colorida</label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">Primeira Tattoo?</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2"><input type="radio" name="primeira" /> Sim</label>
              <label className="flex items-center gap-2"><input type="radio" name="primeira" /> Não</label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">É Maior de Idade?</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2"><input type="radio" name="maior" /> Sim</label>
              <label className="flex items-center gap-2"><input type="radio" name="maior" /> Não</label>
            </div>
          </div>
          <div><label className="block text-sm font-bold text-white mb-1">Descrição do que Deseja *</label><textarea className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/10 h-32"></textarea></div>
          
          <div className="space-y-2">
            <label className="block text-sm font-bold text-white">Anexe imagens para referência:</label>
            <div className="border-2 border-dashed border-white/10 p-4 rounded-xl text-center">Anexar Foto do local</div>
            <div className="border-2 border-dashed border-white/10 p-4 rounded-xl text-center">Anexar Imagem de Referência *</div>
            <div className="border-2 border-dashed border-white/10 p-4 rounded-xl text-center">Anexar Outra Imagem de Referência</div>
          </div>

          <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Eu aceito as Políticas de Privacidade e Segurança dos Dados *</label>
          <p className="text-xs text-gray-500">( * ) = Campos Obrigatórios</p>
          
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl uppercase">Enviar Formulário</button>
        </div>
      </div>
    </div>
  );
};

const CaixaDiario = ({ status, setStatus, setActiveTab }: { status: 'Aberto' | 'Fechado', setStatus: (s: 'Aberto' | 'Fechado') => void, setActiveTab: (t: string) => void }) => {
  const [valorInicial, setValorInicial] = useState('');
  
  const vendasMock = [
    { id: 1, cliente: 'João Silva', valor: 150.00, metodo: 'Pix', hora: '10:30' },
    { id: 2, cliente: 'Maria Oliveira', valor: 80.00, metodo: 'Cartão', hora: '11:45' },
  ];

  const totalVendas = vendasMock.reduce((acc, v) => acc + v.valor, 0);

  return (
    <div className="space-y-6">
      <div className="bg-[#1a1d21] rounded-3xl border border-white/5 p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Caixa Diário</h3>
          <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${status === 'Aberto' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
            {status}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#0f1115] p-4 rounded-xl border border-white/5">
            <p className="text-xs text-gray-500 font-bold uppercase mb-1">Data</p>
            <p className="text-white font-bold">{new Date().toLocaleDateString('pt-BR')}</p>
          </div>
          <div className="bg-[#0f1115] p-4 rounded-xl border border-white/5">
            <p className="text-xs text-gray-500 font-bold uppercase mb-1">Valor Inicial</p>
            {status === 'Fechado' ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">R$</span>
                <input 
                  type="text" 
                  value={valorInicial} 
                  onChange={(e) => setValorInicial(e.target.value)}
                  className="w-full bg-transparent text-white outline-none font-bold" 
                  placeholder="0,00"
                />
              </div>
            ) : (
              <p className="text-white font-bold">R$ {valorInicial || '0,00'}</p>
            )}
          </div>
          <div className="bg-[#0f1115] p-4 rounded-xl border border-white/5">
            <p className="text-xs text-gray-500 font-bold uppercase mb-1">Vendas Acumuladas</p>
            <p className="text-emerald-500 font-bold">R$ {totalVendas.toFixed(2)}</p>
          </div>
          <div className="bg-[#0f1115] p-4 rounded-xl border border-white/5">
            <p className="text-xs text-gray-500 font-bold uppercase mb-1">Saldo Atual</p>
            <p className="text-white font-bold">R$ {(parseFloat(valorInicial.replace(',', '.') || '0') + totalVendas).toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          {status === 'Fechado' ? (
            <button 
              onClick={() => setStatus('Aberto')}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl uppercase transition-all shadow-lg shadow-emerald-500/20"
            >
              Abrir o Caixa
            </button>
          ) : (
            <>
              <button 
                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl uppercase transition-all"
              >
                Lançar Movimentação
              </button>
              <button 
                onClick={() => setStatus('Fechado')}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl uppercase transition-all shadow-lg shadow-red-500/20"
              >
                Fechar o Caixa
              </button>
            </>
          )}
        </div>
      </div>

      {status === 'Aberto' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#1a1d21] rounded-3xl border border-white/5 p-8">
            <h3 className="text-lg font-bold text-white mb-6">Vendas do Dia</h3>
            <div className="space-y-4">
              {vendasMock.map(venda => (
                <div key={venda.id} className="flex justify-between items-center p-4 bg-[#0f1115] rounded-xl border border-white/5">
                  <div>
                    <p className="text-white font-bold">{venda.cliente}</p>
                    <p className="text-xs text-gray-500">{venda.hora} - {venda.metodo}</p>
                  </div>
                  <p className="text-emerald-500 font-bold">R$ {venda.valor.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-[#1a1d21] rounded-3xl border border-white/5 p-8">
            <h3 className="text-lg font-bold text-white mb-6">Atendimentos em Aberto</h3>
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                <Users size={32} className="text-gray-600" />
              </div>
              <p className="text-gray-500 text-sm">Nenhum atendimento em aberto no momento.</p>
              <button 
                onClick={() => setActiveTab('Atendimentos')}
                className="mt-4 text-orange-500 font-bold text-sm hover:underline"
              >
                Ir para Atendimentos
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#1a1d21] rounded-3xl border border-white/5 p-8">
        <h3 className="text-xl font-bold text-white mb-6">Histórico de Fechamentos</h3>
        <div className="text-center py-10">
          <p className="text-gray-500">Nenhum fechamento registrado recentemente.</p>
        </div>
      </div>
    </div>
  );
};

const AtendimentosView = () => {
  const [activeSubTab, setActiveSubTab] = useState<'Nova Comanda' | 'Comandas Abertas'>('Nova Comanda');
  const [showQuickRegister, setShowQuickRegister] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-[#1a1d21] rounded-3xl border border-white/5 p-8">
        <h3 className="text-xl font-bold text-white mb-6">Comandas</h3>
        
        <div className="flex gap-2 mb-6 border-b border-white/10 pb-2">
          <button 
            onClick={() => setActiveSubTab('Nova Comanda')}
            className={`px-6 py-2 font-bold ${activeSubTab === 'Nova Comanda' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400'}`}
          >
            Nova Comanda
          </button>
          <button 
            onClick={() => setActiveSubTab('Comandas Abertas')}
            className={`px-6 py-2 font-bold ${activeSubTab === 'Comandas Abertas' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400'}`}
          >
            Comandas Abertas
          </button>
        </div>

        {activeSubTab === 'Nova Comanda' ? (
          <div className="space-y-4">
            <div className="p-4 bg-[#0f1115] rounded-xl border border-white/5">
              <label className="block text-sm font-bold text-white mb-2">Cliente</label>
              <input 
                type="text" 
                placeholder="Localize o Cliente" 
                className="w-full bg-[#1a1d21] p-3 rounded-xl border border-white/10 text-white" 
              />
              <button 
                onClick={() => setShowQuickRegister(!showQuickRegister)}
                className="text-orange-500 text-sm mt-2 font-bold"
              >
                + Novo Cliente Cadastro Rápido
              </button>
              
              {showQuickRegister && (
                <div className="mt-4 space-y-2">
                  <input type="text" placeholder="Nome Cliente" className="w-full bg-[#1a1d21] p-3 rounded-xl border border-white/10 text-white" />
                  <input type="email" placeholder="Email Cliente" className="w-full bg-[#1a1d21] p-3 rounded-xl border border-white/10 text-white" />
                  <input type="text" placeholder="WhatsApp com DDD sem o Zero, EX: 1199644...." className="w-full bg-[#1a1d21] p-3 rounded-xl border border-white/10 text-white" />
                </div>
              )}
            </div>
            <div className="p-4 bg-[#0f1115] rounded-xl border border-white/5">
              <label className="block text-sm font-bold text-white mb-2">Atendente</label>
              <select className="w-full bg-[#1a1d21] p-3 rounded-xl border border-white/10 text-white">
                <option>Selecione o Atendente</option>
                <option>Administrador</option>
                <option>Tatuador</option>
              </select>
            </div>
            <div className="p-4 bg-[#0f1115] rounded-xl border border-white/5">
              <label className="block text-sm font-bold text-white mb-2">Fila</label>
              <select className="w-full bg-[#1a1d21] p-3 rounded-xl border border-white/10 text-white">
                <option>Espera</option>
                <option>Agendado</option>
              </select>
            </div>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl uppercase">Abrir Comanda</button>
          </div>
        ) : (
          <div className="space-y-4">
            <input type="text" placeholder="Procurar..." className="w-full bg-[#0f1115] p-3 rounded-xl border border-white/10 text-white" />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-[#0f1115] text-white">
                  <tr>
                    <th className="p-3">Ação</th>
                    <th className="p-3">Comanda</th>
                    <th className="p-3">Cliente</th>
                    <th className="p-3">Entrada</th>
                    <th className="p-3">Fila</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-3"><button className="bg-blue-500 text-white px-3 py-1 rounded">Abrir Comanda</button></td>
                    <td className="p-3">748836</td>
                    <td className="p-3">Luiz Silveira Da Conceicao Junior</td>
                    <td className="p-3">12/03/2026 02:59</td>
                    <td className="p-3">Agendado</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BudgetDashboard = ({ onCreateBudget }: { onCreateBudget: () => void }) => {
  const [budgets, setBudgets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Todos');
  const [showNewModal, setShowNewModal] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'budgets'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      setBudgets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
  }, []);

  const stats = [
    { title: 'APROVADOS', value: budgets.filter(b => b.status === 'Aprovado').length, total: 'Total R$0,00', color: 'bg-emerald-800' },
    { title: 'AGUARDANDO ORÇAMENTO', value: budgets.filter(b => b.status === 'Pendente').length, total: 'Total R$0,00', color: 'bg-indigo-900' },
    { title: 'AGUARDANDO CLIENTE', value: budgets.filter(b => b.status === 'Respondido').length, total: 'Total R$0,00', color: 'bg-red-800' },
    { title: 'PERDIDOS', value: budgets.filter(b => b.status === 'Arquivado').length, total: 'Total R$0,00', color: 'bg-gray-700' },
  ];

  return (
    <div className="space-y-6">
      {showNewModal && <NewBudgetModal onClose={() => setShowNewModal(false)} />}
      <div className="flex items-center gap-4 bg-[#1a1d21] p-4 rounded-2xl border border-white/5">
        <button onClick={() => setShowNewModal(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
          <Plus size={18} /> Novo Orçamento
        </button>
        <button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
          <LinkIcon size={18} /> Formulário para Clientes
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
          <Activity size={18} /> Motivo das Perdas
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
          <BarChart3 size={18} /> Funil de Vendas
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`${stat.color} p-6 rounded-2xl text-white`}>
            <h4 className="text-sm font-bold opacity-80">{stat.title}</h4>
            <p className="text-4xl font-black my-2">{stat.value}</p>
            <p className="text-xs opacity-70">{stat.total}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-[#1a1d21] rounded-3xl border border-white/5 p-6">
        <h3 className="text-lg font-bold mb-4">Filtrar Orçamentos</h3>
        <div className="flex gap-2 mb-6">
          {['Todos', 'Pendente', 'Respondido', 'Aprovado', 'Arquivado'].map(f => (
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
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/2 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {budgets.filter(b => filter === 'Todos' || b.status === filter).map((budget) => (
                <tr key={budget.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      budget.status === 'Aprovado' ? 'bg-emerald-500/10 text-emerald-500' :
                      budget.status === 'Pendente' ? 'bg-yellow-500/10 text-yellow-500' :
                      budget.status === 'Respondido' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-gray-500/10 text-gray-500'
                    }`}>
                      {budget.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-white">{budget.clientName}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{new Date(budget.createdAt).toLocaleDateString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

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
                          window.open(`https://wa.me/55${budget.clientPhone?.replace(/\D/g, '') || ''}?text=${encodeURIComponent(msg)}`, '_blank');
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
                    window.open(`https://wa.me/55${selectedBudget.clientPhone?.replace(/\D/g, '') || ''}?text=${encodeURIComponent(msg)}`, '_blank');
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
      <div className="space-y-6">
        {/* Yellow Highlighted Section */}
        <div className="bg-yellow-400/20 border border-yellow-500/50 rounded-3xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-yellow-500 flex items-center gap-2">
            <span className="text-2xl">💡</span> Link único para cadastro de clientes, anamnese, orçamento e agendamento
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-black/20 border border-yellow-500/20 rounded-xl px-4 py-3 text-sm text-yellow-100 flex items-center overflow-hidden">
              <span className="truncate">{publicLink}</span>
            </div>
            <button onClick={copyLink} className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
              <Copy size={18} /> Copiar
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
              <Share2 size={18} /> Compartilhar
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
              <MessageSquare size={18} /> WhatsApp
            </button>
          </div>
          <div className="bg-black/20 p-4 rounded-2xl border border-yellow-500/20 text-yellow-100 text-sm space-y-2">
            <p className="font-bold">🚀 NOVO SISTEMA UNIFICADO! Um único link para que seus clientes possam:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>✅ Cadastrar-se ou atualizar dados via WhatsApp</li>
              <li>✅ Solicitar orçamento com upload de imagens</li>
              <li>✅ Preencher anamnese com assinatura digital</li>
              <li>✅ Agendar atendimento com verificação de horários</li>
            </ul>
            <p className="text-xs mt-2 italic">✨ Experiência otimizada: O cliente escolhe o que deseja fazer após se identificar com o WhatsApp. Sistema inteligente que evita cadastros duplicados e mantém dados sempre atualizados!</p>
          </div>
        </div>

        {/* List of Link Sections */}
        {[
          { title: 'Orçamento', url: publicLink, desc: 'Utilize a URL acima para receber orçamentos. Você pode copiá-la e compartilhá-la com seus clientes para facilitar o acesso ao formulário de orçamentos.' },
          { title: 'Ficha Anamnese', url: `${window.location.origin}/anamnese`, desc: 'Link para a ficha de anamnese do cliente. Nesse link, poderá acompanhar o arquivo das fichas cadastradas.' },
          { title: 'Site Portfólio', url: `${window.location.origin}/portfolio`, desc: 'Aqui poderá divulgar para seus clientes o portfólio das fotos dos profissionais do estúdio de forma profissional, atualizada e online.' },
          { title: 'Cadastro Clientes', url: `${window.location.origin}/cadastro`, desc: 'Link para solicitar o cadastro de clientes. Nesse outro link, poderá ver o histórico de clientes.' },
          { title: 'Reserva/Agenda Online', url: `${window.location.origin}/reserva`, desc: 'Acesse o menu do cadastro de profissionais, ao editar o profissional, deverá cadastrar os horários de atendimento do mesmo.' },
          { title: 'Receba Avaliações Clientes', url: `${window.location.origin}/feedback`, desc: 'Após o serviço, poderá solicitar aos clientes uma avaliação/feedback do serviço prestado. Nesse link, poderá acompanhar as avaliações dos clientes.' }
        ].map((item, index) => (
          <div key={index} className="bg-[#1a1d21] rounded-3xl border border-white/5 p-6 space-y-4">
            <h4 className="text-lg font-bold text-white">{item.title}</h4>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-400 flex items-center overflow-hidden">
                <span className="truncate">{item.url}</span>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(item.url); alert('Link copiado!'); }} className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                <Copy size={18} /> Copiar
              </button>
              <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                <Share2 size={18} /> Compartilhar
              </button>
            </div>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
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
          <h3 className="text-3xl font-black text-white uppercase tracking-tight">Veja mais do meu <span className="text-orange-500">Trabalho!</span></h3>
          <div className="w-24 h-24 bg-white/5 rounded-3xl mx-auto flex items-center justify-center text-gray-600">
            <Camera size={48} />
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
        <Route path="/portal" element={<ClientPortal />} />
        <Route path="/portfolio" element={<PublicPortfolio />} />
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

const PublicPortfolio = () => {
  const [works, setWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const worksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWorks(worksData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1115] text-white p-4 md:p-8">
      <header className="max-w-7xl mx-auto mb-12 text-center">
        <div className="w-20 h-20 bg-orange-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Camera size={40} className="text-orange-500" />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Meu Portfólio</h1>
        <p className="text-gray-500">Conheça alguns dos meus melhores trabalhos</p>
      </header>

      <main className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-20">
            <RefreshCw className="animate-spin text-orange-500" size={40} />
          </div>
        ) : works.length === 0 ? (
          <div className="text-center py-20 bg-[#1a1d21] rounded-3xl border border-white/5">
            <p className="text-gray-500">Nenhum trabalho disponível no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {works.map((work) => (
              <motion.div 
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative aspect-square bg-[#1a1d21] rounded-3xl overflow-hidden border border-white/5"
              >
                <img 
                  src={work.url} 
                  alt={work.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent pt-12">
                  <h4 className="text-white font-bold">{work.title}</h4>
                  <span className="text-orange-500 text-xs font-bold uppercase tracking-wider">{work.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto mt-20 py-8 border-t border-white/5 text-center">
        <p className="text-gray-600 text-sm">© 2026 - Portfólio Profissional</p>
      </footer>
    </div>
  );
};

const ClientPortal = () => {
  const [step, setStep] = useState('identify');
  const [phone, setPhone] = useState('');
  const [client, setClient] = useState<any>(null);

  const handleIdentify = async () => {
    const q = query(collection(db, 'clients'), where('phone', '==', phone));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      setClient({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
      setStep('confirm');
    } else {
      setStep('confirm'); // Or handle new client
    }
  };

  return (
    <div className="min-h-screen bg-[#2c3e50] flex items-center justify-center p-4">
      {step === 'identify' && (
        <div className="bg-[#1a1d21] p-10 rounded-3xl border border-white/5 text-center max-w-md w-full space-y-6">
          <h2 className="text-2xl font-bold text-orange-500">Identifique-se</h2>
          <p className="text-gray-400">Para começar, informe seu número de WhatsApp com DDD</p>
          <input 
            type="tel" 
            placeholder="(00) 00000-0000" 
            className="w-full bg-[#0f1115] border border-white/5 rounded-xl px-4 py-3 text-white"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <button onClick={handleIdentify} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl">VERIFICAR</button>
        </div>
      )}
      {step === 'confirm' && (
        <div className="bg-[#1a1d21] p-10 rounded-3xl border border-white/5 max-w-md w-full space-y-6">
          <h2 className="text-2xl font-bold text-orange-500">Seus Dados</h2>
          {client ? (
            <div className="bg-white/5 p-4 rounded-xl text-gray-300 text-sm">
              <p>Nome: {client.name}</p>
              <p>Email: {client.email}</p>
              <p>WhatsApp: {client.phone}</p>
            </div>
          ) : <p className="text-gray-400">Cliente não encontrado. Preencha seus dados.</p>}
          <button onClick={() => setStep('menu')} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl">CONTINUAR</button>
        </div>
      )}
      {step === 'menu' && (
        <div className="bg-[#1a1d21] p-10 rounded-3xl border border-white/5 max-w-2xl w-full space-y-6">
          <h2 className="text-2xl font-bold text-orange-500 text-center">O que você deseja fazer?</h2>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setStep('budget')} className="bg-white/5 p-6 rounded-2xl border border-white/5 text-white font-bold">Solicitar Orçamento</button>
            <button className="bg-white/5 p-6 rounded-2xl border border-white/5 text-white font-bold">Calcular Valor</button>
            <button onClick={() => setStep('anamnesis')} className="bg-white/5 p-6 rounded-2xl border border-white/5 text-white font-bold">Preencher Anamnese</button>
            <button className="bg-white/5 p-6 rounded-2xl border border-white/5 text-white font-bold">Fazer Agendamento</button>
            <button className="bg-white/5 p-6 rounded-2xl border border-white/5 text-white font-bold">Finalizar Cadastro</button>
          </div>
        </div>
      )}
      {step === 'anamnesis' && (
        <div className="bg-[#1a1d21] p-6 rounded-3xl border border-white/5 max-w-4xl w-full space-y-8">
          <h2 className="text-2xl font-bold text-orange-500 text-center">Ficha Anamnese</h2>
          
          {/* Personal Data Section */}
          <div className="bg-[#0f1115] p-6 rounded-2xl border border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2"><User size={20} /> Seus Dados Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['WhatsApp', 'Nome', 'CPF', 'RG', 'Data Nascimento', 'Gênero', 'CEP', 'Cidade', 'UF', 'Endereço', 'Bairro', 'E-mail'].map(field => (
                <div key={field}>
                  <label className="text-xs text-gray-500 font-bold uppercase block mb-1">{field}</label>
                  <input className="w-full bg-[#1a1d21] border border-white/5 rounded-xl px-4 py-2 text-white" />
                </div>
              ))}
              <div className="col-span-2">
                <label className="text-xs text-gray-500 font-bold uppercase block mb-1">Como nos Conheceu?</label>
                <select className="w-full bg-[#1a1d21] border border-white/5 rounded-xl px-4 py-2 text-white">
                  <option>Selecione</option>
                </select>
              </div>
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
              <Camera size={16} /> Anexar Sua Foto
            </button>
          </div>

          {/* Evaluation Section */}
          <div className="bg-[#0f1115] p-6 rounded-2xl border border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2"><Activity size={20} /> Avaliação</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 font-bold uppercase block mb-1">Profissional</label>
                <select className="w-full bg-[#1a1d21] border border-white/5 rounded-xl px-4 py-2 text-white"><option>Selecione</option></select>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-bold uppercase block mb-1">Serviço</label>
                <select className="w-full bg-[#1a1d21] border border-white/5 rounded-xl px-4 py-2 text-white"><option>Selecione</option></select>
              </div>
            </div>

            {['É portador de Diabetes? Fez hemograma a menos de um ano?', 'Faz uso de medicamentos ou cirurgia a menos de 6 meses?', 'Pressão Arterial? É Epilético?', 'Teve hepatite, anemia ou é hemofílico?', 'Possui Alergia? Qual?', 'Portador de doenças transmissíveis?', 'Fez hemograma completo há menos de um ano?', 'Já teve cicatrização por quelóide?', 'Autoriza a divulgação da imagem em nossa rede social?'].map((q, i) => (
              <div key={i} className="border-b border-white/5 pb-2">
                <label className="flex items-center gap-3 text-white text-sm">
                  <input type="checkbox" className="w-5 h-5 accent-orange-500" />
                  {q}
                </label>
                <input placeholder="Observações" className="w-full mt-1 bg-[#1a1d21] border border-white/5 rounded-lg px-3 py-1 text-white text-sm" />
              </div>
            ))}
            
            <div>
              <label className="text-xs text-gray-500 font-bold uppercase block mb-1">Sangue</label>
              <select className="w-full bg-[#1a1d21] border border-white/5 rounded-xl px-4 py-2 text-white"><option>Selecione</option></select>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-[#0f1115] p-6 rounded-2xl border border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2"><FileText size={20} /> Descrição</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Descrever o Procedimento" className="w-full bg-[#1a1d21] border border-white/5 rounded-xl px-4 py-2 text-white" />
              <select className="w-full bg-[#1a1d21] border border-white/5 rounded-xl px-4 py-3 text-white"><option>Região Corpo</option></select>
            </div>
          </div>

          {/* Terms and Uploads */}
          <div className="bg-[#0f1115] p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="h-40 overflow-y-auto text-xs text-gray-400 bg-[#1a1d21] p-3 rounded-lg border border-white/5">
              {/* ... (Term text remains the same) ... */}
              Eu, abaixo assinado(a), autorizo e concordo com o serviço prestado, declarando estar ciente de todos os cuidados recomendados pelo técnico aplicador...
            </div>
            <p className="text-sm text-white font-bold">Reconheço as informações apresentadas nesse documento como verdadeiras.</p>
            <div className="flex gap-4">
              <button className="bg-orange-500/20 text-orange-500 px-4 py-2 rounded-xl text-xs font-bold">Anexar Foto Frente Documento</button>
              <button className="bg-orange-500/20 text-orange-500 px-4 py-2 rounded-xl text-xs font-bold">Anexar Foto Verso Documento</button>
            </div>
          </div>

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
            <Save size={20} /> Salvar Minha Ficha
          </button>
          <button onClick={() => setStep('menu')} className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl">VOLTAR</button>
        </div>
      )}
    </div>
  );
};
