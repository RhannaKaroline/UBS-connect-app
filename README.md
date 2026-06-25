# UBS-Connect

Aplicativo mobile para gestão de Unidades Básicas de Saúde. Conecta pacientes, médicos, agentes de saúde e farmacêuticos.

## Requisitos

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Dispositivo físico ou emulador (Android/iOS)
- Backend em execução em `https://ubs-connect-projeto.onrender.com`

## Como rodar

```bash
npm install
npx expo start
```

Escaneie o QR Code com o app **Expo Go** ou pressione `a` para abrir no emulador Android.

> Para testar localmente, altere a `baseURL` em `src/lib/api.ts` para `http://IP_DO_SERVIDOR:5000`.

---

## Tipos de Usuário e Regras de Cadastro

### Paciente

| Campo | Regra |
|---|---|
| Nome | Mínimo 3 caracteres |
| CPF | 11 dígitos, formatado como `XXX.XXX.XXX-XX`, com validação dos dígitos verificadores |
| Senha | Mínimo 6 caracteres |

### Médico

| Campo | Regra |
|---|---|
| Nome | Mínimo 3 caracteres |
| CRM | Formato `123456-UF` (4 a 6 dígitos + hífen + 2 letras do estado) |
| Especialidade | Texto livre (opcional) |
| UBS | Seleção em lista (opcional) |
| Senha | Mínimo 6 caracteres |

### Agente de Saúde

| Campo | Regra |
|---|---|
| Nome | Mínimo 3 caracteres |
| ACS | Formato `ACS-XXXXX` (4 a 8 dígitos após o hífen) |
| Senha | Mínimo 6 caracteres |

### Farmacêutico

| Campo | Regra |
|---|---|
| Nome | Mínimo 3 caracteres |
| CRF | Formato `CRF-XXXXX` (4 a 8 dígitos após o hífen) |
| Senha | Mínimo 6 caracteres |

### Login

- **Paciente**: informa o CPF como identificador
- **Médico**: informa o CRM
- **Agente**: informa o ACS
- **Farmacêutico**: informa o CRF

Após o login, o app redireciona automaticamente para a tela inicial do perfil correspondente.

---

## Funcionalidades por Perfil

### Paciente

- **Agendar consulta** — seleciona especialidade, data, horário e médico disponível
- **Meus históricos** — lista de consultas com filtros (todas, confirmadas, realizadas, canceladas)
- **Cancelar consulta** — cancela consultas com status "agendada"
- **Localizar UBS** — busca unidades por nome ou endereço, com detalhes e serviços
- **Medicamentos** — consulta medicamentos disponíveis nas UBS
- **Perfil** — visualiza e edita dados pessoais

### Médico

- **Agenda de Atendimentos** — navegação dia a dia, visualiza consultas agendadas
- **Atualizar Prontuário** — preenche queixa principal, histórico da doença atual, diagnóstico e conduta/plano para cada consulta
- **Consultar Histórico do Paciente** — busca pacientes já atendidos, visualiza todo o histórico de consultas e acessa prontuários

### Agente de Saúde

- **Cadastrar Paciente** — formulário completo com nome, CPF, data de nascimento, endereço, UBS de referência
- **Atualizar Cadastro** — busca paciente existente e edita dados
- **Minha Equipe** — lista dos agentes da equipe
- **Campanhas de Saúde** — visualiza campanhas ativas e histórico

### Farmacêutico

- **Estoque** — lista medicamentos com filtro por status (disponível, estoque baixo, indisponível)
- **Adicionar Medicamento** — cadastra novo medicamento com dados como categoria, apresentação, validade, registro ANVISA
- **Detalhes do Medicamento** — visualiza informações completas e status por UBS
- **Remover Medicamento** — remove com confirmação

---

## Estrutura do Projeto

```
app/
├── (auth)/           # Login e cadastro
├── (medico)/         # Telas do médico
├── (paciente)/       # Telas do paciente
├── (agente)/         # Telas do agente de saúde
├── (farmaceutico)/   # Telas do farmacêutico
├── _layout.tsx       # Layout raiz (providers)
components/
└── shared/           # Componentes reutilizáveis (Header, StatCard, SearchInput, etc.)
src/
├── lib/              # API clients (api.ts, api-consultas.ts, api-medico.ts, etc.)
├── stores/           # Zustand stores (auth-store.ts)
constants/
└── theme.ts          # Cores e estilos globais
```

## Tecnologias

- **Expo** (React Native)
- **Expo Router** (file-based navigation)
- **React Query** (@tanstack/react-query) — requisições à API
- **Zustand** + AsyncStorage — persistência de autenticação
- **react-native-keyboard-controller** — gerenciamento de teclado
- **react-native-mask-input** — máscaras de CPF, telefone, CEP

## API

Base URL: `https://ubs-connect-projeto.onrender.com`

Endpoints principais:

| Rota | Descrição |
|---|---|
| `POST /login` | Autenticação |
| `POST /usuarios` | Cadastro de usuário |
| `POST /consultas/agendar` | Agendar consulta |
| `GET /consultas/medico/<id>` | Consultas do médico |
| `GET /consultas/paciente/<id>` | Consultas do paciente |
| `GET/PUT /consultas/<id>/prontuario` | Prontuário da consulta |
| `GET /medico/<id>/pacientes` | Pacientes atendidos pelo médico |
| `GET /ubs` | Lista de UBS |
| `GET /farmaceutico/medicamentos` | Medicamentos |
