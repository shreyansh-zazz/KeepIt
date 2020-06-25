# Contributing to KeepIt

In this chaotic world, we try to keep things simple and minimal as much as possible. Keeping that in mind we have the following minimal guidelines to be followed while contributing to KeepIt.

## Basic Rules:
- You cannot directly commit to master or rel-* branches, instead, create a pull request (pr), make sure all ci checks pass, add reviewers, and after review merge.
- We squash commits while merging the pull requests, so at least the final commit message should follow the commit guidelines.

## Commit Guidelines

### Commit Message Format
Each commit message consists of a header, a body and a footer. The header has a special format that includes a type, a scope and a subject:

```md
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
`<type>` must be one of the following:

- **build:** Changes that affect the build system or external dependencies (example - scopes: gulp, broccoli, npm)
- **ci:** Changes to our CI configuration files and scripts (example scopes: Circle,  BrowserStack, SauceLabs)
- **docs:** Documentation only changes
- **feat:** A new feature
- **fix:** A bug fix
- **perf:** A code change that improves performance
- **refactor:** A code change that neither fixes a bug nor adds a feature
- **style:** Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test:** Adding missing tests or correcting existing tests

`<scope>`, and `<body>` are optional.

The `<subject>` should contain a succinct description of the change:
- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

`<footer>` should contain atleast auther's `<sign>` and optionally it can have references to other prs or issues related to it.

`<sign>` format: `Co-authored-by: <NAME> <EMAIL>`

---

Apart from above guidelines, feel free to go crazy otherwise. If you have any doubts or feedback feel free to open an issue.

🍻 Happy Contributing!