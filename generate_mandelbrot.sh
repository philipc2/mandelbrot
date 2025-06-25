#!/usr/bin/env bash
set -euo pipefail

# 1) Must have a conda env activated
if [[ -z "${CONDA_PREFIX:-}" ]]; then
  echo "✖  Please activate your conda environment first (e.g. conda activate mandelbrot)."
  exit 1
fi

# 2) Python CLI
if ! command -v mandelbrot-vis &>/dev/null; then
  echo "→ Installing Python package in current env (registering mandelbrot-vis)…"
  pip install -e .
fi

# 3) Node CLI
NODE_CLI="js-mandelbrot/bin/mandelbrot.js"
if [[ ! -x "$NODE_CLI" ]]; then
  echo "✖  Cannot find $NODE_CLI — did you clone js-mandelbrot and run npm install there?"
  exit 1
fi

PYTHON_CLI="mandelbrot-vis"

cases=(
  "-0.7            0.0             3.0769       400      500      default.jpg"
  "-0.7435669      0.1314023       0.0022878    800      2000     seahorse_tail.jpg"
  "-0.74364409961  0.13182604688    0.00000066208 800     10000     seahorse_valley.jpg"
)

for entry in "${cases[@]}"; do
  read -r X Y SIZE PIXELS ITERS OUT <<<"$entry"
  JSON="${OUT%.jpg}.json"
  STEP=$(awk "BEGIN { printf \"%.12g\", $SIZE/$PIXELS }")

  echo "→ Generating ${OUT}: center=(${X},${Y}), size=${SIZE}, pixels=${PIXELS}, step=${STEP}, iters=${ITERS}"
  node "$NODE_CLI" \
    -x "$X" \
    -y "$Y" \
    -w "$SIZE" \
    -h "$SIZE" \
    -s "$STEP" \
    -n "$ITERS" \
    > "$JSON"

  echo "→ Plotting to $OUT"
  "$PYTHON_CLI" "$JSON" "$OUT"
done

echo "✓ All done!"
