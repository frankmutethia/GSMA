import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simple localStorage content store for admin-managed public content and settings
export type PublicContent = {
  newsletterTitle?: string
  newsletterContent?: string
  articles?: string[]
  contactEmail?: string
  contactPhone?: string
  contactAddress?: string
  defaultLanguage?: string
  enabledLanguages?: string[]
}

const CONTENT_KEY = "gsma-public-content"

export function readPublicContent(): PublicContent {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(CONTENT_KEY)
    return raw ? (JSON.parse(raw) as PublicContent) : {}
  } catch {
    return {}
  }
}

export function writePublicContent(update: Partial<PublicContent>) {
  if (typeof window === "undefined") return
  const current = readPublicContent()
  const merged = { ...current, ...update }
  localStorage.setItem(CONTENT_KEY, JSON.stringify(merged))
}

// ======================= GSMA PRINCIPLES MOCK =======================
export type Indicator = {
  id: string
  title: string
  description: string
  evidence?: string[]
  status: "completed" | "in-progress" | "pending" | "requires-clarification"
  comments?: string
}

export type SubPrinciple = {
  id: string
  title: string
  indicators: Indicator[]
}

export type Principle = {
  id: string
  title: string
  description: string
  subPrinciples: SubPrinciple[]
}

export const gsmaPrinciplesSeed: Principle[] = [
  {
    id: "finance",
    title: "Finance",
    description: "Financial governance, liquidity, reconciliation, and reporting controls.",
    subPrinciples: [
      {
        id: "fin-governance",
        title: "Financial Governance",
        indicators: [
          { id: "FIN-001", title: "Board Oversight", description: "Evidence of governance oversight for MM operations", status: "completed", evidence: ["Board_Minutes.pdf"], comments: "Reviewed Q4" },
          { id: "FIN-002", title: "Policies & Procedures", description: "Documented finance policies specific to MM", status: "in-progress" },
          { id: "FIN-003", title: "Internal Controls", description: "Segregation of duties and control matrix", status: "pending" },
        ],
      },
      {
        id: "fin-reconciliation",
        title: "Reconciliation & Settlement",
        indicators: [
          { id: "FIN-004", title: "Daily Reconciliation", description: "Reconciliation between wallet, GL and partner systems", status: "requires-clarification", comments: "Missing partner report" },
          { id: "FIN-005", title: "Settlement Timeliness", description: "T+1 settlement adherence evidence", status: "in-progress" },
          { id: "FIN-006", title: "Float Adequacy", description: "Float/escrow adequacy reports", status: "pending" },
        ],
      },
    ],
  },
  {
    id: "aml",
    title: "AML/CFT & Fraud Prevention",
    description: "Customer due diligence, monitoring, and anti-fraud controls.",
    subPrinciples: [
      {
        id: "aml-cdd",
        title: "Customer Due Diligence",
        indicators: [
          { id: "AML-001", title: "KYC Framework", description: "KYC tiers and verification process", status: "completed", evidence: ["KYC_Policy.pdf"] },
          { id: "AML-002", title: "Sanctions Screening", description: "Real-time sanctions and PEP screening", status: "in-progress" },
          { id: "AML-003", title: "Ongoing Monitoring", description: "Automated monitoring rules & thresholds", status: "pending" },
        ],
      },
      {
        id: "aml-fraud",
        title: "Fraud Prevention",
        indicators: [
          { id: "AML-004", title: "Fraud Rules", description: "Rules for SIM swap, social engineering, account takeover", status: "in-progress" },
          { id: "AML-005", title: "Case Management", description: "Fraud case lifecycle & metrics", status: "pending" },
          { id: "AML-006", title: "Reporting", description: "STR/SAR reporting process and timelines", status: "pending" },
        ],
      },
    ],
  },
  {
    id: "people",
    title: "Staff & Agent Management",
    description: "Training, vetting, performance, and compliance of staff/agents.",
    subPrinciples: [
      {
        id: "people-training",
        title: "Training & Competency",
        indicators: [
          { id: "PEO-001", title: "Staff Training", description: "Mandatory training curriculum & completion rates", status: "completed", evidence: ["Training_Matrix.xlsx"] },
          { id: "PEO-002", title: "Agent Training", description: "Onboarding & refresher training records", status: "in-progress" },
          { id: "PEO-003", title: "Certification", description: "Certification/assessment outcomes for critical roles", status: "pending" },
        ],
      },
      {
        id: "people-performance",
        title: "Performance & Conduct",
        indicators: [
          { id: "PEO-004", title: "Agent Vetting", description: "Background checks and approval workflow", status: "pending" },
          { id: "PEO-005", title: "Disciplinary Process", description: "Evidence of disciplinary actions & process", status: "pending" },
          { id: "PEO-006", title: "Agent Monitoring", description: "Quality checks, mystery shopping, KPIs", status: "in-progress" },
        ],
      },
    ],
  },
  {
    id: "operations",
    title: "Operational Management",
    description: "Processes, SLAs, incident response, business continuity.",
    subPrinciples: [
      {
        id: "ops-process",
        title: "Process & SLA",
        indicators: [
          { id: "OPS-001", title: "SOPs", description: "End-to-end SOPs for key processes", status: "completed" },
          { id: "OPS-002", title: "SLAs", description: "Internal & external SLAs with monitoring", status: "in-progress" },
          { id: "OPS-003", title: "Change Management", description: "CAB records and approvals", status: "pending" },
        ],
      },
      {
        id: "ops-continuity",
        title: "Incident & Continuity",
        indicators: [
          { id: "OPS-004", title: "Incident Response", description: "IR plan, roles, and post-mortems", status: "in-progress" },
          { id: "OPS-005", title: "BCP/DR", description: "BCP, DR tests and RTO/RPO evidence", status: "pending" },
          { id: "OPS-006", title: "Capacity Management", description: "Capacity/availability planning", status: "pending" },
        ],
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    description: "Information and physical security controls for MM operations.",
    subPrinciples: [
      {
        id: "sec-infosec",
        title: "Information Security",
        indicators: [
          { id: "SEC-001", title: "Access Management", description: "IAM, RBAC, least privilege", status: "completed" },
          { id: "SEC-002", title: "Encryption", description: "Data at rest and in transit", status: "in-progress" },
          { id: "SEC-003", title: "Vulnerability Mgmt", description: "Scanning, patching cadence", status: "pending" },
        ],
      },
      {
        id: "sec-physical",
        title: "Physical & Site Security",
        indicators: [
          { id: "SEC-004", title: "Site Controls", description: "DC access controls and CCTV logs", status: "pending" },
          { id: "SEC-005", title: "Asset Management", description: "Asset inventory and ownership", status: "in-progress" },
          { id: "SEC-006", title: "Key Management", description: "HSM/keys lifecycle evidence", status: "pending" },
        ],
      },
    ],
  },
  {
    id: "transparency",
    title: "Transparency",
    description: "Clear product terms, fees, and communications to customers.",
    subPrinciples: [
      {
        id: "trans-product",
        title: "Product Terms & Fees",
        indicators: [
          { id: "TRA-001", title: "Fee Disclosure", description: "Public fee schedules and changes", status: "completed" },
          { id: "TRA-002", title: "Marketing Review", description: "Marketing content approval and accuracy", status: "in-progress" },
          { id: "TRA-003", title: "Change Notices", description: "Timely customer notifications", status: "pending" },
        ],
      },
      {
        id: "trans-usage",
        title: "Usage & Limits",
        indicators: [
          { id: "TRA-004", title: "Limits Disclosure", description: "Transaction and wallet limits communication", status: "pending" },
          { id: "TRA-005", title: "T&Cs", description: "Terms of service accessibility and acceptance", status: "in-progress" },
          { id: "TRA-006", title: "Receipts & Statements", description: "Availability and accuracy", status: "pending" },
        ],
      },
    ],
  },
  {
    id: "customer-service",
    title: "Customer Service",
    description: "Support channels, complaints, and resolution timeliness.",
    subPrinciples: [
      {
        id: "cs-channels",
        title: "Support Channels",
        indicators: [
          { id: "CS-001", title: "Contact Center", description: "Staffing, SLAs, QA", status: "in-progress" },
          { id: "CS-002", title: "Self-Service", description: "USSD/app/web self-service options", status: "pending" },
          { id: "CS-003", title: "Accessibility", description: "Multilingual and inclusive design", status: "pending" },
        ],
      },
      {
        id: "cs-complaints",
        title: "Complaints & Resolution",
        indicators: [
          { id: "CS-004", title: "Case Workflow", description: "Complaints logging and workflow", status: "in-progress" },
          { id: "CS-005", title: "Turnaround Time", description: "Aging and SLA metrics", status: "pending" },
          { id: "CS-006", title: "Root Cause", description: "RCA and corrective actions", status: "pending" },
        ],
      },
    ],
  },
  {
    id: "data-privacy",
    title: "Data Privacy",
    description: "Data protection, consent, sharing, and retention.",
    subPrinciples: [
      {
        id: "dp-consent",
        title: "Consent & Purpose",
        indicators: [
          { id: "DP-001", title: "Consent Capture", description: "Consent flows and evidence", status: "completed" },
          { id: "DP-002", title: "Purpose Limitation", description: "Usage mapping to purposes", status: "in-progress" },
          { id: "DP-003", title: "Third-Party Sharing", description: "DPAs and sharing controls", status: "pending" },
        ],
      },
      {
        id: "dp-retention",
        title: "Retention & Rights",
        indicators: [
          { id: "DP-004", title: "Retention Schedule", description: "Data retention & destruction evidence", status: "pending" },
          { id: "DP-005", title: "DSAR Handling", description: "Access/rectification/erasure procedures", status: "pending" },
          { id: "DP-006", title: "Breach Response", description: "Notification processes and timelines", status: "in-progress" },
        ],
      },
    ],
  },
]