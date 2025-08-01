import { AxiosError } from "axios";
import toast from "react-hot-toast";

export function getFailureErrorMessageFirebase(code: string): string {
  const errorMessages: { [key: string]: string } = {
    ADMIN_ONLY_OPERATION: "Operação restrita a administradores.",
    ARGUMENT_ERROR: "Erro nos argumentos fornecidos.",
    APP_NOT_AUTHORIZED: "O aplicativo não está autorizado.",
    APP_NOT_INSTALLED: "O aplicativo não está instalado.",
    CAPTCHA_CHECK_FAILED: "Falha na verificação do CAPTCHA.",
    CODE_EXPIRED: "O código expirou.",
    CORDOVA_NOT_READY: "O Cordova não está pronto.",
    CORS_UNSUPPORTED: "CORS não é suportado.",
    CREDENTIAL_ALREADY_IN_USE: "As credenciais já estão em uso.",
    CREDENTIAL_MISMATCH: "As credenciais não correspondem.",
    CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "Credenciais antigas, faça login novamente.",
    DEPENDENT_SDK_INIT_BEFORE_AUTH: "SDK dependente inicializado antes da autenticação.",
    DYNAMIC_LINK_NOT_ACTIVATED: "Link dinâmico não ativado.",
    EMAIL_CHANGE_NEEDS_VERIFICATION: "A alteração de e-mail precisa ser verificada.",
    EMAIL_EXISTS: "Este e-mail já está em uso.",
    EMULATOR_CONFIG_FAILED: "Falha na configuração do emulador.",
    EXPIRED_OOB_CODE: "Código de ação expirado.",
    EXPIRED_POPUP_REQUEST: "Solicitação de popup cancelada.",
    INTERNAL_ERROR: "Erro interno.",
    INVALID_API_KEY: "Chave de API inválida.",
    INVALID_APP_CREDENTIAL: "Credenciais do aplicativo inválidas.",
    INVALID_APP_ID: "ID do aplicativo inválido.",
    INVALID_AUTH: "Token de autenticação inválido.",
    INVALID_AUTH_EVENT: "Evento de autenticação inválido.",
    INVALID_CERT_HASH: "Hash do certificado inválido.",
    INVALID_CODE: "Código de verificação inválido.",
    INVALID_CONTINUE_URI: "URI de continuidade inválida.",
    INVALID_CORDOVA_CONFIGURATION: "Configuração do Cordova inválida.",
    INVALID_CUSTOM_TOKEN: "Token personalizado inválido.",
    INVALID_DYNAMIC_LINK_DOMAIN: "Domínio do link dinâmico inválido.",
    INVALID_EMAIL: "E-mail inválido.",
    INVALID_EMULATOR_SCHEME: "Esquema do emulador inválido.",
    INVALID_IDP_RESPONSE: "Resposta do provedor de identidade inválida.",
    INVALID_LOGIN_CREDENTIALS: "Credenciais de login inválidas.",
    INVALID_MESSAGE_PAYLOAD: "Carga útil da mensagem inválida.",
    INVALID_MFA_SESSION: "Sessão de múltiplos fatores inválida.",
    INVALID_OAUTH_CLIENT_ID: "ID do cliente OAuth inválido.",
    INVALID_OAUTH_PROVIDER: "Provedor OAuth inválido.",
    INVALID_OOB_CODE: "Código de ação inválido.",
    INVALID_ORIGIN: "Domínio de origem não autorizado.",
    INVALID_PASSWORD: "Senha incorreta.",
    INVALID_PERSISTENCE: "Tipo de persistência inválido.",
    INVALID_PHONE_NUMBER: "Número de telefone inválido.",
    INVALID_PROVIDER_ID: "ID do provedor inválido.",
    INVALID_RECIPIENT_EMAIL: "E-mail do destinatário inválido.",
    INVALID_SENDER: "Remetente inválido.",
    INVALID_SESSION_INFO: "Informações da sessão inválidas.",
    INVALID_TENANT_ID: "ID do inquilino inválido.",
    MFA_INFO_NOT_FOUND: "Informações de múltiplos fatores não encontradas.",
    MFA_REQUIRED: "Autenticação de múltiplos fatores requerida.",
    MISSING_ANDROID_PACKAGE_NAME: "Nome do pacote Android ausente.",
    MISSING_APP_CREDENTIAL: "Credenciais do aplicativo ausentes.",
    MISSING_AUTH_DOMAIN: "Domínio de autenticação necessário.",
    MISSING_CODE: "Código de verificação ausente.",
    MISSING_CONTINUE_URI: "URI de continuidade ausente.",
    MISSING_IFRAME_START: "Início do iframe ausente.",
    MISSING_IOS_BUNDLE_ID: "ID do pacote iOS ausente.",
    MISSING_OR_INVALID_NONCE: "Nonce ausente ou inválido.",
    MISSING_MFA_INFO: "Informações de múltiplos fatores ausentes.",
    MISSING_MFA_SESSION: "Sessão de múltiplos fatores ausente.",
    MISSING_PHONE_NUMBER: "Número de telefone ausente.",
    MISSING_SESSION_INFO: "Informações da sessão ausentes.",
    MODULE_DESTROYED: "Aplicativo deletado.",
    NEED_CONFIRMATION: "Conta já existe com credenciais diferentes.",
    NETWORK_REQUEST_FAILED: "Falha na solicitação de rede.",
    NULL_USER: "Usuário nulo.",
    NO_AUTH_EVENT: "Nenhum evento de autenticação encontrado.",
    NO_SUCH_PROVIDER: "Provedor não encontrado.",
    OPERATION_NOT_ALLOWED: "Operação não permitida.",
    OPERATION_NOT_SUPPORTED: "Operação não suportada neste ambiente.",
    POPUP_BLOCKED: "Popup bloqueado.",
    POPUP_CLOSED_BY_USER: "Popup fechado pelo usuário.",
    PROVIDER_ALREADY_LINKED: "Provedor já vinculado.",
    QUOTA_EXCEEDED: "Cota excedida.",
    REDIRECT_CANCELLED_BY_USER: "Redirecionamento cancelado pelo usuário.",
    REDIRECT_OPERATION_PENDING: "Operação de redirecionamento pendente.",
    REJECTED_CREDENTIAL: "Credenciais rejeitadas.",
    SECOND_FACTOR_ALREADY_ENROLLED: "Segundo fator já registrado.",
    SECOND_FACTOR_LIMIT_EXCEEDED: "Limite de segundo fator excedido.",
    TENANT_ID_MISMATCH: "ID do inquilino incompatível.",
    TIMEOUT: "Tempo limite atingido.",
    TOKEN_EXPIRED: "Token de usuário expirado.",
    TOO_MANY_ATTEMPTS_TRY_LATER: "Muitas tentativas, tente mais tarde.",
    UNAUTHORIZED_DOMAIN: "Domínio não autorizado.",
    UNSUPPORTED_FIRST_FACTOR: "Primeiro fator não suportado.",
    UNSUPPORTED_PERSISTENCE: "Tipo de persistência não suportado.",
    UNSUPPORTED_TENANT_OPERATION: "Operação de inquilino não suportada.",
    UNVERIFIED_EMAIL: "E-mail não verificado.",
    USER_CANCELLED: "Usuário cancelou a operação.",
    USER_DELETED: "Usuário não encontrado.",
    USER_DISABLED: "Usuário desativado.",
    USER_MISMATCH: "Usuário incompatível.",
    USER_SIGNED_OUT: "Usuário desconectado.",
    WEAK_PASSWORD: "Senha fraca.",
    WEB_STORAGE_UNSUPPORTED: "Armazenamento web não suportado.",
    ALREADY_INITIALIZED: "Já inicializado.",
    RECAPTCHA_NOT_ENABLED: "reCAPTCHA não ativado.",
    MISSING_RECAPTCHA_TOKEN: "Token reCAPTCHA ausente.",
    INVALID_RECAPTCHA_TOKEN: "Token reCAPTCHA inválido.",
    INVALID_RECAPTCHA_ACTION: "Ação reCAPTCHA inválida.",
    MISSING_CLIENT_TYPE: "Tipo de cliente ausente.",
    MISSING_RECAPTCHA_VERSION: "Versão do reCAPTCHA ausente.",
    INVALID_RECAPTCHA_VERSION: "Versão do reCAPTCHA inválida.",
    INVALID_REQ_TYPE: "Tipo de requisição inválido.",
    "auth/claims-too-large": "O payload de declarações fornecido para setCustomUserClaims() excede o tamanho máximo permitido de 1.000 bytes.",
    "auth/email-already-exists": "O e-mail fornecido já está em uso por outro usuário. Cada usuário precisa ter um e-mail exclusivo.",
    "auth/id-token-expired": "O token de código do Firebase provisionado expirou.",
    "auth/id-token-revoked": "O token de código do Firebase foi revocado.",
    "auth/insufficient-permission": "A credencial usada para inicializar o SDK Admin não tem permissão para acessar o recurso solicitado do Authentication. Consulte Configurar um projeto do Firebase para ver a documentação sobre como gerar uma credencial com as permissões apropriadas e usá-la na autenticação dos SDKs Admin.",
    "auth/internal-error": "O servidor do Authentication encontrou um erro inesperado ao tentar processar a solicitação. A mensagem de erro incluirá a resposta do servidor de Authentication com informações adicionais. Se o erro persistir, informe o problema ao nosso canal de suporte de Relatório do bug.",
    "auth/invalid-argument": "Um argumento inválido foi fornecido a um método do Authentication. A mensagem de erro precisa conter informações adicionais.",
    "auth/invalid-claims": "Os atributos de declaração personalizados fornecidos para setCustomUserClaims() são inválidos.",
    "auth/invalid-continue-uri": "O URL de confirmação precisa ser uma string de URL válida.",
    "auth/invalid-creation-time": "O horário da criação precisa ser um string de data UTC válido.",
    "auth/invalid-credential": "E-mail ou senha estão incorretos, tente novamente.",
    "auth/invalid-disabled-field": "O valor fornecido para a propriedade do usuário disabled é inválido. Precisa ser um valor booleano.",
    "auth/invalid-display-name": "O valor fornecido para a propriedade do usuário displayName é inválido. Precisa ser uma string não vazia.",
    "auth/invalid-dynamic-link-domain": "O domínio de link dinâmico fornecido não está configurado ou autorizado para o projeto atual.",
    "auth/invalid-email": "O valor fornecido para a propriedade do usuário email é inválido. Precisa ser um endereço de e-mail de string.",
    "auth/invalid-email-verified": "O valor fornecido para a propriedade do usuário emailVerified é inválido. Precisa ser um valor booleano.",
    "auth/invalid-hash-algorithm": "O algoritmo de hash precisa corresponder a uma das strings na lista de algoritmos compatíveis.",
    "auth/invalid-hash-block-size": "O tamanho do bloco de hash precisa ser um número válido.",
    "auth/invalid-hash-derived-key-length": "O tamanho da chave derivada do hash precisa ser um número válido.",
    "auth/invalid-hash-key": "A chave de hash precisa ter um buffer de byte válido.",
    "auth/invalid-hash-memory-cost": "O custo da memória hash precisa ser um número válido.",
    "auth/invalid-hash-parallelization": "O carregamento em paralelo do hash precisa ser um número válido.",
    "auth/invalid-hash-rounds": "O arredondamento de hash precisa ser um número válido.",
    "auth/invalid-hash-salt-separator": "O campo do separador de 'salt' do algoritmo de geração de hash precisa ser um buffer de byte válido.",
    "auth/invalid-id-token": "O token de código informado não é um token de código do Firebase válido.",
    "auth/invalid-last-sign-in-time": "O último horário de login precisa ser um string de data UTC válido.",
    "auth/invalid-page-token": "O token de próxima página fornecido em listUsers() é inválido. Precisa ser uma string não vazia válida.",
    "auth/invalid-password": "O valor fornecido para a propriedade do usuário password é inválido. Precisa ser uma string com pelo menos seis caracteres.",
    "auth/invalid-password-hash": "O hash da senha precisa ser um buffer de byte válido.",
    "auth/invalid-password-salt": "O 'salt' da senha precisa ser um buffer de byte válido.",
    "auth/invalid-phone-number": "O valor fornecido para phoneNumber é inválido. Ele precisa ser uma string de identificador compatível com o padrão E.164 não vazio.",
    "auth/invalid-photo-url": "O valor fornecido para a propriedade do usuário photoURL é inválido. Precisa ser um URL de string.",
    "auth/invalid-provider-data": "O providerData precisa ser uma matriz válida de objetos UserInfo.",
    "auth/invalid-provider-id": "O providerId precisa ser um string de identificador de provedor compatível válido.",
    "auth/invalid-oauth-responsetype": "Apenas um responseType do OAuth deve ser definido como verdadeiro.",
    "auth/invalid-session-cookie-duration": "A duração do cookie da sessão precisa ser um número válido em milissegundos entre 5 minutos e 2 semanas.",
    "auth/invalid-uid": "O uid fornecido precisa ser uma string não vazia com no máximo 128 caracteres.",
    "auth/invalid-user-import": "O registro do usuário a ser importado é inválido.",
    "auth/maximum-user-count-exceeded": "O número máximo permitido de usuários a serem importados foi excedido.",
    "auth/missing-android-pkg-name": "Um nome de pacote Android precisa ser fornecido para a instalação do app Android.",
    "auth/missing-continue-uri": "Um URL de confirmação válido precisa ser fornecido na solicitação.",
    "auth/missing-hash-algorithm": "É necessário fornecer o algoritmo de geração de hash e seus parâmetros para importar usuários com hashes de senha.",
    "auth/missing-ios-bundle-id": "A solicitação não tem um ID do pacote.",
    "auth/missing-uid": "Um identificador uid é necessário para a operação atual.",
    "auth/missing-oauth-client-secret": "A chave secreta do cliente de configuração do OAuth é necessária para ativar o fluxo de código do OIDC.",
    "auth/operation-not-allowed": "O provedor de login fornecido está desativado para o projeto do Firebase. Ative-o na seção Método de login do Console do Firebase.",
    "auth/phone-number-already-exists": "O phoneNumber fornecido já está sendo usado por um usuário existente. É necessário que cada usuário tenha um phoneNumber exclusivo.",
    "auth/project-not-found": "Nenhum projeto do Firebase foi encontrado com a credencial usada para inicializar os Admin SDKs. Consulte Configurar um projeto do Firebase para ver a documentação sobre como gerar uma credencial para seu projeto e usá-la na autenticação dos Admin SDKs.",
    "auth/reserved-claims": "Uma ou mais declarações de usuário personalizadas fornecidas para setCustomUserClaims() são reservadas. Por exemplo, não use as declarações específicas do OIDC, como sub, iat, iss, exp, aud, auth_time etc., como chaves para declarações personalizadas.",
    "auth/session-cookie-expired": "O cookie da sessão do Firebase fornecido expirou.",
    "auth/session-cookie-revoked": "O cookie da sessão do Firebase foi revogado.",
    "auth/too-many-requests": "O número de solicitações excede o máximo permitido.",
    "auth/uid-already-exists": "O uid fornecido já está sendo usado por um usuário existente. É necessário que cada usuário tenha um uid exclusivo.",
    "auth/unauthorized-continue-uri": "O domínio da URL de confirmação não está na lista de permissões. Acesse o Console do Firebase para colocar o domínio na lista de permissões.",
    "auth/user-not-found": "Não há registro de usuário existente correspondente ao identificador fornecido.",
    "auth/api-key-not-valid.-please-pass-a-valid-api-key.": "Credenciais da API possivelmente estão incorretas.",
  };

  return errorMessages[code] ?? "Erro desconhecido ou não identificado";
}

