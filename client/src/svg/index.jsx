export const HTMLIcon = (props) => (
  <img src="/svg/html.svg" alt="HTML" {...props} />
);

export const CSSIcon = (props) => (
  <img src="/svg/css.svg" alt="CSS" {...props} />
);

export const TailwindCSSIcon = (props) => (
  <img src="/svg/tailwindcss.svg" alt="TailwindCSS" {...props} />
);

export const JSIcon = (props) => (
  <img src="/svg/js.svg" alt="JavaScript" {...props} />
);

export const TSIcon = (props) => (
  <img src="/svg/ts.svg" alt="TypeScript" {...props} />
);

export const ReactIcon = (props) => (
  <img src="/svg/react.svg" alt="React" {...props} />
);

export const NodeJSIcon = (props) => (
  <img src="/svg/node-js.svg" alt="Node.js" {...props} />
);

export const ExpressIcon = (props) => (
  <img src="/svg/express.svg" alt="Express" {...props} />
);

export const MongodbIcon = (props) => (
  <img src="/svg/mongodb.svg" alt="MongoDB" {...props} />
);

export const GitIcon = (props) => (
  <img src="/svg/git.svg" alt="Git" {...props} />
);

export const svgIcons = [
  { name: "HTML", component: HTMLIcon },
  { name: "CSS", component: CSSIcon },
  { name: "TailwindCSS", component: TailwindCSSIcon },
  { name: "JavaScript", component: JSIcon },
  { name: "React", component: ReactIcon },
  { name: "TypeScript", component: TSIcon },
  { name: "NodeJS", component: NodeJSIcon },
  { name: "Express", component: ExpressIcon },
  { name: "MongoDB", component: MongodbIcon },
  { name: "Git", component: GitIcon },
];
