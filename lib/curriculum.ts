export type StepData = {
  id: number;
  title: string;
  goal: string;
  keywords: string[];
  example: string | null;
};

export type PhaseData = {
  id: number;
  title: string;
  steps: StepData[];
};

export const PHASES: PhaseData[] = [
  {
    id: 1,
    title: 'Phase 0 — 터미널 입문',
    steps: [
      {
        id: 1,
        title: '터미널 열고 길 찾기',
        goal: '터미널에서 현재 위치를 파악하고 자유롭게 이동할 수 있다',
        keywords: ['shell', 'CLI', 'terminal', 'pwd', 'ls', 'cd', 'directory', 'path', '~'],
        example: 'pwd → ls → cd Desktop → ls 순서로 실행하며 위치 변화 확인',
      },
      {
        id: 2,
        title: '파일과 폴더 만들고 지우기',
        goal: '터미널로 파일/폴더를 생성, 이동, 삭제할 수 있다',
        keywords: ['mkdir', 'touch', 'mv', 'cp', 'rm', 'rm -rf'],
        example: 'mkdir my-project → cd my-project → touch hello.txt → ls → rm hello.txt',
      },
      {
        id: 3,
        title: '파일 내용 보기',
        goal: '파일 내용을 터미널에서 확인하고 출력할 수 있다',
        keywords: ['cat', 'echo', '>', '>>'],
        example: 'echo "hello world" > hello.txt → cat hello.txt → echo "bye" >> hello.txt → cat hello.txt',
      },
      {
        id: 4,
        title: '권한과 프로세스',
        goal: '권한 오류를 이해하고 해결할 수 있다',
        keywords: ['sudo', 'permission', 'chmod'],
        example: 'touch test.sh → chmod 000 test.sh → cat test.sh (오류 확인) → chmod 644 test.sh → cat test.sh (해결)',
      },
      {
        id: 5,
        title: '패키지 설치',
        goal: '패키지 매니저로 프로그램을 설치하고 동작을 확인할 수 있다',
        keywords: ['package manager', 'PATH', 'which', '환경변수'],
        example: '(호쌤: 이건 맥북용 package manager 예제임. 윈도우는 찾아봐야함!) which node → brew install cowsay → cowsay "나 개발자 됐다"',
      },
    ],
  },
  {
    id: 2,
    title: 'Phase 1 — 컴퓨터 시스템 이해',
    steps: [
      {
        id: 6,
        title: '인터넷은 어떻게 동작하나',
        goal: '브라우저에서 URL을 입력했을 때 무슨 일이 일어나는지 설명할 수 있다',
        keywords: ['client', 'server', 'IP address', 'DNS', 'domain', 'HTTP', 'HTTPS', 'request', 'response', 'port'],
        example: 'ping google.com (IP 확인 + 응답 시간) → ping 끊고 없는 도메인으로 시도 → 차이 비교',
      },
      {
        id: 7,
        title: '서버란 무엇인가',
        goal: '서버/클라이언트 차이와 로컬 vs 원격 서버를 설명할 수 있다',
        keywords: ['localhost', 'cloud', 'deployment', 'Vercel', 'AWS'],
        example: 'curl -I https://google.com → status code, server 헤더 등 응답 직접 확인',
      },
      {
        id: 8,
        title: '데이터베이스란 무엇인가',
        goal: 'DB가 왜 필요한지, 어떻게 데이터를 저장하는지 설명할 수 있다',
        keywords: ['CRUD', 'SQL', 'NoSQL', 'table', 'row', 'column', 'query', 'schema'],
        example: null,
      },
      {
        id: 9,
        title: 'API란 무엇인가',
        goal: 'API가 무엇인지 이해하고 실제 호출해서 데이터를 받아볼 수 있다',
        keywords: ['API', 'REST', 'endpoint', 'JSON', 'GET', 'POST'],
        example: '(호쌤: 이건 나의 깃헙 정보니까 너의 깃헙 정보로도 실험해보길!) curl https://api.github.com/users/hoseung1102 → 본인 GitHub 정보가 JSON으로 출력됨',
      },
    ],
  },
  {
    id: 3,
    title: 'Phase 2 — Git & GitHub',
    steps: [
      {
        id: 10,
        title: '로컬 버전 관리',
        goal: '내 컴퓨터에서 저장소를 만들고 첫 커밋을 남길 수 있다 (호쌤: 추상적 개념이라 어려움. 흥미가 떨어진다면 컨셉만 이해하고 패스!)',
        keywords: ['repository', 'staging area', 'commit', 'git init', 'git add', 'git status', 'git log'],
        example: '폴더 만들고 파일 수정하면서 커밋 3개 쌓아보기',
      },
      {
        id: 11,
        title: '브랜치',
        goal: '브랜치를 만들고 main에 합칠 수 있다',
        keywords: ['branch', 'merge', 'checkout', 'HEAD', 'conflict'],
        example: 'feature 브랜치에서 파일 수정 → main에 merge → conflict 일부러 만들고 해결',
      },
      {
        id: 12,
        title: 'GitHub 연동',
        goal: '로컬 코드를 GitHub에 올리고 내려받을 수 있다',
        keywords: ['remote', 'push', 'pull', 'clone', 'origin', '.gitignore'],
        example: '로컬 레포 → GitHub 연결 → push → 다른 폴더에 clone해서 동일한지 확인',
      },
    ],
  },
  {
    id: 4,
    title: 'Phase 3 — 내 웹페이지 만들고 배포하기',
    steps: [
      {
        id: 13,
        title: '웹페이지가 뭔지 이해하기',
        goal: 'HTML 파일을 직접 열어서 브라우저가 어떻게 화면을 그리는지 설명할 수 있다',
        keywords: ['HTML', 'CSS', 'JavaScript', 'tag', 'element', '브라우저 렌더링'],
        example: 'touch index.html → 안에 <h1>안녕</h1> 작성 → 브라우저로 열기',
      },
      {
        id: 14,
        title: 'AI로 자기소개 페이지 만들기',
        goal: 'AI 툴에게 원하는 페이지를 설명해서 결과물을 만들어낼 수 있다',
        keywords: ['프롬프트', 'iteration', 'Cursor', 'Claude'],
        example: 'Claude에게 자기소개 페이지 요청 → 마음에 안 드는 부분 수정 요청 반복 → 완성',
      },
      {
        id: 15,
        title: 'GitHub에 올리기',
        goal: '만든 파일을 GitHub 레포에 push할 수 있다 (Phase 2 복습)',
        keywords: ['git add', 'commit', 'push'],
        example: '새 레포 만들고 index.html push',
      },
      {
        id: 16,
        title: 'Vercel로 배포하고 URL 공유하기',
        goal: 'GitHub 레포를 Vercel에 연결해 실제 URL로 접근할 수 있다',
        keywords: ['배포', 'hosting', 'domain', 'CI/CD'],
        example: 'Vercel import → Deploy → 생성된 URL을 카톡으로 누군가에게 보내보기',
      },
      {
        id: 17,
        title: '수정하고 자동 재배포 경험하기',
        goal: '코드 수정 후 push만 하면 자동으로 반영되는 흐름을 이해한다',
        keywords: ['CI/CD', 'auto deploy', 'pipeline'],
        example: '텍스트 하나 바꾸고 push → Vercel에서 자동 배포되는 거 실시간으로 확인',
      },
    ],
  },
  {
    id: 5,
    title: 'Phase 4 — 자동화 프로그램 만들기',
    steps: [
      {
        id: 18,
        title: '스케줄 자동화 — Cron',
        goal: '정해진 시간에 자동으로 실행되는 작업을 만들 수 있다',
        keywords: ['cron', 'crontab', 'scheduler', 'daemon', 'background process'],
        example: '매일 오전 9시에 오늘 날짜를 파일에 기록하는 cron job 만들기',
      },
      {
        id: 19,
        title: '스크립트로 반복 작업 없애기',
        goal: '반복적으로 하던 일을 스크립트 하나로 줄일 수 있다',
        keywords: ['shell script', 'python script', '실행권한', 'argument'],
        example: '특정 폴더 파일을 날짜별로 자동 정리하는 스크립트 (AI로 작성)',
      },
      {
        id: 20,
        title: 'Webhook — 이벤트 기반 자동화',
        goal: '특정 이벤트가 발생했을 때 자동으로 반응하는 구조를 이해한다',
        keywords: ['webhook', 'event-driven', 'trigger', 'listener', 'ngrok', 'endpoint'],
        example: 'GitHub에 push하면 Slack에 알림이 오는 webhook 설정',
      },
    ],
  },
  {
    id: 6,
    title: 'Phase 5 — 인증과 외부 서비스 연동',
    steps: [
      {
        id: 21,
        title: '인증 vs 인가',
        goal: 'Authentication과 Authorization의 차이를 설명할 수 있다',
        keywords: ['authentication', 'authorization', 'identity', 'permission', 'session'],
        example: null,
      },
      {
        id: 22,
        title: 'API Key 방식',
        goal: 'API Key가 무엇인지 이해하고 안전하게 관리할 수 있다',
        keywords: ['API key', '환경변수', '.env', '.gitignore', 'secret'],
        example: 'GitHub Personal Access Token 발급 → curl로 내 레포 목록 조회 → .env로 분리',
      },
      {
        id: 23,
        title: 'OAuth 2.0',
        goal: '"Google로 로그인" 같은 방식이 내부적으로 어떻게 동작하는지 설명할 수 있다',
        keywords: ['OAuth', 'access token', 'refresh token', 'redirect', 'scope', 'authorization code'],
        example: null,
      },
      {
        id: 24,
        title: 'JWT',
        goal: 'JWT가 무엇인지, 어떤 구조인지 이해한다',
        keywords: ['JWT', 'header', 'payload', 'signature', 'Bearer token', '만료시간'],
        example: 'jwt.io에서 토큰 직접 decode해서 내용 확인',
      },
      {
        id: 25,
        title: '외부 서비스 API 연동',
        goal: '인증을 포함해 외부 서비스와 실제로 통신하는 자동화를 만들 수 있다',
        keywords: ['Slack API', 'Notion API', 'Authorization header', 'payload'],
        example: 'Slack 채널에 메시지 자동 전송 스크립트 (AI로 작성)',
      },
      {
        id: 26,
        title: 'AI API 연동',
        goal: 'Claude API를 호출해서 AI 기능을 자동화에 결합할 수 있다',
        keywords: ['LLM', 'Claude API', 'prompt', 'token', 'streaming'],
        example: '매일 아침 특정 데이터를 AI가 요약해서 Slack으로 보내는 자동화',
      },
    ],
  },
  {
    id: 7,
    title: 'Phase 6 — 나만의 AI 비서: OpenClaw 구축',
    steps: [
      {
        id: 27,
        title: 'AI Agent란 무엇인가',
        goal: 'AI Agent와 일반 챗봇의 차이를 이해하고, Agent가 도구를 쓰는 방식을 설명할 수 있다',
        keywords: ['AI Agent', 'tool use', 'function calling', 'planning', 'execution loop', 'LLM'],
        example: '"내일 날씨 확인해서 슬랙에 보내줘" 명령 시 Agent 내부에서 일어나는 일 직접 설명해보기',
      },
      {
        id: 28,
        title: 'MCP 이해',
        goal: 'MCP가 무엇인지, AI에 도구를 연결하는 구조를 이해한다',
        keywords: ['MCP', 'Model Context Protocol', 'skill', 'plugin', 'tool server'],
        example: 'OpenClaw 공식 문서 읽고 스킬 구조 파악',
      },
      {
        id: 29,
        title: 'OpenClaw 설치 및 채널 연결',
        goal: 'OpenClaw를 로컬에 설치하고 메시징 채널과 연결할 수 있다',
        keywords: ['Docker', 'config', 'channel', 'Telegram', 'Slack'],
        example: 'OpenClaw + Telegram 연결 → 첫 명령 보내고 응답 받기',
      },
      {
        id: 30,
        title: '기존 스킬로 실제 작업 자동화',
        goal: 'OpenClaw의 기존 스킬을 붙여 실제 작업을 자동화할 수 있다',
        keywords: ['skill registry', 'permission', 'integration', 'Notion', 'GitHub', 'Calendar'],
        example: '"오늘 GitHub 활동 요약해줘" → OpenClaw가 가져와서 Slack으로 리포트',
      },
      {
        id: 31,
        title: '나만의 커스텀 스킬 만들기',
        goal: '기존에 없는 기능을 직접 스킬로 만들어 OpenClaw에 추가할 수 있다',
        keywords: ['custom skill', 'MCP server', 'Python', 'API integration'],
        example: '최진빈이 자주 쓰는 툴 중 스킬이 없는 것을 직접 만들어 연결',
      },
      {
        id: 32,
        title: '권한 설계와 보안',
        goal: 'OpenClaw에 줄 권한 범위를 이해하고 안전하게 설정할 수 있다',
        keywords: ['최소 권한 원칙', 'prompt injection', 'read-only vs write', 'secret management'],
        example: '연동 서비스별 권한 목록 직접 작성 → 최소한으로 줄이기',
      },
    ],
  },
];
