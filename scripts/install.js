const shell = require("shelljs");

[
  "01-imperative-to-declarative",
  "02-hocs-render-props",
  "03-context-clone-element",
  "04-portals",
  "05-wai-aria",
  "06-gsbu",
  "07-gdsfp",
  "08-suspense"
].forEach(dir => {
  shell.cd(`${dir}/exercise`);
  shell.echo(`\nInstalling exercise ${dir}:`);
  shell.exec(`yarn`);
  shell.cd("../..");
});

[
  "01-imperative-to-declarative",
  "02-hocs-render-props",
  "03-context-clone-element",
  "04-portals",
  "06-gsbu",
  "07-gdsfp",
  "08-suspense"
].forEach(dir => {
  shell.cd(`${dir}/lecture`);
  shell.echo(`\nInstalling lecture ${dir}:`);
  shell.exec(`yarn`);
  shell.cd("../..");
});
