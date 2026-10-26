/* @ds-bundle: {"format":4,"namespace":"OctogleHireDesignSystem_2b7531","components":[{"name":"Icon","sourcePath":"components/brand/Icon.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"StatusPill","sourcePath":"components/core/StatusPill.jsx"},{"name":"TechTag","sourcePath":"components/core/TechTag.jsx"},{"name":"StatCell","sourcePath":"components/data/SummaryStat.jsx"},{"name":"SummaryStat","sourcePath":"components/data/SummaryStat.jsx"},{"name":"Table","sourcePath":"components/data/SummaryStat.jsx"},{"name":"Avatar","sourcePath":"components/feedback/Avatar.jsx"},{"name":"Progress","sourcePath":"components/feedback/Progress.jsx"},{"name":"ScoreBar","sourcePath":"components/feedback/Progress.jsx"},{"name":"Ring","sourcePath":"components/feedback/Progress.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Switch","sourcePath":"components/forms/Checkbox.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Textarea","sourcePath":"components/forms/Input.jsx"},{"name":"Label","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Slider","sourcePath":"components/forms/Select.jsx"},{"name":"Accordion","sourcePath":"components/layout/Accordion.jsx"},{"name":"Card","sourcePath":"components/layout/Card.jsx"},{"name":"SectionHeader","sourcePath":"components/layout/Card.jsx"},{"name":"Separator","sourcePath":"components/layout/Card.jsx"},{"name":"Skeleton","sourcePath":"components/layout/Card.jsx"},{"name":"Tabs","sourcePath":"components/layout/Tabs.jsx"},{"name":"CandidateRow","sourcePath":"components/talent/CandidateRow.jsx"},{"name":"ProfileCard","sourcePath":"components/talent/ProfileCard.jsx"}],"sourceHashes":{"components/brand/Icon.jsx":"30e517c6be9d","components/core/Badge.jsx":"6ab83e9235c6","components/core/Button.jsx":"cd183c23da43","components/core/Chip.jsx":"8a4772405769","components/core/StatusPill.jsx":"75ff2793ed71","components/core/TechTag.jsx":"de6625efaaf6","components/data/SummaryStat.jsx":"ae05ff791dc1","components/feedback/Avatar.jsx":"7c5db3e5b4b4","components/feedback/Progress.jsx":"4e4d964d06cb","components/feedback/Tooltip.jsx":"debe0e820d5a","components/forms/Checkbox.jsx":"bbd3e9a2bc1c","components/forms/Input.jsx":"c31d399724bd","components/forms/Select.jsx":"15017ec769f4","components/layout/Accordion.jsx":"6b6d7f2893bc","components/layout/Card.jsx":"d0eedf40da86","components/layout/Tabs.jsx":"eba97b842f84","components/talent/CandidateRow.jsx":"4440fe619d52","components/talent/ProfileCard.jsx":"2b8257098d32","ui_kits/company-dashboard/Discover.jsx":"52fc67c7a8f0","ui_kits/company-dashboard/Rail.jsx":"8f327671b43c","ui_kits/company-dashboard/data.js":"db273310765f","ui_kits/marketing/BriefDialog.jsx":"415799537aff","ui_kits/marketing/Hero.jsx":"ae52f5cda71d","ui_kits/marketing/Navbar.jsx":"661bc9b5cc08","ui_kits/marketing/Sections.jsx":"852dd6c962cc"},"inlinedExternals":[],"unexposedExports":[{"name":"techIcon","sourcePath":"components/core/TechTag.jsx"}]} */

(() => {

const __ds_ns = (window.OctogleHireDesignSystem_2b7531 = window.OctogleHireDesignSystem_2b7531 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Icon.jsx
try { (() => {
/** Lucide icon by name, rendered from the lucide UMD global (window.lucide). */
function Icon({
  name,
  size = 16,
  strokeWidth = 2,
  color = "currentColor",
  fill = "none",
  style,
  className
}) {
  const lib = typeof window !== "undefined" ? window.lucide : null;
  const pascal = String(name || "").split(/[-_ ]/).filter(Boolean).map(s => s[0].toUpperCase() + s.slice(1)).join("");
  const node = lib ? lib.icons && lib.icons[pascal] || lib[pascal] : null;
  const kids = !node ? [] : typeof node[0] === "string" ? node[2] || [] : node;
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill,
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    className: className,
    style: {
      flex: "none",
      display: "inline-block",
      verticalAlign: "middle",
      ...style
    }
  }, kids.map(([tag, attrs], i) => React.createElement(tag, {
    key: i,
    ...attrs
  })));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const V = {
  default: {
    background: "var(--primary)",
    color: "var(--primary-foreground)"
  },
  secondary: {
    background: "var(--secondary)",
    color: "var(--secondary-foreground)"
  },
  destructive: {
    background: "var(--destructive)",
    color: "#fff"
  },
  outline: {
    borderColor: "var(--border)",
    color: "var(--foreground)"
  },
  accent: {
    background: "rgba(104,186,217,0.16)",
    color: "var(--steel-600)",
    borderColor: "var(--border-accent)"
  },
  success: {
    background: "var(--success-wash)",
    color: "var(--green-500)",
    borderColor: "var(--success-border)"
  },
  warning: {
    background: "var(--warning-wash)",
    color: "var(--amber-500)",
    borderColor: "var(--warning-border)"
  },
  ghost: {
    color: "var(--foreground)"
  }
};
/** Small rounded-full label (12px/500). */
function Badge({
  variant = "default",
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      borderRadius: 9999,
      border: "1px solid transparent",
      padding: "2px 8px",
      fontSize: 12,
      fontWeight: 500,
      lineHeight: "16px",
      whiteSpace: "nowrap",
      width: "fit-content",
      fontFamily: "var(--font-sans)",
      ...V[variant],
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const SIZES = {
  default: {
    h: 36,
    px: 16,
    fs: 14,
    r: 12
  },
  xs: {
    h: 28,
    px: 8,
    fs: 12,
    r: 10,
    gap: 4
  },
  sm: {
    h: 28,
    px: 12,
    fs: 13,
    r: 10,
    gap: 6
  },
  lg: {
    h: 44,
    px: 24,
    fs: 15,
    r: 12
  },
  xl: {
    h: 56,
    px: 24,
    fs: 17,
    r: 14
  },
  icon: {
    h: 36,
    w: 36,
    r: 12
  },
  "icon-xs": {
    h: 24,
    w: 24,
    r: 10
  },
  "icon-sm": {
    h: 32,
    w: 32,
    r: 10
  },
  "icon-lg": {
    h: 44,
    w: 44,
    r: 12
  }
};
const CHIP = {
  default: [26, 7, 14],
  xs: [20, 6, 12],
  sm: [22, 6, 12],
  lg: [32, 12, 16],
  xl: [40, 10, 17]
};
function variantStyle(v, hover) {
  switch (v) {
    case "destructive":
      return {
        background: "var(--destructive)",
        color: "#fff",
        opacity: hover ? 0.9 : 1
      };
    case "outline":
    case "secondary":
      return {
        background: hover ? "var(--secondary)" : "var(--card)",
        color: "var(--foreground)",
        borderColor: hover ? "var(--border-strong)" : "var(--border)"
      };
    case "accent":
      return {
        background: hover ? "var(--sky-400)" : "var(--sky-500)",
        color: "var(--navy-1000)"
      };
    case "inverse":
      return {
        background: hover ? "var(--ice-100)" : "#fff",
        color: "var(--navy-1000)"
      };
    case "ghost":
      return {
        background: hover ? "var(--surface-hover)" : "transparent",
        color: hover ? "var(--foreground)" : "var(--text-body)"
      };
    case "link":
      return {
        background: "transparent",
        color: hover ? "var(--foreground)" : "var(--text-accent)",
        textDecoration: hover ? "underline" : "none",
        textUnderlineOffset: 4
      };
    default:
      return {
        background: "var(--primary)",
        color: "var(--primary-foreground)",
        opacity: hover ? 0.9 : 1
      };
  }
}

/** Octogle button — Neue Montreal/Geist, regular weight, sentence case, 12px radius. `chip` adds the signature inset arrow chip. */
function Button({
  variant = "default",
  size = "default",
  chip = false,
  pill = false,
  iconLeft,
  iconRight,
  disabled,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const s = SIZES[size] || SIZES.default;
  const isIcon = size.startsWith("icon");
  const c = CHIP[size] || CHIP.default;
  const inverse = variant === "inverse";
  const hasSvg = !!(iconLeft || iconRight);
  const px = isIcon ? 0 : hasSvg && !chip ? Math.max(s.px - 4, 6) : s.px;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled
  }, rest, {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: chip ? 16 : s.gap || 8,
      whiteSpace: "nowrap",
      flexShrink: 0,
      height: s.h,
      width: s.w,
      paddingLeft: px,
      paddingRight: chip ? 8 : px,
      borderRadius: pill ? 9999 : s.r,
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: s.fs,
      letterSpacing: "-0.01em",
      lineHeight: 1,
      border: "1px solid transparent",
      cursor: disabled ? "default" : "pointer",
      outline: "none",
      transition: "all 140ms var(--ease-standard)",
      transform: press && !disabled ? "scale(0.985)" : "none",
      opacity: disabled ? 0.45 : undefined,
      pointerEvents: disabled ? "none" : undefined,
      ...variantStyle(variant, hover && !disabled),
      ...(disabled ? {
        opacity: 0.45
      } : {}),
      ...style
    }
  }), iconLeft ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: size === "xs" ? 12 : 16
  }) : null, children, iconRight ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: size === "xs" ? 12 : 16
  }) : null, chip ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "grid",
      placeItems: "center",
      flex: "none",
      width: c[0],
      height: c[0],
      borderRadius: c[1],
      background: inverse ? "var(--navy-950)" : chip === "translucent" ? "rgba(255,255,255,0.15)" : "#fff",
      color: inverse || chip === "translucent" ? "#fff" : "var(--navy-950)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: c[2]
  })) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
