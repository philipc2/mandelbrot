# Mandelbrot 

Visualuzation of the Mandelbrot Set using Node-JS and Python


<!-- or relative to container -->
<img src="static/seahorse_valley.jpg" alt="Valley" style="width:60%;"/>

## Overview

A cross-language project that uses Node-JS to generate data from the Mandelbrot Set and Python to visualize the result using Matplotlib. Both
packages are self-contained within command line scripts. 

## Installation 

### Node Package

```shell
cd js-mandelbrot
npm install 
```

### Python Package

```shell
cd py-mandelbrot
pip install .
```

## Usage

### Generate Mandelbrot Data

```shell
node js-mandelbrot/bin/mandelbrot.js \             
  -x -0.7435669 -y 0.1314023 \
  -w 0.0022878 -h 0.0022878 \
  -s 1e-5 \
  -n 2000 \
> seahorse_tail.json
```

### Visualization 

```shell
mandelbrot-vis seahorse_tail.json seahorse_tail.png
```

### Pre-Configured Bash Script

TODO ... 
