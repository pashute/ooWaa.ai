#!/usr/bin/env bash
# git-branch-base-check.sh
#
# Compares the current feature branch against 'develop' and 'main' to
# determine which branch it was created from, and shows the diff summary.
#
# Usage:  bash scripts/git-branch-base-check.sh [<branch>]
#   <branch>  optional — branch to inspect (defaults to HEAD / current branch)

set -euo pipefail

FEATURE="${1:-HEAD}"
DEVELOP="origin/develop"
MAIN="origin/main"

# Resolve a human-readable name for the branch under inspection
if [ "$FEATURE" = "HEAD" ]; then
  FEATURE_NAME=$(git symbolic-ref --short HEAD 2>/dev/null || git rev-parse --short HEAD)
else
  FEATURE_NAME="$FEATURE"
fi

echo "========================================"
echo "  Branch origin check"
echo "  Feature branch : $FEATURE_NAME"
echo "========================================"

# Ensure remote refs are available
for REF in "$DEVELOP" "$MAIN"; do
  if ! git rev-parse --verify "$REF" >/dev/null 2>&1; then
    echo "ERROR: '$REF' not found. Run: git fetch origin" >&2
    exit 1
  fi
done

MERGE_BASE_DEVELOP=$(git merge-base "$FEATURE" "$DEVELOP")
MERGE_BASE_MAIN=$(git merge-base "$FEATURE" "$MAIN")

HEAD_DEVELOP=$(git rev-parse "$DEVELOP")
HEAD_MAIN=$(git rev-parse "$MAIN")

echo ""
echo "--- Merge bases ---"
echo "  with $DEVELOP : $MERGE_BASE_DEVELOP"
echo "  with $MAIN    : $MERGE_BASE_MAIN"
echo ""

# Determine origin
if [ "$MERGE_BASE_MAIN" = "$HEAD_MAIN" ]; then
  ORIGIN_MAIN=true
else
  ORIGIN_MAIN=false
fi

if [ "$MERGE_BASE_DEVELOP" = "$HEAD_DEVELOP" ]; then
  ORIGIN_DEVELOP=true
else
  ORIGIN_DEVELOP=false
fi

echo "--- Result ---"
if $ORIGIN_DEVELOP && $ORIGIN_MAIN; then
  echo "  Branch was created after BOTH develop and main are ancestors."
  echo "  (develop and main may be at the same commit, or the branch is up to date with both)"
elif $ORIGIN_DEVELOP; then
  echo "  ✅ Branch was created from DEVELOP"
elif $ORIGIN_MAIN; then
  echo "  ⚠️  Branch was created from MAIN (not develop)"
  echo "     For gitflow compliance, feature branches should be based on 'develop'."
  echo "     Consider rebasing: git rebase $DEVELOP"
else
  echo "  Branch was NOT created directly from either develop or main."
  echo "  It diverged from an older common ancestor."
fi
echo ""

# Show commit counts
AHEAD_OF_DEVELOP=$(git rev-list --count "$DEVELOP".."$FEATURE")
BEHIND_DEVELOP=$(git rev-list --count "$FEATURE".."$DEVELOP")
AHEAD_OF_MAIN=$(git rev-list --count "$MAIN".."$FEATURE")
BEHIND_MAIN=$(git rev-list --count "$FEATURE".."$MAIN")

echo "--- Commit counts vs $DEVELOP ---"
echo "  Ahead  (unique commits on feature branch) : $AHEAD_OF_DEVELOP"
echo "  Behind (commits in develop not in feature) : $BEHIND_DEVELOP"
echo ""
echo "--- Commit counts vs $MAIN ---"
echo "  Ahead  (unique commits on feature branch) : $AHEAD_OF_MAIN"
echo "  Behind (commits in main not in feature)   : $BEHIND_MAIN"
echo ""

# Show file-level diff summary vs develop
echo "--- Files changed vs $DEVELOP ---"
git diff --stat "$DEVELOP"..."$FEATURE" || echo "  (no differences)"
echo ""
echo "--- Files changed vs $MAIN ---"
git diff --stat "$MAIN"..."$FEATURE" || echo "  (no differences)"
