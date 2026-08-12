# 전사 AI 프로젝트 템플릿

개발자가 아니어도 **Claude Code**와 함께 회사 업무용 웹 애플리케이션을 만들 수 있도록 준비된
표준 템플릿입니다.

---

## 이 템플릿의 용도

- 직원 누구나 **같은 구조**로 웹 애플리케이션을 시작할 수 있게 합니다.
- 구조가 같기 때문에 나중에 회사 배포 서버가 **모든 프로젝트를 같은 방법으로 배포**할 수 있습니다.
- Claude Code가 지켜야 할 규칙(`CLAUDE.md`)이 이미 들어 있어서, 지시만 하면 규칙에 맞게
  개발해 줍니다.
- 내 PC에서도 실행되고, 서버와 같은 방식(Docker)으로도 실행됩니다.

> ⚠️ **이 템플릿에는 아직 실제 자동 배포가 포함되어 있지 않습니다.**
> GitHub에 Push하면 코드 검사(GitHub Actions)까지만 자동으로 돌아갑니다.
> EC2 서버 배포와 도메인 연결은 회사 인프라 담당이 나중에 붙일 예정입니다.

---

## 직원이 처음 해야 할 일

아래 순서대로만 따라 하면 됩니다. 터미널 명령은 그대로 복사해서 붙여넣으세요.

### 1. GitHub에서 템플릿으로 내 저장소 만들기

이 저장소 페이지 상단의 **`Use this template`** → **`Create a new repository`** 를 누릅니다.
저장소 이름은 영문 소문자와 하이픈으로 짓습니다. (예: `sales-report-helper`)

### 2. 내 저장소를 내 PC로 내려받기 (Clone)

```bash
git clone https://github.com/<내-계정>/<내-저장소>.git
cd <내-저장소>
```

### 3. `project.json` 수정하기

