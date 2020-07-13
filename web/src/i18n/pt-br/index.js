// PT BR

export default {
  core: {
    title: 'Painel administrativo',
    myProfile: 'Meu perfil',
    preferences: 'Preferências',
    password: 'Senha',
    passwordNew: 'Nova senha',
    passwordRetype: 'Repetir senha',
    remember: 'Lembrar',
    logout: 'Sair',
    menu: {
      dashboard: 'Painel',
      states: 'Estados',
      cities: 'Cidades',
      settings: 'Configurações'
    }
  },
  generic: {
    status: 'Status',
    type: 'Tipo',
    add: 'Adicionar',
    export: 'Exportar',
    error: 'Erro',
    warning: 'Atenção',
    confirm: 'Confirmação',
    actions: 'Ações',
    save: 'Salvar',
    continue: 'Continuar',
    back: 'Voltar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    deleteWarning: 'Tem certeza que deseja eliminar esse item?',
    editWarning: 'Todas as alterações serão perdidas',
    language: 'Idioma',
    title: 'Titulo',
    description: 'Descrição',
    observation: 'Observação',
    operation: 'Operação',
    basicdata: 'Dados básicos',
    historic: 'Histórico',
    welcome: 'Olá, acesso o menu esquerdo para ver todos os CRUDs.'
  },
  states: {
    states: 'Estados',
    state: 'Estado',
    code: 'UF',
    deleteWarning: 'O Estado selecionado será eliminado'
  },
  cities: {
    stacitiestes: 'Cidades',
    city: 'Cidade',
    state: 'Estado',
    deleteWarning: 'A Cidade selecionada será eliminada'
  },
  messages: {
    validationError: 'Resolver todos os erros de validação',
    editWarning: 'Todas as alterações serão perdidas',
    newPasswordWarning: 'Precisa escolher uma nova senha',
    resetQuestion: 'Enviar uma nova senha temporaria por E-mail?',
    passwordQuestion: 'Esqueceu sua senha?',
    logoutQuestion: 'Quer sair do painel ou trocar usuário?',
    missingProduct: 'É necessário escolher um ou mais produtos'
  },
  apiCodes: {
    LoginError: 'Usuário ou Senha errados',
    JwtError: 'É necessario fazer Login',
    JsonWebTokenError: 'Erro de autenticação',
    TokenExpiredError: 'Sessão vencida',
    ChangePwd: 'É necessario escolher uma nova senha',
    NoActiveUser: 'Usuário não ativo',
    NoValidPwd: 'A senha escolhida não é valida',
    ServerError: 'Ops... parece que estamos com um problema. Tente novamente mais tarde.',
    undefined: 'Ops... parece que estamos com um problema. Tente novamente mais tarde.'
  }
}