/** Pulse-tinted mono-caps filter chip (dashboard command bar). */
function Chip({
  icon,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      borderRadius: 9999,
      border: "1px solid var(--pulse-border)",
      background: "var(--pulse-wash)",
      color: "var(--sky-600)",
      padding: "4px 10px",
      fontFamily: "var(--font-mono)",
      fontSize: 11.5,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      whiteSpace: "nowrap",
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement("img", {
    src: icon,
    alt: "",
    width: 13,
    height: 13
  }) : null, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusPill.jsx
try { (() => {
const P = {
  c: "var(--sky-600)",
  b: "var(--pulse-border)",
  bg: "var(--pulse-wash)"
};
const G = {
  c: "var(--green-500)",
  b: "var(--success-border)",
  bg: "var(--success-wash)"
};
const A = {
  c: "var(--amber-500)",
  b: "var(--warning-border)",
  bg: "var(--warning-wash)"
};
const R = {
  c: "var(--red-500)",
  b: "var(--danger-border)",
  bg: "var(--danger-wash)"
};
const M = {
  c: "var(--muted-foreground)",
  b: "var(--border)",
  bg: "rgba(236,247,248,0.5)"
};
const TONES = {
  open: P,
  matching: P,
  proposed: P,
  sent: P,
  interview_requested: P,
  interview_scheduled: P,
  partially_filled: A,
  pending: A,
  filled: G,
  accepted: G,
  active: G,
  paid: G,
  signed: G,
  "Matches ready": G,
  overdue: R,
  closed: M,
  rejected: M,
  declined: M,
  ended: M,
  draft: M
};
/** Mono-caps status capsule used across the dashboards. */
function StatusPill({
  status,
  style
}) {
  const t = TONES[status] || M;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      borderRadius: 9999,
      border: "1px solid " + t.b,
      background: t.bg,
      color: t.c,
      padding: "2px 10px",
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      lineHeight: "16px",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      whiteSpace: "nowrap",
      ...style
    }
  }, String(status).replace(/_/g, " "));
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/core/TechTag.jsx
try { (() => {
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";
const MAP = {
  React: "react/react-original.svg",
  TypeScript: "typescript/typescript-original.svg",
  Python: "python/python-original.svg",
  PostgreSQL: "postgresql/postgresql-original.svg",
  Tailwind: "tailwindcss/tailwindcss-original.svg",
  Go: "go/go-original-wordmark.svg",
  Kubernetes: "kubernetes/kubernetes-original.svg",
  AWS: "amazonwebservices/amazonwebservices-plain-wordmark.svg",
  Docker: "docker/docker-original.svg",
  "Vue.js": "vuejs/vuejs-original.svg",
  "Node.js": "nodejs/nodejs-original.svg",
  Flutter: "flutter/flutter-original.svg",
  PyTorch: "pytorch/pytorch-original.svg",
  "Next.js": "nextjs/nextjs-original.svg",
  Java: "java/java-original.svg",
  Spring: "spring/spring-original.svg",
  Angular: "angularjs/angularjs-original.svg",
  Rust: "rust/rust-original.svg",
  Swift: "swift/swift-original.svg",
  Kotlin: "kotlin/kotlin-original.svg",
  Django: "django/django-plain.svg"
};
function techIcon(name) {
  return MAP[name] ? DEVICON + MAP[name] : null;
}
/** Tech-stack tag with devicon logo. shape="square" (hero card) or "round" (console list). */
function TechTag({
  name,
  shape = "square",
  style
}) {
  const src = techIcon(name);
  const round = shape === "round";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: round ? 4 : 6,
      borderRadius: round ? 9999 : 12,
      border: "1px solid " + (round ? "var(--border)" : "var(--border-subtle)"),
      background: round ? "rgba(236,247,248,0.5)" : "var(--surface-sunken)",
      padding: round ? "2px 6px" : "4px 8px",
      fontSize: round ? 10.5 : 11,
      fontWeight: round ? 400 : 500,
      color: "var(--text-muted)",
      whiteSpace: "nowrap",
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    width: round ? 11 : 12,
    height: round ? 11 : 12
  }) : null, name);
}
Object.assign(__ds_scope, { techIcon, TechTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TechTag.jsx", error: String((e && e.message) || e) }); }

// components/data/SummaryStat.jsx
try { (() => {
const mono = {
  fontFamily: "var(--font-mono)",
  textTransform: "uppercase",
  letterSpacing: "0.05em"
};
/** Compact stat tile (profile stat strip). */
function StatCell({
  icon,
  value,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      minWidth: 0,
      borderRadius: 16,
      border: "1px solid var(--border)",
      background: "rgba(255,255,255,0.5)",
      padding: "10px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--pulse)",
      display: "inline-flex"
    }
  }, typeof icon === "string" ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14
  }) : icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 16,
      fontWeight: 700,
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      fontSize: 8.5,
      color: "var(--muted-foreground)"
    }
  }, label));
}
/** KPI tile — icon disc + mono value. accent = pulse wash; warn = amber highlight. */
function SummaryStat({
  icon,
  value,
  label,
  accent,
  warn
}) {
  const tint = warn ? "var(--amber-500)" : "var(--pulse)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flex: 1,
      minWidth: 160,
      alignItems: "center",
      gap: 14,
      borderRadius: 16,
      padding: 16,
      border: "1px solid " + (warn ? "rgba(201,138,24,0.4)" : accent ? "rgba(102,184,214,0.3)" : "var(--border)"),
      background: warn ? "rgba(201,138,24,0.05)" : accent ? "linear-gradient(135deg,rgba(102,184,214,0.10),var(--card))" : "var(--card)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      placeItems: "center",
      width: 40,
      height: 40,
      flex: "none",
      borderRadius: 9999,
      background: warn ? "rgba(201,138,24,0.15)" : "rgba(102,184,214,0.12)",
      color: tint
    }
  }, typeof icon === "string" ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18
  }) : icon), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 18,
      fontWeight: 700,
      lineHeight: 1.25,
      color: warn ? "var(--amber-500)" : "var(--foreground)"
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      fontSize: 9,
      color: "var(--muted-foreground)"
    }
  }, label)));
}
/** Simple data table — 40px header, hairline rows, hover wash. */
function Table({
  columns = [],
  rows = [],
  onRowClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: "1px solid var(--border)"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      height: 40,
      padding: "0 8px",
      textAlign: c.align || "left",
      fontWeight: 500,
      color: "var(--foreground)",
      whiteSpace: "nowrap"
    }
  }, c.label)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    onClick: () => onRowClick && onRowClick(r),
    style: {
      borderBottom: "1px solid var(--border)",
      cursor: onRowClick ? "pointer" : "default"
    },
    onMouseEnter: e => e.currentTarget.style.background = "rgba(236,247,248,0.5)",
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      padding: 8,
      textAlign: c.align || "left",
      whiteSpace: "nowrap",
      fontFamily: c.mono ? "var(--font-mono)" : undefined
    }
  }, c.render ? c.render(r) : r[c.key])))))));
}
Object.assign(__ds_scope, { StatCell, SummaryStat, Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/SummaryStat.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Avatar.jsx
try { (() => {
const SZ = {
  sm: 24,
  default: 32,
  lg: 40
};
/** Round avatar with initials fallback and optional online dot. */
function Avatar({
  src,
  name = "",
  size = "default",
  online = false,
  ring = false,
  style
}) {
  const px = typeof size === "number" ? size : SZ[size] || 32;
  const initials = name.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase();
  const dot = Math.max(8, Math.round(px * 0.25));
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      flex: "none",
      width: px,
      height: px,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: px,
      height: px,
      borderRadius: 9999,
      overflow: "hidden",
      background: "var(--muted)",
      color: "var(--muted-foreground)",
      display: "grid",
      placeItems: "center",
      fontSize: px <= 24 ? 10 : px >= 48 ? 16 : 12,
      fontWeight: 600,
      border: ring ? "1px solid var(--border)" : "none"
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials), online ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 0,
      bottom: 0,
      width: dot,
      height: dot,
      borderRadius: 9999,
      background: "#34d399",
      border: "2px solid var(--card)"
    }
  }) : null);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Progress.jsx
try { (() => {
/** Progress bar. tone "primary" = shadcn navy (h8); "pulse" = console sky bar (h6). */
function Progress({
  value = 0,
  tone = "primary",
  height,
  style
}) {
  const p = tone === "pulse";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: height || (p ? 6 : 8),
      width: "100%",
      overflow: "hidden",
      borderRadius: 9999,
      background: p ? "var(--muted)" : "rgba(13,25,45,0.2)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: value + "%",
      borderRadius: 9999,
      background: p ? "var(--pulse)" : "var(--primary)",
      transition: "width 700ms"
    }
  }));
}
/** Labelled score bar (Gauntlet stages / tech proficiency). */
function ScoreBar({
  label,
  value,
  tag,
  icon
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 6,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13,
      fontWeight: 500,
      color: "var(--foreground)"
    }
  }, icon ? /*#__PURE__*/React.createElement("img", {
    src: icon,
    alt: "",
    width: 15,
    height: 15
  }) : null, label), tag != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 9.5,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      color: "var(--muted-foreground)"
    }
  }, tag) : null), /*#__PURE__*/React.createElement(Progress, {
    value: value,
    tone: "pulse"
  }));
}
/** Circular score ring. ≥85 green, ≥65 pulse, else muted. */
function Ring({
  value = 0,
  size = 44,
  stroke = 4,
  tone
}) {
  const r = (size - stroke - 2) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - value / 100);
  const col = tone || (value >= 85 ? "#34d399" : value >= 65 ? "var(--pulse)" : "var(--muted-foreground)");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: size,
      height: size,
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: "rotate(-90deg)"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--border)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: col,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: c,
    strokeDashoffset: off
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "grid",
      placeItems: "center",
      fontFamily: "var(--font-mono)",
      fontWeight: 700,
      fontSize: size > 56 ? 18 : 13,
      color: tone ? "var(--foreground)" : col
    }
  }, value));
}
Object.assign(__ds_scope, { Progress, ScoreBar, Ring });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Progress.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
const {
  useState
} = React;
/** Hover tooltip — ink bubble, 12px text, arrow. */
function Tooltip({
  content,
  side = "top",
  children
}) {
  const [on, setOn] = useState(false);
  const top = side === "top";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex"
    },
    onMouseEnter: () => setOn(true),
    onMouseLeave: () => setOn(false)
  }, children, on ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      [top ? "bottom" : "top"]: "calc(100% + 8px)",
      zIndex: 50,
      background: "var(--foreground)",
      color: "var(--background)",
      borderRadius: 10,
      padding: "6px 12px",
      fontSize: 12,
      whiteSpace: "nowrap",
      pointerEvents: "none"
    }
  }, content, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: "50%",
      [top ? "bottom" : "top"]: -4,
      width: 10,
      height: 10,
      background: "var(--foreground)",
      transform: "translateX(-50%) rotate(45deg)",
      borderRadius: 2
    }
  })) : null);
}
/** Modal dialog — black/50 overlay, 12px radius panel, 24px padding. */
function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  width = 512
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 200,
      background: "rgba(0,0,0,0.5)",
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: "relative",
      width: "100%",
      maxWidth: width,
      background: "var(--background)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      padding: 24,
      boxShadow: "var(--shadow-lg)",
      display: "grid",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 1,
      color: "var(--foreground)"
    }
  }, title) : null, description ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--muted-foreground)"
    }
  }, description) : null), children, footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 8
    }
  }, footer) : null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    style: {
      position: "absolute",
      top: 16,
      right: 16,
      background: "none",
      border: 0,
      cursor: "pointer",
      opacity: 0.7,
      fontSize: 18,
      lineHeight: 1,
      color: "var(--foreground)"
    }
  }, "\xD7")));
}
Object.assign(__ds_scope, { Tooltip, Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/** 16px checkbox, 4px radius; checked = navy fill. */
function Checkbox({
  checked,
  onChange,
  disabled,
  label,
  style
}) {
  const box = /*#__PURE__*/React.createElement("span", {
    role: "checkbox",
    "aria-checked": !!checked,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      display: "inline-grid",
      placeItems: "center",
      width: 16,
      height: 16,
      flex: "none",
      borderRadius: 4,
      cursor: disabled ? "default" : "pointer",
      border: "1px solid " + (checked ? "var(--primary)" : "var(--input)"),
      background: checked ? "var(--primary)" : "var(--card)",
      color: "var(--primary-foreground)",
      boxShadow: "var(--shadow-xs)",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, checked ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14
  }) : null);
  if (!label) return box;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontSize: 14,
      color: "var(--foreground)",
      cursor: "pointer"
    }
  }, box, label);
}
/** shadcn-style switch — 32×18, navy when on. */
function Switch({
  checked,
  onChange,
  disabled,
  size = "default"
}) {
  const sm = size === "sm";
  const w = sm ? 24 : 32;
  const h = sm ? 14 : 18.4;
  const t = sm ? 12 : 16;
  return /*#__PURE__*/React.createElement("span", {
    role: "switch",
    "aria-checked": !!checked,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      display: "inline-flex",
      alignItems: "center",
      width: w,
      height: h,
      borderRadius: 9999,
      padding: 0,
      flex: "none",
      border: "1px solid transparent",
      background: checked ? "var(--primary)" : "var(--input)",
      cursor: disabled ? "default" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background 140ms",
      boxShadow: "var(--shadow-xs)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: t,
      height: t,
      borderRadius: 9999,
      background: "var(--background)",
      transform: checked ? "translateX(" + (w - t - 2) + "px)" : "translateX(0)",
      transition: "transform 140ms var(--ease-standard)"
    }
  }));
}
/** Radio group — 16px rings, navy dot. */
function RadioGroup({
  options = [],
  value,
  onChange,
  direction = "column"
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: "flex",
      flexDirection: direction,
      gap: 12
    }
  }, options.map(o => {
    const v = typeof o === "string" ? o : o.value;
    const l = typeof o === "string" ? o : o.label;
    const on = v === value;
    return /*#__PURE__*/React.createElement("label", {
      key: v,
      onClick: () => onChange && onChange(v),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 14,
        cursor: "pointer",
        color: "var(--foreground)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        height: 16,
        borderRadius: 9999,
        border: "1px solid " + (on ? "var(--primary)" : "var(--input)"),
        background: "var(--card)",
        display: "grid",
        placeItems: "center",
        boxShadow: "var(--shadow-xs)"
      }
    }, on ? /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: 9999,
        background: "var(--primary)"
      }
    }) : null), l);
  }));
}
Object.assign(__ds_scope, { Checkbox, Switch, RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const base = (hover, focus, invalid) => ({
  width: "100%",
  minWidth: 0,
  borderRadius: 12,
  border: "1px solid " + (invalid ? "var(--destructive)" : focus ? "var(--border-accent)" : hover ? "var(--border-strong)" : "var(--input)"),
  background: "var(--card)",
  color: "var(--foreground)",
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  outline: "none",
  boxShadow: focus ? invalid ? "0 0 0 3px rgba(217,58,63,0.2)" : "0 0 0 3px rgba(104,186,217,0.22)" : "none",
  transition: "border-color 140ms, box-shadow 140ms"
});
/** Text input — 36px, 12px radius, sky focus ring. */
function Input({
  invalid,
  disabled,
  style,
  ...rest
}) {
  const [h, setH] = useState(false);
  const [f, setF] = useState(false);
  return /*#__PURE__*/React.createElement("input", _extends({
    disabled: disabled
  }, rest, {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    onFocus: e => {
      setF(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setF(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      ...base(h, f, invalid),
      height: 36,
      padding: "4px 12px",
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }));
}
/** Multi-line input, same treatment, min-height 96. */
function Textarea({
  invalid,
  disabled,
  style,
  ...rest
}) {
  const [h, setH] = useState(false);
  const [f, setF] = useState(false);
  return /*#__PURE__*/React.createElement("textarea", _extends({
    disabled: disabled
  }, rest, {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      ...base(h, f, invalid),
      minHeight: 96,
      padding: "8px 12px",
      resize: "vertical",
      lineHeight: 1.5,
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }));
}
/** Form label — 14px/500. */
function Label({
  children,
  htmlFor,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1,
      color: "var(--foreground)",
      userSelect: "none",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Input, Textarea, Label });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
const {
  useState,
  useRef,
  useEffect
} = React;
/** Select trigger + popover list (shadcn select look). */
function Select({
  options = [],
  value,
  onChange,
  placeholder = "Select…",
  width = 220
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const f = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", f);
    return () => document.removeEventListener("mousedown", f);
  }, []);
  const norm = options.map(o => typeof o === "string" ? {
    value: o,
    label: o
  } : o);
  const cur = norm.find(o => o.value === value);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative",
      width
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(!open),
    style: {
      width: "100%",
      height: 36,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      padding: "0 12px",
      borderRadius: 12,
      border: "1px solid " + (open ? "var(--border-accent)" : "var(--input)"),
      background: "var(--card)",
      boxShadow: open ? "0 0 0 3px rgba(104,186,217,0.22)" : "var(--shadow-xs)",
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      color: cur ? "var(--foreground)" : "var(--text-faint)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, cur ? cur.label : placeholder), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16,
    color: "var(--muted-foreground)",
    style: {
      opacity: 0.6
    }
  })), open ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 40,
      left: 0,
      right: 0,
      zIndex: 50,
      background: "var(--popover)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      boxShadow: "var(--shadow-md)",
      padding: 4
    }
  }, norm.map(o => /*#__PURE__*/React.createElement("div", {
    key: o.value,
    onClick: () => {
      onChange && onChange(o.value);
      setOpen(false);
    },
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "6px 8px",
      borderRadius: 8,
      fontSize: 14,
      cursor: "pointer",
      color: "var(--foreground)",
      background: o.value === value ? "var(--accent)" : "transparent"
    },
    onMouseEnter: e => e.currentTarget.style.background = "var(--accent)",
    onMouseLeave: e => e.currentTarget.style.background = o.value === value ? "var(--accent)" : "transparent"
  }, o.label, o.value === value ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 16
  }) : null))) : null);
}
/** Range slider — 6px track, navy range, white thumb. */
function Slider({
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  width = 240
}) {
  const pct = (value - min) / (max - min) * 100;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width,
      height: 16,
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      height: 6,
      borderRadius: 9999,
      background: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + "%",
      height: "100%",
      borderRadius: 9999,
      background: "var(--primary)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "calc(" + pct + "% - 8px)",
      width: 16,
      height: 16,
      borderRadius: 9999,
      background: "#fff",
      border: "1px solid var(--primary)",
      boxShadow: "var(--shadow-sm)"
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange && onChange(+e.target.value),
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      opacity: 0,
      cursor: "pointer",
      margin: 0
    }
  }));
}
Object.assign(__ds_scope, { Select, Slider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/layout/Accordion.jsx
try { (() => {
const {
  useState
} = React;
/** FAQ accordion — each item a 20px-radius white card with a rotating plus chip. */
function Accordion({
  items = [],
  defaultOpen = 0
}) {
  const [open, setOpen] = useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, items.map((it, i) => {
    const on = open === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderRadius: 20,
        border: "1px solid var(--border-subtle)",
        background: "var(--card)",
        padding: "8px 24px"
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => setOpen(on ? null : i),
      "aria-expanded": on,
      style: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        padding: "16px 0",
        background: "none",
        border: 0,
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "var(--font-display)",
        fontSize: 17,
        fontWeight: 500,
        letterSpacing: "-0.02em",
        color: "var(--foreground)"
      }
    }, it.q, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "grid",
        placeItems: "center",
        width: 32,
        height: 32,
        flex: "none",
        borderRadius: 10,
        background: "var(--surface-hover)",
        color: "var(--steel-600)",
        transform: on ? "rotate(45deg)" : "none",
        transition: "transform 200ms"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "plus",
      size: 18
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateRows: on ? "1fr" : "0fr",
        transition: "grid-template-rows 300ms ease-in-out"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        maxWidth: 680,
        paddingBottom: 16,
        fontSize: 15,
        lineHeight: 1.625,
        color: "var(--text-body)"
      }
    }, it.a))));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/layout/Card.jsx
