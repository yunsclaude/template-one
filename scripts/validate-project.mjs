#!/usr/bin/env node
/**
 * project.json 검사 스크립트입니다.
 *
 * 실행: npm run validate:project
 * 규칙을 하나라도 어기면 종료 코드 1 로 실패합니다.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const projectFilePath = join(projectRoot, "project.json");

const REQUIRED_FIELDS = [
  "id",
  "name",
  "description",
  "owner",
  "department",
  "domain",
  "port",
];

const ID_PATTERN = /^[a-z0-9][a-z0-9-]*$/;
const FIXED_PORT = 3000;

const errors = [];

function fail(message) {
  errors.push(message);
}

/** 값이 있는 문자열인지 검사합니다. 항목 자체가 없으면 위에서 이미 알렸으므로 건너뜁니다. */
function requireNonEmptyString(project, field, label) {
  if (!Object.hasOwn(project, field)) {
    return false;
  }
  const value = project[field];
  if (typeof value !== "string") {
    fail(`${label}(${field}) 은(는) 문자열이어야 합니다. 현재 타입: ${typeof value}`);
    return false;
  }
  if (value.trim() === "") {
    fail(`${label}(${field}) 이(가) 비어 있습니다. project.json 에서 값을 채워 주세요.`);
    return false;
  }
  return true;
}

let raw;
try {
  raw = readFileSync(projectFilePath, "utf8");
} catch {
  console.error("[실패] project.json 파일을 찾을 수 없습니다.");
  console.error(`        찾은 위치: ${projectFilePath}`);
  process.exit(1);
}

let project;
try {
  project = JSON.parse(raw);
} catch (error) {
  console.error("[실패] project.json 이 올바른 JSON 형식이 아닙니다.");
  console.error(`        원인: ${error.message}`);
  console.error("        쉼표(,)나 큰따옴표(\")가 빠지지 않았는지 확인해 주세요.");
  process.exit(1);
}

if (project === null || typeof project !== "object" || Array.isArray(project)) {
  console.error("[실패] project.json 의 최상위는 { } 형태의 객체여야 합니다.");
  process.exit(1);
}

// 1. 필수 필드 존재 여부
for (const field of REQUIRED_FIELDS) {
  if (!Object.hasOwn(project, field)) {
    fail(`필수 항목 "${field}" 이(가) project.json 에 없습니다.`);
  }
}

// 2. id 규칙
if (typeof project.id !== "string") {
  if (Object.hasOwn(project, "id")) {
    fail(`id 는 문자열이어야 합니다. 현재 타입: ${typeof project.id}`);
  }
} else {
  const id = project.id;
  if (!ID_PATTERN.test(id)) {
    fail(
      'id 는 영문 소문자, 숫자, 하이픈(-)만 쓸 수 있고 영문 소문자 또는 숫자로 시작해야 합니다. ' +
        `현재 값: "${id}" (예: my-sales-report)`,
    );
  }
  if (id.length < 3 || id.length > 50) {
    fail(`id 길이는 3자 이상 50자 이하여야 합니다. 현재 길이: ${id.length}자`);
  }
}

// 3. 비어 있으면 안 되는 문자열 항목
requireNonEmptyString(project, "name", "프로젝트 이름");
requireNonEmptyString(project, "description", "프로젝트 설명");
requireNonEmptyString(project, "owner", "제작자");
requireNonEmptyString(project, "department", "부서");
requireNonEmptyString(project, "domain", "도메인");

// 4. port 는 3000 고정
if (project.port !== FIXED_PORT) {
  fail(
    `port 는 ${FIXED_PORT} 으로 고정되어 있습니다. 현재 값: ${JSON.stringify(project.port)} ` +
      "(배포 서버가 3000번 포트를 기준으로 동작합니다)",
  );
}

if (errors.length > 0) {
  console.error("[실패] project.json 검사에서 문제가 발견되었습니다.\n");
  for (const [index, message] of errors.entries()) {
    console.error(`  ${index + 1}. ${message}`);
  }
  console.error("\n project.json 을 수정한 뒤 다시 실행해 주세요: npm run validate:project");
  process.exit(1);
}

console.log("[성공] project.json 검사를 통과했습니다.");
console.log(`  - 프로젝트 ID : ${project.id}`);
console.log(`  - 이름        : ${project.name}`);
console.log(`  - 제작자      : ${project.owner} (${project.department})`);
console.log(`  - 포트        : ${project.port}`);
