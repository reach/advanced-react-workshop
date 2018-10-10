const shell = require("shelljs");

[
  "01-imperative-to-declarative",
  "02-hocs-render-props",
  "03-clone-element",
  "04-context",
  "05-portals",
  "06-wai-aria",
  "07-gsbu",
  "08-gdsfp",
  "09-suspense"
].forEach(dir => {
  shell.cd(`${dir}/exercise`);
  shell.echo(`\nInstalling exercise ${dir}:`);
  shell.exec(`yarn`);
  shell.cd("../..");
});

[
  "01-imperative-to-declarative",
  "02-hocs-render-props",
  "03-clone-element",
  "04-context",
  "05-portals",
  "07-gsbu",
  "08-gdsfp",
  "09-suspense"
].forEach(dir => {
  shell.cd(`${dir}/lecture`);
  shell.echo(`\nInstalling lecture ${dir}:`);
  shell.exec(`yarn`);
  shell.cd("../..");
});