try { (() => {
/** Octogle card — white, 20px radius, subtle hairline; depth from the border, not shadow. */
function Card({
  title,
  description,
  action,
  children,
  padding = 24,
  interactive = false,
  style
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      background: "var(--card)",
      color: "var(--card-foreground)",
      borderRadius: 20,
      border: "1px solid " + (interactive && h ? "var(--border-accent)" : "var(--border-subtle)"),
      display: "flex",
      flexDirection: "column",
      gap: 24,
      padding,
      transition: "all 300ms var(--ease-out)",
      transform: interactive && h ? "translateY(-4px)" : "none",
      boxShadow: interactive && h ? "var(--shadow-card-hover)" : "none",
      ...style
    }
  }, title || action ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 16,
      lineHeight: 1
    }
  }, title) : null, description ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--muted-foreground)"
    }
  }, description) : null), action) : null, children);
}
/** Marketing section heading — Gilroy eyebrow, 48px/500 display H2, 17px lead. */
function SectionHeader({
  eyebrow,
  title,
  description,
  aside,
  align = "start"
}) {
  const c = align === "center";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-end",
      justifyContent: c ? "center" : "space-between",
      gap: 32,
      textAlign: c ? "center" : "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      maxWidth: 720,
      alignItems: c ? "center" : "flex-start"
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("span", {
    className: "ogl-eyebrow"
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "clamp(30px,4vw,48px)",
      fontWeight: 500,
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
      color: "var(--foreground)",
      margin: 0
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.625,
      color: "var(--text-body)",
      margin: 0
    }
  }, description) : null), aside ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "var(--text-faint)"
    }
  }, aside) : null);
}
/** 1px hairline. */
function Separator({
  vertical = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--border)",
      flex: "none",
      ...(vertical ? {
        width: 1,
        alignSelf: "stretch"
      } : {
        height: 1,
        width: "100%"
      }),
      ...style
    }
  });
}
/** Loading placeholder. */
function Skeleton({
  width = "100%",
  height = 16,
  radius = 10,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: radius,
      background: "var(--accent)",
      animation: "ogl-pulse 2s cubic-bezier(.4,0,.6,1) infinite",
      ...style
    }
  });
}
Object.assign(__ds_scope, { Card, SectionHeader, Separator, Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Card.jsx", error: String((e && e.message) || e) }); }

// components/layout/Tabs.jsx
try { (() => {
/** Segmented tabs. variant "default" = muted track w/ white active; "line" = underline; "pill" = console sort toggle. */
function Tabs({
  items = [],
  value,
  onChange,
  variant = "default"
}) {
  if (variant === "pill") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "inline-flex",
        gap: 2,
        borderRadius: 9999,
        border: "1px solid var(--border)",
        background: "rgba(255,255,255,0.6)",
        padding: 2
      }
    }, items.map(it => {
      const v = it.value || it;
      const on = v === value;
      return /*#__PURE__*/React.createElement("button", {
        key: v,
        type: "button",
        onClick: () => onChange && onChange(v),
        style: {
          border: 0,
          cursor: "pointer",
          borderRadius: 9999,
          padding: "4px 10px",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          background: on ? "var(--pulse)" : "transparent",
          color: on ? "var(--pulse-foreground)" : "var(--muted-foreground)"
        }
      }, it.label || it);
    }));
  }
  const line = variant === "line";
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: "inline-flex",
      alignItems: "center",
      height: 36,
      padding: 3,
      gap: line ? 4 : 0,
      borderRadius: line ? 0 : 12,
      background: line ? "transparent" : "var(--muted)"
    }
  }, items.map(it => {
    const v = it.value || it;
    const on = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      type: "button",
      onClick: () => onChange && onChange(v),
      style: {
        position: "relative",
        height: "calc(100% - 1px)",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 10,
        border: "1px solid transparent",
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
        whiteSpace: "nowrap",
        background: on && !line ? "var(--background)" : "transparent",
        color: on ? "var(--foreground)" : "rgba(16,15,47,0.6)",
        boxShadow: on && !line ? "var(--shadow-xs)" : "none"
      }
    }, it.label || it, line && on ? /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -5,
        height: 2,
        background: "var(--foreground)"
      }
    }) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/talent/CandidateRow.jsx
