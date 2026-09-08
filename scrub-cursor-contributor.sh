#!/bin/bash
# Nuclear: delete + recreate public repo so dangling Co-authored-by commits die.
# Requires: gh auth login  (or GH_TOKEN with delete_repo + repo scopes)
set -euo pipefail

OWNER=JKSNS
REPO=JKSNS.github.io
REMOTE_SSH="git@github.com:${OWNER}/${REPO}.git"
PRIV_DIR="$(cd "$(dirname "$0")" && pwd)"
VERSION="${1:-v0.2.2}"
PROJECT=jsos
MSG="init: ${PROJECT} ${VERSION}"

AUTHOR_NAME=JKSNS
AUTHOR_EMAIL=j.stephens27@icloud.com

if ! gh auth status >/dev/null 2>&1; then
  echo "ERROR: gh is not authenticated. Run: gh auth login" >&2
  echo "Need scopes: repo, delete_repo, workflow" >&2
  exit 1
fi

echo "=== Deleting all Actions runs that pin stained SHAs ==="
gh api --paginate "repos/${OWNER}/${REPO}/actions/runs" --jq '.workflow_runs[].id' \
  | while read -r id; do
      echo "delete run $id"
      gh api -X DELETE "repos/${OWNER}/${REPO}/actions/runs/${id}" || true
    done

echo "=== Deleting repo ${OWNER}/${REPO} ==="
gh repo delete "${OWNER}/${REPO}" --yes

echo "=== Recreating public repo ==="
gh repo create "${OWNER}/${REPO}" --public --description "An OS in the browser style portfolio shipped on GitHub Pages."

# Enable pages from Actions later via workflow on push
cd "$PRIV_DIR"
export GIT_AUTHOR_NAME="$AUTHOR_NAME" GIT_AUTHOR_EMAIL="$AUTHOR_EMAIL"
export GIT_COMMITTER_NAME="$AUTHOR_NAME" GIT_COMMITTER_EMAIL="$AUTHOR_EMAIL"
export GIT_AUTHOR_DATE="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"

git branch -D publish-clean 2>/dev/null || true
git checkout --orphan publish-clean
git rm -rf --cached . >/dev/null 2>&1 || true
git add -A
for f in .claude blog-post.md publish.sh scrub-cursor-contributor.sh; do
  git rm -r --cached "$f" 2>/dev/null || true
done
TREE=$(git write-tree)
COMMIT=$(printf '%s\n' "$MSG" | git commit-tree "$TREE")
git reset --hard "$COMMIT"

git remote remove public 2>/dev/null || true
git remote add public "$REMOTE_SSH"
git push -u public publish-clean:main
git tag -f -a "$VERSION" -m "$MSG" "$COMMIT"
git push --force public "refs/tags/${VERSION}"

git checkout -f main
git branch -D publish-clean

echo "=== Verify contributors ==="
sleep 2
gh api "repos/${OWNER}/${REPO}/contributors" --jq '.[].login'

echo "Done. Only JKSNS should appear."
