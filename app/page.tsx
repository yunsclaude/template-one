import { AppHeader } from "@/components/AppHeader";
import { ProjectInfo } from "@/components/ProjectInfo";
import { env } from "@/lib/env";
import { project } from "@/lib/project";

const startingPoints: { file: string; description: string }[] = [
  {
    file: "project.json",
    description: "프로젝트 이름, 설명, 제작자, 부서를 내 정보로 바꿉니다. 가장 먼저 수정하세요.",
  },
  {
    file: "app/page.tsx",
    description: "지금 보고 있는 이 화면입니다. 첫 화면을 만들려면 여기부터 고칩니다.",
  },
  {
    file: "components/",
    description: "화면을 이루는 조각(헤더, 카드, 버튼 등)을 두는 곳입니다.",
  },
  {
    file: "app/api/",
    description: "서버 기능(API)을 추가하는 곳입니다. health 폴더는 지우지 마세요.",
  },
  {
    file: "app/globals.css",
    description: "전체 화면의 색과 여백 같은 디자인을 바꿉니다.",
  },
];

export default function Home() {
  return (
    <main className="page">
      <AppHeader
        name={project.name}
        description={project.description}
        status={`실행 중 · ${env.nodeEnv}`}
      />

      <p className="notice">템플릿이 정상적으로 실행 중입니다.</p>

      <ProjectInfo project={project} />

      <section className="card">
        <h2 className="card-title">어떤 파일부터 수정하면 되나요?</h2>
        <p className="card-hint">
          아래 순서대로 고치면 됩니다. 잘 모르겠으면 Claude Code에게 파일 이름과 함께
          원하는 것을 설명해 주세요.
        </p>
        <ol className="guide-list">
          {startingPoints.map((item) => (
            <li className="guide-item" key={item.file}>
              <code className="guide-file">{item.file}</code>
              <span className="guide-description">{item.description}</span>
            </li>
          ))}
        </ol>
      </section>

      <footer className="footer">
        <p>
          동작 확인용 주소:{" "}
          <a className="link" href="/api/health">
            /api/health
          </a>
        </p>
        <p>
          작업을 끝내기 전에 터미널에서 <code>npm run check</code> 를 실행하세요.
        </p>
      </footer>
    </main>
  );
}