try { (() => {
const {
  useState
} = React;
/** Discover-console list row — avatar, name/role/country, 3 stack tags, vetting ring, mono rate. */
function CandidateRow({
  avatar,
  name,
  role,
  country,
  skills = [],
  score,
  rate,
  online,
  active,
  saved,
  onClick,
  onSave
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: 12,
      cursor: "pointer",
      padding: "14px 16px 14px 18px",
      borderBottom: "1px solid var(--border)",
      borderLeft: "3px solid " + (active ? "var(--pulse)" : "transparent"),
      background: active ? "var(--pulse-wash)" : h ? "rgba(16,15,47,0.04)" : "transparent",
      transition: "background 140ms"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    src: avatar,
    name: name,
    size: 48,
    online: online,
    ring: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 15,
      fontWeight: 600,
      color: active ? "var(--sky-600)" : "var(--foreground)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2,
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 12,
      color: "var(--muted-foreground)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--sky-600)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, role), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.5
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: "nowrap"
    }
  }, country)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }
  }, skills.slice(0, 3).map(s => /*#__PURE__*/React.createElement(__ds_scope.TechTag, {
    key: s,
    name: s,
    shape: "round"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 6,
      flex: "none"
    }
  }, score != null ? /*#__PURE__*/React.createElement(__ds_scope.Ring, {
    value: score
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      fontWeight: 600
    }
  }, "$", rate, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 400,
      color: "var(--muted-foreground)"
    }
  }, "/hr"))), saved || h ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onSave && onSave();
    },
    style: {
      position: "absolute",
      right: 12,
      top: 10,
      padding: 2,
      background: "none",
      border: 0,
      cursor: "pointer",
      color: saved ? "var(--pulse)" : "var(--muted-foreground)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "bookmark",
    size: 14,
    fill: saved ? "var(--pulse)" : "none"
  })) : null);
}
Object.assign(__ds_scope, { CandidateRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/talent/CandidateRow.jsx", error: String((e && e.message) || e) }); }

// components/talent/ProfileCard.jsx
try { (() => {
const {
  useState
} = React;
/** Hero carousel profile card — 4:5 portrait, availability pill, location scrim, AI-native badge, stack tags. */
function ProfileCard({
  image,
  name,
  role,
  location,
  flag = "in",
  stacks = [],
  available = true,
  aiCertified = true,
  style
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%",
      overflow: "hidden",
      borderRadius: 24,
      cursor: "pointer",
      background: "var(--card)",
      border: "1px solid " + (h ? "var(--border-accent)" : "var(--border-subtle)"),
      transform: h ? "translateY(-4px)" : "none",
      boxShadow: h ? "var(--shadow-card-hover)" : "none",
      transition: "all 300ms ease-out",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "4/5",
      width: "100%",
      overflow: "hidden",
      background: "var(--ice-200)"
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transform: h ? "scale(1.05)" : "none",
      transition: "transform 500ms ease-out"
    }
  }) : null, available ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 12,
      top: 12,
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      borderRadius: 9999,
      background: "rgba(255,255,255,0.85)",
      padding: "4px 10px",
      backdropFilter: "blur(12px)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 9999,
      background: "var(--green-500)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: "var(--navy-900)"
    }
  }, "Available")) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "flex-end",
      padding: "40px 12px 12px",
      background: "linear-gradient(to top,rgba(0,0,0,0.55),transparent)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://flagcdn.com/w20/" + flag.toLowerCase() + ".png",
    alt: "",
    style: {
      height: 10,
      width: "auto",
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: "#fff"
    }
  }, location)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      gap: 16,
      padding: 20,
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      minWidth: 0,
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: "-0.02em",
      color: "var(--foreground)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      color: "var(--text-muted)"
    }
  }, role)), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      display: "inline-grid",
      placeItems: "center",
      width: 36,
      height: 36,
      flex: "none",
      borderRadius: 9999,
      border: "1px solid " + (h ? "transparent" : "var(--border-default)"),
      background: h ? "var(--navy-950)" : "transparent",
      color: h ? "#fff" : "var(--foreground)",
      transition: "all 300ms"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 16,
    style: {
      transform: h ? "translateX(2px)" : "none",
      transition: "transform 300ms"
    }
  }))), aiCertified ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: "fit-content",
      alignItems: "center",
      gap: 6,
      borderRadius: 9999,
      background: "rgba(104,186,217,0.16)",
      padding: "4px 10px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "sparkles",
    size: 12,
    color: "var(--steel-600)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: "var(--steel-600)"
    }
  }, "AI Native certified")) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }
  }, stacks.map(s => /*#__PURE__*/React.createElement(__ds_scope.TechTag, {
    key: s,
    name: s
  })))));
}
Object.assign(__ds_scope, { ProfileCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/talent/ProfileCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/company-dashboard/Discover.jsx
try { (() => {
(() => {
  const {
    Button,
    Icon,
    Chip,
    CandidateRow,
    Tabs,
    StatCell,
    ScoreBar,
    Ring,
    techIcon
  } = window.OctogleHireDesignSystem_2b7531;
  const mono = {
    fontFamily: "var(--font-mono)",
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  };
  const EXAMPLES = ["Senior React + TypeScript engineer, US overlap, under $80/hr", "ML engineer for RAG & agents, PyTorch, available now", "Staff platform engineer — Kubernetes, AWS"];
  const STACKS = ["React", "TypeScript", "Node.js", "Python", "Go", "AWS", "Next.js", "PyTorch", "Kubernetes", "PostgreSQL"];
  function parse(t) {
    const s = " " + t.toLowerCase() + " ";
    const stacks = STACKS.filter(x => s.includes(x.toLowerCase()));
    let sen = null;
    if (/staff|lead|principal/.test(s)) sen = "Staff / Lead";else if (/senior|sr /.test(s)) sen = "Senior";
    const m = s.match(/under\s*\$?(\d{2,3})/);
    const budget = m ? +m[1] : null;
    const avail = /available|now|asap/.test(s);
    return {
      stacks,
      sen,
      budget,
      avail,
      active: !!(stacks.length || sen || budget || avail)
    };
  }
  function match(d, c) {
    if (!c.active) return true;
    const n = d.skills.map(x => x[0]);
    if (c.stacks.length && !c.stacks.every(x => n.includes(x))) return false;
    if (c.sen === "Senior" && d.years < 6) return false;
    if (c.sen === "Staff / Lead" && d.years < 9) return false;
    if (c.budget && d.rate > c.budget) return false;
    if (c.avail && !d.online) return false;
    return true;
  }
  function CommandBar({
    crit,
    onSubmit,
    onClear,
    count,
    total
  }) {
    const [text, setText] = React.useState("");
    return /*#__PURE__*/React.createElement("div", {
      style: {
        borderBottom: "1px solid var(--border)",
        background: "linear-gradient(to bottom,rgba(102,184,214,0.07),var(--background))",
        padding: "22px 28px 20px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-grid",
        placeItems: "center",
        width: 26,
        height: 26,
        borderRadius: 9999,
        background: "rgba(102,184,214,0.16)",
        color: "var(--pulse)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sparkles",
      size: 14
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        ...mono,
        fontSize: 11,
        color: "var(--sky-600)"
      }
    }, "Octogle talent search \xB7 1,000+ vetted engineers")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        flex: 1,
        display: "flex",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sparkles",
      size: 18,
      color: "var(--pulse)",
      style: {
        position: "absolute",
        left: 18
      }
    }), /*#__PURE__*/React.createElement("input", {
      value: text,
      onChange: e => setText(e.target.value),
      onKeyDown: e => e.key === "Enter" && onSubmit(text),
      placeholder: "Describe who you need to hire\u2026",
      style: {
        height: 56,
        width: "100%",
        borderRadius: 9999,
        border: "1px solid " + (crit.active ? "rgba(102,184,214,0.45)" : "var(--border)"),
        background: "rgba(255,255,255,0.8)",
        padding: "0 20px 0 48px",
        fontSize: 17,
        letterSpacing: "-0.01em",
        outline: "none",
        fontFamily: "var(--font-sans)",
        color: "var(--foreground)"
      }
    })), /*#__PURE__*/React.createElement(Button, {
      pill: true,
      iconLeft: "sparkles",
      onClick: () => onSubmit(text),
      style: {
        height: 56,
        padding: "0 24px",
        fontSize: 13
      }
    }, "Search")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        minHeight: 30,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 10
      }
    }, crit.active ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      style: {
        ...mono,
        fontSize: 10,
        color: "var(--muted-foreground)"
      }
    }, "Filtering on"), crit.stacks.map(s => /*#__PURE__*/React.createElement(Chip, {
      key: s,
      icon: techIcon(s)
    }, s)), crit.sen ? /*#__PURE__*/React.createElement(Chip, null, crit.sen) : null, crit.budget ? /*#__PURE__*/React.createElement(Chip, null, "\u2264 $", crit.budget, "/hr") : null, crit.avail ? /*#__PURE__*/React.createElement(Chip, null, "Available now") : null, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setText("");
        onClear();
      },
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12.5,
        color: "var(--muted-foreground)",
        background: "none",
        border: 0,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 14
    }), " Clear"), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        ...mono,
        fontSize: 10,
        color: "var(--sky-600)"
      }
    }, count, " of ", total, " match")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      style: {
        ...mono,
        fontSize: 10,
        color: "var(--muted-foreground)"
      }
    }, "Try"), EXAMPLES.map(ex => /*#__PURE__*/React.createElement("button", {
      key: ex,
      onClick: () => {
        setText(ex);
        onSubmit(ex);
      },
      style: {
        borderRadius: 9999,
        border: "1px dashed var(--border-strong)",
        background: "none",
        padding: "6px 12px",
        fontSize: 12.5,
        color: "var(--muted-foreground)",
        cursor: "pointer",
        fontFamily: "var(--font-sans)"
      }
    }, ex)))));
  }
  function Section({
    eyebrow,
    title,
    first,
    children
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        padding: "20px 0",
        borderTop: first ? "none" : "1px solid var(--border)"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "0 0 6px",
        ...mono,
        fontSize: 9.5,
        color: "var(--sky-600)"
      }
    }, eyebrow), /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: "0 0 16px",
        fontFamily: "var(--font-sans)",
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: "-0.01em"
      }
    }, title), children);
  }
  function DetailPane({
    d,
    saved,
    onSave,
    requested,
    onRequest
  }) {
    const first = d.name.split(" ")[0];
    const local = Math.round(d.rate * 2.2);
    const save = Math.round((local - d.rate) / local * 100);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        overflowY: "auto",
        background: "var(--background)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        borderBottom: "1px solid var(--border)",
        background: "linear-gradient(135deg,rgba(102,184,214,0.08),var(--card))",
        padding: "28px 32px 24px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        width: 132,
        flex: "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        aspectRatio: "4/5",
        overflow: "hidden",
        borderRadius: 16,
        border: "1px solid var(--border)",
        background: "linear-gradient(135deg,#1b2540,#0c1120)"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: d.avatar,
      alt: "",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    })), d.online ? /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 10,
        top: 10,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        borderRadius: 9999,
        border: "1px solid rgba(255,255,255,0.2)",
        background: "rgba(0,0,0,0.5)",
        padding: "4px 8px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: 9,
        background: "#34d399"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        ...mono,
        fontSize: 8,
        color: "#fff"
      }
    }, "Available")) : null), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 240,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        borderRadius: 9999,
        border: "1px solid var(--pulse-border)",
        background: "var(--pulse-wash)",
        padding: "2px 10px",
        fontSize: 11,
        color: "var(--sky-600)",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "shield-check",
      size: 12
    }), " Gauntlet ", d.gauntlet), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: 27,
        fontWeight: 600,
        letterSpacing: "-0.02em"
      }
    }, d.name), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "2px 0 0",
        fontSize: 15,
        fontWeight: 500,
        color: "var(--sky-600)"
      }
    }, d.role), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        display: "flex",
        gap: 14,
        fontSize: 13,
        color: "var(--muted-foreground)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "map-pin",
      size: 14
    }), " ", d.location), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "globe",
      size: 14
    }), " ", d.overlap))), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 252,
        flex: "none",
        borderRadius: 16,
        border: "1px solid rgba(102,184,214,0.3)",
        background: "rgba(255,255,255,0.7)",
        padding: 20
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        ...mono,
        fontSize: 9,
        color: "var(--sky-600)"
      }
    }, "Engagement rate"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6,
        display: "flex",
        alignItems: "baseline",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 30,
        fontWeight: 700,
        lineHeight: 1
      }
    }, "$", d.rate), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "var(--muted-foreground)"
      }
    }, "/hr")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4,
        fontSize: 12,
        color: "var(--muted-foreground)"
      }
    }, "\u2248 $", d.monthly.toLocaleString(), "/mo \xB7 full-time"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        borderRadius: 9999,
        background: "rgba(52,211,153,0.15)",
        padding: "4px 10px",
        ...mono,
        fontSize: 9.5,
        color: "#10b981"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trending-up",
      size: 12
    }), " ", save, "% under local"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Button, {
      pill: true,
      iconLeft: "arrow-right",
      disabled: requested,
      onClick: onRequest,
      style: {
        height: 40,
        width: "100%"
      }
    }, requested ? "Interview requested" : "Request interview"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      pill: true,
      onClick: onSave,
      style: {
        height: 36,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "bookmark",
      size: 14,
      fill: saved ? "currentColor" : "none"
    }), " ", saved ? "Saved" : "Save"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      pill: true,
      iconLeft: "message-square",
      style: {
        height: 36,
        flex: 1
      }
    }, "Chat"))))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(96px,1fr))",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(StatCell, {
      icon: "star",
      value: d.rating,
      label: "Rating"
    }), /*#__PURE__*/React.createElement(StatCell, {
      icon: "briefcase",
      value: d.projects,
      label: "Projects"
    }), /*#__PURE__*/React.createElement(StatCell, {
      icon: "clock",
      value: d.years + "y",
      label: "Experience"
    }), /*#__PURE__*/React.createElement(StatCell, {
      icon: "zap",
      value: d.resp,
      label: "Responds"
    }), /*#__PURE__*/React.createElement(StatCell, {
      icon: "repeat",
      value: d.repeat + "%",
      label: "Repeat hire"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 32px 40px"
      }
    }, /*#__PURE__*/React.createElement(Section, {
      eyebrow: "About",
      title: "About " + first,
      first: true
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 14.5,
        lineHeight: 1.625,
        color: "rgba(16,15,47,0.9)"
      }
    }, d.about)), /*#__PURE__*/React.createElement(Section, {
      eyebrow: "The Octogle Gauntlet",
      title: "5-stage AI vetting"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Ring, {
      value: d.gauntlet,
      size: 64,
      stroke: 6,
      tone: "var(--pulse)"
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 13,
        lineHeight: 1.625,
        color: "var(--muted-foreground)"
      }
    }, "Cleared the same five-stage gauntlet every OctogleHire engineer faces \u2014 a pipeline with a ~4% pass rate. ", first, " ranks ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "var(--foreground)"
      }
    }, d.pct.toLowerCase()), ".")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px 24px"
      }
    }, window.GAUNTLET.map((g, i) => /*#__PURE__*/React.createElement(ScoreBar, {
      key: g,
      label: g,
      value: d.scores[i],
      tag: d.scores[i]
    })))), /*#__PURE__*/React.createElement(Section, {
      eyebrow: "Verified proficiency",
      title: "Tech stack"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "14px 24px"
      }
    }, d.skills.map(([n, l]) => /*#__PURE__*/React.createElement(ScoreBar, {
      key: n,
      label: n,
      value: l,
      icon: techIcon(n),
      tag: l >= 90 ? "Expert" : l >= 80 ? "Advanced" : "Proficient"
    })))), /*#__PURE__*/React.createElement(Section, {
      eyebrow: "Career",
      title: "Experience"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        paddingLeft: 22
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 4,
        bottom: 4,
        left: 5,
        width: 2,
        background: "var(--border)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 18
      }
    }, d.work.map(([r, c, dur, desc], i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: -22,
        top: 4,
        width: 12,
        height: 12,
        borderRadius: 9,
        border: "2px solid " + (i === 0 ? "var(--pulse)" : "var(--border)"),
        background: "var(--card)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        alignItems: "baseline"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 600
      }
    }, r, " \xB7 ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--sky-600)"
      }
    }, c)), /*#__PURE__*/React.createElement("span", {
      style: {
        ...mono,
        fontSize: 9.5,
        color: "var(--muted-foreground)"
      }
    }, dur)), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "4px 0 0",
        fontSize: 13,
        lineHeight: 1.625,
        color: "var(--muted-foreground)"
      }
    }, desc))))))));
  }
  function Discover({
    saved,
    toggleSave,
    onlySaved
  }) {
    const [crit, setCrit] = React.useState(parse(""));
    const [sort, setSort] = React.useState("vetting");
    const [sel, setSel] = React.useState("1");
    const [req, setReq] = React.useState({});
    const rows = React.useMemo(() => {
      let r = window.DEVS.filter(d => match(d, crit));
      if (onlySaved) r = r.filter(d => saved.includes(d.id));
      const by = {
        vetting: (a, b) => b.gauntlet - a.gauntlet,
        rate: (a, b) => a.rate - b.rate,
        years: (a, b) => b.years - a.years
      };
      return [...r].sort(by[sort]);
    }, [crit, sort, onlySaved, saved]);
    const cur = rows.find(r => r.id === sel) || rows[0];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0
      }
    }, onlySaved ? null : /*#__PURE__*/React.createElement(CommandBar, {
      crit: crit,
      onSubmit: t => setCrit(parse(t)),
      onClear: () => setCrit(parse("")),
      count: rows.length,
      total: window.DEVS.length
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "408px 1fr",
        flex: 1,
        minHeight: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        borderRight: "1px solid var(--border)",
        background: "rgba(255,255,255,0.3)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--border)",
        padding: "14px 18px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        ...mono,
        fontSize: 10.5,
        color: "var(--muted-foreground)"
      }
    }, rows.length, " engineer", rows.length === 1 ? "" : "s", onlySaved ? " saved" : ""), /*#__PURE__*/React.createElement(Tabs, {
      variant: "pill",
      items: [{
        value: "vetting",
        label: "Vetting"
      }, {
        value: "rate",
        label: "Rate"
      }, {
        value: "years",
        label: "Exp"
      }],
      value: sort,
      onChange: setSort
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: "auto"
      }
    }, rows.length ? rows.map(d => /*#__PURE__*/React.createElement(CandidateRow, {
      key: d.id,
      name: d.name,
      role: d.role,
      country: d.location.split(",").pop().trim(),
      avatar: d.avatar,
      skills: d.skills.map(s => s[0]),
      score: d.gauntlet,
      rate: d.rate,
      online: d.online,
      active: cur && d.id === cur.id,
      saved: saved.includes(d.id),
      onClick: () => setSel(d.id),
      onSave: () => toggleSave(d.id)
    })) : /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "64px 24px",
        textAlign: "center",
        fontSize: 14,
        color: "var(--muted-foreground)"
      }
    }, onlySaved ? "No saved engineers yet." : "No engineers match this search."))), cur ? /*#__PURE__*/React.createElement(DetailPane, {
      d: cur,
      saved: saved.includes(cur.id),
      onSave: () => toggleSave(cur.id),
      requested: !!req[cur.id],
      onRequest: () => setReq({
        ...req,
        [cur.id]: true
      })
    }) : /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        placeItems: "center",
        fontSize: 14,
        color: "var(--muted-foreground)"
      }
    }, "Select an engineer to preview.")));
  }
  window.Discover = Discover;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/company-dashboard/Discover.jsx", error: String((e && e.message) || e) }); }