export function mapperMercadoPago(code: string): string {
  const errorMessages: { [key: string]: string } = {
  };

  return errorMessages[code] ?? "Erro desconhecido ou não identificado";
}


export const failureErrorMehtodsFirebase = (response: FirebaseAuthErrorType) => {
  const code = response?.customData?._tokenResponse?.error?.message as string;
  const errorMessage = getFailureErrorMessageFirebase(code ?? response?.code);
  toast.error(errorMessage);
}

export const failureErrorMercadoPago = (code_error: string) => {
  const errorMessages: { [key: string]: string } = {
    invalid_param: "Algum dos dados informados é inválido. Verifique o número do cartão, validade, CVV e nome do titular.",
    invalid_card_number: "O número do cartão é inválido. Verifique e tente novamente.",
    invalid_security_code: "O código de segurança (CVV) está incorreto. Verifique e tente novamente.",
    invalid_expiration_date: "A data de validade do cartão é inválida. Verifique mês e ano.",
    card_disabled: "Este cartão está desativado. Entre em contato com o emissor do cartão.",
    card_invalid: "O cartão é inválido. Verifique se todos os dados estão corretos.",
    invalid_card_holder: "O nome do titular do cartão está inválido ou incompleto.",
    unauthorized: "Não autorizado. Verifique suas credenciais de acesso ao Mercado Pago.",
    forbidden: "A operação não é permitida. Verifique suas permissões no Mercado Pago.",
    internal_server_error: "Erro interno no servidor do Mercado Pago. Tente novamente mais tarde.",
  };

  return (
    errorMessages[code_error] ??
    "Erro desconhecido ou não identificado. Verifique os dados e tente novamente."
  );
}

export type FirebaseAuthErrorType = {
  code: string;
  customData: {
    appName: string;
    _tokenResponse: {
      error: {
        code: number;
        message: string;
        errors: {
          message: string;
          domain: string;
          reason: string;
        }[];
      };
    };
  };
  name: string;
};

export function handleOnError (axiosError: AxiosError) {
  const { response } = axiosError;
  //@ts-ignore
  const errorMessage = response?.data?.message ?? axiosError?.message ?? "Desculpe, erro não identificado, entre em contato com o suporte na aba 'Contato'.";
  toast.error(errorMessage);
}