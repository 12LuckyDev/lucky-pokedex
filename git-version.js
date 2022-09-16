const fs = require("fs");
const { exec } = require("child_process");

const packageJson = fs.readFileSync("./package.json");
const version = JSON.parse(packageJson).version;

const ADD_COMMAND = "git add .";
const COMMIT_COMMAND = `git commit -a -m "Release version: ${version}"`;
const PUSH_COMMNAD = "git push";

const logError = (e, command) => {
  console.error(`Error durring calling '${command}'`, e);
};

if (version) {
  exec(
    ADD_COMMAND,
    () => {
      exec(
        COMMIT_COMMAND,
        () => {
          exec(
            PUSH_COMMNAD,
            () => {
              console.log("Version pushed to remote");
            },
            (e) => {
              logError(e, PUSH_COMMNAD);
            }
          );
        },
        (e) => {
          logError(e, COMMIT_COMMAND);
        }
      );
    },
    (e) => {
      logError(e, ADD_COMMAND);
    }
  );
}