// ui_kits/company-dashboard/Rail.jsx
try { (() => {
(() => {
  const {
    Icon
  } = window.OctogleHireDesignSystem_2b7531;
  const PRIMARY = [["discover", "Discover", "sparkles"], ["roles", "Roles", "target", 3], ["saved", "Saved", "bookmark"], ["hires", "Hires", "users"], ["billing", "Billing", "receipt"]];
  const SECONDARY = [["cands", "Cands", "clipboard-list", 2], ["team", "Team", "users"], ["docs", "Docs", "file-signature", 1], ["setup", "Setup", "settings"]];
  function RailButton({
    id,
    label,
    icon,
    badge,
    active,
    onClick
  }) {
    const [h, setH] = React.useState(false);
    return /*#__PURE__*/React.createElement("button", {
      onClick: () => onClick(id),
      title: label,
      onMouseEnter: () => setH(true),
      onMouseLeave: () => setH(false),
      style: {
        position: "relative",
        display: "flex",
        width: 60,
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        borderRadius: 16,
        padding: "8px 0",
        border: 0,
        cursor: "pointer",
        background: active ? "rgba(102,184,214,0.14)" : h ? "rgba(16,15,47,0.05)" : "transparent",
        color: active ? "var(--pulse)" : h ? "var(--foreground)" : "var(--muted-foreground)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 19
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 8.5,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, label), badge ? /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        right: 10,
        top: 6,
        display: "inline-grid",
        placeItems: "center",
        height: 16,
        minWidth: 16,
        borderRadius: 9999,
        background: "var(--pulse)",
        padding: "0 4px",
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        fontWeight: 500,
        color: "var(--pulse-foreground)"
      }
    }, badge) : null);
  }
  function Rail({
    active,
    onNav,
    savedCount
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        height: "100%",
        width: 78,
        flex: "none",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        borderRight: "1px solid var(--border)",
        background: "rgba(255,255,255,0.55)",
        padding: "14px 0"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo/octogle-icon-light.svg",
      alt: "OctogleHire",
      style: {
        width: 30,
        height: 30,
        marginBottom: 12,
        objectFit: "contain"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        width: "100%",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        gap: 4
      }
    }, PRIMARY.map(([id, l, i, b]) => /*#__PURE__*/React.createElement(RailButton, {
      key: id,
      id: id,
      label: l,
      icon: i,
      badge: id === "saved" ? savedCount : b,
      active: active === id,
      onClick: onNav
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        margin: "4px 0",
        height: 1,
        width: 32,
        background: "var(--border)"
      }
    }), SECONDARY.map(([id, l, i, b]) => /*#__PURE__*/React.createElement(RailButton, {
      key: id,
      id: id,
      label: l,
      icon: i,
      badge: b,
      active: active === id,
      onClick: onNav
    }))), /*#__PURE__*/React.createElement("button", {
      style: {
        marginBottom: 10,
        display: "inline-grid",
        placeItems: "center",
        width: 36,
        height: 36,
        borderRadius: 9999,
        border: "1px solid var(--border)",
        background: "none",
        color: "var(--foreground)",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sun",
      size: 16
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-grid",
        placeItems: "center",
        width: 36,
        height: 36,
        borderRadius: 9999,
        background: "linear-gradient(135deg,rgba(102,184,214,0.6),var(--muted))",
        fontSize: 12,
        fontWeight: 600
      }
    }, "AC"));
  }
  window.Rail = Rail;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/company-dashboard/Rail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/company-dashboard/data.js
try { (() => {
window.DEVS = [{
  id: "1",
  name: "Priya Sharma",
  role: "Senior Full-Stack",
  location: "Bengaluru, India",
  avatar: "../../assets/people/sales-reps/rep-1.webp",
  online: true,
  skills: [["React", 94], ["TypeScript", 91], ["Node.js", 86], ["PostgreSQL", 80]],
  gauntlet: 92,
  pct: "Top 3%",
  scores: [91, 94, 88, 90, 95],
  rate: 34,
  monthly: 5440,
  years: 8,
  rating: 4.9,
  projects: 38,
  resp: "<2h",
  repeat: 94,
  overlap: "4h US overlap",
  about: "Full-stack engineer who has spent the last six years shipping B2B SaaS. Comfortable owning a feature from schema to UI, and uses Cursor and Claude Code daily for refactors and test generation.",
  work: [["Tech Lead", "Freshworks", "2021 — now", "Led the migration of the billing dashboard to Next.js and cut p95 load time by 40%."], ["Senior Engineer", "Razorpay", "2018 — 2021", "Built merchant onboarding flows in React and Node.js."]]
}, {
  id: "2",
  name: "Rohan Mehta",
  role: "Platform Engineer",
  location: "Pune, India",
  avatar: "../../assets/people/anil.jpg",
  online: true,
  skills: [["Go", 92], ["Kubernetes", 90], ["AWS", 88]],
  gauntlet: 88,
  pct: "Top 6%",
  scores: [86, 90, 84, 92, 88],
  rate: 36,
  monthly: 5760,
  years: 9,
  rating: 4.8,
  projects: 27,
  resp: "<4h",
  repeat: 90,
  overlap: "5h UK overlap",
  about: "Platform engineer focused on Kubernetes, Terraform and developer experience. Has run on-call for 200-service estates.",
  work: [["Staff Engineer", "Postman", "2020 — now", "Owns the internal deploy platform."]]
}, {
  id: "3",
  name: "Ana Ribeiro",
  role: "Backend Engineer",
  location: "São Paulo, Brazil",
  avatar: "../../assets/people/sales-reps/rep-3.webp",
  online: false,
  skills: [["Python", 90], ["PostgreSQL", 86], ["AWS", 78]],
  gauntlet: 81,
  pct: "Top 10%",
  scores: [80, 84, 78, 82, 81],
  rate: 31,
  monthly: 4960,
  years: 6,
  rating: 4.7,
  projects: 19,
  resp: "<6h",
  repeat: 88,
  overlap: "6h US overlap",
  about: "Backend engineer building data-heavy APIs in Python. Strong on query performance and observability.",
  work: [["Senior Engineer", "Nubank", "2021 — now", "Payments reconciliation services."]]
}, {
  id: "4",
  name: "Vikram Iyer",
  role: "AI / ML Engineer",
  location: "Chennai, India",
  avatar: "../../assets/people/stergios.jpg",
  online: true,
  skills: [["Python", 95], ["PyTorch", 90], ["TypeScript", 74]],
  gauntlet: 90,
  pct: "Top 4%",
  scores: [93, 88, 90, 86, 92],
  rate: 38,
  monthly: 6080,
  years: 7,
  rating: 4.9,
  projects: 22,
  resp: "<2h",
  repeat: 96,
  overlap: "4h US overlap",
  about: "Ships RAG and agentic systems in production — retrieval evaluation, prompt-driven tests and cost control.",
  work: [["ML Lead", "Sarvam AI", "2022 — now", "Built the retrieval and evaluation stack for enterprise assistants."]]
}, {
  id: "5",
  name: "Karthik Nair",
  role: "Full-Stack",
  location: "Bengaluru, India",
  avatar: "../../assets/people/dimitris.jpg",
  online: false,
  skills: [["Next.js", 88], ["TypeScript", 86], ["PostgreSQL", 76]],
  gauntlet: 74,
  pct: "Top 15%",
  scores: [72, 76, 74, 70, 78],
  rate: 30,
  monthly: 4800,
  years: 5,
  rating: 4.6,
  projects: 14,
  resp: "<8h",
  repeat: 85,
  overlap: "3h UK overlap",
  about: "Product-minded full-stack engineer.",
  work: [["Engineer", "Zoho", "2020 — now", "CRM front-end features."]]
}];
window.GAUNTLET = ["Application screen", "Technical assessment", "System design", "Communication", "References"];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/company-dashboard/data.js", error: String((e && e.message) || e) }); }

// ui_kits/marketing/BriefDialog.jsx
try { (() => {
(() => {
  const {
    Dialog,
    Button,
    Input,
    Label,
    Select,
    Textarea
  } = window.OctogleHireDesignSystem_2b7531;
  function BriefDialog({
    open,
    onClose
  }) {
    const [sent, setSent] = React.useState(false);
    const [lvl, setLvl] = React.useState("Senior");
    React.useEffect(() => {
      if (open) setSent(false);
    }, [open]);
    return /*#__PURE__*/React.createElement(Dialog, {
      open: open,
      onClose: onClose,
      width: 480,
      title: sent ? "You're booked in." : "Tell us the role",
      description: sent ? "An Octogle engineer will reach out within one business day. Your shortlist follows within 48 hours of the call." : "Twenty minutes with an Octogle engineer, then 3–5 hand-picked profiles.",
      footer: sent ? /*#__PURE__*/React.createElement(Button, {
        onClick: onClose
      }, "Done") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "outline",
        onClick: onClose
      }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
        chip: true,
        onClick: () => setSent(true)
      }, "Book a technical call"))
    }, sent ? null : /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Label, null, "Work email"), /*#__PURE__*/React.createElement(Input, {
      placeholder: "you@company.com"
    }), /*#__PURE__*/React.createElement(Label, null, "Seniority"), /*#__PURE__*/React.createElement(Select, {
      options: ["Mid-level", "Senior", "Staff / Lead"],
      value: lvl,
      onChange: setLvl,
      width: "100%"
    }), /*#__PURE__*/React.createElement(Label, null, "What are you building?"), /*#__PURE__*/React.createElement(Textarea, {
      placeholder: "React + TypeScript, US overlap, starting next month\u2026"
    })));
  }
  window.BriefDialog = BriefDialog;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/BriefDialog.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Hero.jsx
try { (() => {
(() => {
  const {
    Button,
    ProfileCard
  } = window.OctogleHireDesignSystem_2b7531;
  const P = "../../assets/people/";
  const profiles = [{
    image: P + "sales-reps/rep-1.webp",
    name: "Priya Sharma",
    role: "Senior Full-Stack",
    location: "Bengaluru",
    flag: "IN",
    stacks: ["React", "TypeScript"],
    available: true
  }, {
    image: P + "anil.jpg",
    name: "Arjun Kumar",
    role: "Backend Engineer",
    location: "Mumbai",
    flag: "IN",
    stacks: ["Python", "PostgreSQL"],
    available: true
  }, {
    image: P + "sales-reps/rep-3.webp",
    name: "Ananya Reddy",
    role: "Frontend Engineer",
    location: "Hyderabad",
    flag: "IN",
    stacks: ["Vue.js", "TypeScript", "Tailwind"],
    available: false
  }, {
    image: P + "stergios.jpg",
    name: "Rohan Mehta",
    role: "Platform Engineer",
    location: "Pune",
    flag: "IN",
    stacks: ["Go", "Kubernetes", "AWS"],
    available: true
  }, {
    image: P + "sales-reps/rep-5.webp",
    name: "Vikram Iyer",
    role: "AI / ML Engineer",
    location: "Chennai",
    flag: "IN",
    stacks: ["Python", "PyTorch"],
    available: true
  }, {
    image: P + "dimitris.jpg",
    name: "Aryan Gupta",
    role: "DevOps Engineer",
    location: "New Delhi",
    flag: "IN",
    stacks: ["AWS", "Docker", "Kubernetes"],
    available: true
  }];
  function IsoRoundel() {
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 64 64",
      fill: "none",
      width: "56",
      height: "56",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "32",
      cy: "32",
      r: "29",
      stroke: "currentColor",
      strokeWidth: "2.5"
    }), /*#__PURE__*/React.createElement("ellipse", {
      cx: "32",
      cy: "32",
      rx: "11",
      ry: "29",
      stroke: "currentColor",
      strokeWidth: "1.4"
    }), /*#__PURE__*/React.createElement("ellipse", {
      cx: "32",
      cy: "32",
      rx: "21.5",
      ry: "29",
      stroke: "currentColor",
      strokeWidth: "1.4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4.4 21.5h55.2M4.4 42.5h55.2M3 32h58",
      stroke: "currentColor",
      strokeWidth: "1.4"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "7",
      y: "24.5",
      width: "50",
      height: "15",
      fill: "#F6FBFB"
    }), /*#__PURE__*/React.createElement("text", {
      x: "32",
      y: "36.4",
      textAnchor: "middle",
      fill: "currentColor",
      style: {
        font: "700 15px var(--font-display)",
        letterSpacing: "0.06em"
      }
    }, "ISO"));
  }
  function TrustRow() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px 40px",
        paddingTop: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 600
      }
    }, "Excellent"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        color: "var(--text-muted)"
      }
    }, "5.0 out of 5"), /*#__PURE__*/React.createElement("img", {
      src: "../../assets/trust/clutch-logo.svg",
      alt: "Clutch",
      style: {
        height: 16
      }
    })), /*#__PURE__*/React.createElement("a", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        color: "var(--foreground)"
      }
    }, /*#__PURE__*/React.createElement(IsoRoundel, null), /*#__PURE__*/React.createElement("span", {
      style: {
        textAlign: "left",
        lineHeight: 1.25
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontSize: 17,
        fontWeight: 600,
        letterSpacing: "-0.01em"
      }
    }, "ISO 27001"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontSize: 17,
        color: "var(--text-muted)"
      }
    }, "Certified"))));
  }
  function Hero({
    onBrief
  }) {
    const [off, setOff] = React.useState(0);
    React.useEffect(() => {
      const id = setInterval(() => setOff(o => (o + 1) % profiles.length), 5000);
      return () => clearInterval(id);
    }, []);
    const list = [...profiles, ...profiles];
    return /*#__PURE__*/React.createElement("section", {
      className: "ogl-field-light",
      style: {
        overflow: "hidden",
        paddingBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ogl-shell",
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
        padding: "96px 24px 0",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "ogl-eyebrow-mono"
    }, "AI-native engineers, vetted in-house"), /*#__PURE__*/React.createElement("h1", {
      className: "ogl-gradient-block",
      style: {
        margin: 0,
        maxWidth: "24ch",
        fontSize: "clamp(38px,5.4vw,68px)",
        fontWeight: 600,
        lineHeight: 1.08,
        letterSpacing: "-0.02em"
      }
    }, "Build long-term engineering teams, without the local price tag"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        maxWidth: "62ch",
        fontSize: 17,
        lineHeight: 1.625,
        color: "var(--text-body)"
      }
    }, "Hire senior engineers who integrate into your team and stay for the long run \u2014 trained on Cursor, Claude Code and agentic workflows, and 40\u201360% below US, UK or Australian rates."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "xl",
      chip: true,
      onClick: onBrief
    }, "Find tech talent"), /*#__PURE__*/React.createElement(Button, {
      size: "xl",
      variant: "secondary"
    }, "Browse engineers")), /*#__PURE__*/React.createElement(TrustRow, null)), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        marginTop: 56,
        paddingBottom: 48,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        transform: "translateX(calc(-" + off + " * 20%))",
        transition: "transform 700ms var(--ease-out)"
      }
    }, list.map((p, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        flex: "0 0 20%",
        paddingLeft: 16,
        padding: "16px 0 16px 16px"
      }
    }, /*#__PURE__*/React.createElement(ProfileCard, p)))), /*#__PURE__*/React.createElement("div", {
      style: {
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        width: 64,
        background: "linear-gradient(to right,var(--ice-100),transparent)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        width: 64,
        background: "linear-gradient(to left,var(--ice-100),transparent)"
      }
    })));
  }
  window.Hero = Hero;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Navbar.jsx