내 프로젝트 정보로 바꿉니다. (자세한 설명은 아래 [프로젝트 정보 수정 방법](#프로젝트-정보-수정-방법))

### 4. 필요한 프로그램 설치하기

```bash
npm ci
```

> 처음 한 번만 하면 됩니다. 몇 분 걸릴 수 있습니다.
> `node: command not found` 오류가 나면 Node.js 22가 설치되어 있지 않은 것입니다.
> [nodejs.org](https://nodejs.org/) 에서 **22 LTS** 버전을 설치한 뒤 다시 시도하세요.

### 5. 화면 띄워 보기

```bash
npm run dev
```

브라우저에서 <http://localhost:3000> 을 열면 기본 화면이 보입니다.
끄고 싶으면 터미널에서 `Ctrl + C` 를 누릅니다.

### 6. Claude Code 실행하기

프로젝트 폴더에서 아래를 입력합니다.

```bash
claude
```

### 7. 기능 개발하기

Claude Code에게 원하는 것을 한국어로 설명하면 됩니다. 예를 들면 이렇게요.

- "첫 화면에 우리 팀 주간 업무 목록을 표로 보여주는 기능을 만들어 줘"
- "엑셀 파일을 올리면 내용을 표로 보여주는 화면을 만들어 줘"
- "지금 화면 색을 회사 브랜드 색인 남색으로 바꿔 줘"

### 8. 검사하기

```bash
npm run check
```

문제가 없으면 마지막에 빌드 성공 메시지가 나옵니다.
오류가 나오면 그 내용을 그대로 복사해서 Claude Code에게 붙여넣고 고쳐 달라고 하세요.

### 9. Docker로 실행 확인하기

```bash
docker compose up -d --build
```

<http://localhost:3000> 이 열리는지 확인한 뒤, 끝나면 반드시 정리합니다.

```bash
docker compose down
```

### 10. GitHub에 올리기

```bash
git add .
git commit -m "기능 추가: 주간 업무 목록 화면"
git push origin main
```

---

## 프로젝트 정보 수정 방법

`project.json` 파일을 열어서 내 정보로 바꿉니다. **이 파일만 고치면 화면에 표시되는 정보가
전부 바뀝니다.** 화면 코드를 직접 고칠 필요가 없습니다.

```json
{
  "id": "sample-ai-project",
  "name": "전사 AI 프로젝트 템플릿",
  "description": "Claude Code를 이용해 회사 업무용 웹 애플리케이션을 만드는 기본 템플릿입니다.",
  "owner": "직원 이름",
  "department": "부서 이름",
  "domain": "sample-ai-project.ai.example.com",
  "port": 3000
}
```

| 항목 | 뜻 | 작성 규칙 |
| --- | --- | --- |
| `id` | 프로젝트 고유 이름 (주소에 쓰입니다) | **영문 소문자·숫자·하이픈(-)만**, 소문자나 숫자로 시작, 3~50자. 예: `sales-report-helper` |
| `name` | 사람이 읽는 프로젝트 이름 | 비워 두면 안 됩니다. 예: `영업 주간보고 도우미` |
| `description` | 이 프로젝트가 무엇을 하는지 한 줄 설명 | 비워 두면 안 됩니다 |
| `owner` | 만든 사람 이름 | 비워 두면 안 됩니다 |
| `department` | 소속 부서 | 비워 두면 안 됩니다 |
| `domain` | 나중에 배포될 때 쓸 주소 | 비워 두면 안 됩니다. 보통 `<id>.ai.example.com` 형태 |
| `port` | 프로그램이 사용하는 포트 번호 | **3000에서 바꾸지 마세요.** 배포 서버가 3000번을 기준으로 동작합니다 |

수정한 뒤에는 확인해 보세요.

```bash
npm run validate:project
```

문제가 있으면 무엇이 잘못됐는지 한국어로 알려줍니다.

---

## 로컬 실행 방법

| 하고 싶은 것 | 명령 |
| --- | --- |
| 필요한 프로그램 설치 | `npm ci` |
| 개발하면서 화면 보기 | `npm run dev` → <http://localhost:3000> |
| 실제 배포와 같게 빌드하기 | `npm run build` |
| 빌드한 것을 실행해 보기 | `npm run start` |

---

## Claude Code 실행 방법

프로젝트 폴더 안에서 실행합니다.

```bash
cd <내-저장소>
claude
```

Claude Code는 자동으로 `CLAUDE.md`를 읽고 이 프로젝트의 규칙을 따릅니다.
`.claude/settings.json`에 팀 공통 권한 설정이 들어 있어서, 자주 쓰는 검사·빌드 명령은
매번 허락을 묻지 않고 바로 실행됩니다. 반대로 `sudo`, `rm -rf`, 강제 Push 같은 위험한 명령은
막혀 있습니다.

### 잘 부탁하는 방법

- **무엇을** 원하는지 구체적으로 씁니다. ("표로 보여줘"보다 "이름, 부서, 진행률 3칸짜리 표로 보여줘")
- 오류가 나면 오류 메시지를 **그대로 복사해서** 붙여넣습니다.
- 작업이 끝나면 "`npm run check` 돌려서 통과하는지 확인해 줘"라고 요청합니다.

---

## 검사 방법

작업을 마쳤으면 아래를 실행합니다.

```bash
npm run check
```

순서대로 이렇게 검사합니다. **하나라도 실패하면 그 자리에서 멈춥니다.**

1. `npm run validate:project` — `project.json` 내용이 규칙에 맞는지
2. `npm run lint` — 코드 스타일에 문제가 없는지
3. `npm run typecheck` — 타입 오류가 없는지
4. `npm run build` — 실제로 빌드가 되는지

GitHub에 올리기 직전이라면 더 꼼꼼한 점검도 있습니다.

```bash
bash scripts/pre-deploy-check.sh
```

필수 파일 확인, `project.json` 검사, `.env` 파일이 실수로 커밋되고 있지 않은지,
소스에 API 키 같은 비밀값이 남아 있지 않은지까지 함께 확인합니다.
이 스크립트는 **파일을 읽기만 하고 아무것도 지우거나 바꾸지 않습니다.**

---

## Docker 실행 방법

회사 서버와 **같은 방식**으로 내 PC에서 실행해 보는 방법입니다.
미리 [Docker Desktop](https://www.docker.com/products/docker-desktop/)이 실행 중이어야 합니다.

```bash
# 빌드하고 백그라운드로 실행
docker compose up -d --build

# 상태 확인 (health 가 healthy 로 바뀌면 정상)
docker compose ps

# 정상 동작 확인
curl http://localhost:3000/api/health

# 로그 보기
docker compose logs -f app

# 종료하고 정리하기 (확인이 끝나면 꼭 실행하세요)
docker compose down
```

`/api/health` 를 열었을 때 이런 응답이 나오면 정상입니다.

```json
{
  "status": "ok",
  "projectId": "sample-ai-project",
  "projectName": "전사 AI 프로젝트 템플릿",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

> `port is already allocated` 오류가 나면 3000번 포트를 이미 다른 프로그램이 쓰고 있는 것입니다.
> `npm run dev`가 켜져 있다면 `Ctrl + C`로 끄고 다시 시도하세요.

---

## GitHub 업로드 방법

```bash
# 1. 무엇이 바뀌었는지 확인
git status

# 2. 바뀐 파일 담기
git add .

# 3. 무엇을 했는지 메모 남기기
git commit -m "기능 추가: 주간 업무 목록 화면"

# 4. GitHub에 올리기
git push origin main
```

올리고 나면 GitHub 저장소의 **Actions** 탭에서 자동 검사 결과를 볼 수 있습니다.
초록색 체크(✅)면 통과, 빨간색 X(❌)면 실패입니다. 실패했다면 눌러서 오류 내용을 확인하고
Claude Code에게 고쳐 달라고 하세요.

---

## 절대로 GitHub에 올리면 안 되는 정보

아래 정보가 GitHub에 올라가면 **회사 보안 사고**가 됩니다.

- ❌ **API 키** (OpenAI, Anthropic, 회사 내부 API 등)
- ❌ **비밀번호** (DB 접속 정보, 관리자 계정 등)
- ❌ **인증서 개인키** (`.pem`, `.key` 파일)
- ❌ **AWS 액세스 키** (`AKIA...` 로 시작하는 값)
- ❌ **실제 `.env` 파일** (`.env`, `.env.local`)
- ❌ **고객 개인정보** (이름, 연락처, 주민번호, 계좌번호 등)

### 안전하게 다루는 방법

1. 비밀값은 `.env.local` 파일에 적습니다. 이 파일은 `.gitignore`에 들어 있어 올라가지 않습니다.
2. 다른 사람에게 "어떤 값이 필요한지" 알려주려면 `.env.example`에 **키 이름만** 적습니다.
   실제 값은 적지 마세요.
3. 올리기 전에 `bash scripts/pre-deploy-check.sh` 로 확인합니다.
4. **이미 올려 버렸다면** 파일을 지우는 것만으로는 부족합니다. 커밋 기록에 남아 있으므로
   **해당 키를 즉시 폐기(revoke)하고 새로 발급**받은 뒤 인프라 담당에게 알리세요.

---

## EC2 자동 배포

`main` 브랜치에 Push 하면 **회사 EC2 서버에 자동으로 배포**됩니다. 따로 서버에 접속하거나
명령을 칠 필요가 없습니다.

Push 하면 GitHub이 순서대로 이렇게 합니다.

```
main 브랜치에 Push
   ↓
코드 검사 (npm run check)   ← 여기서 실패하면 배포하지 않습니다
   ↓
EC2 서버로 파일 전송
   ↓
EC2에서 Docker 빌드 및 실행
   ↓
정상 동작 확인 (Health Check)
```

**검사에서 한 번이라도 실패하면 배포는 아예 시작되지 않습니다.** 문제가 있는 코드가
서버에 올라가는 일을 막기 위한 안전장치입니다.

### 처음 한 번만: GitHub Secret 3개 등록하기

서버 주소나 접속 키를 코드에 적으면 보안 사고가 됩니다. 그래서 GitHub의 금고
(Secret)에 넣어 두고 씁니다.

저장소 → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
에서 아래 3개를 등록하세요. (인프라 담당에게 값을 받으세요.)

| Secret 이름 | 넣을 값 |
| --- | --- |
| `DEPLOY_HOST` | EC2의 공인 IPv4 주소, 또는 접속 가능한 호스트 이름 |
| `DEPLOY_USER` | EC2 접속 계정 이름. Amazon Linux는 보통 `ec2-user` |
| `DEPLOY_SSH_KEY` | EC2의 `authorized_keys`에 등록된 공개키와 **짝을 이루는 개인키** 전체 내용 |

`DEPLOY_SSH_KEY`는 `-----BEGIN ... PRIVATE KEY-----` 줄부터
`-----END ... PRIVATE KEY-----` 줄까지 **전부** 복사해서 붙여 넣습니다.

> ⚠️ 개인키는 집 열쇠와 같습니다. 메신저나 이메일로 주고받지 말고, 저장소의 어떤 파일에도
> 적지 마세요. GitHub Secret에 한 번 넣으면 다시 꺼내 볼 수 없고, 실행 기록에도
> `***`로 가려져 나옵니다.

### 배포가 잘 됐는지 확인하는 곳

GitHub 저장소 상단의 **Actions** 탭 → **Deploy to EC2** 를 누르면 진행 상황이 보입니다.

- ✅ 초록색 체크: 배포 성공
- ❌ 빨간색 X: 실패 — 눌러서 어느 단계에서 멈췄는지 확인하고, 그 내용을 Claude Code에게
  보여 주며 고쳐 달라고 하세요.

Actions 탭의 **Run workflow** 버튼으로 코드 변경 없이 직접 배포를 다시 돌릴 수도 있습니다.

### 배포된 화면 주소

배포가 성공하면 아래 주소로 접속할 수 있습니다. `EC2공인IP` 자리에는 인프라 담당에게 받은
실제 IP를 넣으세요.

```
http://EC2공인IP:3000              ← 만든 화면
http://EC2공인IP:3000/api/health   ← 서버가 살아 있는지 확인하는 주소
```

`/api/health`에 들어가서 아래처럼 `"status": "ok"` 가 보이면 정상입니다.

```json
{ "status": "ok", "projectId": "...", "projectName": "...", "timestamp": "..." }
```

### EC2 보안 그룹에서 3000번 포트 열기

배포가 성공했는데도 화면이 안 열린다면, 대개 **방화벽(보안 그룹)이 막고 있는** 경우입니다.

AWS 콘솔 → EC2 → 해당 인스턴스 → **Security** → 보안 그룹 → **인바운드 규칙 편집**에서
TCP **3000** 포트를 허용해야 접속됩니다.

> ⚠️ **테스트가 끝나면 3000번 포트를 전체 공개(`0.0.0.0/0`)로 오래 두지 마세요.**
> 인터넷의 누구나 접속할 수 있는 상태가 됩니다. 확인이 끝나면 회사 사무실 IP만 허용하도록
> 좁히거나, 규칙을 지우고 인프라 담당에게 알리세요.

### 지금은 프로젝트 한 개만 실행할 수 있습니다

지금 구조는 3000번 포트를 프로젝트 하나가 통째로 쓰는 방식입니다. 그래서 **같은 EC2에서는
프로젝트를 하나만 띄울 수 있습니다.** 다른 프로젝트를 같은 서버에 배포하면 포트가 겹쳐서
충돌합니다.

여러 프로젝트를 한 서버에서 동시에 돌리는 것은 나중에 **Traefik**(들어온 주소를 보고 알맞은
프로젝트로 연결해 주는 프로그램)을 붙여서 해결할 예정입니다. 그때는 포트 번호 대신
`<프로젝트 ID>.ai.example.com` 같은 주소로 접속하게 됩니다.

---

## 향후 자동 배포 예정 구조

```
GitHub Push
   ↓
GitHub Actions 검사   ← 지금 여기까지 구현되어 있습니다
   ↓
EC2 서버가 코드 내려받기
   ↓
EC2에서 Docker 빌드 및 실행
   ↓
도메인 연결 (<프로젝트 ID>.ai.example.com)
   ↓
전사 프로젝트 목록에 등록
```

**현재 상태:** GitHub Push → 검사 → EC2 배포 및 Docker 실행까지 동작합니다.
(위 [EC2 자동 배포](#ec2-자동-배포) 참고. GitHub Secret 3개를 등록해야 동작합니다.)
그 아래 단계(도메인 연결, 프로젝트 목록 등록)는 **아직 구현되지 않았습니다.**
그래서 지금은 도메인 주소 대신 `http://EC2공인IP:3000` 으로 접속합니다.

`project.json`의 `domain` 값도 지금은 **화면에 표시되는 예정 주소일 뿐**이며,
실제로 연결된 주소가 아닙니다.

---

## 폴더 구조

```
.
├─ app/                     화면과 서버 기능
│  ├─ api/health/route.ts   서버 정상 동작 확인용 주소 (지우지 마세요)
│  ├─ globals.css           전체 디자인
│  ├─ layout.tsx            모든 화면을 감싸는 틀
│  └─ page.tsx              첫 화면
├─ components/              화면 조각 (헤더, 카드 등)
├─ lib/                     공통 로직
│  ├─ env.ts                환경변수를 안전하게 읽기
│  └─ project.ts            project.json 읽기
├─ public/                  이미지 등 정적 파일
├─ scripts/                 검사 스크립트
├─ .claude/settings.json    Claude Code 팀 공통 설정
├─ .github/workflows/       GitHub 자동 검사
├─ CLAUDE.md                Claude Code가 지킬 규칙
├─ project.json             프로젝트 정보 (여기부터 수정하세요)
├─ Dockerfile               서버 배포용 설정
└─ compose.yaml             내 PC에서 Docker로 실행하기
```

`Dockerfile`, `compose.yaml`, `.github/`, `scripts/`, `next.config.ts` 는 배포에 쓰이는
파일이므로 직접 고치지 마세요. 고쳐야 할 일이 생기면 인프라 담당에게 문의하세요.

---

## 도움이 필요하면

1. 오류 메시지를 그대로 복사해서 Claude Code에게 물어보세요.
2. 그래도 해결되지 않으면 오류 메시지와 함께 인프라 담당에게 문의하세요.