try { (() => {
(() => {
  const {
    Button,
    Icon
  } = window.OctogleHireDesignSystem_2b7531;
  const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";
  const talentCols = [{
    title: "Frontend",
    links: [["React", "react/react-original.svg"], ["Next.js", "nextjs/nextjs-original.svg"], ["Vue.js", "vuejs/vuejs-original.svg"], ["Angular", "angularjs/angularjs-original.svg"], ["TypeScript", "typescript/typescript-original.svg"]]
  }, {
    title: "Backend",
    links: [["Node.js", "nodejs/nodejs-original.svg"], ["Python", "python/python-original.svg"], ["Go", "go/go-original-wordmark.svg"], ["Java", "java/java-original.svg"], ["Rust", "rust/rust-original.svg"], ["Django", "django/django-plain.svg"]]
  }, {
    title: "Mobile",
    links: [["React Native", "react/react-original.svg"], ["Flutter", "flutter/flutter-original.svg"], ["Swift", "swift/swift-original.svg"], ["Kotlin", "kotlin/kotlin-original.svg"]]
  }, {
    title: "DevOps & Cloud",
    links: [["AWS", "amazonwebservices/amazonwebservices-plain-wordmark.svg"], ["Docker", "docker/docker-original.svg"], ["Kubernetes", "kubernetes/kubernetes-original.svg"], ["PostgreSQL", "postgresql/postgresql-original.svg"]]
  }, {
    title: "By Country",
    flags: [["India", "in"], ["Brazil", "br"], ["Poland", "pl"], ["Ukraine", "ua"], ["Argentina", "ar"], ["Philippines", "ph"]]
  }];
  const navLink = {
    display: "inline-flex",
    height: 36,
    alignItems: "center",
    gap: 4,
    padding: "0 10px",
    fontFamily: "var(--font-display)",
    fontSize: 15,
    letterSpacing: "-0.01em",
    color: "rgba(16,15,47,0.8)",
    background: "none",
    border: 0,
    cursor: "pointer",
    whiteSpace: "nowrap"
  };
  function MegaMenu() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 44,
        left: 0,
        width: 1000,
        background: "var(--popover)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        boxShadow: "var(--shadow-md)",
        padding: 20,
        zIndex: 130
      }
    }, /*#__PURE__*/React.createElement("a", {
      style: {
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        gap: 16,
        borderRadius: 16,
        border: "1px solid rgba(102,184,214,0.3)",
        background: "rgba(102,184,214,0.06)",
        padding: 20,
        color: "inherit"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        placeItems: "center",
        width: 48,
        height: 48,
        borderRadius: 12,
        border: "1px solid rgba(102,184,214,0.3)",
        background: "var(--background)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sparkles",
      size: 20,
      strokeWidth: 1.8,
      color: "var(--pulse)"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: "var(--foreground)"
      }
    }, "AI Engineers"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        borderRadius: 9999,
        border: "1px solid rgba(102,184,214,0.3)",
        background: "var(--pulse-wash)",
        padding: "2px 6px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 4,
        height: 4,
        borderRadius: 9,
        background: "var(--pulse)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "var(--pulse)"
      }
    }, "Most in demand"))), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "4px 0 0",
        fontSize: 12,
        color: "var(--muted-foreground)"
      }
    }, "Hire engineers who ship with Cursor, Claude Code, RAG, and agentic workflows \u2014 all certified on the Octogle AI Playbook.")), /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16,
      color: "var(--pulse)"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(5,1fr)",
        gap: "24px 16px"
      }
    }, talentCols.map(c => /*#__PURE__*/React.createElement("div", {
      key: c.title
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        borderBottom: "1px solid var(--border)",
        paddingBottom: 8,
        marginBottom: 8,
        fontSize: 10,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "var(--muted-foreground)"
      }
    }, c.title), (c.links || c.flags).map(([l, p]) => /*#__PURE__*/React.createElement("a", {
      key: l,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "6px 8px",
        borderRadius: 10,
        fontSize: 14,
        color: "var(--muted-foreground)"
      },
      onMouseEnter: e => {
        e.currentTarget.style.background = "var(--muted)";
        e.currentTarget.style.color = "var(--foreground)";
      },
      onMouseLeave: e => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "var(--muted-foreground)";
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        display: "grid",
        placeItems: "center"
      }
    }, c.flags ? /*#__PURE__*/React.createElement("img", {
      src: "https://flagcdn.com/w40/" + p + ".png",
      style: {
        height: 12,
        borderRadius: 2
      }
    }) : /*#__PURE__*/React.createElement("img", {
      src: DEVICON + p,
      style: {
        width: 16,
        height: 16,
        opacity: 0.8
      }
    })), l))))));
  }
  function Navbar({
    onBrief
  }) {
    const [open, setOpen] = React.useState(false);
    const t = React.useRef(null);
    const enter = () => {
      clearTimeout(t.current);
      setOpen(true);
    };
    const leave = () => {
      t.current = setTimeout(() => setOpen(false), 150);
    };
    return /*#__PURE__*/React.createElement("section", {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 120,
        borderBottom: "1px solid rgba(66,110,140,0.12)",
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(18px) saturate(1.5)",
        WebkitBackdropFilter: "blur(18px) saturate(1.5)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ogl-shell",
      style: {
        padding: "14px 24px"
      }
    }, /*#__PURE__*/React.createElement("nav", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24
      }
    }, /*#__PURE__*/React.createElement("a", {
      style: {
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo/octogle-lightmode.svg",
      alt: "OctogleHire",
      style: {
        width: 130,
        height: 30
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative"
      },
      onMouseEnter: enter,
      onMouseLeave: leave
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        ...navLink,
        color: open ? "var(--foreground)" : navLink.color
      }
    }, "Hire Developers ", /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-down",
      size: 12,
      style: {
        transform: open ? "rotate(180deg)" : "none",
        transition: "transform 140ms"
      }
    })), open ? /*#__PURE__*/React.createElement(MegaMenu, null) : null), /*#__PURE__*/React.createElement("button", {
      style: navLink
    }, "Hire Sales ", /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-down",
      size: 12
    })), /*#__PURE__*/React.createElement("a", {
      style: navLink
    }, "Pricing"), /*#__PURE__*/React.createElement("a", {
      style: navLink
    }, "How it works"), /*#__PURE__*/React.createElement("button", {
      style: navLink
    }, "Company ", /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-down",
      size: 12
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        whiteSpace: "nowrap"
      }
    }, /*#__PURE__*/React.createElement("a", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 15,
        letterSpacing: "-0.01em",
        color: "var(--text-body)"
      }
    }, "Apply"), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 1,
        height: 16,
        background: "var(--border-default)"
      }
    }), /*#__PURE__*/React.createElement("a", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 15,
        letterSpacing: "-0.01em",
        color: "var(--foreground)"
      }
    }, "Log in"), /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      pill: true,
      chip: "translucent",
      onClick: onBrief
    }, "Book a technical call")))));
  }
  window.Navbar = Navbar;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Navbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Sections.jsx
try { (() => {
(() => {
  const {
    SectionHeader,
    Accordion,
    Button
  } = window.OctogleHireDesignSystem_2b7531;
  const logos = ["Beekey", "Hireflow", "Corpwise", "Solidus", "SquareLogik", "Unichats", "DNO%20Investments", "thecareapp", "Workchats"];
  function ClientLogos() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        padding: "0 24px 96px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ogl-shell",
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "ogl-eyebrow-mono"
    }, "Teams shipping with Octogle Hire"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        width: "max-content",
        animation: "ogl-scroll-x 40s linear infinite"
      }
    }, [...logos, ...logos].map((l, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        width: 200,
        display: "flex",
        justifyContent: "center",
        padding: "0 28px"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/client-logos/" + l + ".svg",
      alt: "",
      style: {
        height: 24,
        maxWidth: "100%",
        filter: "grayscale(1) invert(1)",
        opacity: 0.6
      }
    })))))));
  }
  const pillars = [{
    image: "../../assets/people/stergios.jpg",
    title: "A core team member, not a freelancer",
    body: "Engineers work on one client at a time — in your repo, your standups, your on-call rotation. We handle contracts, payroll and local employment law across 30+ countries, and you get a single invoice."
  }, {
    image: "../../assets/people/sales-reps/rep-4.webp",
    title: "AI fluency, proven — not claimed",
    body: "Every engineer completes the Octogle AI Playbook: 40+ hours across Cursor and Claude Code, RAG and context engineering, agentic development, and prompt-driven testing. Then they're assessed on when to override the model, not just when to use it."
  }, {
    image: "../../assets/people/anil.jpg",
    title: "Rates that work in both directions",
    body: "One transparent monthly rate, no placement fee and no hidden markup — 40–60% below hiring locally in the US, UK or Australia, and genuinely lucrative for the engineer. That symmetry is why 94% of placements last."
  }];
  function OctogleWay() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        padding: "0 24px 128px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ogl-shell",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 56
      }
    }, /*#__PURE__*/React.createElement(SectionHeader, {
      eyebrow: "The Octogle way",
      title: "A teammate in your standup, not a r\xE9sum\xE9 in your inbox."
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3,minmax(0,1fr))",
        gap: 32
      }
    }, pillars.map(p => /*#__PURE__*/React.createElement("div", {
      key: p.title,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        aspectRatio: "4/5",
        overflow: "hidden",
        borderRadius: 24,
        border: "1px solid var(--border-subtle)",
        background: "var(--ice-200)"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: p.image,
      alt: "",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 24,
        fontWeight: 500,
        letterSpacing: "-0.02em",
        color: "var(--foreground)"
      }
    }, p.title), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 15,
        lineHeight: 1.625,
        color: "var(--text-body)"
      }
    }, p.body)))))));
  }
  const faqs = [{
    q: "How quickly can I hire a developer?",
    a: "You'll receive 3–5 vetted candidate profiles within 48 hours of your demo call. Most companies go from first intro to signed contract in under 5 business days — compared to 6–12 weeks with traditional agencies."
  }, {
    q: "How are developers vetted?",
    a: "Every developer passes a 5-stage process: application screening, stack-specific technical assessment, live system design interview, soft-skills and communication evaluation, and reference checks. From over 25,000 applicants reviewed, only 1,000 have been accepted into our network."
  }, {
    q: 'What does "AI native" actually mean here?',
    a: "Every engineer in our network completes the Octogle AI Playbook — 40+ hours of hands-on training across six modules. They arrive already fluent in the tools that define modern software — not just aware of them."
  }, {
    q: "How much does it cost?",
    a: "OctogleHire developers typically cost 40–60% less than hiring locally in the US, UK, or Australia. There are no upfront fees — you only pay when you hire."
  }, {
    q: "What happens if a developer isn't the right fit?",
    a: "Every placement includes a risk-free replacement guarantee — 14 days on our On-Demand plan and 30 days on our Marketplace plan."
  }];
  function Faq() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        padding: "96px 24px 128px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ogl-shell",
      style: {
        display: "grid",
        gap: 56,
        gridTemplateColumns: "minmax(0,0.8fr) minmax(0,1.2fr)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "ogl-eyebrow"
    }, "Questions"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "clamp(28px,3.4vw,38px)",
        fontWeight: 500,
        lineHeight: 1.15,
        letterSpacing: "-0.02em"
      }
    }, "What every engineering lead asks us.")), /*#__PURE__*/React.createElement(Accordion, {
      items: faqs
    })));
  }
  function CtaBand({
    onBrief
  }) {
    return /*#__PURE__*/React.createElement("section", {
      className: "dark ogl-field-dark",
      style: {
        padding: "128px 24px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ogl-shell",
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        color: "var(--sky-400)"
      }
    }, "No sales call in between"), /*#__PURE__*/React.createElement("h2", {
      style: {
        maxWidth: 900,
        fontSize: "clamp(34px,5vw,60px)",
        fontWeight: 500,
        lineHeight: 1.1,
        letterSpacing: "-0.02em",
        color: "var(--text-strong)"
      }
    }, "Tell us the role. Meet your shortlist in 48 hours."), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        maxWidth: 600,
        fontSize: 17,
        lineHeight: 1.625,
        color: "var(--text-body)"
      }
    }, "Twenty minutes with an Octogle engineer, then 3\u20135 hand-picked profiles. Free to post, and every placement carries a replacement guarantee."), /*#__PURE__*/React.createElement(Button, {
      size: "xl",
      variant: "inverse",
      chip: true,
      onClick: onBrief
    }, "Book a technical call")));
  }
  const cols = [["Platform", ["Pricing", "How it works", "For companies", "Hire SDRs", "For agencies", "Apply to join"]], ["Hire by Technology", ["React developers", "Python developers", "Node.js developers", "TypeScript developers", "Go developers"]], ["Hire by Country", ["Developers in India", "Developers in Brazil", "Developers in Poland", "Developers in Ukraine"]], ["Company", ["About", "Team", "How we vet", "Blog", "Contact"]], ["Compare", ["vs Toptal", "vs Upwork", "vs Turing", "vs Direct hiring"]]];
  function Footer() {
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        borderTop: "1px solid var(--border-subtle)",
        background: "var(--surface-sunken)",
        padding: "64px 24px 32px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ogl-shell",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 56
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        gap: 48
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 320
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo/octogle-lightmode.svg",
      alt: "OctogleHire",
      style: {
        width: 140,
        height: 32,
        marginBottom: 24
      }
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 14,
        lineHeight: 1.5,
        color: "var(--text-muted)"
      }
    }, "Pre-vetted, AI-native engineers contracted through Octogle \u2014 working inside your team, your repo and your standups, across 30+ countries."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 24,
        display: "flex",
        gap: 16
      }
    }, ["iso", "gdpr", "ccpa"].map(b => /*#__PURE__*/React.createElement("img", {
      key: b,
      src: "../../assets/trust/" + b + ".png",
      alt: b,
      style: {
        height: 48,
        filter: "brightness(0)",
        opacity: 0.45
      }
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "40px 48px"
      }
    }, cols.map(([t, ls]) => /*#__PURE__*/React.createElement("div", {
      key: t
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        marginBottom: 16,
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        fontWeight: 400,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        color: "var(--text-faint)"
      }
    }, t), /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, ls.map(l => /*#__PURE__*/React.createElement("li", {
      key: l
    }, /*#__PURE__*/React.createElement("a", {
      style: {
        fontSize: 14,
        color: "var(--text-muted)"
      }
    }, l)))))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        borderTop: "1px solid var(--border-subtle)",
        paddingTop: 24,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--text-faint)"
      }
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Octogle. All rights reserved."), /*#__PURE__*/React.createElement("span", null, "ISO 27001 \xB7 GDPR \xB7 CCPA"))));
  }
  Object.assign(window, {
    ClientLogos,
    OctogleWay,
    Faq,
    CtaBand,
    Footer
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.StatusPill = __ds_scope.StatusPill;

__ds_ns.TechTag = __ds_scope.TechTag;

__ds_ns.StatCell = __ds_scope.StatCell;

__ds_ns.SummaryStat = __ds_scope.SummaryStat;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Progress = __ds_scope.Progress;

__ds_ns.ScoreBar = __ds_scope.ScoreBar;

__ds_ns.Ring = __ds_scope.Ring;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Label = __ds_scope.Label;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Slider = __ds_scope.Slider;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.Separator = __ds_scope.Separator;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.CandidateRow = __ds_scope.CandidateRow;

__ds_ns.ProfileCard = __ds_scope.ProfileCard;

})();
